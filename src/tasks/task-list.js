import { taskActions } from './actions';
import { Task } from './task';
import { TaskService } from './taskService';

export const taskList = new TaskService({
  onAdd: taskActions.createTaskFulfilled,
  onChange: taskActions.updateTaskFulfilled,
  onLoad: taskActions.loadTasksFulfilled,
  onRemove: taskActions.removeTaskFulfilled
}, Task);
