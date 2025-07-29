import json
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder

# Lendo o arquivo json dos sintomas
with open("symptoms.json", "r", encoding="utf-8") as file : 
    symptoms = json.load(file)

# Lendo o arquivo json das doenças
with open("illnesses.json", "r", encoding="utf-8") as file : 
    illnesses = json.load(file)

# Função para normalizar os sintomas
def Normalization (class_symptoms) :

    normalizedAttributes = []

    for aux1 in symptoms :

            if aux1 in class_symptoms :

                normalizedAttributes.append(1)

            else :

                normalizedAttributes.append(0)

    return normalizedAttributes

# Função para executar o algoritmo Naive Bayes
def NaiveBayes (userInput) :

    # Classe de doenças
    classes = []

    # Atributos de uma classe no caso os sintomas
    attributes = []

    count = 0
    for aux1 in illnesses :

        classes.append(count)

        attributes.append(Normalization(aux1["symptoms_disease"]))

        count += 1

    le = LabelEncoder()
    classesEncoded = le.fit_transform(classes)
    
    model = MultinomialNB()
    model.fit(attributes, classesEncoded)
    
    input_normalized = [Normalization(userInput)]

    prediction = model.predict(input_normalized)
    predicted_disease = le.inverse_transform(prediction)[0]

    print("\n")   
    print(illnesses[predicted_disease])

    return illnesses[predicted_disease]

# Função para retornar os symptoms
def ShowSymptoms() :

    return symptoms