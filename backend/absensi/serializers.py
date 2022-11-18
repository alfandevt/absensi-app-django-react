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


class JamKerjaSerializer(serializers.ModelSerializer):
    """Serializer for Jam Kerja."""

    class Meta:
        model = models.JamKerja
        fields =['mulai', 'selesai', 'keterangan']
        read_only_fields = ['id']

