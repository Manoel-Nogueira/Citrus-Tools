import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";


interface PropsButton extends ComponentProps<"button"> {

    children: string | ReactNode,

}

export function Button (props: PropsButton) {

    return (

        <button {...props} className={twMerge("rounded-md p-2 font-medium flex items-center justify-center", props.className)}>{props.children}</button>

    )

}