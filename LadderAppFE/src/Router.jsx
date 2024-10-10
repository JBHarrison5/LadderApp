import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import AddMatchPage from "./pages/AddMatchPage"
import FullTablePage from "./pages/FullTablePage"
import { RanksProvider } from "./context/RanksContext"
import { UserProvider } from "./context/UserContext"

const Router = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <RanksProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route path="/" element={<LandingPage />}/>
                        <Route path="/table" element={<FullTablePage />}/>
                        <Route path="/home" element={<HomePage />}/>
                        <Route path="/add_match" element={<AddMatchPage />}/>
                    </Routes>
                </RanksProvider>
            </UserProvider>
        </BrowserRouter>
    )
}

export default Router