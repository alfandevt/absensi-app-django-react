"""
Serializer for Absensi.
"""
from django.contrib.auth import (
    get_user_model,
    authenticate
)
from django.utils.translation import gettext as _

from rest_framework import serializers

from core import models
from user.serializers import UserSerializer


class JamKerjaSerializer(serializers.ModelSerializer):
    """Serializer for Jam Kerja."""

    class Meta:
        model = models.JamKerja
        fields =['id', 'mulai', 'selesai', 'deskripsi']
        read_only_fields = ['id']


class AbsensiSerializer(serializers.ModelSerializer):
    """Serializer for absensi."""

    class Meta:
        model = models.Absensi
        fields = ['id', 'keterangan', 'jam']
        read_only_fields = ['id', 'jam']
