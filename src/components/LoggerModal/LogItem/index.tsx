import React from "react";
import { ILogItem } from "../../../types";
import { BsFillPersonFill } from "react-icons/bs";
import { author, date, logItemWrap, message } from "./style.css";

type TLogItemProps = {
  logItem: ILogItem;
};

export default function LogItem({ logItem }: TLogItemProps) {
  const timeOffset = new Date(Date.now() - +logItem.timestamp);

  const showOffsetTime = `
  ${
    timeOffset.getMinutes() > 0
      ? timeOffset.getMinutes() + "분 전"
      : timeOffset.getSeconds() > 0
      ? timeOffset.getSeconds() + "초 전"
      : timeOffset.getSeconds() === 0 && "방금 전"
  }
  `;
  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.author}
      </div>
      <div className={message}>{logItem.message}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
}
