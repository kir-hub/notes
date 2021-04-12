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
  useEffect(() => {
    const newTodos = getTodos();
    setTodos(newTodos);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (todos.length === 0) {
      localStorage.clear();
    }
  }, [todos]);

  const handleSubmit = (value) => {
    if (!value) return;
    addTodo(value);
    // setValue("");
  };

  // const editTodo =(title, index,)=>{
  //     const newTodos = [...todos]
  //     const date = new Date
  //     newTodos.splice(index,1, {title: title, time: date.getHours()+ ':' + date.getMinutes()})
  //     setEditorHandler(!editorHandler)
  //     setTodos(newTodos)
  // }

  // const mark = (index)=>{
  //     const newTodos =[...todos]
  //     setCheck(!check)
  //     newTodos[index].check = check
  //     setTodos(newTodos)
  // }

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
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  console.log(todos);

  return (
    <div>
      <ul>
        {todos.map((todos, index) => (
          <>
            <li key={todos.index}>
              <Note title={todos} index={index} remove={removeTodo} />
            </li>
          </>
        ))}
      </ul>
      <Input onAdd={handleSubmit} />
    </div>
  );
}
