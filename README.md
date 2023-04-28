# CarCar

Team:

* Italiz - Sales
* Jonathan - Service

## Design

## Service microservice

I have 3 Models:
    Technician
    - first_name: CharField
    - last_name: CharField
    - employee_id: CharField (UNIQUE)
    AutomobileVO
    - just the VIN: UNIQUE
    Appointment
    - date_time: DateTime   (SEPARATE DATE/TIME SELECTORS IN CREATE_APP_FORM??)
    - reason: CharField     (TEXTFIELD??)
    - status: ForeignKey(status, related_name="appointments", on_delete=PROTECT) - created/canceled/finished
        SERVICE_APPOINTMENTS_LIST SHOWS ONLE 'CREATED' APPS, SERVICE_HISTORY_LIST SHOWS ALL STATUSES!
    - vin: CharField        (LIST_APPS NEEDS TO CHECK IF VIN WAS SOLD HERE: MARK VIP)
    - customer: CharField
    - technician: ForeignKey Technician, relative_name="appointments", on_delete=PROTECT??
                    CREATE_APP_FORM NEEDS A DROP-DOWN FOR TECHNICIAN

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
Models:
    AutomobileVO
        - Contains all the Automobile VINs polled from Inventory microservice
    Salesperson
        - Contains the necessary infomation for a salesperson and setting the `employee_id` unique to True to prevent any duplication.
    Customer
        - Contains the necessary infomation for a customer.
    Sale
        - Contains the necessary infomation for a sale. Automobile is a ForeignKey to AutomobileVO. Salesperson is a ForeignKey to Salesperson Model. Customer is a ForeignKey to Customer Model.

Poller Microservice:
    Inventory
        - Automobile Model: It polls this data every minute to add Automobile VIN to the Sales Microservice database for AutomobileVO
