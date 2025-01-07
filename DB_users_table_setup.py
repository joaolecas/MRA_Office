from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create Flask app
app = Flask(__name__)

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = app.config.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the Users table
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    pin = db.Column(db.String(10), nullable=False)

# Create the database and table
def create_table():
    with app.app_context():
        db.create_all()

# Prepopulate the database with user_pins data
def populate_table():
    user_pins = {
        "ADMIN": "1234",
        "Mafalda": "0000",
        "João": "1111"
    }

    with app.app_context():
        for name, pin in user_pins.items():
            # Check if the user already exists
            if not User.query.filter_by(name=name).first():
                new_user = User(name=name, pin=pin)
                db.session.add(new_user)
        db.session.commit()

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable or default to 5000
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'  # Use DEBUG environment variable or default to False
    create_table()
    populate_table()
    print("Database setup and populated with initial data!")
    app.run(host='0.0.0.0', port=port, debug=debug)