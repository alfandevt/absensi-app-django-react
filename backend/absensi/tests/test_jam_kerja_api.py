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
JAM_URL = reverse('absensi:jamkerja-list')

# API DETAIL URLS
def detail_url(jamkerja_id):
    """Return detail URL."""
    return reverse('absensi:jamkerja-detail', args=[jamkerja_id])

# Create superuser function
def create_su(email='super@example.com', password='testsu124', nama_lengkap='Super Admin'):
    """Return Admin Super User."""
    return get_user_model().objects.create_superuser(email, password, nama_lengkap)

#Create Time
def create_time(h, m, s, **kwargs):
    """Return time"""
    return time(h, m, s, **kwargs)


class PublicJamKerjaApiTests(TestCase):
    """Test for jam kerja public Api features."""

    def setUp(self):
        self.client = APIClient()

    def test_get_jam_failed(self):
        """Test get jam kerja failed."""
        res = self.client.get(JAM_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateJamKerjaApiTests(TestCase):
    """Test for jam kerja private Api features."""

    def setUp(self):
        self.user = create_su()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_jam_list(self):
        """Test get jam kerja success."""
        res = self.client.get(JAM_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_jam_detail(self):
        """Test get jam kerja success."""
        jam = JamKerja.objects.create(mulai=create_time(9,0,0), selesai=create_time(17,0,0), deskripsi='Senin')
        res = self.client.get(detail_url(jam.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_jam_detail(self):
        """Test get jam kerja success."""
        mulai = create_time(9,0,0)
        selesai = create_time(17,0,0)
        jam = JamKerja.objects.create(mulai=mulai, selesai=selesai, deskripsi='Senin')

        mulai = create_time(8,0,0)
        selesai = create_time(14,0,0)
        payload = {'mulai': mulai, 'selesai': selesai, 'deskripsi': 'Selasa'}

        res = self.client.patch(detail_url(jam.id), payload)
        jam.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(jam.mulai, payload['mulai'])
