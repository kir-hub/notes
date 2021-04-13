import React, { useState, useCallback, useEffect } from "react";
import Input from "./NoteInput";
import NestNote from "./NestNote";

export default function Note(props) {
  const { title, remove, index, setUp, setDown, store, isBtnAllow } = props;

  const [nestTodo, setNestTodo] = useState([]);
  const [isSubList, setIsSubList] = useState(false);
  const [arr, setArr] = useState(store);

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

  const moveUp = () => {
    setUp(index);
  };
  const moveDown = () => {
    setDown(index);
  };

  console.log();
  useEffect(() => {});

  return (
    <div>
      <h1> {title.title}</h1>
      <button onClick={deleteHandler}>X</button>
      {title.title !==
        (typeof isBtnAllow === "undefined" ? 0 : store[0].title) &&
      isBtnAllow ? (
        <button onClick={moveUp}>/\</button>
      ) : (
        ""
      )}
      {title.title !==
        (typeof isBtnAllow === "undefined"
          ? 0
          : store[store.length - 1].title) && isBtnAllow ? (
        <button onClick={moveDown}>\/</button>
      ) : (
        ""
      )}
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
