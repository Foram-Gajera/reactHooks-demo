import React from "react";

//passing vlaue can be object, variable, here false to show unauthenticated by default
const AuthContext = React.createContext({ status: false, loginKey: () => {} });

export default AuthContext;
