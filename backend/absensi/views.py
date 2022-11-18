"""
Views for absensi.
"""
from rest_framework import generics, authentication, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from absensi import serializers
from core import models


class ManageJamKerjaViewSet(generics.RetrieveUpdateAPIView):
    """View for manage Jam Kerja."""
    serializer_class = serializers.JamKerjaSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
