import {render,createElement,RenderPosition} from '../framework/render.js';
import TaskComponent from './task-component.js';

function createTaskListComponent() {
    return (
        `
            <ul class="tasklist">
            Називание блок
            </ul>
          
          `
      );
}


export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponent();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    var a=0;
    console.log(`I dont'know: ${this.element.className}`);
    while (a<4) {
    render(new TaskComponent(),this.element ,RenderPosition.BEFOREEND); 
    a+=1;

    
}


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
