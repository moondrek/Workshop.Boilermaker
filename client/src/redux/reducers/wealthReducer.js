const initialState = {};

//ACTION CONSTANTS
const WEALTH_INITIALIZED = "WEALTH_INITIALIZED";
const WEALTH_UPDATED = "WEALTH_UPDATED";

//ACTION CREATORS

export const wealthInitialized = (newWealth) => ({
  type: WEALTH_INITIALIZED,
  newWealth,
});
export const wealthUpdated = (wealthType, delta) => ({
  type: WEALTH_UPDATED,
  wealthType,
  delta,
});

const wealthReducer = (wealth = initialState, action) => {
  switch (action.type) {
    case WEALTH_INITIALIZED:
      return action.newWealth;
    case WEALTH_UPDATED:
      return {
        ...wealth,
        [action.wealthType]: wealth[action.wealthType] + action.delta,
      };
    default:
      return wealth;
  }
};

export default wealthReducer;
