import React, { useState } from "react";
import DropdownForm from "./DropdownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton, taskButton } from "./style.css";

type TActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
};

export default function ActionButton({
  boardId,
  listId,
  list,
}: TActionButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? "리스트 추가" : "할 일 추가";

  return isFormOpen ? (
    <DropdownForm
      setIsFormOpen={setIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div
      className={list ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>
  );
}
