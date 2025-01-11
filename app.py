
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import os

app = Flask(__name__)
CORS(app)

# # Load environment variables from .env file
load_dotenv()

# Replace with your Neon connection details
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Dictionary to store users and their PINs
class tuser(db.Model):
    __tablename__ = 'tuser'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    pin = db.Column(db.String, nullable=False)

class FinancialRecord(db.Model):
    __tablename__ = 'financial_records'

    id = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.Float, nullable=False)
    data = db.Column(db.Date, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    sub_categoria = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    classe_financeira = db.Column(db.String(100), nullable=False)
    observacoes = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Dictionary to store users and their PINs
user_pins = {
    "ADMIN": "1234",
    "Mafalda": "0000",
    "João": "1111"
}

MAPPING = {
    "Automovel": ("Aquisição de ativos", "Aquisição de Activos"),
    "Prestação Serviços": ("Prestador de serviço", "Prestação Serviços"),
    "Formação": ("Cursos e formações", "Despesa Var"),
    "Consultoria": ("Consultoria", "Consultoria"),
    "Software e Ordem": ("Licenças", "Despesa Fixa"),
    "Vencimentos": ("Vencimentos", "Despesa Fixa"),
    "Via verde": ("Transportes", "Despesa Var"),
    "Papelaria / Gráfica": ("Papelaria e comunicações", "Despesa Fixa"),
    "Telefone e Internet": ("Papelaria e comunicações", "Despesa Fixa"),
    "Softwares e Ordem": ("Licenças", "Despesa Fixa"),
    "Transportes": ("Transportes", "Despesa Var"),
    "IVA": ("Impostos", "Taxas e Impostos"),
    "Segurança Social": ("Impostos", "Taxas e Impostos"),
    "Contabilidade": ("Contabilidade", "Despesa Fixa"),
    "IRC": ("Impostos", "Taxas e Impostos"),
    "Combustivel": ("Transportes", "Despesa Var"),
    "Fotografia e Video": ("Produção de conteúdo", "Marketing"),
    "Gestor de trafego": ("Tráfego pago", "Marketing"),
    "Wordpress": ("Taxas", "Taxas e Impostos"),
    "Seguros": ("Seguros", "Taxas e Impostos"),
    "Meta": ("Tráfego pago", "Marketing"),
    "Google": ("Tráfego pago", "Marketing"),
    "Tiktok": ("Tráfego pago", "Marketing"),
    "Podcast": ("Produção de conteúdo", "Marketing"),
    "Formações/workshops": ("Eventos", "Eventos"),
    "Restaurantes/compras": ("Alimentação", "Despesa Var"),
    "Outras Despesas": ("Outras despesas", "Despesa Var"),
    "SAL": ("Infoproduto", "Infoprodutos"),
    "MARÉ": ("Infoproduto", "Infoprodutos"),
    "COSTA": ("Infoproduto", "Infoprodutos"),
    "DUNA": ("Infoproduto", "Infoprodutos"),
    "CRU": ("Infoproduto", "Infoprodutos"),
    "Consultas online": ("Consultas", "Consultas"),
    "Consultas Ousia": ("Consultas", "Consultas"),
    "Consultas ING": ("Consultas", "Consultas"),
    "Campanhas Marcas/Empresas": ("Produção de conteúdo", "Marketing"),
}


# Route for the login page
@app.route('/')
def index():
    print("Hello Flask")  # Log the data to the server console
    # users = tuser.query.all()
    # for user in users:
    #     print(f"Username: {user.username}, PIN: {user.pin}")
    return render_template('login.html')

# Route to verify PIN
@app.route('/verify-pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    username = data.get('user')
    pin = data.get('pin')

    # Query the database to check if the user and pin match
    user = tuser.query.filter_by(username=username, pin=pin).first()

    # Check if the user exists and the PIN matches
    # if user in user_pins and user_pins[user] == pin:
    if user:
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
    valor = float(form_data.get('valor'))
    data = form_data.get('data')
    tipo = form_data.get('tipo')
    sub_categoria = form_data.get('subCategoria')
    observacoes = form_data.get('observacoes')

    # Derive categoria and classe_financeira from the mapping
    categoria, classe_financeira = MAPPING.get(sub_categoria, ("Unknown", "Unknown"))

    # Create a new FinancialRecord instance
    new_record = FinancialRecord(
        valor=valor,
        data=data,
        tipo=tipo,
        sub_categoria=sub_categoria,
        categoria=categoria,
        classe_financeira=classe_financeira,
        observacoes=observacoes
    )

    try:
        # Add the record to the session and commit
        db.session.add(new_record)
        db.session.commit()
        # return "Form submitted successfully!"
        # return redirect(url_for('success'))
    except Exception as e:
        # Rollback in case of an error
        db.session.rollback()
        return f"An error occurred: {e}"

    # Respond with a success message
    return jsonify({
        "success": True,
        "message": "Form data submitted successfully!",
        "received_data": form_data,
        "redirect_url": url_for('success')
    })
    # Redirect to a success page
    # return redirect(url_for('success'))

@app.route('/success')
def success():
    return render_template('form_success.html')  # Create a success.html template

# Expose the `app` object for Vercel
#app = app

if __name__ == '__main__':
     app.run(debug=True)
#     # app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)
