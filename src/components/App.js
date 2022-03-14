import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import EditProfile from "../routes/EditProfile";
import Profile from "../routes/Profile";
import { useState } from "react";
import firebase, { authService } from "../fb";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Navigation from "./Navigation";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserObj(user);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        <BrowserRouter>
          {isLogin ? (
            <>
              <Navigation />
              <Route
                path="/"
                exact
                render={() => <Home userObj={userObj} />}
              ></Route>
              <Route path="/profile" exact component={Profile} />
              <Route path="/edit" exact component={EditProfile}></Route>
            </>
          ) : (
            <Route path="/" exact component={Auth}></Route>
          )}
        </BrowserRouter>
      ) : (
        "Initializing ..."
      )}
    </div>
  );
}

export default App;
