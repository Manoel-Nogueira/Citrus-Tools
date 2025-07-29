import json

# Lendo o arquivo json dos citrus
with open("pesticides_citrus.json", "r", encoding="utf-8") as file : 
    pesticides_citrus = json.load(file)

def PesticidesRecommendation (input) :

    pesticides = []

    for pesticide in pesticides_citrus :

        if pesticide["indicacao_uso"][0]["praga_nome_cientifico"] == input :

            pesticides.append(pesticide)

    return pesticides
