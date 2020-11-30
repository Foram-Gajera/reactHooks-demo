import React, { useState } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
import AuthContext from "./authContext";
import CallBackDemo from "./components/CallBackDemo";
import MemoHook from "./components/MemoHook";

const App = (props) => {
  const [page, setPage] = useState("auth");
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  };

  const login = () => {
    setAuthStatus(true);
  };
  return (
    <div>
      <AuthContext.Provider value={{ status: authStatus, loginKey: login }}>
        <Header
          onLoadTodos={() => switchPage("todos")}
          onLoadAuth={() => switchPage("auth")}
        />
        <hr />
        {page === "auth" ? <Auth /> : <Todo />}
        {/* <Todo />
      <Auth /> */}
        <CallBackDemo />
        <MemoHook />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
