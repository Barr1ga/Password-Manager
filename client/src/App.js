import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import LoginRegistration from "./pages/LoginRegistration";
import CurrentPasswordItemPage from "./pages/CurrentPasswordItem";
import AuditLog from "./pages/AuditLog";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import OtherLinks from "./components/OtherLinks";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import SiteWarning from "./components/SiteWarning";
import VaultMembers from "./components/VaultMembers";
import CurrentPasswordItem from "./components/CurrentPasswordItem";
import ResponsiveDisplay from "./components/helpers/ResponsiveDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getBrandDetails } from "./features/slice/passwordSlice";
import { auth } from "./features/firebase/firebase";
import Footer from "./components/Footer";
import { createUser, setUser } from "./features/slice/authSlice";

const App = () => {
  const { selectedPassword } = useSelector((state) => state.passwords);
  const { authUser, username, masterPasswordHint, authRegistered } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { passwords } = useSelector((state) => state.passwords);

  useEffect(() => {
    document.title = "Vaulteer";
  }, []);

  useEffect(() => {
    passwords.forEach((password) => {
      dispatch(getBrandDetails({ brand: password.name, id: password.id }));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authRegistered && authUser && username && masterPasswordHint) {
      const uid = authUser.uid;
      dispatch(createUser({ uid, email: authUser.email, username, masterPasswordHint }));
    }
  }, [authRegistered]);

  return (
    <BrowserRouter>
      {authUser ? (
        <>
          <Header></Header>
          <div className="sub-body">
            <div className="left-margin">
              <SideNav></SideNav>
            </div>
            <div className="center-margin">
              <Routes>
                <Route path="/" element={<AllItems></AllItems>}></Route>
                <Route
                  path="/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<AllItems />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route
                  path="/Favorites"
                  element={<Favorites></Favorites>}
                ></Route>
                <Route
                  path="/Favorites/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Favorites />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/Trash" element={<Trash></Trash>}></Route>
                <Route
                  path="/Trash/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Trash />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                {/* <Route
                  path="/SharingCenter"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<SharingCenter />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route> */}
                <Route
                  path="/SharingCenter"
                  element={<SharingCenter></SharingCenter>}
                ></Route>
                <Route
                  path="/SharingCenter/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<SharingCenter />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/Card" element={<Card></Card>}></Route>
                <Route
                  path="/Card/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Card />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/Identity" element={<Identity></Identity>}></Route>
                <Route
                  path="/Identity/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Identity />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route
                  path="/SecureNote"
                  element={<SecureNote></SecureNote>}
                ></Route>
                <Route
                  path="/SecureNote/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<SecureNote />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route
                  path="/WifiPasswords"
                  element={<WifiPasswords></WifiPasswords>}
                ></Route>
                <Route
                  path="/WifiPasswords/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<WifiPasswords />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route
                  path="/MyAccount"
                  element={<MyAccount></MyAccount>}
                ></Route>
                <Route
                  path="/MyAccount/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<MyAccount />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/Members" element={<Members></Members>}></Route>
                <Route
                  path="/Members/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Members />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/Roles" element={<Roles></Roles>}></Route>
                <Route
                  path="/Roles/:id"
                  element={
                    <ResponsiveDisplay
                      nonMobile={<Roles />}
                      mobile={<CurrentPasswordItemPage />}
                    ></ResponsiveDisplay>
                  }
                ></Route>
                <Route path="/AuditLog" element={<AuditLog></AuditLog>}></Route>
                <Route
                  path="/AuditLog/:id"
                  element={
                    <AuditLog
                      nonMobile={<Roles />}
                      mobile={<CurrentPasswordItemPage />}
                    ></AuditLog>
                  }
                ></Route>
              </Routes>
            </div>
            <div className="right-margin">
              <div className="scroll-view standard-stack gap-10">
                {selectedPassword && (
                  <>
                    <CurrentPasswordItem></CurrentPasswordItem>
                  </>
                )}

                {!selectedPassword && (
                  <>
                    <hr></hr>
                    <SiteWarning></SiteWarning>

                    <div className="right-vault-members">
                      <VaultMembers></VaultMembers>
                    </div>
                  </>
                )}
              </div>
              {/* <OtherLinks></OtherLinks> */}
            </div>
          </div>
          {/* <Footer></Footer> */}
        </>
      ) : (
        <>
          <div className="sub-body-small">
            <LoginRegistration></LoginRegistration>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
