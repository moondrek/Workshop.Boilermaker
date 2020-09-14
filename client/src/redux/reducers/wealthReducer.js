const initialState = {};

//ACTION CONSTANTS
const WEALTH_INITIALIZED = "WEALTH_INITIALIZED";
const WEALTH_UPDATED = "WEALTH_UPDATED";

//ACTION CREATORS

const wealthInitialized = (newWealth) => ({
  type: WEALTH_INITIALIZED,
  newWealth,
});
const wealthUpdated = (updatedWealths) => ({
  type: WEALTH_INITIALIZED,
  updatedWealths,
});

const wealthReducer = (wealth = initialState, action) => {
  switch (action.type) {
    case WEALTH_INITIALIZED:
      return action.newWealth;
    case WEALTH_UPDATED:
      return { ...wealth, ...action.updatedWealths };
    default:
      return wealth;
  }
};

export default wealthReducer;
