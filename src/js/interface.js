import autoBind from 'auto-bind';

export default class Interface {
  constructor(elem) {
    this.addBtn = elem.target;
    this.parent = this.addBtn.closest('.boards__item');
    this.addItemBtn = this.parent.querySelector('.add__item-btn');
    this.textarea = this.parent.querySelector('.textarea');
    this.form = this.parent.querySelector('.form');
    this.cancelBtn = this.parent.querySelector('.cancel__item-btn');
    this.value = '';
    autoBind(this);
  }

  addTask() {
    this.form.style.display = 'block';
    this.addBtn.style.display = 'none';
    this.addItemBtn.style.display = 'none';
    this.textarea.addEventListener('input', this.textareaInput);
    this.cancelBtn.addEventListener('click', this.clear);
    this.addItemBtn.addEventListener('click', this.addItemList, { once: true });
  }

  textareaInput() {
    this.value = this.textarea.value;
    if (this.value) {
      this.addItemBtn.style.display = 'block';
    } else {
      this.addItemBtn.style.display = 'none';
    }
  }

  clear() {
    this.textarea.value = '';
    this.value = '';
    this.form.style.display = 'none';
    this.addBtn.style.display = 'flex';
    this.addItemBtn.removeEventListener('click', this.addItemList);
  }

  addItemList() {
    this.list = this.parent.querySelector('.list');
    this.newItem = document.createElement('div');
    this.popupClose = document.createElement('button');
    this.popupClose.className = 'popup-close';
    this.popupClose.type = 'button';
    this.newItem.classList.add('list__item');
    this.newItem.classList.add('draggable');
    this.newItem.textContent = this.value;
    this.newItem.appendChild(this.popupClose);
    this.list.append(this.newItem);
    this.clear();
  }
}
