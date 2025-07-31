import { Card } from "../components/card";
import { Navbar } from "../components/nav_bar";
import CidirsyIcon from "../assets/images/icons/cidirsy_icon.png";
import SyrplanticiIcon from "../assets/images/icons/syrplantici_icon.png"

/*  Colors:
*   
*   #FFFFFF 
*   #F6F6F6 
*   #F1F1F1
*   #E3E3E3
*   #33984b
*   #F5D184
* 
*/ 

export function Home () {

    return (

        <div className="h-screen w-full bg-[#F1F1F1] flex justify-center">

            <header className="shadow-md shadow-slate-400 fixed w-full">
                <Navbar/>
            </header>

            <main>

                <div className="my-[15rem] mx-[15rem] grid grid-cols-2 gap-10">

                    <div>
                        <Card title="Cidirsy" icon={CidirsyIcon} link="/cidirsy"><p>Sistema para recomendar doenças dos citrus.</p></Card>
                    </div>

                    <div>
                        <Card title="Syrplantici" icon={SyrplanticiIcon} link="/syrplantici"><p>Sistema para recomendar consórcio de plantas para os citros.</p></Card>
                    </div>

                </div>
                
            </main>

        </div>

    )

}