from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Status(models.Model):
    status_id = models.PositiveSmallIntegerField(primary_key=True, default=1)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "statuses"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.ForeignKey(
        Status,
        related_name="+",
        on_delete=models.PROTECT,
        default=1,
    )
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f'{self.reason} - {self.vin}'

    def cancel(self):
        status = Status.objects.get(name="canceled")
        self.status = status
        self.save()

    def finish(self):
        status = Status.objects.get(name="finished")
        self.status = status
        self.save()

    def create(self):
        status = Status.objects.get(name="created")
        self.status = status
        self.save()
