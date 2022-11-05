import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Card from "./pages/Card";
import Identifications from "./pages/Identifications";
import SecureNotes from "./pages/SecureNotes";
import WifiPasswords from "./pages/WifiPasswords";
import SharingCenter from "./pages/SharingCenter";
import MyAccount from "./pages/MyAccount";
import Members from "./pages/Members";
import Roles from "./pages/Roles";
import LoginRegistration from "./pages/LoginRegistration";
import CurrentItemPage from "./pages/CurrentItem";
import AuditLog from "./pages/AuditLog";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import SiteWarning from "./components/SiteWarning";
import VaultMembers from "./components/VaultMembers";
import CurrentItem from "./components/CurrentItem";
import ResponsiveDisplay from "./components/helpers/ResponsiveDisplay";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./features/firebase/firebase";
import {
  createUser,
  setUser,
  getUserData,
  logOut,
} from "./features/slice/authSlice";
import Logins from "./pages/Logins";
import { useIdleTimer } from "react-idle-timer";
import Folder from "./pages/Folder";
import { getAllMembers } from "./features/slice/memberSlice";

const App = () => {
  const [loggedOutInactive, setLoggedOutInactive] = useState(false);
  const { selectedItem } = useSelector((state) => state.items);
  const {
    authUser,
    username,
    masterPasswordHint,
    authRegistered,
    authGetUser,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Vaulteer";
  }, []);

  useEffect(() => {
    if (authGetUser) {
      dispatch(getUserData(authUser.uid));
      dispatch(getAllMembers({ uid: authUser.uid }));
    }
  }, [authGetUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));

      if (user?.providerData[0]?.providerId === "google.com") {
        const uid = user.uid;
        dispatch(
          createUser({
            uid,
            email: user.email,
            username,
            masterPasswordHint,
            image: user.photoURL ? user.photoURL : "",
          })
        );
      }
    });

    return unsubscribe;
  }, [dispatch, username, masterPasswordHint]);

  useEffect(() => {
    console.log(username, masterPasswordHint);
    if (authRegistered && authUser && username) {
      const uid = authUser.uid;
      dispatch(
        createUser({
          uid,
          email: authUser.email,
          username,
          masterPasswordHint,
          image: authUser.photoURL ? authUser.photoURL : "",
        })
      );
    }
  }, [authRegistered]);

  const handleOnIdle = (event) => {
    if (authUser) {
      setLoggedOutInactive(true);
      dispatch(logOut());
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 3,
    onIdle: handleOnIdle,
  });

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
              element={
                <LoginRegistration
                  loggedOutInactive={loggedOutInactive}
                  setLoggedOutInactive={setLoggedOutInactive}
                ></LoginRegistration>
              }
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
              path="/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<AllItems />}
                    mobile={<CurrentItemPage />}
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
              path="/Favorites/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Favorites />}
                    mobile={<CurrentItemPage />}
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
              path="/Trash/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Trash />}
                    mobile={<CurrentItemPage />}
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
              path="/SharingCenter/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<SharingCenter />}
                    mobile={<CurrentItemPage />}
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
              path="Types/Logins/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Logins />}
                    mobile={<CurrentItemPage />}
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
              path="Types/Cards/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Card />}
                    mobile={<CurrentItemPage />}
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
              path="Types/Identifications/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Identifications />}
                    mobile={<CurrentItemPage />}
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
                  <SecureNotes></SecureNotes>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Types/SecureNotes/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<SecureNotes />}
                    mobile={<CurrentItemPage />}
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
              path="Types/WifiPasswords/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<WifiPasswords />}
                    mobile={<CurrentItemPage />}
                  ></ResponsiveDisplay>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              // exact
              path="Folders/:folder/:uid"
              element={
                authUser ? (
                  <Folder></Folder>
                ) : (
                  <Navigate to="/LoginRegistration" />
                )
              }
            ></Route>
            <Route
              path="Folders/:folder/"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Folder />}
                    mobile={<CurrentItemPage />}
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
              path="/MyAccount/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<MyAccount />}
                    mobile={<CurrentItemPage />}
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
              path="/Members/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Members />}
                    mobile={<CurrentItemPage />}
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
              path="/Roles/:uid"
              element={
                authUser ? (
                  <ResponsiveDisplay
                    nonMobile={<Roles />}
                    mobile={<CurrentItemPage />}
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
              path="/AuditLog/:uid"
              element={
                authUser ? (
                  <AuditLog
                    nonMobile={<Roles />}
                    mobile={<CurrentItemPage />}
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
              {selectedItem && (
                <>
                  <CurrentItem></CurrentItem>
                </>
              )}

              {!selectedItem && (
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
