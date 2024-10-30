import TaskComponent from "../view/task-component.js";
import {render} from "../framework/render.js"
import generateIdentificationNumber from '../utils.js'

export default class TaskPresenter{
    #taskListContainer = null;
    #taskComponent = null;
    #task = null;

    constructor({taskListContainer}){
        this.#taskListContainer=taskListContainer;
    }
    init(task){
        this.#task=task;
      //  task.id=generateIdentificationNumber();
        this.#taskComponent=new TaskComponent({task:this.#task})
        render(this.#taskComponent,this.#taskListContainer)
        
    }

}