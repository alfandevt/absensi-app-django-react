"""
Views for absensi.
"""
from rest_framework import generics, viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from absensi import serializers
from core import models


class ManageJamKerjaViewSet(
                            viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin):
    """View for manage Jam Kerja."""
    serializer_class = serializers.JamKerjaSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.JamKerja.objects.all()


class AbsenKerjaViewSet(
                        viewsets.GenericViewSet,
                        mixins.CreateModelMixin,
                        mixins.ListModelMixin):
    """View for absensi"""
    serializer_class = serializers.AbsensiSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Absensi.objects.all()

    def get_queryset(self):
        queryset = self.queryset.order_by('-jam')
        return queryset.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

