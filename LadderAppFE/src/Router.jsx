import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import NotFound from "./pages/NotFound"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import AddMatchPage from "./pages/AddMatchPage"
import FullTablePage from "./pages/FullTablePage"
import { RanksProvider } from "./context/RanksContext"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/profile" element={<ProfilePage />}/>
                <Route path="/table" element={<FullTablePage />}/>
            </Routes>
            <RanksProvider>
                <Routes>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/add_match" element={<AddMatchPage />}/>
                </Routes>
            </RanksProvider>
        </BrowserRouter>
    )
}

export default Router