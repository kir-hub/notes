import React, { useState, useCallback } from "react";
import Input from "./NoteInput";
import Note from "./Note";

export default function NestNote(props) {
  const { title, remove, index, isList } = props;

  const [todo, setTodo] = useState([]);
  const [isSubList, setIsSubList] = useState(false);

  const deleteHandler = () => {
    remove(index);
  };

  const onAdd = (value) => {
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
      ...todo
    ];
    setTodo(newTodos);
    setIsSubList((prev) => !prev);
  };
  const removeTodo = (index) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);

    setTodo(newTodos);
    setIsSubList((prev) => !prev);
  };
  console.log(todo);

  return (
    <div>
      <h1> {title.title}</h1>
      <button onClick={deleteHandler}>X</button>
      {isSubList ? "" : <Input onAdd={onAdd} />}

      <ul>
        {todo.map((todo, index) => (
          <li key={todo.date}>
            <Note title={todo} index={index} remove={removeTodo} />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
