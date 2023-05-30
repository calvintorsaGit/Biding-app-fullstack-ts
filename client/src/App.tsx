import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from "./page/login/Login";
import RegisterPage from "./page/register/RegisterPage";
import Deposit from "./page/deposit/Deposit";
import CreateItem from "./page/create-item/CreateItem";
import LayoutWithNav from "./layout/LayoutWithNav";
import LayoutWithoutNav from "./layout/LayoutWithoutNav";
import Home from "./page/home-page/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<LayoutWithoutNav/>}>
                    <Route path="/" Component={Login}/>
                    <Route path="/register" Component={RegisterPage}/>
                </Route>
                <Route element={<LayoutWithNav/>}>
                    <Route index path="/home" Component={Home}/>
                    <Route index path="/deposit" Component={Deposit}/>
                    <Route path="/createItem" Component={CreateItem}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
