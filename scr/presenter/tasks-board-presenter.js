import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import {render} from '../framework/render.js';
import { Status,StatusLabel } from '../constant.js';
import ClearButtonComponent from "../view/clean-up-button-component.js";
import EmptyTaskComponent from '../view/empty-tasks-component.js';
import CleanUpButtonComponent from '../view/clean-up-button-component.js';



export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent()
  //taskListComponent = new TasksListComponent();
   #boardContainer=null;
   #tasksModel=null;
   #boardTasks=[];
 
  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel=tasksModel;
  }


 init() {
  this.#boardTasks=[...this.#tasksModel.tasks];
  render(this.#tasksBoardComponent, this.#boardContainer);
  for (let status in Status) {
         this.status_title=Status[status];
         this.label=StatusLabel[`${this.status_title}`];
         console.log(`${this.status_title} label ${this.label}`);
         const tasksListComponent = new TaskListComponent({task_status:{status_title:this.status_title,label:this.label}});
         console.log(`happier now: ${tasksListComponent.status}`);
         render(tasksListComponent, this.#tasksBoardComponent.element);
         const tasksForStatus=this.#tasksModel.getTasksByStatus(this.status_title);
         console.log(`happier baby: ${tasksForStatus.length} ${status}`);
         if (tasksForStatus.length==0) {
           const emptyTaskComponent=new EmptyTaskComponent();
           render(emptyTaskComponent,tasksListComponent.element);
         }else{
         for (let j = 0; j < tasksForStatus.length; j++) {
             //const taskComponent = new TaskComponent({task:this.boardTasks[j]});
             //if (this.#boardTasks[j].status==this.status_title) {
               this.#renderTask(tasksForStatus[j],tasksListComponent.element);
               //render(taskComponent, tasksListComponent.element);
             //}
              }
              
          }
          
          if (this.status_title=="basket") {
            console.log("Why not")
            const cleanupComponent= new CleanUpButtonComponent();
            render(cleanupComponent, tasksListComponent.element);
          }
     }
     
   
   }
   #renderTask(task,container){
    const taskComponent=new TaskComponent({task});
    render(taskComponent,container);
   }
  }
 
