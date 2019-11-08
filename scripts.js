const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    for(let item of items.querySelectorAll('.item'))
    {
      const checkbox = item.querySelector('.item__checkbox');
      const text = item.querySelector('.item__text');
      const button = item.querySelector('.item__button');
      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const input = e.target.querySelector('.form__input');
    if(input.value.trim().length > 0) {
      add(input.value.trim());
    }
    input.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const item = e.target.parentNode;
    item.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const target = e.target;
    const item = target.parentNode;
    const text = target.textContent;
    item.removeChild(target);
    const input = el('input', 'item__edit');
    const button = item.querySelector('.item__button');
    input.setAttribute('type', 'text');
    input.value = text;
    input.addEventListener('keyup', commit);
    item.appendChild(input);
    item.appendChild(button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const target = e.target;
    const keyPressed = e.keyCode;
    const item = target.parentNode;
    const textValue = target.value;
    if (keyPressed !== ENTER_KEYCODE) { return;}
    target.removeEventListener('keyup', commit);
    item.removeChild(target);
    const button = item.querySelector('.item__button');
    const text = el('span', 'item__text', edit);
    text.appendChild(document.createTextNode(textValue));
    item.appendChild(text);
    item.appendChild(button);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newItem = el('li', 'item');
    const checkbox = el('input', 'item__checkbox', finish);
    const text = el('span', 'item__text', edit);
    const button = el('button', 'item__button', deleteItem);
    checkbox.setAttribute('type', 'checkbox');
    text.appendChild(document.createTextNode(value));
    button.appendChild(document.createTextNode('Eyða'));
    newItem.appendChild(checkbox);
    newItem.appendChild(text);
    newItem.appendChild(button);
    items.appendChild(newItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const item = e.target.parentNode;
    const checkbox = item.querySelector('.item__checkbox');
    const text = item.querySelector('.item__text');
    const button = item.querySelector('.item__button');
    checkbox.removeEventListener('click', finish);
    text.removeEventListener('click', edit);
    button.removeEventListener('click', deleteItem);
    items.removeChild(item);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    if(className) {
      element.classList.add(className);
    }
    if (clickHandler) {
      element.addEventListener('click', clickHandler);
    }
    return element;
  }

  return {
    init: init
  }
})();
