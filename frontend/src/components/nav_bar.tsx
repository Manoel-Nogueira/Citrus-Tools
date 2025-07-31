import { Link } from "react-router-dom";
import Logo from "../assets/images/icons/citrus_tools_icon.svg";
import { Label } from "./label";

//text-shadow-md text-shadow-slate-700

export function Navbar () {
    
    return (

        <div className="h-24 w-full flex items-center justify-center bg-linear-to-t from-[#266F37] to-[#33984b] ">

            <Link to={"/"}>
            
                <div className="flex items-center ">

                    <div className="mr-1 pb-1">
                        <img src={Logo} alt="logo" className="h-[4.8rem] w-[4.8rem]"/>
                    </div>

                    <div className="bg-gradient-to-t from-[#F27B13] via-[#F2A30F] to-[#F2B90C] text-transparent bg-clip-text">
                        <Label className=" text-[5rem] font-bahiana font-semibold uppercase cursor-pointer">Citrus Tools</Label>
                    </div>

                </div>

            </Link>

        </div>


    )

}