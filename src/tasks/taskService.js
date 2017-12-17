import 'isomorphic-fetch';

export class TaskService {
  
  constructor(actions, modelClass) {
    this._actions = actions;
    this._modelClass = modelClass;
  }

  callApi(endpoint, method = 'POST', options={}) {
    let fetchOptions = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    if(method !== "GET" && options) {
        fetchOptions.body = JSON.stringify({
            data: options
        });
    }

    return fetch(endpoint, fetchOptions)
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                return response.text()
                    .then(responseText => {
                        if(responseText !== "") {
                            return(JSON.parse(responseText));
                        }
                        else {
                            return;
                        }
                        
                    }
                );
            }
            else {
                let errorJson = response.text();
                if(errorJson) {
                    let error = JSON.parse(errorJson)
                    throw Error(error.message); 
                }
                else {
                    throw Error(response.statusText);
                }
            }
        });
  }

  push(value) {
    return new Promise((resolve, reject) => {
        this.callApi(`/task/create/${value.title}/${value.description}`).then((data) =>  {
                this.emitDispatch(this._actions.onAdd(this.unwrapTask(data.task)));
                resolve();
            }
        ).catch(error => reject(error));
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
        this.callApi(`/task/delete/${id}`, 'DELETE').then((data) =>  {
                this.emitDispatch(this._actions.onRemove(this.unwrapTask(data.task)));
                resolve(); 
            }
        ).catch(error => reject(error));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
        this.callApi('/tasks', 'GET').then((data) =>  {
                this.emitDispatch(this._actions.onLoad(data.tasks));
                resolve();
            }
        ).catch(error => reject(error));
    });
  }

  update(id, value) {
    return new Promise((resolve, reject) => {
        this.callApi(`/task/update/${id}/${value.title}/${value.description}/${value.completed}`, 'PUT').then((data) => {
                this.emitDispatch(this._actions.onChange(this.unwrapTask({
                    id: id, 
                    title: value.title, 
                    description: value.description,
                    completed: value.completed
                })));
                resolve();
            }
        ).catch(error => reject(error));
    });
  }

  subscribe(emit) {
    this.emitDispatch = emit;
    return () => this.emitDispatch = null;
  }

  unwrapTask(task) {
    return new this._modelClass(task);
  }
}