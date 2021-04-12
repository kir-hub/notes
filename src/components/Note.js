import React, { useState, useCallback, useEffect } from "react";
import Input from "./NoteInput";
import NestNote from "./NestNote";

export default function Note(props) {
  const { title, remove, index, sublist } = props;

  const [nestTodo, setNestTodo] = useState([]);
  const [isSubList, setIsSubList] = useState(false);

  const deleteHandler = () => {
    remove(index);
  };

  const removeTodo = (index) => {
    const newTodos = [...nestTodo];
    newTodos.splice(index, 1);
    setNestTodo(newTodos);
    setIsSubList((prev) => !prev);
  };

  const onAdd = (value) => {
    if (!value) return;
    addTodo(value);
    // setValue("");
  };

  const addTodo = (value) => {
    const date = new Date();
    const newTodos = [
      ...nestTodo,
      {
        title: value,
        date: date
      }
    ];
    setNestTodo(newTodos);
    setIsSubList((prev) => !prev);
  };
  console.log(nestTodo);

  return (
    <div>
      <h1> {title.title}</h1>
      <button onClick={deleteHandler}>X</button>
      {isSubList ? "" : <Input onAdd={onAdd} />}

      <ul>
        {nestTodo.map((nestTodo, index) => (
          <li key={nestTodo.date}>
            <NestNote title={nestTodo} index={index} remove={removeTodo} />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
