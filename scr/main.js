import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskListComponent from './view/task-list-component.js';
import TasksModel from './model/tasks-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';

const bodyContainer = document.querySelector('.board-app'); 
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');
const tasksModel=new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({boardContainer: tasksBoardContainer,tasksModel});//creates it to be rendered
const formAddTaskComponent=new FormAddTaskComponent({onClick:handleNewTaskButtonClick})//does the same here

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);
tasksBoardPresenter.init();

function handleNewTaskButtonClick(){
    tasksBoardPresenter.createTask();
}