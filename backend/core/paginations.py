"""
Pagination for viewset.
"""
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomLimitPagination(PageNumberPagination):
    """Custom limit pagination for paginate list."""
    # default_limit = 2
    # max_limit = 100
    # limit_query_param = 'lim'
    # offset_query_param = 'ofs'
    page_size = 5
    page_size_query_param = 'ps'
    max_page_size = 50
    page_query_param = 'pg'

    def get_paginated_response(self, data):
        response = {'results': data}
        response['has_next'] = self.page.has_next()
        response['has_previous'] = self.page.has_previous()
        response['current_page'] = self.page.number
        if response['has_next']:
            response['next'] = self.page.next_page_number()
        if response['has_previous']:
            response['previous'] = self.page.previous_page_number()
        response['total_page'] = self.page.paginator.num_pages

        left_index = (response['current_page'] - 2)
        if left_index < 1:
            left_index = 1

        right_index = (response['current_page'] + 3)
        if right_index > response['total_page']:
            right_index = response['total_page'] + 1

        response['range'] = list(range(left_index, right_index))

        return Response(response)