import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Login from "./pages/Login";
import Card from "./pages/Card";
import Identity from "./pages/Identity";
import SecureNote from "./pages/SecureNote";
import WifiPasswords from "./pages/WifiPasswords";
import SharingCenter from "./pages/SharingCenter";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import OtherLinks from "./components/OtherLinks"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import SiteWarning from "./components/SiteWarning";
import VaultMembers from "./components/VaultMembers";

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="sub-body">
        <div className="left-margin">
          <SideNav></SideNav>
        </div>
        <div className="center-margin">
          <div className="scroll-view">
            <Routes>
              <Route path="/" element={<AllItems></AllItems>}>
                All Items
              </Route>
              <Route path="/Favorites" element={<Favorites></Favorites>}>
                Favorites
              </Route>
              <Route path="/Trash" element={<Trash></Trash>}>
                Trash
              </Route>
              <Route path="/Login" element={<Login></Login>}>
                Login
              </Route>
              <Route path="/Card" element={<Card></Card>}>
                Card
              </Route>
              <Route path="/Identity" element={<Identity></Identity>}>
                Identity
              </Route>
              <Route path="/Secure Note" element={<SecureNote></SecureNote>}>
                Secure Note
              </Route>
              <Route
                path="/Wifi Passwords"
                element={<WifiPasswords></WifiPasswords>}
              >
                Wifi Passwords
              </Route>
              <Route
                path="/Sharing Center"
                element={<SharingCenter></SharingCenter>}
              >
                Sharing Center
              </Route>
            </Routes>
          </div>
        </div>
        <div className="right-margin standard-stack gap-10">
          <SiteWarning></SiteWarning>
          <VaultMembers></VaultMembers>
          <OtherLinks></OtherLinks>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
