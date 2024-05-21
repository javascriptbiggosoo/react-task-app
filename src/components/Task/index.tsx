import React from "react";
import { container, description, title } from "./style.css";
import { Draggable } from "react-beautiful-dnd";

type TTaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

export default function Task({
  index,
  id,
  boardId,
  taskName,
  taskDescription,
}: TTaskProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
}
