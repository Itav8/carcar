from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    TechnicianListEncoder,
    AppointmentListEncoder,
    AppointmentDetailEncoder,
)
from .models import Technician, AutomobileVO, Appointment, Status


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        print("list_tech ELSE!!")
        content = json.loads(request.body)
        try:
            Technician.objects.create(**content)
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianListEncoder,
            )
        except:
            response = JsonResponse({"message": "Could not create the technician"})
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
            return JsonResponse(
                {"message": "Technician does not exist"},
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
                    "id": id,
                    "date": date,
                    "time": time,
                    "reason": reason,
                    "status": status,
                    "vin": vin,
                    "customer": customer,
                    "technician": technician,
                }
            )
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )
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
            return JsonResponse(
                {"message": "Appointment does not exist"},
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
