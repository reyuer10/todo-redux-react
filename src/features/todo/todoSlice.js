import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    add_todo: (state, action) => {
      const todo = {
        newValue: action.payload,
        id:
          state.list.length === 0
            ? 1
            : state.list[state.list.length - 1].id + 1,
        isComplete: false,
      };
      return {
        ...state,
        list: [...state.list, todo],
      };
    },

    delete_todo: (state, action) => {
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
    },

    complete_todo: (state, action) => {
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                isComplete: !todo.isComplete,
              }
            : todo
        ),
      };
    },

    update_todo: (state, action) => {
      const { todoId, newValueUpdate } = action.payload;
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                newValue: newValueUpdate,
              }
            : todo
        ),
      };
    },
  },
});

export const { add_todo, delete_todo, complete_todo, update_todo } =
  todoSlice.actions;
export default todoSlice.reducer;
