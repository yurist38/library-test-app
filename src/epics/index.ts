import { combineEpics } from 'redux-observable';
import fetchEpic from './search.epic';

const combinedEpics = combineEpics(
  fetchEpic,
);

export default combinedEpics;
