const Axios = require("axios");
const initialState = {};

//ACTION CONSTANTS
const INITIALIZE_PLAYER = "INITIALIZE_PLAYER";

//ACTION CREATORS

export const initializePlayer = (player) => ({
  type: INITIALIZE_PLAYER,
  player,
});

export const fetchMe = () => async (dispatch) => {
  const { data: player } = await Axios.get("/api/auth/me");
  dispatch(initializePlayer(player));
};
export const loginPlayer = (credentials) => async (dispatch) => {
  const { data: player } = await Axios.post("/api/auth/login", credentials);
  dispatch(initializePlayer(player));
};
const playerReducer = (player = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_PLAYER:
      return action.player;
    default:
      return player;
  }
};

export default playerReducer;
