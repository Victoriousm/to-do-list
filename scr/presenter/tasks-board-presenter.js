import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import {render} from '../framework/render.js';
import { Status,StatusLabel } from '../constant.js';
import ClearButtonComponent from "../view/reset-button-component.js";
import EmptyTaskComponent from '../view/empty-tasks-component.js';

import TaskPresenter from './task-presenter.js';

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent()
   #boardContainer=null;
   #tasksModel=null;
   #boardTasks=[];
 
  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel=tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }
 
 
  init() {
     this.#boardTasks=[...this.#tasksModel.tasks];
    render(this.#tasksBoardComponent, this.#boardContainer);
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
     console.log(`${this.status_title} label ${this.label}`);
     const tasksListComponent = new TaskListComponent({task_status:{status_title:this.status_title,label:this.label}});
     console.log(` ${tasksListComponent.status}`);
     render(tasksListComponent, this.#tasksBoardComponent.element);
     const tasksForStatus=this.#tasksModel.getTasksByStatus(this.status_title);
     console.log(` ${tasksForStatus.length} ${status}`);
     if (tasksForStatus.length==0) {
       const emptyTaskComponent=new EmptyTaskComponent();
       render(emptyTaskComponent,tasksListComponent.element);
     }else{
     for (let j = 0; j < tasksForStatus.length; j++) {
         
           this.#renderTask(tasksForStatus[j],tasksListComponent.element);
        
         
     }
    
   }
   if (this.status_title=="basket") {
     console.log("Why not");
     this.#renderResetButton(tasksListComponent.element);
   }
 }
  }
  #renderResetButton(container){
   console.log("Clear board container");
   const cleanupComponent= new ClearButtonComponent({onClick:this.#clearAllTasks.bind(this)});
   render(cleanupComponent, container);
  }
 
  #clearAllTasks(){
   console.log("Clear board");
   this.#tasksModel.tasks=[];
   this.#clearBoard();
  }
 
  createTask(){
   const taskTitle=document.querySelector('#add-task').value.trim();
   if (!taskTitle) {
     return;
   }
   const newTask=this.#tasksModel.addTask(taskTitle);
 
   document.querySelector('#add-task').value='';
  }
  #handleModelChange(){
   this.#clearBoard();
   this.#renderBoard();
  }
  #clearBoard(){
   this.#tasksBoardComponent.element.innerHTML='';
  }
 }