import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate(){
    return (
        `<form class="add_exercise" aria-label="Форма добавления задачи">
          <label for="exercise" >Новая задача</label><br>
                <input class="task" type="text" name="exercise" id=" exercise" placeholder="название задача....."/>
                <button class="add" type="button">+ Добавить</button>
      </form>`
      );
}

export default class FormAddTaskComponent  extends AbstractComponent{
  get template() {
    return createFormAddTaskComponentTemplate();
  }


  // get element() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }


  //   return this.element;
  // }


  removeElement() {
    this.element = null;
  }
}