from django.conf.urls import url
from trialAPI import views

urlpatterns=[
    url(r'^indeed/$', views.indeedApi),
    url(r'^indeed/([0-9]+)$', views.indeedApi),
]