import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PropsLabel extends ComponentProps<"label"> {

    children: ReactNode,    

}

export function Label (props: PropsLabel) {

    return (

        <label {...props} className={twMerge("", props.className)}>{props.children}</label>

    )

}