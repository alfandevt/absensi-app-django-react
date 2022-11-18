"""
Test Jam Kerja API.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

# API URLS
# JAMKERJA_URL = reverse('absensi:jamkerja-list')

# API DETAIL URLS
def detail_url(jamkerja_id):
    """Return detail URL."""
    return reverse('absensi:jamkerja-detail', args=[jamkerja_id])

# Create superuser function
def create_su(email='super@example.com', password='testsu124', nama_lengkap='Super Admin'):
    """Return Admin Super User."""
    return get_user_model().objects.create_superuser(email, password, nama_lengkap)
