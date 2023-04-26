from enum import auto
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import CustomerEncoder, SaleEncoder, SalespersonEncoder
from .models import AutomobileVO, Customer, Sale, Salesperson
from decimal import Decimal


# Create your views here.
@require_http_methods(["GET", "POST", "DELETE"])
def list_salespeople(request, employee_id=None):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople}, encoder=SalespersonEncoder, safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid info"}, status=400)

        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    else:
        count, _ = Salesperson.objects.filter(employee_id=employee_id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)


@require_http_methods(["GET", "POST", "DELETE"])
def list_customer(request, pk=None):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers}, encoder=CustomerEncoder, safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid info"}, status=400)

        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    else:
        count, _ = Customer.objects.filter(pk=pk).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)


@require_http_methods(["GET", "POST", "DELETE"])
def list_sales(request, pk=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
        # https://rollbar.com/blog/python-catching-multiple-exceptions/
        except (
            AutomobileVO.DoesNotExist,
            Salesperson.DoesNotExist,
            Customer.DoesNotExist,
        ):
            return JsonResponse({"message": "Invalid info"}, status=400)

        sale_data = {
            "automobile": automobile,
            "salesperson": salesperson,
            "customer": customer,
            "price": Decimal(content["price"]),
        }

        sale = Sale.objects.create(**sale_data)
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)
    else:
        count, _ = Sale.objects.filter(pk=pk).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)
