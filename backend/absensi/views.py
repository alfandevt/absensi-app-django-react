"""
Views for absensi.
"""
from django.utils import timezone
from rest_framework import generics, viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.settings import api_settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from absensi import serializers
from core import models
from core.paginations import CustomLimitPagination


class ManageJamKerjaViewSet(
                            viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin):
    """View for manage Jam Kerja."""
    serializer_class = serializers.JamKerjaSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.JamKerja.objects.all()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def absen_karyawan(request):
    user = request.user
    data = request.data
    current_day = timezone.now().day
    count_absen_today = models.Absensi.objects.filter(jam__day=current_day, user=request.user, keterangan=data['keterangan']).count()
    if count_absen_today > 0:
        return Response({'detail': _('Sudah absen')}, status=403)

    absen = models.Absensi.objects.create(user=user, keterangan=data['keterangan'])
    serializer = serializers.AbsensiSerializer(absen, many=False)
    return Response({'absensi':serializer.data, 'has_absen': True}, status=201)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def absen_detail_list(request, pk):
    selected_month = request.data['month']
    selected_year = request.data['year']
    if selected_month is None:
        return Response({'detail': _('masukkan bulan untuk menyaring data.')}, status=400)
    if selected_year is None:
        return Response({'detail': _('masukkan tahun untuk menyaring data.')}, status=400)
    user = get_user_model().objects.get(id=pk)
    list_absen = models.Absensi.objects.filter(user=user, jam__month=selected_month, jam__year=selected_year).order_by('-jam')
    if list_absen is None:
        return Response({'detail': _('data tidak ditemukan.')}, status=404)


    serializer = serializers.AbsensiSerializer(list_absen, many=True)
    return Response({'results':serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def absen_user_count_current_month(request, pk):
    user = get_user_model().objects.get(id=pk)
    current_month = timezone.now().month
    jam_kerja = models.JamKerja.objects.first()
    absen_query = models.Absensi.objects.filter(user=user, jam__month=current_month)
    absen_tepat = absen_query.filter(
            jam__time__lte=jam_kerja.mulai,
            jam__time__lt=jam_kerja.selesai,
            keterangan='M').count()

    absen_telat = absen_query.filter(
            jam__time__gt=jam_kerja.mulai,
            jam__time__lt=jam_kerja.selesai,
            keterangan='M').count()

    return Response({'tepat': absen_tepat, 'telat': absen_telat}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def check_user_absen(request):
    current_day = timezone.now().day
    has_absen = models.Absensi.objects.filter(jam__day=current_day, user=request.user).exists()

    return Response({'has_absen': has_absen})
