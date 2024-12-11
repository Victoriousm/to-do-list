import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import {render} from '../framework/render.js';
import { Status,StatusLabel,UserAction } from '../constant.js';
import ClearButtonComponent from "../view/reset-button-component.js";
import EmptyTaskComponent from '../view/empty-tasks-component.js';

import TaskPresenter from './task-presenter.js';
export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent()
   #boardContainer=null;
   #tasksModel=null;
   #boardTasks=[];
   #cleanupComponent=null;
 
  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel=tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }
 
 
  async init() {
    await this.#tasksModel.init();
     this.#boardTasks=[...this.#tasksModel.tasks];
     this.#clearBoard();
     render(this.#tasksBoardComponent,this.#boardContainer);
     this.#renderBoard();
    
  
  }

  #renderTask(task,container){
   const taskComponent=new TaskComponent({task});
   const taskPresenter= new TaskPresenter({taskListContainer:container});
   taskPresenter.init(task)
  }
  
  #renderBoard(){
   for (let status in Status) {
     this.status_title=Status[status];
     this.label=StatusLabel[`${this.status_title}`];
     const tasksListComponent = new TaskListComponent({task_status:{status_title:this.status_title,label:this.label}, onTaskDrop: this.#handleTaskDrop.bind(this)});
     render(tasksListComponent, this.#tasksBoardComponent.element);
     const tasksForStatus=this.#tasksModel.getTasksByStatus(this.status_title);
     if (tasksForStatus.length==0) {
       const emptyTaskComponent=new EmptyTaskComponent();
       render(emptyTaskComponent,tasksListComponent.element);
     }else{
     for (let j = 0; j < tasksForStatus.length; j++) {
         
           this.#renderTask(tasksForStatus[j],tasksListComponent.element);
        
         
     }
    
   }
   if (this.status_title=="basket") {
    const basketItems=this.#tasksModel.getTasksByStatus("basket")
    if (basketItems.length==0) {
      //console.log("Okayyyy")
      this.#renderResetButton(tasksListComponent.element,false);
    }else{
      this.#renderResetButton(tasksListComponent.element,true);
    }
   // //("Why not");
    
  }
 }
  }

  
  async #handleTaskDrop(taskId,newStatus){
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Error when uploading the status of the task', error);
    }
   }

  #renderResetButton(container,active){
   const cleanupComponent= new ClearButtonComponent({
    onClick:this.#handleClearBasketClick.bind(this),active:active});
   render(cleanupComponent, container);
  }
  
  #clearAllTasks(){
   this.#tasksModel.tasks=this.#tasksModel.clearTasks();

  }
 
  async createTask(){
    const taskTitle=document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    try{
    await this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value='';
    }catch(error){
      console.error("Error when creating the exercise",error)
    }
   }
  
  #handleModelChange(){
   this.#clearBoard();
   this.#renderBoard();
  }

  #handleModelEvent(event, payload){
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        if (this.#cleanupComponent) {
          this.#cleanupComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
        }
        break;
    }
    
   }
  
  async #handleClearBasketClick(){
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (error) {
      console.error("Error when cleaning the basket")
    }
  }

  #clearBoard(){
   this.#tasksBoardComponent.element.innerHTML='';
  }
 }