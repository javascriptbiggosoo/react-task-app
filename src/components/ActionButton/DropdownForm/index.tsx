import React, { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";
import { button, buttons, close, input, listForm, taskForm } from "./style.css";

type TDropdownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
  boardId: string;
  listId: string;
};

export default function DropdownForm({
  setIsFormOpen,
  list,
  boardId,
  listId,
}: TDropdownFormProps) {
  const [text, setText] = useState("");
  const dispatch = useTypedDispatch();

  const formPlaceholder = list
    ? "리스트의 이름을 입력하세요"
    : "할 일을 입력하세요";

  const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setText(ev.target.value);
  };
  const buttonTitle = list ? "리스트 추가" : "할 일 추가";
  const handleButtonClick = () => {
    if (text) {
      if (list) {
        // Add list
        dispatch(
          addList({
            boardId,
            list: { id: crypto.randomUUID(), name: text, tasks: [] },
          })
        );
        dispatch(
          addLog({
            id: crypto.randomUUID(),
            message: `리스트 추가: ${text}`,
            author: "User",
            timestamp: String(Date.now()),
          })
        );
      } else {
        // Add task
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              id: crypto.randomUUID(),
              name: text,
              description: "",
              owner: "User",
            },
          })
        );
        dispatch(
          addLog({
            id: crypto.randomUUID(),
            message: `할 일 추가: ${text}`,
            author: "User",
            timestamp: String(Date.now()),
          })
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        placeholder={formPlaceholder}
        value={text}
        onChange={handleTextChange}
        onBlur={() => setIsFormOpen(false)}
      ></textarea>
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
}
