import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_todo,
  complete_todo,
  delete_todo,
  update_todo,
} from "../features/todo/todoSlice";

export default function Todo() {
  const mainList = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const [mainValue, setMainValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newValueEdit, setNewValueEdit] = useState("");

  const handleAdd = () => {
    dispatch(add_todo(mainValue));
    setMainValue("");
  };
  const handleDelete = (id) => {
    dispatch(delete_todo(id));
  };

  const handleComplete = (id) => {
    dispatch(complete_todo(id));
  };

  const onEdit = (todoId, prevValue) => {
    const existingId = mainList.find((l) => l.id === todoId);
    if (existingId) {
      setEditId(todoId);
       console.log(existingId);
      setNewValueEdit(prevValue);
      setIsEdit(!isEdit);
    }
    console.log(mainList);

    
  };

  const handleCancel = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = (itemId) => {
    dispatch(update_todo({ todoId: itemId, newValueUpdate: newValueEdit }));
    setIsEdit(!isEdit);
  };

  return (
    <div>
      <div>
        <p>Todo</p>
      </div>
      <div>
        <input
          value={mainValue}
          onChange={(e) => setMainValue(e.target.value)}
          type="text"
        />
        <button onClick={handleAdd}>add</button>
      </div>
      <div>
        {mainList.map((l) => (
          <div key={l.id}>
            {isEdit && editId === l.id ? (
              <>
                <input
                  value={newValueEdit}
                  onChange={(e) => setNewValueEdit(e.target.value)}
                  type="text"
                />
                <button onClick={() => handleSave(l.id, newValueEdit)}>
                  Save
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <p>{l.newValue}</p>
                <button onClick={() => onEdit(l.id, l.newValue)}>Edit</button>
                <button onClick={() => handleDelete(l.id)}>x</button>
                <button onClick={() => handleComplete(l.id)}>
                  {l.isComplete ? "Complete" : "Incomplete"}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
