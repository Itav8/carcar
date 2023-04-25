from django.urls import path

from .views import (
    list_technicians,
    delete_technician,
    list_appointments,
    delete_appointment,
)

urlpatterns = [
    path(
        "technicians/",
        list_technicians,
        name="list_technicians",
    ),
    path(
        "technicians/<int:pk>/",
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
]
