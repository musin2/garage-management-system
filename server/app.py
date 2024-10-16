from flask import Flask, request, make_response, jsonify
from models import db, User, Vehicle, Service, Appointment
from datetime import datetime
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
import os
import json

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['SECRET_KEY'] = 'secret_key'


login_manager = LoginManager(app)
login_manager.login_view = 'login'
migrate = Migrate(app, db)
db.init_app(app)

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# User Registration
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        new_user = User(
            name=data['name'], 
            email=data['email'], 
            phone_number=data['phone_number'],
            password=data['password'],
            role=data['role']
            
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201
    
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500
    
# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
    if user and user.password == password:
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully!"}), 200


@app.route('/')
def index():
    return make_response('<h1>Garage routes</h1>', 200)

# Manage Vehicle Information
@app.route('/users/<int:user_id>/vehicles', methods=['POST'])
def add_vehicle(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)
    new_vehicle = Vehicle(
        make=data['make'], 
        model=data['model'], 
        year=data['year'], 
        license_plate=data['license_plate'],
        owner=user
    )
    db.session.add(new_vehicle)
    db.session.commit()

    response_body = {
        'message': 'Vehicle added successfully!'
    }
    return make_response(json.dumps(response_body), 201)

@app.route('/users/<int:user_id>/vehicles/<int:vehicle_id>', methods=['PATCH'])
def update_vehicle(user_id, vehicle_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)
    vehicle = Vehicle.query.get_or_404(vehicle_id)

    # Check if the vehicle belongs to the user
    if vehicle.owner != user:
        return make_response(json.dumps({'message': 'Vehicle not found for this user'}), 404)

    # Update the vehicle's attributes if they are provided
    if 'make' in data:
        vehicle.make = data['make']
    if 'model' in data:
        vehicle.model = data['model']
    if 'year' in data:
        vehicle.year = data['year']
    if 'license_plate' in data:
        vehicle.license_plate = data['license_plate']

    db.session.commit()

    response_body = {
        'message': 'Vehicle updated successfully!',
        'vehicle': {
            'make': vehicle.make,
            'model': vehicle.model,
            'year': vehicle.year,
            'license_plate': vehicle.license_plate,
            'owner': user.id  # Include the owner's ID for reference
        }
    }
    return make_response(json.dumps(response_body), 200)


@app.route('/users/<int:user_id>/vehicles', methods=['GET'])
def get_user_vehicles(user_id):
    user = User.query.get_or_404(user_id)
    vehicles = Vehicle.query.filter_by(user_id=user.id).all()
    vehicle_data = [{'id': v.id, 'make': v.make, 'model': v.model, 'year': v.year} for v in vehicles]

    return make_response(json.dumps(vehicle_data), 200)

# Schedule Service Appointment
@app.route('/appointments', methods=['POST'])
def schedule_appointment():
    data = request.get_json()
    user_id = data['user_id']
    vehicle_id = data['vehicle_id']
    service_date = datetime.strptime(data['service_date'], "%Y-%m-%d %H:%M:%S")
    status = 'scheduled'

    # Check user and vehicle exist
    user = User.query.get(user_id)
    if user is None:
        response_body = {"error": f"User with ID {user_id} does not exist."}
        return make_response(json.dumps(response_body), 404)
        
    vehicle = Vehicle.query.get(vehicle_id)
    if vehicle is None:
        response_body = {"error": f"Vehicle with ID {vehicle_id} does not exist."}
        return make_response(json.dumps(response_body), 404)

    new_appointment = Appointment(user=user, vehicle=vehicle, service_date=service_date, status=status)
    
    try:
        db.session.add(new_appointment)
        db.session.commit()
    except:
        db.session.rollback()
        response_body = {"error": "Could not schedule appointment. Please check the details."}
        return make_response(json.dumps(response_body), 500)

    response_body = {
        'message': 'Appointment scheduled successfully!'
    }
    return make_response(json.dumps(response_body), 201)

# View List of Services Offered by the Garage
@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    service_data = [{'id': s.id, 'service_name': s.service_name, 'description': s.description, 'price': str(s.price)} for s in services]
    
    return make_response(json.dumps(service_data), 200)

# Garage Owner: Manage Services
@app.route('/services', methods=['POST'])
def add_service():
    data = request.get_json()
    new_service = Service(
        service_name=data['service_name'], 
        description=data['description'], 
        price=data['price']
    )
    db.session.add(new_service)
    db.session.commit()

    response_body = {
        'message': 'Service added successfully!'
    }
    return make_response(json.dumps(response_body), 201)


@app.route('/services/<int:service_id>', methods=['PATCH'])
def update_service(service_id):
    service = Service.query.get_or_404(service_id)
    data = request.get_json()

    service.service_name = data.get('service_name', service.service_name)
    service.description = data.get('description', service.description)
    service.price = data.get('price', service.price)

    db.session.commit()

    response_body = {
        'message': 'Service updated successfully!'
    }
    return make_response(json.dumps(response_body), 200)


@app.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get_or_404(service_id)
    db.session.delete(service)
    db.session.commit()

    response_body = {
        'message': 'Service deleted successfully!'
    }
    return make_response(json.dumps(response_body), 200)

# Garage Owner: View Customer Requests
@app.route('/appointments', methods=['GET'])
def view_appointments():
    appointments = Appointment.query.all()
    response_body = [a.to_dict() for a in appointments]
    return make_response(json.dumps(response_body), 200)

@app.route('/appointments/<int:appointment_id>', methods=['PATCH'])
def mark_appointment_complete(appointment_id):
    # Fetch the appointment by ID
    appointment = Appointment.query.get_or_404(appointment_id)

    # Update the status
    appointment.status = 'complete'

    # Commit the changes to the database
    db.session.commit()

    response_body = {
        'message': f'Appointment {appointment_id} marked as complete!'
    }
    return make_response(json.dumps(response_body), 200)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
