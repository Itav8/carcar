from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    model = models.CharField(max_length=50)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})

    def __str__(self):
        return f'{self.model} - {self.vin}'


class Status(models.Model):
    # 'Created', 'Canceled', or 'Finished'
    # id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
    #    ordering = ("id",)  # Default ordering for Status
        verbose_name_plural = "statuses"  # Fix the pluralization


class Appointment(models.Model):
    date_time = models.DateTimeField()    # auto_now=False, auto_now_add=False
    reason = models.CharField(max_length=200)
    status = models.ForeignKey(
        Status,
        related_name="+",  # do not create a related name on State
        on_delete=models.PROTECT,
    )
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f'{self.reason} - {self.vin}'

    def cancel(self):
        status = Status.objects.get(name="Canceled")
        self.status = status
        self.save()

    def finish(self):
        status = Status.objects.get(name="Finished")
        self.status = status
        self.save()
