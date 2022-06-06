import json
import pathlib

from django.core.exceptions import ValidationError
from django.db import models
#
file = pathlib.Path.cwd() / "VaccinationApp" / "data" / "cities_countries_data.json"

with file.open('r') as f:
    countries_cities_data = json.load(f)


def validate_country(value):
    if value not in (country_data["country"] for country_data in countries_cities_data):
        raise ValidationError(
            '%(value)s is not a country',
            params={'value': value},
        )


class Patients(models.Model):
    ID = models.AutoField(primary_key=True)
    FirstName = models.CharField(blank=False, max_length=500)
    LastName = models.CharField(blank=False, max_length=500)
    DateOfBirth = models.DateField(blank=False)
    Country = models.CharField(blank=False, max_length=500, validators=[validate_country])
    City = models.CharField(blank=False, max_length=500)
    Address = models.CharField(blank=False, max_length=500)
    ZipCode = models.CharField(blank=True,max_length=500, default="")
    LandLine = models.IntegerField(blank=False)
    Cellular = models.IntegerField(blank=False)
    CovidBefore = models.BooleanField(blank=False, default=False)
    Diabetes = models.BooleanField(blank=False, default=False)
    CardioVascular = models.BooleanField(blank=False, default=False)
    Allergies = models.CharField(max_length=500)
    OtherConditions = models.CharField(max_length=500)

    def clean(self):
        if self.Country not in (country_data["country"] for country_data in countries_cities_data) \
                and self.City not in countries_cities_data[self.Country]:
            raise ValidationError(
                '%(value)s is not a city',
                params={'value': self.Country},
            )
