import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  wealthUpdated,
  wealthInitialized,
} from "../redux/reducers/wealthReducer";
import { fetchMe, loginPlayer } from "../redux/reducers/playerReducer";

const App = (props) => {
  useEffect(() => {
    props.wealthInitialized({ success: 1 });
    props.fetchMe();
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
      WEALTH:
      <div>{JSON.stringify(props.wealth)}</div>
      YOU:
      <div>{JSON.stringify(props.player)}</div>
      <h1>LOG IN</h1>
      <a href="/api/auth/google">Sign In with Google</a>
      <form onSubmit={props.loginPlayer}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" required></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" required></input>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};

const mapStatetoProps = (state) => ({
  wealth: state.wealth,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  wealthUpdated: (wealthType, delta) => {
    dispatch(wealthUpdated(wealthType, delta));
  },
  wealthInitialized: (wealth) => {
    dispatch(wealthInitialized(wealth));
  },
  fetchMe: () => {
    dispatch(fetchMe());
  },
  loginPlayer: (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(loginPlayer({ email, password }));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
