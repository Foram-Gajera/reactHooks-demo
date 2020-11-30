import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";

import { useFormInput } from "../hooks/forms";

//useMemo is used to avoid unnecessary rerendering
//{useMemo(()=> (JSX code, [provide dependent params like useEffects]))}

const Todo = (props) => {
  const [inputIsValid, setInputIsValid] = useState(false);

  //   const [todoName, setTodoName] = useState("");
  //   const [todoList, setTodoList] = useState([]);

  const todoInputRef = useRef(); //initial value null no parameter

  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        const x = state.filter((todo) => todo.id !== action.payload);
        return x;
      default:
        return state;
    }
  };

  //parameter => reducerFunction, startingState, initialAction
  // it returns array with 2 elements [state, dispatch]
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get("https://fir-85678.firebaseio.com/todos.json").then((res) => {
      console.log(res);
      const todoData = res.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      dispatch({ type: "SET", payload: todos });
    });

    //it runs before the useEffect code
    return () => {
      console.log("Clean up");
    };
  }, []);

  //   const mouseMoveHanlder = (event) => {
  //     console.log(event.clientX, event.clientY);
  //   };
  //   useEffect(() => {
  //     document.addEventListener("mousemove", mouseMoveHanlder);
  //     return () => {
  //       document.removeEventListener("mousemove", mouseMoveHanlder);
  //     };
  //   }, []);

  //if we use ref then it is not needed inputChangeHandler
  //   const inputChangeHandler = (event) => {
  //     setTodoName(event.target.value);
  //   };

  const todoAddHandler = () => {
    // const todoName = todoInputRef.current.value;

    const todoName = todoInput.value;

    axios
      .post("https://fir-85678.firebaseio.com/todos.json", { name: todoName })
      .then((res) => {
        console.log(res);
        const todoItem = { id: res.data.name, name: todoName };
        dispatch({ type: "ADD", payload: todoItem });
      })
      .catch((err) => console.log(err));
  };

  const todoRemoveHandler = (todoId) => {
    axios
      .delete(`https://fir-85678.firebaseio.com/todos/${todoId}.json`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "REMOVE", payload: todoId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputValidationHandler = (event) => {
    if (event.target.value.trim() === "") {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        // value={todoName}
        // onChange={inputChangeHandler}

        // ref={todoInputRef}
        // onChange={inputValidationHandler}

        value={todoInput.value}
        onChange={todoInput.onChange}
        style={{ backgroundColor: todoInput.validity ? "transparent" : "red" }}

        // style={{ backgroundColor: inputIsValid ? "transparent" : "red" }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
