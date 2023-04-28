from common.json import ModelEncoder

from .models import Technician, Appointment


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "employee_id",
        "first_name",
        "last_name",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "id",
        "reason",
        "vin",
        "customer",
    ]

    def get_extra_data(self, o):
        return {"status": o.status.name,
                "technician": f'{o.technician.first_name} {o.technician.last_name}',
                }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "id",
        "reason",
        "vin",
        "customer",
    ]

    def get_extra_data(self, o):
        return {"status": o.status.name,
                "technician": f'{o.technician.first_name} {o.technician.last_name}',
                }
