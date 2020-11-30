import React, { useContext } from "react";
import AuthContext from "../authContext";

const Auth = (props) => {
  const auth = useContext(AuthContext); //to get access to the context and parameter is the identifier of the context
  return <button onClick={auth.loginKey}>Login</button>;
};

export default Auth;
