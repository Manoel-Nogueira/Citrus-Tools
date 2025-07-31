import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./label";
import { Link } from "react-router-dom";

interface PropsCard extends ComponentProps<"div"> {

    children: ReactNode,
    title: string,
    icon: string,
    link: string,

}

export function Card (props: PropsCard) {

    return (

        <Link to={props.link}>
        
            <div {...props} className={twMerge("bg-[#FFFFFF] p-4 h-[18rem] rounded-xl shadow-lg shadow-slate-400 hover:scale-101 hover:bg-[#F6F6F6] hover:shadow-xl", props.className)}>

                <div className="flex flex-col w-[12rem] items-center justify-center">

                    <div>
                        <img src={props.icon} alt="icon" className="h-32 w-32" />
                    </div>

                    <div>
                        <Label className="text-slate-800 text-[2rem] font-poppins font-semibold">{props.title}</Label>
                    </div>

                    <div className="mt-3">
                        <pre className="text-slate-500 text-[0.9rem] text-wrap text-center font-poppins font-normal">{props.children}</pre>
                    </div>

                </div>

            </div>
        
        </Link>


    )

}