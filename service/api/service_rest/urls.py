from django.urls import path

from .views import (
    list_technicians,
    delete_technician,
    list_appointments,
    delete_appointment,
    cancel_appointment,
    finish_appointment,
    list_statuses,
)

urlpatterns = [
    path(
        "technicians/",
        list_technicians,
        name="list_technicians",
    ),
    path(
        "technicians/<str:employee_id>/",
        delete_technician,
        name="delete_technician",
    ),
    path(
        "appointments/",
        list_appointments,
        name="list_appointments",
    ),
    path(
        "appointments/<int:pk>/",
        delete_appointment,
        name="delete_appointment",
    ),
    path(
        "appointments/<int:pk>/cancel",
        cancel_appointment,
        name="cancel_appointment",
    ),
    path(
        "appointments/<int:pk>/finish",
        finish_appointment,
        name="finish_appointment",
    ),
    path(
        "statuses/",
        list_statuses,
        name="list_statuses",
    ),
]
