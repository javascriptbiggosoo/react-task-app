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
type TDeleteTaskAction = {
  taskId: string;
  listId: string;
  boardId: string;
};
type TDeleteBoardAction = {
  boardId: string;
};
type TSortAction = {
  boardIndex: number;
  draggableId: string;
  droppableIdStart: string;
  droppableIndexStart: number;
  droppableIdEnd: string;
  droppableIndexEnd: number;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      id: "board-0",
      name: "첫 번째 게시판",
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
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.id !== payload.boardId
      );
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
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.id === payload.task.id ? payload.task : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.id !== payload.taskId
                      ),
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
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        // 같은 리스트 내에서의 이동
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.id === payload.droppableIdStart
        );
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      } else {
        // 다른 리스트로 이동
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.id === payload.droppableIdStart
        );
        const card = listStart?.tasks.splice(payload.droppableIndexStart, 1);
        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.id === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }
    },
  },
});

export const {
  sort,
  addBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
  deleteBoard,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
