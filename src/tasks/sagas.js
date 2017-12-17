import { LOCATION_CHANGE } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { taskActions } from './actions';
import { taskList } from './task-list';

function subscribe() {
  return eventChannel(emit => taskList.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  }
  catch (error) {
    yield put(onError(error));
  }
}

const createTask = write.bind(null, taskList, taskList.push, taskActions.createTaskFailed);
const removeTask = write.bind(null, taskList, taskList.remove, taskActions.removeTaskFailed);
const updateTask = write.bind(null, taskList, taskList.update, taskActions.updateTaskFailed);
const getAllTask = write.bind(null, taskList, taskList.getAll, taskActions.getAllTasksFailed);

//=====================================
//  WATCHERS
//-------------------------------------

function* watchCreateTask() {
  while (true) {
    let { payload } = yield take(taskActions.CREATE_TASK);
    yield fork(createTask, payload.task);
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === '/') {
      const params = new URLSearchParams(payload.search);
      const filter = params.get('filter');
      yield put(taskActions.filterTasks(filter));
    }
  }
}

function* watchAuthentication() {
  while (true) {
    yield take(taskActions.SIGN_IN_FULFILLED);
    yield fork(read);
  }
}

function* watchReadInitialTasks() {
  while (true) {
    yield take(taskActions.SIGN_IN_FULFILLED);
    yield fork(getAllTask);
  }
}

function* watchRemoveTask() {
  while (true) {
    let { payload } = yield take(taskActions.REMOVE_TASK);
    yield fork(removeTask, payload.task.id);
  }
}

function* watchUpdateTask() {
  while (true) {
    let { payload } = yield take(taskActions.UPDATE_TASK);
    yield fork(updateTask, payload.task.id, payload.changes);
  }
}

//=====================================
//  TASK SAGAS
//-------------------------------------

export const taskSagas = [
  fork(watchAuthentication),
  fork(watchReadInitialTasks),
  fork(watchCreateTask),
  fork(watchLocationChange),
  fork(watchRemoveTask),
  fork(watchUpdateTask)
];