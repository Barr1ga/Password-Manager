import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllItems from "./pages/AllItems";
import MyAccount from "./pages/MyAccount";
import LoginRegistration from "./pages/LoginRegistration";
import CurrentPasswordItemPage from "./pages/CurrentPasswordItem";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import CurrentPasswordItem from "./components/CurrentPasswordItem";
import ResponsiveDisplay from "./components/helpers/ResponsiveDisplay";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./features/firebase/firebase";
import { createUser, setUser, getUserData } from "./features/slice/authSlice";

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
      console.log("test")
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
  }, []);

  useEffect(() => {
    if (authRegistered && authUser && username) {
      const uid = authUser.uid;
      dispatch(
        createUser({ uid, email: authUser.email, username, masterPasswordHint })
      );
    }
  }, [authRegistered]);

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
