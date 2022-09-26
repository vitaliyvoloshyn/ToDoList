from .debug import *

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append('djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'djangoproject',
        'USER': 'djangouser',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
