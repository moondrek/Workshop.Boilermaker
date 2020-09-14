import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  wealthUpdated,
  wealthInitialized,
} from "../redux/reducers/wealthReducer";

const App = (props) => {
  useEffect(() => {
    props.wealthInitialized({ success: 1 });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          props.wealthUpdated("success", 3);
        }}
      >
        Button
      </button>
      <button
        type="button"
        onClick={() => {
          props.wealthInitialized({ success: 1 });
        }}
      >
        Initialize Wealth
      </button>
      <div>{JSON.stringify(props.wealth)}</div>
    </>
  );
};

const mapStatetoProps = (state) => ({
  wealth: state.wealth,
});

const mapDispatchToProps = (dispatch) => ({
  wealthUpdated: (wealthType, delta) => {
    dispatch(wealthUpdated(wealthType, delta));
  },
  wealthInitialized: (wealth) => {
    dispatch(wealthInitialized(wealth));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
