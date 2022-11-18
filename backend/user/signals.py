"""
User Signals.
"""
from django.db.models.signals import post_save, post_delete
from django.contrib.auth import get_user_model
from django.dispatch import receiver

from core.models import Profil


@receiver(post_save, sender=get_user_model())
def create_profil(sender, instance, created, **kwargs):
    """Create Profil after user created"""
    if created:
        Profil.objects.create(user=instance)

@receiver(post_delete, sender=Profil)
def delete_user(sender, instance, **kwargs):
    """Delete Profil afeter user deleted"""
    try:
        user = instance.user
        user.delete()
    except:
        pass