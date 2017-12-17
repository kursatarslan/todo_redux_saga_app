import { Record } from 'immutable';

export const Task = new Record({
  completed: false,
  id: null,
  title: null,
  description: null
});
