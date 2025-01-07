
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dictionary to store users and their PINs
user_pins = {
    "ADMIN": "1234",
    "Mafalda": "0000",
    "João": "1111"
}

# Route for the login page
@app.route('/')
def index():
    print("Hello Flask")  # Log the data to the server console
    return render_template('login.html')

# Route to verify PIN
@app.route('/verify-pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    user = data.get('user')
    pin = data.get('pin')

    # Check if the user exists and the PIN matches
    if user in user_pins and user_pins[user] == pin:
        # Redirect to the form page with the username as a parameter
        return jsonify({
            "success": True,
            "redirect_url": url_for('form_page', user=user)
        })
    else:
        # Return an error message in JSON if authentication fails
        return jsonify({
            "success": False,
            "message": "Unsuccessful! Invalid user or PIN."
        }), 401

# Route for the form page
@app.route('/form')
def form_page():
    user = request.args.get('user', 'Guest')  # Get the username from query parameters
    return render_template('form.html', user=user)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    # Extract form data
    form_data = request.form.to_dict()
    print("Form Data Received:", form_data)  # Log the data to the server console

    # Example: Save data to a database or perform other actions here

    # Respond with a success message
    # return jsonify({
    #     "success": True,
    #     "message": "Form data submitted successfully!",
    #     "received_data": form_data
    # })
    # Redirect to a success page
    return redirect(url_for('success'))

@app.route('/success')
def success():
    return render_template('form_success.html')  # Create a success.html template

# Expose the `app` object for Vercel
#app = app

if __name__ == '__main__':
     app.run(debug=True)
#     # app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)
