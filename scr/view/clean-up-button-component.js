import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createCleanUpButton(){
    return (`
        <button class="cancel" type="submit">X Очистить</button>
        `);
}

export default class CleanUpButtonComponent extends AbstractComponent{
    get template(){
        return createCleanUpButton();
    }
    // get element(){
    //     if(!this.element){
    //         this.element=createElement(this.getTemplate());
    //     }
    //     return this.element;
    // }
    removeElement(){
        this.element=null;
    }
}