import { Label } from "../components/label";
import { Navbar } from "../components/nav_bar"
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "../components/button";
import CidirsyIcon from "../assets/images/icons/cidirsy_icon.png";
import { useEffect, useState } from "react";
import Api from "../service/api";
import { Illnesses } from "../components/illnesses";
import { twMerge } from "tailwind-merge";

/*  Colors:
*   
*   #FFFFFF  
*   #33984b
*   #fbd916
*   #1A4D26
*   #266F37
* 
*/ 

type symptomsType = {

    symptom_name: string,

}

type illnessesType = {

    name_disease: string,
    symptoms_disease: string[],
    scientific_name: string,
    description: string,

}

export function Cidirsy () {
    
    const [symptoms, setSymptoms ] = useState<symptomsType[]>([])
    const [selectedSymptoms, setSelectedSymptoms] = useState<symptomsType[]>([])
    const [illnesses, setIllnesses] = useState<illnessesType>()
    const [sent, setSent] = useState(false)
    
    const consultIllness = () => {
        
        Api.post("/disease", selectedSymptoms)
        .then(function (response) {
            
            console.log(response)
            setIllnesses(response.data)
            setSent(true)
            
        })
        .catch(function (error) {
            
            console.error(error)
            
        })
        
    }
    
    useEffect(() => {

        const getSymptoms = async () => {

            Api.get("/list_symptoms")
            .then(function(response) {

                console.log(response)
                setSymptoms(response.data)

            })
            .catch(function(error) {

                console.error(error)

            })

        }

        getSymptoms()

    }, [])

    return (

        <div className="min-h-screen w-full bg-[#F1F1F1] flex justify-center">

            <header className="shadow-md shadow-slate-400 fixed w-full z-10">
                <Navbar/>
            </header>

            <main className={twMerge("flex items-center justify-center", sent ? "mt-[10rem] mb-[4rem]" : "mx-[5rem]")}>

                <div className="p-12 bg-[#FFFFFF] rounded-xl shadow-xl shadow-slate-400">

                    <div className="flex justify-center items-center mb-10">

                        <div className="mr-2">
                            <img src={CidirsyIcon} alt="logo" className="h-[5.1rem] w-[5.1rem]"/>
                        </div>

                        <div className="bg-gradient-to-t from-[#F27B13] via-[#F2A30F] to-[#F2B90C] text-transparent bg-clip-text">
                            <Label className="text-[4.5rem] font-bakbak">Cidirsy</Label>
                        </div>

                    </div>

                    <div className="flex flex-col justify-center items-center">

                        <div className="w-[50rem]">
                            <Autocomplete multiple id="autocomplete" options={symptoms}
                                onChange={(_, selected) => {setSelectedSymptoms(selected)}}
                                renderInput={(params) => (<TextField {...params} variant="outlined" label="Sintomas do seu citrus" placeholder="Escolha um Sintoma"/>)}
                            />
                        </div>

                        {

                            <div className="mt-5">
                                <Button type="button" disabled={(selectedSymptoms.length <= 0)} onClick={consultIllness} className={twMerge("bg-[#16824A] not-disabled:hover:bg-[#0F5832] not-disabled:active:bg-[#16824A] text-[#FFFFFF] disabled:opacity-50 items-center font-bold uppercase cursor-pointer", (selectedSymptoms.length <= 0) && "cursor-not-allowed")}>Enviar</Button>
                            </div>

                        }

                    </div>

                    {sent && illnesses &&

                        <div className="flex flex-col items-center">

                            <div className="text-center mt-6">
                                <Label className="text-slate-600 text-[1.4rem] font-poppins font-medium">Doença:</Label>
                            </div>
   
                            <div className="mt-6 w-[50rem] flex flex-col justify-center items-center">
                                <Illnesses scientific_name={illnesses.scientific_name} description={illnesses?.description}>{illnesses?.name_disease}</Illnesses>
                            </div>

                        </div>

                    }

                </div>

            </main>
            
        </div>

    )

}