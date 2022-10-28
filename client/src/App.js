import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Card from "./pages/Card";
import Identifications from "./pages/Identifications";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import SiteWarning from "./components/SiteWarning";
import VaultMembers from "./components/VaultMembers";
import CurrentPasswordItem from "./components/CurrentPasswordItem";
import ResponsiveDisplay from "./components/helpers/ResponsiveDisplay";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./features/firebase/firebase";
import { createUser, setUser, getUserData } from "./features/slice/authSlice";
import Logins from "./pages/Logins";

const App = () => {
  const { selectedPassword } = useSelector((state) => state.passwords);
  const { authUser, username, masterPasswordHint, authRegistered } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Vaulteer";
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
      dispatch(getUserData(user.uid));

      if (user?.providerData[0]?.providerId === "google.com") {
        const uid = user.uid;
        dispatch(
          createUser({
            uid,
            email: user.email,
            username,
            masterPasswordHint,
          })
        );
      }
    });

    return unsubscribe;
  }, [dispatch, username, masterPasswordHint]);

  useEffect(() => {
    if (authRegistered && authUser && username) {
      const uid = authUser.uid;
      dispatch(
        createUser({ uid, email: authUser.email, username, masterPasswordHint })
      );
    }
  }, [authRegistered, authUser, username, masterPasswordHint, dispatch]);

  return (
    <BrowserRouter>
      {authUser && <Header></Header>}
      <div className="sub-body">
        {authUser && (
          <div className="left-margin">
            <SideNav></SideNav>
          </div>
        )}
        <div className={authUser ? "center-margin" : ""}>
          <Routes>
            <Route
              path="/LoginRegistration"
              element={<LoginRegistration></LoginRegistration>}
            ></Route>
            <Route
              path="/"
              element={
                authUser ? (
                  <AllItems></AllItems>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<AllItems />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Favorites"
              element={
                authUser ? (
                  <Favorites></Favorites>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Favorites/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Favorites />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Trash"
              element={
                authUser ? (
                  <Trash></Trash>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Trash/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Trash />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/SharingCenter"
              element={
                authUser ? (
                  <SharingCenter></SharingCenter>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/SharingCenter/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<SharingCenter />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/Logins"
              element={
                authUser ? (
                  <Logins></Logins>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/Logins/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Logins />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/Cards"
              element={
                authUser ? <Card></Card> : <Navigate to="/LoginRegistration" />
              }
            ></Route>
            <Route
              path="Types/Cards/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Card />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/Identifications"
              element={
                authUser ? (
                  <Identifications></Identifications>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/Identifications/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Identifications />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/SecureNotes"
              element={
                authUser ? (
                  <SecureNote></SecureNote>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/SecureNotes/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<SecureNote />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/WifiPasswords"
              element={
                authUser ? (
                  <WifiPasswords></WifiPasswords>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/WifiPasswords/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<WifiPasswords />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/MyAccount"
              element={
                authUser ? (
                  <MyAccount></MyAccount>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/MyAccount/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<MyAccount />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Members"
              element={
                authUser ? (
                  <Members></Members>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Members/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Members />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Roles"
              element={
                authUser ? (
                  <Roles></Roles>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/Roles/:id"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Roles />}
                    mobile={<CurrentPasswordItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/AuditLog"
              element={
                authUser ? (
                  <AuditLog></AuditLog>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="/AuditLog/:id"
              element={
                authUser ? (
                  <AuditLog
                    nonMobile={<Roles />}
                    mobile={<CurrentPasswordItemPage />}
                  ></AuditLog>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
          </Routes>
        </div>
        {authUser && (
          <div className="right-margin">
            <div className="scroll-view standard-stack gap-10">
              {selectedPassword && (
                <>
                  <CurrentPasswordItem></CurrentPasswordItem>
                </>
              )}

              {!selectedPassword && (
                <>
                  <SiteWarning></SiteWarning>

                  <div className="right-vault-members">
                    <VaultMembers></VaultMembers>
                  </div>
                </>
              )}
            </div>
            {/* <OtherLinks></OtherLinks> */}
          </div>
        )}
      </div>

      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
};

export default App;
