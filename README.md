# Garage Management System

## Project Title
**Garage Management System**

## Project Description
This web application enables garage owners and customers to efficiently manage vehicle servicing. Users can schedule appointments, track service history, and manage vehicle details. Garage owners have the capability to oversee their services, view customer requests, and maintain records. Additionally, users can browse a comprehensive list of services offered by the garage.

## Table of Contents
- [Project MVP](#project-mvp)
- [User Stories](#project-user-stories)
- [Database Table Schemas](#database-table-schemas)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project MVP
- Allow users to register and manage their vehicle information.
- Enable scheduling and tracking of service appointments.
- Provide a history of services performed on vehicles.
- Allow users to view a list of services offered by the garage.

## Project User Stories
- As a user, I want to register and log in so that I can manage my vehicles and appointments.
- As a user, I want to update my vehicle information, including make, model, year, and license plate, to keep my records accurate.
- As a user, I want to schedule a service appointment for my vehicle at a specific garage.
- As a garage owner, I want to view and manage service requests from customers to provide timely services.
- As a user, I want to view a list of all services offered by the garage.
- As a garage owner, I want to add or update services offered by my garage.

## Database Table Schemas

### Users Table
- **id**: Primary key
- **username**: String
- **email**: String
- **password**: String

### Vehicles Table (1-to-Many relationship with Users)
- **id**: Primary key
- **user_id**: Foreign key to Users table
- **make**: String (vehicle make)
- **model**: String (vehicle model)
- **year**: Integer (year of manufacture)
- **license_plate**: String

### Services Table
- **id**: Primary key
- **name**: String (name of the service)
- **description**: Text (details of the service)
- **cost**: Decimal (cost of the service)

### Service_Vehicles Table (Many-to-Many relationship between Services and Vehicles)
- **id**: Primary key
- **service_id**: Foreign key to Services table
- **vehicle_id**: Foreign key to Vehicles table

### Appointments Table (1-to-Many relationship with Users and Vehicles)
- **id**: Primary key
- **user_id**: Foreign key to Users table
- **vehicle_id**: Foreign key to Vehicles table
- **appointment_date**: Date
- **status**: String (e.g., scheduled, completed, canceled)
- **created_at**: Timestamp

## Technologies Used
- **Frontend:** React, Bootstrap
- **Backend:** Flask, SQLAlchemy
- **Database:** SQLite/PostgreSQL
- **Version Control:** Git

## Installation
To set up the Garage Management System locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/garage-management-system.git
   cd garage-management-system
## Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```
Create a virtual environment:

bash
Copy code
# Garage Management System Setup Guide

## Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd backend
Create a virtual environment:

```bash
python -m venv venv
```

For Linux/Mac:


```bash
source venv/bin/activate
```
For Windows:

```bash
venv\Scripts\activate
```
Install dependencies:


## Set up the database:

Run migrations:

```bash
flask db upgrade
```


```bash
flask run
```
## Frontend Setup
Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```
## Start the frontend server:

```bash
npm run dev
```
## Usage

Users can register, log in, and manage their vehicles.
Garage owners can manage services and customer requests.

## API Endpoints
#### POST /register - Register a new user
#### POST /login - User login
#### GET /vehicles - Retrieve all vehicles for a user
#### POST /vehicles - Add a new vehicle
#### PUT /vehicles/
- Update vehicle information
#### DELETE /vehicles/
- Delete a vehicle
#### POST /appointments - Schedule a new appointment
#### GET /services - Get a list of all services offered
#### PUT /services/
- Update service details
#### DELETE /services/
- Remove a service
