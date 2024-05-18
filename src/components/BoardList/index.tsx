import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm";
import { FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./style.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: (id: string) => void;
};

export default function BoardList({
  activeBoardId,
  setActiveBoardId,
}: TBoardListProps) {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div className={container}>
      <div className={title}>게시판</div>
      {boardArray.map((board) => (
        <div
          key={board.id}
          onClick={() => setActiveBoardId(board.id)}
          className={clsx(
            {
              [boardItemActive]: board.id === activeBoardId,
            },
            {
              [boardItem]: board.id === activeBoardId,
            }
          )}
        >
          <div>{board.name}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
      </div>
    </div>
  );
}
