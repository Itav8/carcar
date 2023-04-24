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
    - employee_id: CharField
    AutomobileVO
    - href: CharField
    - id: PositiveSmallInteger   DON'T PUT IN MODEL; DJANGO-AUTOMATIC!
    - color: CharField
    - year: PositiveSmallInteger
    - vin: CharField
    - model
        - href: CharField
        - id: PositiveSmallInteger
        - name: CharField
        - picture_url: UrlField
        - manufacturer
            - href: CharField
            - id: PositiveSmallInteger
            - name: CharField
    - sold: BooleanField
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
