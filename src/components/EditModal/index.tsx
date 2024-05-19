import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  deleteTask,
  setModalActive,
  updateTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./style.css";

export default function EditModal() {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    // Close the modal
    dispatch(setModalActive(false));
  };

  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        name: ev.target.value,
      },
    });
  };
  const handleDescriptionChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        description: ev.target.value,
      },
    });
  };
  const handleAuthorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        owner: ev.target.value,
      },
    });
  };
  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        id: crypto.randomUUID(),
        message: `Task ${data.task.name} updated`,
        timestamp: String(Date.now()),
        author: "User",
      })
    );
    dispatch(setModalActive(false));
  };
  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.id,
      })
    );
    dispatch(
      addLog({
        id: crypto.randomUUID(),
        message: `Task ${editingState.task.name} deleted`,
        timestamp: String(Date.now()),
        author: "User",
      })
    );
    dispatch(setModalActive(false));
  };
  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.name}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type="text"
          value={data.task.name}
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type="text"
          value={data.task.description}
          onChange={handleDescriptionChange}
        />
        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type="text"
          value={data.task.owner}
          onChange={handleAuthorChange}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
