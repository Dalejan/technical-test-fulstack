/**
 * ranks.reducer
 * Encargado de actualizar el estado de los ranks
 */
import * as fromRanks from "../actions/ranks.actions";
import { Rank } from "src/app/classes/rank";

/**
 * initalState
 * Estado inicial de los ranks
 */
const initialState = {
  ranks: [new Rank(null, null, null, null)],
  errors: ""
};

export function ranksReducer(
  state = initialState,
  action: fromRanks.Actions
): { ranks: Rank[]; errors: string } {
  switch (action.type) {
    case fromRanks.RANK_SUCCESS:
      let update;
      state.ranks.map(rank => {
        if (
          rank.user_id === action.rank.user_id &&
          rank.movie_id === action.rank.movie_id
        ) {
          update = true;
          rank.value = action.rank.value;
        }
      });
      return update
        ? { ranks: [...state.ranks], errors: "" }
        : { ranks: [...state.ranks, action.rank], errors: "" };

    case fromRanks.RANK_ERROR:
      return { ranks: [], errors: action.errors };

    case fromRanks.LOAD_MOVIE_RANK_SUCCESS:
      return { ranks: [...action.ranks], errors: "" };

    case fromRanks.LOAD_MOVIE_RANK_ERROR:
      return { ranks: [], errors: action.errors };

    case fromRanks.DELETE_MOVIE_RANK_SUCCESS:
      const new_ranks = [...state.ranks];
      const toDelete = new_ranks
        .map((rank, i) => rank.id === action.rank_id)
        .indexOf(true);
      new_ranks.splice(toDelete, 1);
      return { ranks: [...new_ranks], errors: "" };

    case fromRanks.DELETE_MOVIE_RANK_ERROR:
      return { ranks: [], errors: action.errors };

    default:
      return state;
  }
}
