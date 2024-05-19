import React from "react";
import { IList } from "../../types";
import List from "../List";
import ActionButton from "../ActionButton";
import { listsContainer } from "./style.css";

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
};

export default function ListContainer({
  lists,
  boardId,
}: TListsContainerProps) {
  return (
    <div className={listsContainer}>
      {lists.map((list) => (
        <List key={list.id} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={""} list />
    </div>
  );
}
