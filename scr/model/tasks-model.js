import {tasks} from '../mock/task.js';
import generateIdentificationNumber from '../utils.js'

export default class TasksModel{
    #boardtasks=tasks;
    #observers=[];

    get tasks(){
        return this.#boardtasks;
    }
    getTasksByStatus(status){
        return this.#boardtasks.filter(task=>task.status===status);
    }
    set tasks(value){
        this.#boardtasks=value;
    }

    addTask(title){
        const newTask={
            title,
            status:'backlog',
            id:generateIdentificationNumber()
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }
    addObserver(observer){
        this.#observers.push(observer);
    }
    removeObserver(observer){
        this.#observers=this.#observers.filter((obs)=>obs!==observer)
    }
    _notifyObservers(){
        this.#observers.forEach((observer)=>observer());
    }
}