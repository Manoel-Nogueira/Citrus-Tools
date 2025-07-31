import type { ComponentProps } from "react";
import { Label } from "./label";

interface PropsPlants extends ComponentProps<"div"> {

    children: string,
    
}

export function Plants (props: PropsPlants) {

    return (

        <div className="bg-[#F1F1F1] shadow-lg shadow-slate-400 p-2 rounded-xl">
            <Label className="text-slate-600 text-[1.4rem] font-poppins">{props.children}</Label>
        </div>

    )

}