import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import TaskAdditionComponent from './view/task-addition-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';



const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskListContainer = document.querySelector('.tasks');
const taskContainer  = document.querySelector('.task')


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskAdditionComponent(), formContainer);

// render(new TaskBoardComponent(), taskListContainer);
var i=0
while (i<4) {
    render(new TaskListComponent(), taskListContainer,RenderPosition.AFTERBEGIN); 
    i+=1;

    
}





