import { Route, Routes } from "react-router-dom"
import { Pages }  from "./src/index"

export function Router () {

    return (

        <Routes>
            <Route path="/" element={<Pages.Home/>}/>
            <Route path="/cidirsy" element={<Pages.Cidirsy/>}/>
            <Route path="/syrplantici" element={<Pages.Syrplantici/>}/>
        </Routes>

    )

}