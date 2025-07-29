import json
import random

# Lendo o arquivo json dos citrus
with open("citrus.json", "r", encoding="utf-8") as file : 
    citrus_data = json.load(file)

# Lendo o arquivo json das plantas
with open("plants.json", "r", encoding="utf-8") as file : 
    plants_data = json.load(file)

# Função para achar o citrus 
def SearchCitrus(citrusName) :

    for aux in citrus_data :

        if aux["name"] == citrusName :

            return aux

# Função para saber se o gene já existe naquele indivíduo
def IsEqual(individual, gene) :

    isEqual = False

    for aux in range(0, 2) :

        if individual[aux]["name"] == gene["name"] :

            isEqual = True
            break

    return isEqual

# Função para saber se algum gene se repete no indivíduo
def Repeat (individual) :

    if individual[0]["name"] == individual[1]["name"] :

        return True
    
    elif individual[0]["name"] == individual[2]["name"] :

        return True
    
    elif individual[1]["name"] == individual[2]["name"] :

        return True
    
    else :

        return False

# Função para gerar a população inicial
def GenerateIndividual(selectedPlant) :

    solution = []
    ids = list(range(0, len(plants_data)))
    aux1 = 0

    while(aux1 < 3) :

        aux2 = random.choice(ids)
        ids.remove(aux2)

        if plants_data[aux2]["name"] != selectedPlant :

            solution.append(plants_data[aux2])

            aux1 += 1

    return solution

# Função para calcular a aptidão de cada indivíduo
def Fitness(individual, input) :

    fitnessValue = 20

    citrus = SearchCitrus(input[0])

    if Repeat(individual) :

        fitnessValue -= 2

    for aux in individual :

        if input[1] != aux["improves_soil"] :

            fitnessValue -= 1

        if input[2] != aux["cycle"] :

            fitnessValue -= 1

        if aux["name"] not in citrus["compatible_plants"] :

            fitnessValue -= 2

        if aux["name"] in citrus["incompatible_plants"] :

            fitnessValue -= 2

    return [individual, fitnessValue]

# Função para selecionar os indivíduos para a reprodução com base em sua aptidão/fitness
# Usando o método de seleção por torneios
def Selection(population) :

    selecteds = []

    for _ in range(len(population)) :

        clash = random.sample(population, 2)
        winner = max(clash, key = lambda aux : aux[1])
        selecteds.append(winner)

    return selecteds

# Função para combinar os pais e gerar dois novos filhos
def Crossover(parents) :

    children = []
    ids = list(range(0, len(parents)))

    while ids :

        cut = random.randint(0, 2)

        aux1 = random.choice(ids)
        ids.remove(aux1)

        aux2 = random.choice(ids)
        ids.remove(aux2)
        
        parent1 = parents[aux1][0]
        parent2 = parents[aux2][0]

        son1 = []
        son2 = []

        aux3 = 0
        while aux3 < 3 :
            
            if aux3 <= cut :

                son1.append(parent1[aux3])
                son2.append(parent2[aux3])
            
            else :

                son1.append(parent2[aux3])
                son2.append(parent1[aux3])

            aux3 += 1

        children.append(son1)
        children.append(son2)

    return children

# Função para criar mutações aleatórias 
def Mutation(children, mutationRate, initialPopulation) : 

    mutatedChildren = []

    for son in children :

        for aux in range(0, 2) :

            if random.random() < mutationRate :
                chosen = random.choice(initialPopulation)
                gene = random.choice(chosen)

                while IsEqual(son, gene) == True :
                    chosen = random.choice(initialPopulation)
                    gene = random.choice(chosen)

                son[aux] = gene
        
        mutatedChildren.append(son)

    return mutatedChildren

# Função para ver se os Fitnesses estão estagnados
def Stagnated(bestsFitnesses) :

    if len(bestsFitnesses) >= 3 :

        fitness = list(bestsFitnesses)

        aux1 = fitness.pop()
        aux2 = fitness.pop()
        aux3 = fitness.pop()

        return (True if aux1 == aux3 else False) if aux1 == aux2 else False
    
    else :

        return False

# Função que executa o algoritmo genético
def GeneticAlgorithm(userInput) :

    numberGenerations = 100
    populationSize = 10
    initialPopulation = []
    mutationRate = 0.1
    bestIndividual = [[], 0]
    bestsFitnesses = []

    for _ in range(0, populationSize) :

       initialPopulation.append(GenerateIndividual(userInput[0]))
       
    population = initialPopulation

    counter = 0
    while counter < numberGenerations and bestIndividual[1] < 18 : 

        fitnessIndividuals = []

        for aux1 in population :

           fitnessIndividuals.append(Fitness(aux1, userInput))

        selecteds = Selection(fitnessIndividuals)

        children = Crossover(selecteds)

        population = Mutation(children, mutationRate, initialPopulation)

        bestIndividual = max(fitnessIndividuals, key = lambda aux2 : aux2[1])
        bestsFitnesses.append(bestIndividual[1])

        counter += 1

    print("Escalada do fitness -->")
    print(bestsFitnesses)

    print("\n")
    print("Melhor indivíduo -->")
    print(bestIndividual)
    print("\n")

    print(bestIndividual[0])

    return bestIndividual[0]

# Função para retornar os citrus
def ShowCitrus() :

    return citrus_data