"""
Test Jam Kerja API.
"""
from datetime import time
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import JamKerja

# API URLS
ABSEN_URL = reverse('absensi:absensi-list')

# API DETAIL URLS
def detail_url(absensi_id):
    """Return detail URL."""
    return reverse('absensi:absensi-detail', args=[absensi_id])

# Create user function
def create_user(email='super@example.com', password='testsu124', nama_lengkap='Super Admin'):
    """Return Admin Super User."""
    return get_user_model().objects.create_user(email, password, nama_lengkap)


class PublicAbsenApiTests(TestCase):
    """Test for public absen features."""

    def setUp(self):
        self.client = APIClient()

    def test_get_absensi_fail(self):
        """Test get absensi fail."""
        res = self.client.get(ABSEN_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAbsenApiTests(TestCase):
    """Test for private absen feature."""

    def setUp(self):
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_absensi_success(self):
        """Test get absensi success."""
        res = self.client.get(ABSEN_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_post_absensi_success(self):
        """Test post absensi."""
        payload = {'keterangan': 'Izin'}
        res = self.client.post(ABSEN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['keterangan'], payload['keterangan'])