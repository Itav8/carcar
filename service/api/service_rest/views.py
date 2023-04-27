from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment, Status
# Create your views here.


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

@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        # data = []
        # for technician in technicians:
        #     id = technician.id
        #     employee_id = technician.employee_id
        #     first_name = technician.first_name
        #     last_name = technician.last_name
        #     data.append(
        #         {
        #             'id': id,
        #             'employee_id': employee_id,
        #             'first_name': first_name,
        #             'last_name': last_name,
        #         }
        #     )
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.create(**content)
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianListEncoder,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def delete_technician(request, employee_id):
    if request.method == "DELETE":
        try:
            tech = Technician.objects.get(employee_id=employee_id)
            tech.delete()
            return JsonResponse(
                tech,
                encoder=TechnicianListEncoder,
                safe=False,
                status=200,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"},
                                status=400,
                                )


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        data = []
        for appointment in appointments:
            if appointments == []:
                break
            id = appointment.id
            date = appointment.date_time.date()
            time = appointment.date_time.time()
            reason = appointment.reason
            status = appointment.status
            vin = appointment.vin
            customer = appointment.customer
            technician = appointment.technician.first_name
            data.append(
                {
                    'id': id,
                    'date': date,
                    'time': time,
                    'reason': reason,
                    'status': status,
                    'vin': vin,
                    'customer': customer,
                    'technician': technician,
                }
            )
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:       # POST - CREATE APPOINTMENT
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )
        # status = Status.objects.get(name="Created")       # STATUS DEFAULT PK=1 IN MODEL
        # content["status"] = status
        Appointment.objects.create(**content)
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_appointment(request, pk):
    if request.method == "DELETE":
        try:
            app = Appointment.objects.get(id=pk)
            app.delete()
            return JsonResponse(
                app,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"},
                                status=400,
                                )


@require_http_methods(["PUT"])
def cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment"},
            status=400,
        )
    # appointments = Appointment.objects.all()
    return JsonResponse(
        {"appointment": appointment},
        encoder=AppointmentDetailEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment"},
            status=400,
        )
    # appointments = Appointment.objects.all()
    return JsonResponse(
        {"appointment": appointment},
        encoder=AppointmentDetailEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def list_statuses(request):
    statuses = Status.objects.all()
    data = []
    for status in statuses:
        data.append(
            {
                "pk": status.status_id,
                "name": status.name,
            }
        )
    return JsonResponse(data, safe=False)


@require_http_methods(["GET"])
def list_automobileVOs(request):
    automobileVOs = AutomobileVO.objects.all()
    data = []
    for automobileVO in automobileVOs:
        data.append(
            {
                "vin": automobileVO.vin,
            }
        )
    return JsonResponse(data, safe=False)
