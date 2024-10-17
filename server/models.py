from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# Users Table
class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role=db.Column(db.String(20),nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    vehicles = db.relationship('Vehicle', back_populates='owner', lazy=True)
    appointments = db.relationship('Appointment', back_populates='user', lazy=True)
    
    #properties required by Flask Login manager
    @property
    def is_active(self):
        return True
    
    def get_id(self):
        return str(self.id)
    
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    serialize_rules = ('-vehicles.owner', '-appointments.user')


# Vehicles Table (One-to-Many with Users)
class Vehicle(db.Model,SerializerMixin):
    __tablename__ = 'vehicles'
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    license_plate = db.Column(db.String(20), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    owner = db.relationship('User', back_populates='vehicles')
    services = db.relationship('ServiceVehicle', back_populates='vehicle', lazy=True)
    appointments = db.relationship('Appointment', back_populates='vehicle', lazy=True)
    

    serialize_rules = ('-owner.vehicles', '-services.vehicle', '-appointments.vehicle')



# Services Table
class Service(db.Model,SerializerMixin):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    vehicles = db.relationship('ServiceVehicle', back_populates='service', lazy=True)

    serialize_rules = ('-vehicles.service',)


# Service_Vehicles Table (Many-to-Many between Services and Vehicles)
class ServiceVehicle(db.Model,SerializerMixin):
    __tablename__ = 'service_vehicles'
    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)

    # Additional Columns
    service_date = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    service = db.relationship('Service', back_populates='vehicles')
    vehicle = db.relationship('Vehicle', back_populates='services')

    serialize_rules = ('-vehicle.services', '-service.vehicles')


# Appointments Table (One-to-Many with Users and Vehicles)
# Mechanic Table (One-to-Many with Appointments)
class Mechanic(db.Model,SerializerMixin):
    __tablename__ = 'mechanics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    

    # Relationships
    appointments = db.relationship('Appointment', back_populates='mechanic', lazy=True)

    # Optional serialization rules
    serialize_rules = ('-appointments.mechanic',)


# Update to Appointment Table to include Mechanic relationship
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    service_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)
    mechanic_id = db.Column(db.Integer, db.ForeignKey('mechanics.id'), nullable=True)  # Nullable if no mechanic is assigned yet

    # Relationships
    user = db.relationship('User', back_populates='appointments')
    vehicle = db.relationship('Vehicle', back_populates='appointments')
    mechanic = db.relationship('Mechanic', back_populates='appointments')

    # Custom method to serialize the Appointment model
    def to_dict(self):
        return {
            'id': self.id,
            'service_date': self.service_date.strftime('%Y-%m-%d %H:%M:%S'),  # Formatting date
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),  # Formatting date
            'user': {
                'id': self.user.id,
                'name': self.user.name
            },
            'vehicle': {
                'id': self.vehicle.id,
                'make': self.vehicle.make,
                'license_plate': self.vehicle.license_plate
            },
            'mechanic': {
                'id': self.mechanic.id,
                'name': self.mechanic.name
            } if self.mechanic else None  # If no mechanic assigned, return None
        }
