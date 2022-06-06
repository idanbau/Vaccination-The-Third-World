from django.urls import re_path, path

from VaccinationApp import views

urlpatterns = [
    path('patient', views.patientApi),
    re_path(r'^patient/(/\d+)$', views.patientApi)
]
