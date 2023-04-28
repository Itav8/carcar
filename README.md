# CarCar

Team:

- Italiz - Sales
- Jonathan - Service

## Design

Inventory Microserice

- Contains `Manufacturer`, `VehicleModel`, `Automobile` models that are necessary for the app business domain
- The `Sales` and `Services` microservives polls the VIN data from the `Automobile Model` to their each own microservive.
- User friendly forms for adding and managing vehicle and automobile models.
- Vehicle Model form includes model name, picture URL, and manufacturer name selection.
- Automobile Model form includes color, year, VIN, and model name selection. - Ability to edit or delete specific items

Service Microservice

- IMPORTANT: before testing, CREATE 3 STATUSES IN ADMIN WITH THESE IDS AND NAMES (CASE-SENSITIVE):

  - id 1: 'created'
  - id 2: 'canceled'
  - id 3: 'finished'

- Can create New Technician or Service (selecting from available Technicians)
- Can list all appointments which have not been canceled or finished
- Can also list a history of all appointments and search by VIN
- Time entry for New Service must be within business hours (9am-6pm)
- all forms throw alerts if bad data (duplicate employee ID, etc.)

Sales Microservice

- Components for adding sales employees, customers, and sales data.
- Ability to view all data and delete specific data
- Automobile data polled from Inventory Microservice
- Models include AutomobileVO with uniquie `VIN`, `Salesperson` with unique employee ID, `Customer`, and `Sale` with price and foreign key relationships to `A`utomobileVO`, `Salesperson`, and `Customer` models.

The CarCar app is designed to help car dealerships manage inventory and sales process efficiently. Forms and components make it easy for users to add, manage, and delete models, sales, employees, customers, and sales data.

## Service microservice

I have 3 Models:
Technician - first_name: CharField - last_name: CharField - employee_id: CharField (UNIQUE)
AutomobileVO - just the VIN: UNIQUE
Appointment - date_time: DateTime (SEPARATE DATE/TIME SELECTORS IN CREATE_APP_FORM??)

- reason: CharField (TEXTFIELD??)
- status: ForeignKey(status, related_name="appointments", on_delete=PROTECT)
- created/canceled/finished
  SERVICE_APPOINTMENTS_LIST SHOWS ONLE 'CREATED' APPS, SERVICE_HISTORY_LIST SHOWS ALL STATUSES!
- vin: CharField (LIST_APPS NEEDS TO CHECK IF VIN WAS SOLD HERE: MARK VIP)
- customer: CharField - technician: ForeignKey Technician, relative_name="appointments", on_delete=PROTECT??
  CREATE_APP_FORM NEEDS A DROP-DOWN FOR TECHNICIAN

## Sales microservice

Models:
    AutomobileVO
        - Contains all the Automobile VINs polled from Inventory microservice.
    Salesperson
        - Contains the necessary infomation for a salesperson and setting the `employee_id` unique to True to prevent any duplication.
    Customer
        - Contains the necessary infomation for a customer.
    Sale
        - Contains the necessary infomation for a sale. Automobile is a ForeignKey to AutomobileVO. Salesperson is a ForeignKey to Salesperson Model. Customer is a ForeignKey to Customer Model.

Poller Microservice:
    Inventory
        - Automobile Model: It polls this data every minute to add Automobile VIN to the Sales Microservice database for AutomobileVO.
