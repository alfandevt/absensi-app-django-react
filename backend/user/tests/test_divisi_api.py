"""
Test Divisi API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Divisi


DIVISI_URL = reverse('user:divisi-list')

def detail_urls(divisi_id):
    """Return Detail URLs."""
    return reverse('user:divisi-detail', args=[divisi_id])


# Function Create Admin Super Divisi
def create_superuser(nama_lengkap='Testo User', email='test@email.com', password='testpass123'):
    """Create and return user."""
    user = get_user_model().objects.create_superuser(email, password, nama_lengkap)
    user.refresh_from_db()
    return user


class PublicDivisiApiTests(TestCase):
    """Test for divisi public feature API."""

    def setUp(self):
        self.client = APIClient()

    def test_get_divisi_list(self):
        """Test get divisi list fail."""
        res = self.client.get(DIVISI_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateDivisiApiTests(TestCase):
    """Test for divisi private feature API."""

    def setUp(self):
        self.user = create_superuser()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_divisi_list_success(self):
        """Test get divisi list with authenticate user success."""
        res = self.client.get(DIVISI_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_divisi_success(self):
        """Test create divisi success."""
        payload = {'nama': 'Divisi IT'}
        res = self.client.post(DIVISI_URL, payload)

        divisiCount = Divisi.objects.count()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(divisiCount, 1)

    def test_get_divisi_success(self):
        """Test get divisi success."""
        Divisi.objects.create(nama='Divisi IT')

        res = self.client.get(detail_urls(1))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['nama'], "Divisi IT")


    def test_update_divisi_success(self):
        """Test update divisi success."""
        Divisi.objects.create(nama='Divisi IT')

        payload = {'nama': 'Divisi HR'}
        res = self.client.patch(detail_urls(1), payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['nama'], payload['nama'])

