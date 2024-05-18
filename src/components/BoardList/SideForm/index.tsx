import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./style.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";

interface ISideFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideForm({ setIsFormOpen }: ISideFormProps) {
  const [inputText, setInputText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const dispatch = useTypedDispatch();
  const handleOnblur = () => {
    setIsFormOpen(false);
  };

  const handleMouseDown = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            id: crypto.randomUUID(),
            name: inputText,
            lists: [],
          },
        })
      );
      dispatch(
        addLog({
          id: crypto.randomUUID(),
          message: `게시판 등록: ${inputText}`,
          author: "익명",
          timestamp: String(Date.now()),
        })
      );
    }
  };
  return (
    <div className={sideForm}>
      <input
        className={input}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnblur}
        autoFocus={true}
      />
      <FiCheck className={icon} onMouseDown={handleMouseDown} />
    </div>
  );
}
