import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      id: "board-0",
      name: "첫 번째 게시물",
      lists: [
        {
          id: "list-0",
          name: "list 0",
          tasks: [
            {
              id: "task-0",
              name: "task 0",
              description: "task description",
              owner: "jinyoung",
            },
            {
              id: "task-1",
              name: "task 1",
              description: "task description",
              owner: "jinyoung",
            },
          ],
        },
        {
          id: "list-1",
          name: "list 1",
          tasks: [
            {
              id: "task-2",
              name: "task 2",
              description: "task description",
              owner: "jinyoung",
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setModalActive: (state, action) => {
      state.modalActive = action.payload;
    },
    setBoardArray: (state, action) => {
      state.boardArray = action.payload;
    },
  },
});

export const boardsReducer = boardsSlice.reducer;
