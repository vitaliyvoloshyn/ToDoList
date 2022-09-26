from .base import *


DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'djangoproject',
        'USER': 'djangouser',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432',
    }
}


REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append('rest_framework.renderers.JSONRenderer')
