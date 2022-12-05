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
from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models import Q
from django.contrib.auth import get_user_model

from user.serializers import (
    UserSerializer, AuthTokenSerializer, DivisiSerializer,
    AbsensiUserSerializer
)
from core.models import (
    Divisi
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
    queryset = get_user_model().objects.all()
    pagination_class = CustomLimitPagination

    def get_queryset(self):
        """Return the user list."""
        sq = self.request.query_params.get('sq')
        queryset = self.queryset
        if sq is not None:
            queryset = queryset.filter(
                Q(nama_lengkap__icontains=sq) |
                Q(email__icontains=sq) |
                Q(profil__nik__icontains=sq) |
                Q(profil__divisi__nama__icontains=sq)
            )
        return queryset.distinct().filter(is_active=True)\
               .exclude(email=self.request.user.email).order_by('nama_lengkap')

    def get_serializer_class(self):
        """Return the serializer class"""
        if self.action == 'absensi_user_list':
            return AbsensiUserSerializer

        return self.serializer_class

    @action(detail=False, methods=['GET'], url_path='absensi-user')
    def absensi_user_list(self, request):
        user_list = self.get_queryset()
        page = self.paginate_queryset(user_list)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AbsensiUserSerializer(user_list, many=True)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        """Deactivate a user instead of delete it."""
        instance.is_active = False
        instance.set_unusable_password()
        instance.save()

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)


class ManageUserMeViewSet(generics.RetrieveUpdateAPIView):
    """View for manage userMe."""
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retrieve and return authenticated user."""
        return self.request.user


class ManageDivisiViewSet(viewsets.ModelViewSet):
    """View for manage Divisi."""
    serializer_class = DivisiSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = Divisi.objects.all()

    def get_queryset(self):
        """Return Divisi Query set"""
        sq = self.request.query_params.get('sq')
        queryset = self.queryset
        if sq is not None:
            queryset = queryset.filter(
                Q(nama__icontains=sq)
            )
        return queryset.distinct().order_by('id')