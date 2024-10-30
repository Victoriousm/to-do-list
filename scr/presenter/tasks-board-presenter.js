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
    render(this.#tasksBoardComponent, this.#boardContainer);//renders empty task board
    this.#renderBoard();//adds tasks and lists
    
  
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
       render(emptyTaskComponent,tasksListComponent.element);//renders the empty task
     }else{
     for (let j = 0; j < tasksForStatus.length; j++) {
         
           this.#renderTask(tasksForStatus[j],tasksListComponent.element);
        
         
     }
    
   }
   if (this.status_title=="basket") {
     this.#renderResetButton(tasksListComponent.element);
   }
 }
  }
  #handleTaskDrop(taskId,newStatus){
    this.#tasksModel.updateTaskStatus(taskId,newStatus);
   }
  #renderResetButton(container){
   const cleanupComponent= new ClearButtonComponent({onClick:this.#clearAllTasks.bind(this)});
   render(cleanupComponent, container);
  }
  
  #clearAllTasks(){
   this.#tasksModel.tasks=this.#tasksModel.clearTasks();
  // this.#clearBoard();
  }
 
  createTask(){
   const taskTitle=document.querySelector('#add-task').value.trim();
   if (!taskTitle) {
     return;
   }
   const newTask=this.#tasksModel.addTask(taskTitle);//function that adds a task to the list
 
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