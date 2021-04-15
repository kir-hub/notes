import React, { useState } from "react";
import Input from "./Input";
import "./styles/styles.css";

export default function Note(props) {
  const { title, index, deleteList, nav, setUp, setDown, store } = props;

  const [list, setList] = useState([]);

  const addSublist = (value) => {
    const date = new Date();
    const newList = [
      {
        title: value,
        date: date
      },
      ...list
    ];
    setList(newList);
  };

  const removeList = () => {
    if (deleteList) {
      deleteList(index);
    } else {
      deleteSublist(index);
    }
  };

  const deleteSublist = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const removeSublist = () => {
    setList([]);
  };

  const moveUp = () => {
    setUp(index);
  };
  const moveDown = () => {
    setDown(index);
  };

  return (
    <div className="main">
      <h1>{title}</h1>
      {nav && store[0].title !== title ? <h2 onClick={moveUp}>/\</h2> : ""}
      {nav && store[store.length - 1].title !== title ? (
        <h2 onClick={moveDown}>\/</h2>
      ) : (
        ""
      )}
      {deleteList ? <button onClick={removeList}>delete {title}</button> : ""}
      {list.length ? (
        <button className="remove-sublist" onClick={deleteSublist}>
          remove sublist
        </button>
      ) : (
        ""
      )}
      {list.length ? (
        ""
      ) : (
        <Input
          onAdd={addSublist}
          btnTitle={list.length ? "add " : "add sublist"}
        />
      )}
      <ul>
        {list.map((item, index) => (
          <li key={item.date}>
            <button className="delete-sublist" onClick={removeSublist}>
              delete {item.title}
            </button>
            <Note title={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
