import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    id: "task-0",
    name: "task 0",
    description: "task description",
    owner: "jinyoung",
  },
};

// name, reducer, actions, caseReducers 등 여러 속성을 가진 객체를 반환
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

export const modalReducer = modalSlice.reducer;
