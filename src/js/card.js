// Класс представляющий карточку. Имеет всё, чтобы появится и удалиться
export default class Card {
  #el;

  #styles;

  constructor(element) {
    this.#el = element;
    this.#styles = window.getComputedStyle(element);
  }

  clear() {
    this.#el.remove();
  }

  set styles(text) {
    this.#el.style.cssText = text;
  }

  get styles() {
    return this.#styles;
  }

  get proection() {
    return (() => {
      const d = document.createElement('div');
      d.classList.add('proection');
      const { width, height } = this.styles;
      d.style.cssText = `
      width: ${width};
      height: ${height};
      margin: 10px 0;`;
      return d;
    })();
  }

  static create(content) {
    const list = document.querySelector('.list');
    const node = document.createElement('div');
    const popupClose = document.createElement('button');
    popupClose.className = 'popup-close';
    popupClose.type = 'button';

    node.classList.add('list__item');
    node.classList.add('draggable');
    node.textContent = content;

    node.appendChild(popupClose);
    list.appendChild(node);

    return new Card(node);
  }

  get element() {
    return this.#el;
  }
}
