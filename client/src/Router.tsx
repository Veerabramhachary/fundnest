import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Subscriptions from "./pages/Subscriptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import OtpPage from "./pages/OtpPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reports" element={<Reports />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/verify" element={<OtpPage/>} />
        </Routes>
    );
};
export default Router;
