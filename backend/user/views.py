"""
User views.
"""
from rest_framework import generics, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import (
    IsAdminUser, IsAuthenticated
)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from django.db.models import Q

from user.serializers import (
    UserSerializer, AuthTokenSerializer
)
from core.models import (
    User
)
from core.paginations import CustomLimitPagination


class CreateTokenView(ObtainAuthToken):
    """Create new auth token for user."""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUsersViewSet(viewsets.ModelViewSet):
    """View for manage users."""
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    pagination_class = CustomLimitPagination

    def get_queryset(self):
        """Return the user list."""
        sq = self.request.query_params.get('sq')
        queryset = self.queryset
        if sq is not None:
            queryset = queryset.filter(
                Q(nama_lengkap__icontains=sq) |
                Q(email__icontains=sq)
            )
        return queryset.distinct().filter(is_active=True)


    def perform_destroy(self, instance):
        """Deactivate a user instead of delete it."""
        instance.is_active = False
        instance.set_unusable_password()
        instance.save()


class ManageUserMeViewSet(generics.RetrieveUpdateAPIView):
    """View for manage userMe."""
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retrieve and return authenticated user."""
        return self.request.user