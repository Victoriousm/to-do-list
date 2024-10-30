import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate(){
    return (
        `<form class="add_exercise" aria-label="Форма добавления задачи">
          <label for="exercise" >Новая задача</label><br>
                <input id="add-task" class="task" type="text" name="exercise" id=" exercise" placeholder="название задача....."/>
                <button class="add" type="submit">+ Добавить</button>
      </form>`
      );
}

export default class FormAddTaskComponent  extends AbstractComponent{
  #handleClick=null;

  #clickHandler=(evt)=>{
    evt.preventDefault();
    this.#handleClick();
  }

  constructor({onClick}){
    super();
    console.log("Feels great")
    this.#handleClick=onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }
  get template() {
    return createFormAddTaskComponentTemplate();
  }



  removeElement() {
    this.element = null;
  }
}