from datetime import date, timedelta

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import ProjectModel, TodoModel
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectModelLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoModelLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectModelLimitOffsetPagination

    def get_queryset(self):
        find = self.request.query_params.get('name')
        if not find:
            return self.queryset
        return ProjectModel.objects.filter(name__contains=find)


class TodoModelViewSet(ModelViewSet):
    queryset = TodoModel.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoModelLimitOffsetPagination

    def get_queryset(self):
        self._filter_by_name(self.request.query_params.get('name'))
        self._filter_by_date_from(self.request.query_params.get('datefrom'))
        self._filter_by_date_to(self.request.query_params.get('dateto'))
        return self.queryset

    def _filter_by_name(self, find: str = None):
        if find:
            self.queryset = self.queryset.filter(project__name__contains=find)

    def _filter_by_date_from(self, date_from: str = None):
        try:
            self.queryset = self.queryset.filter(created_at__gte=date.fromisoformat(date_from))
        except TypeError as e:
            pass
        except ValueError as e:
            self.queryset = self.queryset.filter(id=0)

    def _filter_by_date_to(self, date_to: str = None):
        try:
            self.queryset = self.queryset.filter(created_at__lte=date.fromisoformat(date_to) + timedelta(days=1))
        except TypeError:
            pass
        except ValueError as e:
            self.queryset = self.queryset.filter(id=0)


class ObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': user.username})
