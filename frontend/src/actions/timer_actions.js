import { getTimers, getUserTimers, postTimer, storeSession, getSession } from '../util/timer_api_util';
import CryptoJS from 'crypto-js';
import reactcookie from 'react-cookie';
import Cookies from 'universal-cookie';


export const RECEIVE_TIMERS = "RECEIVE_TIMERS";
export const RECEIVE_USER_TIMERS = "RECEIVE_USER_TIMERS";
export const RECEIVE_NEW_TIMER = "RECEIVE_NEW_TIMER";

export const receiveTimers = timers => ({
  type: RECEIVE_TIMERS,
  timers
});

export const receiveUserTimers = timers => ({
  type: RECEIVE_USER_TIMERS,
  timers
});

export const receiveNewTimer = timer => ({
  type: RECEIVE_NEW_TIMER,
  timer
});

export const fetchTimers = () => dispatch => (
  getTimers()
    .then(timers => dispatch(receiveTimers(timers)))
    .catch(err => console.log(err))
);

export const fetchUserTimers = id => dispatch => (
  getUserTimers(id)
    .then(timers => dispatch(receiveUserTimers(timers)))
    .catch(err => console.log(err))
);

export const recordTimer = (data, id, a) => dispatch => {
  const cookies = new Cookies();
  let s = a;
  debugger
  // storeSession('testing');
  
  getSession()
  .then(t => {
    // debugger
    let stringifiedData = JSON.stringify(data);
    let encrypted = CryptoJS.AES.encrypt(stringifiedData, id);
    return postTimer({ "encrypted": encrypted.toString(), "t": t.data, "ran": Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15) })
      .then(timer => dispatch(receiveNewTimer(timer)))
      .catch(err => console.log(err));
  });
  
  
};
