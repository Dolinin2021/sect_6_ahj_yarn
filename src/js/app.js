import changeTitle from './changeTitle';
import Controller from './controller';
import Interface from './interface';

const arrAddBtn = document.querySelectorAll('.add__btn');
const controller = new Controller(document.querySelector('.col'));
const boards = document.querySelector('.boards');

arrAddBtn.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    const obj = new Interface(e);
    obj.addTask();
  });
});

boards.addEventListener('click', (e) => {
  let parent;
  if (e.target.className === 'popup-close') {
    parent = e.target.closest('.list__item');
    if (parent) {
      parent.remove();
    }
  }
});

changeTitle();

document.body.addEventListener('mousedown', controller.onMouseDown);
document.body.addEventListener('mouseup', controller.onMouseUp);
document.body.addEventListener('mousemove', controller.onMouseMove);
