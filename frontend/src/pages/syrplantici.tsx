import { Navbar } from "../components/nav_bar";
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import SyrplanticiIcon from "../assets/images/icons/syrplantici_icon.png"
import { Label } from "../components/label";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Plants } from "../components/plants";
import { twMerge } from "tailwind-merge";
import Api from "../service/api";
import { Information } from "../components/information";

// ['Laranja-pera', True, 'curto']

type consultation = [string | null, boolean | null, string | null]

type plantType = {

    "name": string, 
    "improves_soil": boolean, 
    "cycle": string,

}

type citrusType = {

    "name": string,
    "compatible_plants": string[],
    "incompatible_plants": string[],

}

export function Syrplantici () {

    const [selectedOptions, setSelectedOptions] = useState<consultation>([null, null, null])
    const [sent, setSent] = useState<boolean>(false)
    const [citrus, setCitrus] = useState<citrusType[]>([]) 
    const [consortium, setConsortium] = useState<plantType[]>([]) 
    
    const handleChange = (index: number, selectedOption: string | boolean | null) => {
        
        const aux = [...selectedOptions] as consultation
        aux[index] = selectedOption
        
        setSelectedOptions(aux)
        
    }

    const consultConsortium = () => {

        Api.post("/consortium", selectedOptions)
        .then(function (response) {

            console.log(response)
            setConsortium(response.data)
            setSent(true)
            console.log("--->", consortium)

        })
        .catch(function (error) {

            console.error(error)

        })
        
    }

    console.log(selectedOptions)

    useEffect(() => {

        const getCitrus = async () => {

            Api.get("/list_citrus")
            .then(function (response) {

                console.log(response)
                setCitrus(response.data)

            })
            .catch(function (response) {

                console.log(response)

            })

        }

        getCitrus()

    }, [])

    return (

        <div className="h-screen w-full bg-[#F1F1F1] flex justify-center">

            <header className="shadow-md shadow-slate-400 fixed w-full">
                <Navbar/>
            </header>

            <main className="mt-[10rem] mb-[4rem] flex items-center justify-items-center">

                <div className="p-12 bg-[#FFFFFF] rounded-xl  shadow-xl shadow-slate-400">

                    <div className="flex justify-center items-center mb-10 ">

                        <div className="mr-2">
                            <img src={SyrplanticiIcon} alt="logo" className="h-[5.2rem] w-[5.2rem]"/>
                        </div>

                        <div className="bg-gradient-to-t from-[#F27B13] via-[#F2A30F] to-[#F2B90C] text-transparent bg-clip-text">
                            <Label className="text-[4rem] font-bakbak">Syrplantici</Label>
                        </div>

                    </div>

                    <div className="w-[40rem]">

                        <Autocomplete options={citrus} getOptionLabel={(option => option.name)} 
                            onChange={(_, selected) => handleChange(0, selected ? selected.name : null)}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Cultura principal" placeholder="Escolha a Cultura Principal"/>}
                        />

                    </div>

                    <div className="px-[1.25rem] mt-[2rem] flex flex-col items-center gap-2">

                        <div>
                            <FormControl className="flex items-center gap-2">

                                <FormLabel>

                                    <div className="flex justify-center items-center gap-1 text-slate-700 ">

                                        <div>
                                            <Label className="text-[1.3rem] font-bakbak">Melhorar o solo</Label>
                                        </div>

                                        <div className="">
                                            <Information className="text-[1.5rem] text-[#F5D184] hover:text-[#FFDA8A]">Quer que o consórcio melhore o solo?</Information>
                                        </div>

                                    </div>
                        
                                </FormLabel>

                                <RadioGroup onChange={(e) => handleChange(1, e.target.value)}>

                                    <FormControlLabel value="True" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="False" control={<Radio />} label="Não" />

                                </RadioGroup>

                            </FormControl>
                        </div>

                        <div>
                            <FormControl className="flex items-center gap-2">

                                <FormLabel>

                                    <div className="flex justify-center items-center gap-1 text-slate-700 ">

                                        <div>
                                            <Label className="text-[1.3rem] font-bakbak">Qual é o ciclo</Label>
                                        </div>

                                        <div className="">
                                            <Information className="text-[1.5rem] text-[#F5D184] hover:text-[#FFDA8A]">Qual vai ser o ciclo do consórcio?</Information>
                                        </div>

                                    </div>
                        
                                </FormLabel>

                                <RadioGroup onChange={(e) => handleChange(2, e.target.value)} className="flex justify-center items-center">

                                    <FormControlLabel sx={{marginRight: 1}} value="curto" control={<Radio/>} label="Curto"/>
                                    <FormControlLabel sx={{marginRight: 0}} value="médio" control={<Radio/>} label="Médio"/>
                                    <FormControlLabel sx={{marginRight: 0}} value="longo" control={<Radio/>} label="Longo"/>

                                </RadioGroup>

                            </FormControl>
                        </div>

                    </div>

                    <div className="mt-5 flex justify-center">
                        <Button onClick={consultConsortium} type="submit" disabled={(selectedOptions[0] == null || selectedOptions[1] == null || selectedOptions[2] == null)} className={twMerge("bg-[#16824A] not-disabled:hover:bg-[#0F5832] not-disabled:active:bg-[#16824A] text-[#FFFFFF] disabled:opacity-50 items-center font-bold uppercase cursor-pointer", (selectedOptions[0] == null || selectedOptions[1] == null || selectedOptions[2] == null) && "cursor-not-allowed")}>Enviar</Button>
                    </div>

                    <div>

                        {sent &&

                            <div>

                                <div className="text-center mt-6">
                                    <Label className="text-slate-600 text-[1.4rem] font-poppins">Plantas:</Label>
                                </div>

                                <div className="flex justify-center gap-4">

                                    {consortium.map(plant => (

                                        <div key={plant.name} className="text-center mt-4">
                                            <Plants>{plant.name}</Plants>
                                        </div>

                                    ))}

                                </div>

                            </div>

                        }

                    </div>

                </div>

            </main>

        </div>

    )

}