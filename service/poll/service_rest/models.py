from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    class Meta:
        app_label = "poll"
