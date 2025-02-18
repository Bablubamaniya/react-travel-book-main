// import React from 'react'
import style from "../styles/SideBar.module.css";
import LogoBox from "./LogoBox";
import AppNav from "./AppNav";
// import City from "./City";
import Footer from "./Footer";
// import CityList from "./CityList";
import { Outlet } from "react-router";
// import AddCityForm from "./AddCityForm";
function SideBar() {
    return (
        <div className={style.sideBar}>
            <LogoBox />
            <AppNav />
            <Outlet />
            {/* <CityList /> */}
            {/* <City /> */}
            {/* <AddCityForm /> */}
            <Footer />
        </div>
    );
}

export default SideBar;
