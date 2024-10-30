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
        const length=this.#boardtasks.push(newTask);
       
        this._notifyObservers();
        return newTask;//adds task to list
    }

    clearTasks(){
        this.#boardtasks= this.#boardtasks.filter(task=>task.status!=='basket');
        this._notifyObservers();
        return this.#boardtasks;
    }
    
    updateTaskStatus(taskId, newStatus){
        const task= this.#boardtasks.find(task => task.id === taskId)
        if (task) {
            console.log(`task status: ${task.status} new status ${newStatus}`);
            task.status=newStatus.status_title;
            this._notifyObservers();
        }
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