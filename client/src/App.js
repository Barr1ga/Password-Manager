import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Logins from "./pages/Logins";
import Card from "./pages/Card";
import Identity from "./pages/Identity";
import SecureNote from "./pages/SecureNote";
import WifiPasswords from "./pages/WifiPasswords";
import SharingCenter from "./pages/SharingCenter";
import MyAccount from "./pages/MyAccount";
import Members from "./pages/Members";
import Roles from "./pages/Roles";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import OtherLinks from "./components/OtherLinks";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import SiteWarning from "./components/SiteWarning";
import VaultMembers from "./components/VaultMembers";

const App = () => {
  // const user = true;
  const user = false;

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Header></Header>
          <div className="sub-body">
            <div className="left-margin">
              <SideNav></SideNav>
            </div>
            <div className="center-margin">
              <div className="scroll-view">
                <Routes>
                  <Route path="/" element={<AllItems></AllItems>}></Route>
                  <Route
                    path="/Favorites"
                    element={<Favorites></Favorites>}
                  ></Route>
                  <Route path="/Trash" element={<Trash></Trash>}></Route>
                  <Route path="/Logins" element={<Logins></Logins>}></Route>
                  <Route path="/Card" element={<Card></Card>}></Route>
                  <Route
                    path="/Identity"
                    element={<Identity></Identity>}
                  ></Route>
                  <Route
                    path="/SecureNote"
                    element={<SecureNote></SecureNote>}
                  ></Route>
                  <Route
                    path="/WifiPasswords"
                    element={<WifiPasswords></WifiPasswords>}
                  ></Route>
                  <Route
                    path="/MyAccount"
                    element={<MyAccount></MyAccount>}
                  ></Route>
                  <Route path="/Members" element={<Members></Members>}></Route>
                  <Route path="/Roles" element={<Roles></Roles>}></Route>
                </Routes>
              </div>
            </div>
            <div className="right-margin standard-stack gap-10">
              <SiteWarning></SiteWarning>

              <div className="right-vault-members">
                <VaultMembers></VaultMembers>
              </div>
              <OtherLinks></OtherLinks>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sub-body-small">
            {/* <Login></Login> */}
            <Register></Register>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
