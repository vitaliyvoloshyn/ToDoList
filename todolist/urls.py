# Open-API swagger без сторонних библиотек
# from rest_framework.schemas import get_schema_view
# from django.views.generic import TemplateView

from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
# Open-API swagger с использованием библиотеки drf-yasg
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from todo.views import ProjectModelViewSet, TodoModelViewSet, ObtainAuthToken
from users.views import CustomUserViewSet

router = DefaultRouter()
router.register('users', CustomUserViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', TodoModelViewSet)
print(router.urls)

# Open-API swagger с использованием библиотеки drf-yasg
schema_view = get_schema_view(
    openapi.Info(
        title="TODO",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', ObtainAuthToken.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path("graphql/", GraphQLView.as_view(graphiql=True)),

    # Open-API swagger с использованием библиотеки drf-yasg
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),

    # Open-API swagger без сторонних библиотек
    # path('openapi', get_schema_view(
    #     title="TODO",
    #     description="API for all things …",
    #     version="1.0.0"
    # ), name='openapi-schema'),
    # path('swagger-ui/', TemplateView.as_view(
    #     template_name='swagger-ui.html',
    #     extra_context={'schema_url': 'openapi-schema'}
    # ), name='swagger-ui'),
]
