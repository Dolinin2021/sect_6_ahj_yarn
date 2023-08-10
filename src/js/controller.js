import Card from './card';

// Класс для управления всей логикой. Слушает интерфейс и реагирует на него
export default class Controller {
  constructor(container) {
    this.container = container;
    // Card
    this.draggingElement = null;
    // Card.proection
    this.draggingProection = null;
  }

  setDraggingElement(node) {
    this.draggingElement = new Card(node);
  }

  replaceDragging() {
    this.draggingProection.replaceWith(this.draggingElement.element);
    this.draggingElement.element.style = this.draggingElement.styles;
  }

  clear() {
    this.draggingElement = null;
    this.draggingProection = null;
  }

  onMouseDown = (evt) => {
    const { target } = evt;

    if (target.classList.contains('draggable')) {
      this.shiftX = evt.offsetX;
      this.shiftY = evt.offsetY;
      this.setDraggingElement(target);
      this.draggingElement.style = `left: ${evt.pageX - this.shiftX}px; top: ${evt.pageY - this.shiftY}px;`;
      this.proectionAct(evt);
    }
  };

  onMouseUp = () => {
    if (this.draggingElement) {
      this.replaceDragging();
      this.clear();
    }
  };

  // Рассчёт позиции вставки проекции и вставка или удаление
  proectionAct(evt) {
    const { target } = evt;
    const element = this.draggingElement;
    const proection = this.draggingProection;
    if (target.classList.contains('draggable') && !target.classList.contains('proection')) {
      const { y, height } = target.getBoundingClientRect();
      const appendPosition = y + height / 2 > evt.clientY ? 'beforebegin' : 'afterend';
      if (!proection) {
        this.draggingProection = element.proection;
      } else {
        proection.remove();
        target.insertAdjacentElement(appendPosition, proection);
      }
    }
  }

  onMouseMove = (evt) => {
    if (this.draggingElement) {
      const { pageX, pageY } = evt;
      const element = this.draggingElement;
      const { width, height } = this.draggingElement.styles;
      element.styles = `position: absolute; left: ${pageX - this.shiftX}px; top: ${pageY - this.shiftY}px; pointer-events: none; width: ${width}; height: ${height};`;
      this.proectionAct(evt);
    }
  };
}
