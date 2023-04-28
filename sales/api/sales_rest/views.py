import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import CustomerEncoder, SaleEncoder, SalespersonEncoder
from .models import AutomobileVO, Customer, Sale, Salesperson
from decimal import Decimal


@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople}, encoder=SalespersonEncoder, safe=False
        )
    else:
        try:
            content = json.loads(request.body)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid info"}, status=400)

        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)


@require_http_methods(["DELETE"])
def delete_salesperson(request, employee_id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(employee_id=employee_id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)


@require_http_methods(["GET", "POST"])
def list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers}, encoder=CustomerEncoder, safe=False
        )
    else:
        try:
            content = json.loads(request.body)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid info"}, status=400)

        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)


@require_http_methods(["DELETE"])
def delete_customer(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
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


@require_http_methods(["DELETE"])
def delete_sales(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0}, status=200)
        else:
            return JsonResponse({"deleted": count > 0}, status=404)
