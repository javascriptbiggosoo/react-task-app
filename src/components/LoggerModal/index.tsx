import React from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiX } from "react-icons/fi";
import LogItem from "./LogItem";
import {
  body,
  closeButton,
  header,
  modalWindow,
  title,
  wrapper,
} from "./style.css";

type TLoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoggerModal({ setIsLoggerOpen }: TLoggerModalProps) {
  const logs = useTypedSelector((state) => state.logger.logArray);
  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX className={closeButton} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log) => (
            <LogItem key={log.id} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
}
