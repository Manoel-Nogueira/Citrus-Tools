import { useEffect, useState, type ComponentProps } from "react";
import { Label } from "./label";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Api from "../service/api";

type detailedIngredientType = {

    "ingrediente_ativo": string,
    "grupo_quimico": string,
    "concentracao": string,
    "unidade_medida": string,
    "percentual": string,


}

type indicationUseType = {

    "cultura": string,
    "praga_nome_cientifico": string,
    "praga_nome_comum": string[],


} 

type pesticidesType = {

    "numero_registro": string,
    "marca_comercial": string[],
    "titular_registro": string,
    "produto_biologico": boolean,
    "classe_categoria_agronomica": string[],
    "formulacao": string,
    "ingrediente_ativo": string[],
    "ingrediente_ativo_detalhado": detailedIngredientType[],
    "modo_acao": string[],
    "tecnica_aplicacao": string[],
    "indicacao_uso": indicationUseType[],
    "classificacao_toxicologica": string,
    "classificacao_ambiental": string,
    "inflamavel": boolean,
    "corrosivo": boolean,
    "produto_agricultura_organica": boolean,
    "url_agrofit": string,

}

interface PropsIllnesses extends ComponentProps<"div"> {

    children: string,
    scientific_name: string,
    description: string,

}

export function Illnesses (props: PropsIllnesses) {

    const [collapsed, setCollapsed] = useState(false)

    const [pesticides, setPesticides] = useState<pesticidesType[]>([])

    useEffect(() => {

        const getPesticides = async () => {

            Api.post("/pesticide", {"scientific_name": props.scientific_name})
            .then(function (response) {

                console.log(response)
                setPesticides(response.data)
                
            })
            .catch(function (error) {

                console.error(error)

            })

        }

        getPesticides()

    }, [props.scientific_name])

    return (

        <div className="w-[50rem] bg-[#F1F1F1] shadow-lg shadow-slate-400 p-4 rounded-xl">

            <div className="flex">

                <div>
                    <img src={"images/illnesses/"+props.children+".png"} alt={props.children} className="h-[15rem] w-[25rem] rounded-xl object-fill"/>
                </div>

                <div className="ml-5 mt-5 w-[25rem]">

                    <div className="flex gap-1">

                        <div>
                            <Label className="text-slate-800 text-[1.2rem] font-poppins font-medium">{props.children}</Label>
                        </div>

                        <div>
                            <Label className="inline-block align-baseline text-slate-600 text-[0.75rem]  font-poppins font-medium">({props.scientific_name})</Label>
                        </div>

                    </div>

                    <div className="mt-2">

                        <div>
                            <Label className="text-slate-600 text-[1rem] font-poppins font-medium">Descrição: </Label>
                        </div>

                        <div className="mt-1 px-[0.5rem] flex">
                            <pre className=" text-slate-600 text-[0.9rem] text-wrap font-poppins font-normal">{props.description}</pre>
                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4">

                <div className="items-center cursor-pointer inline-flex" onClick={() => setCollapsed(!collapsed)}>

                    <div className="text-left">
                        <Label className="text-slate-800 text-[1.1rem] font-poppins font-medium cursor-pointer">Produtos Indicados</Label>
                    </div>

                    <div>
                        <MdOutlineKeyboardArrowUp className={twMerge("text-slate-800 text-4xl", `${collapsed ? "-rotate-180" : ""}`)}/>
                    </div>

                </div>


                {collapsed && pesticides &&

                    <div className="flex flex-col gap-2">
                        
                        {pesticides.map(pesticide => (

                            <div key={pesticide.numero_registro} className="m-2 p-4 bg-[#E3E3E3] shadow-md shadow-slate-400 rounded-lg"> 

                                <div className="text-left">
                                    <Label className="text-slate-800 text-[1.1rem] font-poppins font-medium">{pesticide.marca_comercial}</Label>
                                </div>

                                <div className="ml-2 mt-3 flex flex-col gap-1">

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Classe: <div className="text-slate-800 font-bold">{pesticide.classe_categoria_agronomica.join(", ")}</div></Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Técnica de aplicação: <div className="text-slate-800 font-bold">{pesticide.tecnica_aplicacao.join(", ")}</div></Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Produto biológico: {pesticide.produto_biologico ? <div className="text-slate-800 font-bold">Sim</div> : <div className="text-slate-800 font-bold">Não</div>}</Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Produto para agricultura orgânica: {pesticide.produto_agricultura_organica ? <div className="text-slate-800 font-bold">Sim</div> : <div className="text-slate-800 font-bold">Não</div>}</Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Produto inflamável: {pesticide.inflamavel ? <div className="text-slate-800 font-bold">Sim</div> : <div className="text-slate-800 font-bold">Não</div>}</Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Produto corrosivo: {pesticide.corrosivo ? <div className="text-slate-800 font-bold">Sim</div> : <div className="text-slate-800 font-bold">Não</div>}</Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Classificação toxicológica: <div className="text-slate-800 font-bold">{pesticide.classificacao_toxicologica}</div></Label>
                                    </div>

                                    <div className="text-left">
                                        <Label className="flex gap-1 text-slate-700 text-[0.8rem] font-poppins font-medium">Classificação ambiental: <div className="text-slate-800 font-bold">{pesticide.classificacao_ambiental}</div></Label>
                                    </div>

                                    


                                </div>

                            </div>


                        ))}

                    </div>

                }

                {collapsed && pesticides.length == 0 &&

                    <div className="text-center m-2">
                        <Label className="text-slate-700 text-[1.1rem] font-poppins font-medium">Na base de dados não tem nenhum produto indicado para essa doença.</Label>
                    </div>

                }

            </div>
            
        </div>

    )

}