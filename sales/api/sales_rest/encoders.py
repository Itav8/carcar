from common.json import ModelEncoder
from .models import AutomobileVO, Customer, Sale, Salesperson
import json
from decimal import Decimal


class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "first_name", "last_name", "address", "phone_number"]


class PriceEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["id", "automobile", "salesperson", "customer", "price"]
    encoders = {
        "automobile": AutomobileEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "price": PriceEncoder(),
    }
