from django.urls import path

from .views import list_sales, list_salespeople, list_customer

urlpatterns = [
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/", list_salespeople, name="create_salesperson"),
    path("salespeople/<str:employee_id>/", list_salespeople, name="delete_salesperson"),
    path("customers/", list_customer, name="list_customer"),
    path("customers/", list_customer, name="create_customer"),
    path("customers/<int:pk>/", list_customer, name="delete_customer"),
    path("sales/", list_sales, name="list_sales"),
    path("sales/", list_sales, name="create_sales"),
    path("sales/<int:pk>/", list_sales, name="delete_sales"),
]
