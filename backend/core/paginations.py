"""
Pagination for viewset.
"""
from rest_framework.pagination import LimitOffsetPagination


class CustomLimitPagination(LimitOffsetPagination):
    """Custom limit pagination for paginate list."""
    default_limit = 10
    max_limit = 100
    limit_query_param = 'lim'
    offset_query_param = 'ofs'