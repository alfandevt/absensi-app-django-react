"""
Test Jam Kerja API.
"""
from datetime import time, timedelta
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Absensi, JamKerja

# API URLS
# ABSEN_URL = reverse('absensi:absensi-list')
ABSEN_KARYAWAN_URL = reverse('absensi:absen')

# API DETAIL URLS
# def detail_url(absensi_id):
#     """Return detail URL."""
#     return reverse('absensi:absensi-detail', args=[absensi_id])

# Create user function
def create_user(email='super@example.com', password='testsu124', nama_lengkap='Super Admin'):
    """Return Admin Super User."""
    return get_user_model().objects.create_user(email, password, nama_lengkap)

def create_time(h, m, s, **kwargs):
    """Return time"""
    return time(h, m, s, **kwargs)


# class PublicAbsenApiTests(TestCase):
#     """Test for public absen features."""

#     def setUp(self):
#         self.client = APIClient()

#     def test_get_absensi_fail(self):
#         """Test get absensi fail."""
#         res = self.client.get(ABSEN_URL)

#         self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAbsenApiTests(TestCase):
    """Test for private absen feature."""

    def setUp(self):
        mulai = create_time(9,0,0)
        selesai = create_time(17,0,0)
        self.jamkerja = JamKerja.objects.create(mulai=mulai, selesai=selesai, deskripsi='Senin')
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_post_absensi_success(self):
        """Test post absensi."""
        payload = {'keterangan': 'M'}
        res = self.client.post(ABSEN_KARYAWAN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(res.data['absensi'])

    def test_post_absensi_exist(self):
        """Test get absensi."""
        Absensi.objects.create(user=self.user, keterangan='M')
        payload = {'keterangan': 'M'}
        res = self.client.post(ABSEN_KARYAWAN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_absensi_detail_list(self):
        """Test get absensi."""
        Absensi.objects.create(user=self.user, keterangan='M')
        url = reverse('absensi:list-absen', args=[self.user.id])
        res = self.client.post(url, {'month': timezone.now().month})
        print(timezone.now().month)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), 1)

    def test_get_absensi_count_late(self):
        """Test get absensi count late"""
        Absensi.objects.create(user=self.user, keterangan='M')
        url = reverse('absensi:info-absen', args=[self.user.id])
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_check_has_absen(self):
        """Test check user has absen."""
        Absensi.objects.create(user=self.user, keterangan='M')
        url = reverse('absensi:absen-check')
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data['has_absen'])

    def test_check_has_not_absen(self):
        """Test check user has absen."""
        url = reverse('absensi:absen-check')
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertFalse(res.data['has_absen'])

