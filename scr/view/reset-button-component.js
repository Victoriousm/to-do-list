import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createCleanUpButton(){
    return (`
        <button class="cancel" type="submit">X Очистить</button>
        `);
}

export default class ClearButtonComponent extends AbstractComponent{
    #handleClick=null;

  #clickHandler=(evt)=>{
    evt.preventDefault();
    this.#handleClick();
  }

  constructor({onClick}){
    super();
    
    this.#handleClick=onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }
    get template(){
        return createCleanUpButton();
    }
    removeElement(){
        this.element=null;
    }
}