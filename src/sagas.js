import { all } from 'redux-saga/effects'
import { taskSagas } from './tasks';

export default function* sagas() {
  yield all([
    ...taskSagas
  ]);
}