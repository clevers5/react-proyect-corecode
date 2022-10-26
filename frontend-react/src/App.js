import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import TodoList from "./components/todos/TodoList";
import Fotter from "./components/footer/Fotter";

function App() {
  return (
    <>
      <Header />
      <div className="todo-app ">
        <TodoList />
      </div>
      <Fotter />
    </>
  );
}

export default App;
