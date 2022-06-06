import json

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from VaccinationApp.models import Patients


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = '__all__'
