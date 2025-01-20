import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context";
import GuestView from "../src/views/GuestView.jsx"
import HomeView from "../src/views/HomeView.jsx"
import SettingsView from "../src/views/SettingsView.jsx"
import LoginView from "../src/views/LoginView.jsx"
import RegisterView from "../src/views/RegisterView.jsx"
import AllMoviesView from "../src/views/AllMoviesView.jsx"
import CartView from "../src/views/CartView.jsx"
import SingleMovieView from "../src/views/SingleMovieView.jsx"
import DefaultMovieView from "../src/views/DefaultMovieView.jsx"
import ErrorView from "../src/views/ErrorView.jsx"
import ProtectedRoutes from "./util/ProtectedRoutes.jsx";

function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GuestView/>} />
                    <Route path="/login" element={<LoginView/>} />
                    <Route path="/register" element={<RegisterView/>} />
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/home" element={<HomeView/>} />
                        <Route path="/movies" element={<DefaultMovieView/>}>
                            <Route path="all" element={<AllMoviesView/>}/>
                            <Route path=":id" element={<SingleMovieView/>}/>
                        </Route>
                        <Route path="/cart" element={<CartView/>}/>
                        <Route path="/settings" element={<SettingsView/>} />
                    </Route>
                    <Route path={"*"} element={<ErrorView/>}/>
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App
