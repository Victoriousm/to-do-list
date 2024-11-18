import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskListComponent from './view/task-list-component.js';
import TasksModel from './model/tasks-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT='https://673b25dd339a4ce4451ad888.mockapi.io';
const bodyContainer = document.querySelector('.board-app'); 
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');
const tasksModel=new TasksModel({
   tasksApiService: new TasksApiService(END_POINT)
});

const tasksBoardPresenter = new TasksBoardPresenter({boardContainer: tasksBoardContainer,tasksModel});//creates it to be rendered
const formAddTaskComponent=new FormAddTaskComponent({onClick:handleNewTaskButtonClick})//does the same here

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);
tasksBoardPresenter.init();

function handleNewTaskButtonClick(){
    tasksBoardPresenter.createTask();
}