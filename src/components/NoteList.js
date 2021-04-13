import React, { useState, useEffect } from "react";
import Input from "./NoteInput";
import Note from "./Note";

const getTodos = () => {
  const data = localStorage.getItem("todos");
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};

export default function NoteList(props) {
  const [todos, setTodos] = useState([]);
  const [store, setStore] = useState([]);

  // useEffect(() => {
  //   const newTodos = getTodos();
  //   setTodos(newTodos);
  // }, []);

  // useEffect(() => {
  //   if (todos.length > 0) {
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //   }
  //   if (todos.length === 0) {
  //     localStorage.clear();
  //   }
  // }, [todos]);

  const handleSubmit = (value) => {
    if (!value) return;
    addTodo(value);
    // setValue("");
  };

  const addTodo = (value) => {
    const date = new Date();
    const newTodos = [
      {
        title: value,
        date: date
      },
      ...todos
    ];
    setTodos(newTodos);
    setStore(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setStore(newTodos);
  };

  const moveUp = (index) => {
    const newTodos = [...todos];
    const movingItem = newTodos.splice(index, 1)[0];
    newTodos.splice(index - 1, 0, movingItem);
    setTodos(newTodos);
    setStore(newTodos);
  };
  const moveDown = (index) => {
    const newTodos = [...todos];
    const movingItem = newTodos.splice(index, 1)[0];
    newTodos.splice(index + 1, 0, movingItem);
    setTodos(newTodos);
    setStore(newTodos);
  };

  // console.log(todos);

  return (
    <div>
      <ul>
        {todos.map((todos, index) => (
          <>
            <li key={todos.date}>
              <Note
                store={store}
                setDown={moveDown}
                setUp={moveUp}
                title={todos}
                index={index}
                remove={removeTodo}
                isBtnAllow={true}
              />
            </li>
          </>
        ))}
      </ul>
      <Input onAdd={handleSubmit} />
    </div>
  );
}
