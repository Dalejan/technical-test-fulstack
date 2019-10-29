/**
 * comments.reducer
 * Encargado de actualizar el estado de los commentarios
 */
import * as fromComments from "../actions/comments.actions";
import { Comment } from "src/app/classes/comment";

/**
 * initalState
 * Estado inicial de los commentarios
 */
const initialState = {
  comments: [new Comment(null, null, null, null, null, null)],
  errors: ""
};

export function commentsReducer(
  state = initialState,
  action: fromComments.Actions
): { comments: Comment[]; errors: string } {
  switch (action.type) {
    case fromComments.DO_COMMENT_SUCCESS:
      return { comments: [...state.comments, action.comment], errors: "" };

    case fromComments.DO_COMMENT_ERROR:
      return { comments: [], errors: action.error };

    case fromComments.LOAD_COMMENTS_SUCCESS:
      return { comments: action.comments, errors: "" };

    case fromComments.LOAD_COMMENTS_ERROR:
      return { comments: [], errors: action.error };

    default:
      return state;
  }
}
