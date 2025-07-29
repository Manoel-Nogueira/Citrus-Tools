import ag_syrplantici
import nb_cidirsy
import rc_pesticide
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Endpoint to return all symptoms
@app.route("/list_symptoms", methods=["GET"])
def ListAllSymptoms() :

    return jsonify(nb_cidirsy.ShowSymptoms()) 
    
# Endpoint to return the disease based on symptoms
@app.route("/disease", methods=["POST"])
def ConsultDiseases() :

    data = request.get_json()
    symptoms = list(data) 

    try :
    
        diseases = nb_cidirsy.NaiveBayes(symptoms) 

        return jsonify(diseases) 
    
    except Exception as e :

        return jsonify(str(e))  
    
# Endpoint to return the plant consortium
@app.route("/consortium", methods=["POST"])
def ConsultConsortium() :

    data = request.get_json()

    try :

        consortia = ag_syrplantici.GeneticAlgorithm(data)

        return jsonify(consortia)

    except Exception as e : 

        return jsonify(str(e))

# Endpoint to list all citrus fruits
@app.route("/list_citrus", methods=["GET"])
def ListAllCitrus() :

    return jsonify(ag_syrplantici.ShowCitrus()) 

# Endpoint to return a pesticide recommendation
@app.route("/pesticide", methods=["POST"])
def PesticidesRecommendation () :

    data = request.get_json()

    print("\n")
    print("d -->>", data)

    try :

        pesticides =  rc_pesticide.PesticidesRecommendation(data["scientific_name"])

        return jsonify(pesticides)

    except Exception as e : 

        return jsonify(str(e))




if __name__ == "__main__" :

    app.run(debug=True)
