import {createElement} from '../framework/render.js';


function createTaskBoardComponentTemplate() {
    return (
        
        `
            <ul class="backlog">
                <label class="backlog_title">Бэклог</label>
                <li>Выучить JS</li>
                <li>Выучить React</li>
                <li>Выучить домашку</li>
            </ul>

        
              <ul class="process" >
                    <label class="process_title">в процссе</label>
                    <li>Выпить смузи</li>
                    <li>попить воды</li>
             </ul>

             <ul class="ready">
                <label class="ready_title">готово</label>
                <li>Позвонить маме</li>
                    <li>Погладить</li>
             </ul>

             <ul class="basket">
                <label class="basket_title">Корзина</label>
                <li>Сходить погулять</li>
                <li>Прочитать Войну и Мир</li>
                <button class="cancel" type="button">X Очистить</button>

             </ul>
          

             `
      );
}


export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    console.log(this.element)
    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
