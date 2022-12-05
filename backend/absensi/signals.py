"""
Absen Signals.
"""
from django.db.models.signals import post_save, post_delete
from django.contrib.auth import get_user_model
from django.dispatch import receiver