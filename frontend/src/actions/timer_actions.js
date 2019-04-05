import { getTimers, getUserTimers, postTimer } from '../util/timer_api_util';
import CryptoJS from 'crypto-js';
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
  const s = a;
  let stringifiedData = JSON.stringify(data);
  cookies.set('n', s);
  // stringifiedData = JSON.stringify({time: 12, start: 1200000000000, end: 0, intTime: 12, endTime:"12ms", handle: undefined, isOn: false})
  let encrypted = CryptoJS.AES.encrypt(stringifiedData, id);
  // let decrypted = CryptoJS.AES.decrypt(encrypted, id);
  // decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  
  console.log(s);
  return postTimer({"encrypted" : encrypted.toString(), s})
    .then(timer => dispatch(receiveNewTimer(timer)))
    .catch(err => console.log(err))
};
