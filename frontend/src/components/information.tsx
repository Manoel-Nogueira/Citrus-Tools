import type { ComponentProps } from "react";
import { RiInformation2Fill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from "@mui/material";

interface PropsInformation extends ComponentProps<"div"> {

    children: string

}

export function Information (props: PropsInformation) {

    return (

        <div>

            <Tooltip title={props.children} slots={{transition: Zoom}} arrow slotProps={{popper: {sx: {"& .MuiTooltip-tooltip": {fontSize: "0.9rem"}}}}}>

                    <RiInformation2Fill {...props} className={twMerge("", props.className)}/>

            </Tooltip>

            
        </div>

    )

}