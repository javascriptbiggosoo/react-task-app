import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};
type TDeleteListAction = {
  listId: string;
  boardId: string;
};
type TAddListAction = {
  list: IList;
  boardId: string;
};
type TAddTaskAction = {
  task: ITask;
  listId: string;
  boardId: string;
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
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: [...board.lists, payload.list],
            }
          : board
      );
      console.log(payload);
      console.log(state.boardArray);
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === payload.listId
                  ? {
                      ...list,
                      tasks: [...list.tasks, payload.task],
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter((list) => list.id !== payload.listId),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const { addBoard, deleteList, setModalActive, addList, addTask } =
  boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
