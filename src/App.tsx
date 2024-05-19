import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import BoardList from "./components/BoardList";
import ListContainer from "./components/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal";
import LoggerModal from "./components/LoggerModal";
import { deleteBoard } from "./store/slices/boardsSlice";
import { addLog } from "./store/slices/loggerSlice";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);
  const dispatch = useTypedDispatch();

  const handleDeleteBoard = () => {
    // Delete the active board
    if (boards.length <= 1) {
      alert("최소 한 개의 게시판은 있어야 합니다.");
      return;
    }
    dispatch(deleteBoard({ boardId: activeBoardId }));
    dispatch(
      addLog({
        id: crypto.randomUUID(),
        message: `게시판 삭제: ${getActiveBoard.name}`,
        author: "User",
        timestamp: String(Date.now()),
      })
    );
    const newIndexToSet = boards.findIndex(
      (board) => board.id !== activeBoardId
    );
    setActiveBoardId(boards[newIndexToSet].id);
  };

  const getActiveBoard = boards.filter(
    (board) => board.id === activeBoardId
  )[0];
  const lists = getActiveBoard.lists;

  return (
    <div className={appContainer}>
      {isLoggerOpen && <LoggerModal setIsLoggerOpen={setIsLoggerOpen} />}
      {modalActive && <EditModal />}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListContainer lists={lists} boardId={activeBoardId} />
      </div>
      <div className={buttons}>
        <button onClick={handleDeleteBoard} className={deleteBoardButton}>
          이 게시판 삭제
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen((prev) => !prev)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;
