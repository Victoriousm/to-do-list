import { AbstractComponent } from "../framework/view/abstract-component.js";



function createEmptyTaskComponent(){
    return (
        `<div class="empty_task">
        <p>You have no tasks here</p>
        </div>`);
}

export default class EmptyTaskComponent extends AbstractComponent{


    get template(){
        return createEmptyTaskComponent();
    }

    removeElement() {
        this.element = null;
      }
    
}