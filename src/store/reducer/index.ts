import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
  modal: modalReducer,
  boards: boardsReducer,
  logger: loggerReducer,
};

export default reducer;
