import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `<header class="main_header">
        <h1>Список задач</h1>
        </header>`
      );
}


export default class HeaderComponent extends AbstractComponent{
  get template() {
    return createHeaderComponentTemplate();
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