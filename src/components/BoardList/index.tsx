import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./style.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: (id: string) => void;
};

export default function BoardList({
  activeBoardId,
  setActiveBoardId,
}: TBoardListProps) {
  const dispatch = useTypedDispatch();
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isAuth } = useAuth();

  const handleClick = () => {
    setIsFormOpen(true);
  };

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch(setUser({ email: "", id: "" }));
    });
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
              [boardItem]: board.id !== activeBoardId,
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
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
}
