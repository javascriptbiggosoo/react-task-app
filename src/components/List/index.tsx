import React from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task";
import ActionButton from "../ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./style.css";

type TListProps = {
  list: IList;
  boardId: string;
};

export default function List({ list, boardId }: TListProps) {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ listId, boardId }));
    dispatch(
      addLog({
        id: crypto.randomUUID(),
        message: `리스트 삭제: ${list.name}`,
        author: "User",
        timestamp: String(Date.now()),
      })
    );
  };
  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };
  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.name}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleListDelete(list.id)}
        />
      </div>
      {list.tasks.map((task, idx) => (
        <div
          key={task.id}
          onClick={() => handleTaskChange(boardId, list.id, task)}
        >
          <Task
            taskName={task.name}
            taskDescription={task.description}
            boardId={boardId}
            id={task.id}
            index={idx}
          />
        </div>
      ))}
      <ActionButton boardId={boardId} listId={list.id} />
    </div>
  );
}
