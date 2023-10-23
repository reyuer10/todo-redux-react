import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_todo,
  complete_todo,
  delete_todo,
  update_todo,
} from "../features/todo/todoSlice";

import { PiSquareLight, PiCheckSquareLight } from "react-icons/pi";

export default function Todo() {
  const mainList = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const [mainValue, setMainValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newValueEdit, setNewValueEdit] = useState("");

  const handleAdd = () => {
    if (mainValue.trim() !== "") {
      dispatch(add_todo(mainValue));
      setMainValue("");
    }
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
      console.log(todoId);
      setNewValueEdit(prevValue);
      setIsEdit(!isEdit);
    }
    console.log(mainList);
  };

  const handleCancel = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = (itemId, itemName) => {
    dispatch(update_todo({ todoId: itemId, newValueUpdate: itemName }));
    setIsEdit(!isEdit);
  };

  return (
    <div className="px-7 rounded-2xl shadow-md w-[450px]">
      <div>
        <p className="text-2xl text-center font-bold py-3 text-slate-500">
          To-Do List
        </p>
      </div>
      <div className="space-x-3 p-3 flex">
        <input
          className="w-full text-slate-500 pl-3 p-1 py-1 rounded-lg ring-1 ring-slate-300 transition-all outline-none duration-75 focus:border-amber-300 border"
          value={mainValue}
          onChange={(e) => setMainValue(e.target.value)}
          type="text"
        />
        <button
          className="text-sm font-bold bg-amber-300 text-white px-4 py-2 rounded-lg hover:-translate-y-1 transition-all duration-100"
          onClick={handleAdd}
        >
          add
        </button>
      </div>
      <div className="border rounded-lg border-amber-400 my-5 mx-3">
        {mainList.map((l) => (
          <div key={l.id}>
            {isEdit && editId === l.id ? (
              <div className="flex justify-between items-center">
                <div>
                  <input
                    className="w-full px-5 pt-3 mx-2 outline-none border-slate-300 my-2 border-2 border-t-0 border-l-0 border-r-0"
                    value={newValueEdit}
                    onChange={(e) => setNewValueEdit(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="space-x-1 text-sm px-1 flex">
                  <button
                    className="hover:bg-amber-300 transition-colors bg-amber-400 text-white px-3 py-1 rounded-lg font-medium"
                    onClick={() => handleSave(l.id, newValueEdit)}
                  >
                    Save
                  </button>
                  <button
                    className="hover:bg-slate-400 transition-colors bg-slate-500 text-white px-3 py-1 rounded-lg font-medium"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between py-3 text-slate-500">
                <div className="flex items-center">
                  <button
                    className={` ${l.isComplete ? "text-slate-400" : ""} mx-1`}
                    onClick={() => handleComplete(l.id)}
                  >
                    {l.isComplete ? (
                      <>
                        <PiCheckSquareLight size={23} />
                      </>
                    ) : (
                      <>
                        <PiSquareLight size={23} />
                      </>
                    )}
                  </button>
                  <p
                    className={
                      l.isComplete ? "text-slate-400 line-through" : ""
                    }
                  >
                    {l.newValue}
                  </p>
                </div>
                <div className="flex items-center space-x-1 px-2">
                  <button onClick={() => onEdit(l.id, l.newValue)}>
                    <svg
                      className="fill-current text-slate-500 hover:-translate-y-1 transition-all duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      id="Outline"
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                    >
                      <path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z" />
                    </svg>
                  </button>

                  <button onClick={() => handleDelete(l.id)}>
                    <svg
                      className="fill-current text-slate-500 hover:-translate-y-1 transition-all duration-100"
                      xmlns="http://www.w3.org/2000/svg"
                      id="Outline"
                      viewBox="0 0 24 24"
                      width="24
                      "
                      height="24"
                    >
                      <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
