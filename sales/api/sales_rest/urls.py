from django.urls import path

from .views import (
    delete_customer,
    delete_sales,
    delete_salesperson,
    list_sales,
    list_salespeople,
    list_customer,
)

urlpatterns = [
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/", list_salespeople, name="create_salesperson"),
    path(
        "salespeople/<str:employee_id>/", delete_salesperson, name="delete_salesperson"
    ),
    path("customers/", list_customer, name="list_customer"),
    path("customers/", list_customer, name="create_customer"),
    path("customers/<int:id>/", delete_customer, name="delete_customer"),
    path("sales/", list_sales, name="list_sales"),
    path("sales/", list_sales, name="create_sales"),
    path("sales/<int:id>/", delete_sales, name="delete_sales"),
]
