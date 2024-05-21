import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";

const reducer = {
  modal: modalReducer,
  boards: boardsReducer,
  logger: loggerReducer,
  user: userReducer,
};

export default reducer;
