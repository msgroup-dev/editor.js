class Color {
  static get CSS() {
    return 'cdx-color';
  };

  constructor({ api, config = {} }) {
    this.api = api;
    this.button = null;
    this.tag = 'SPAN';
    this.currentMark = null;
    this.config = config || {};

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };

    this.classNameColors = this.config.colors || [`${Color.CSS}_view_default`, `${Color.CSS}_view_danger`, `${Color.CSS}_view_success`];
    this.colorList = null;
    this.buttonsList = [];
    this.currentClassColor = '';

    this.listColorClasses = {
      list: 'color-list',
      listHidden: 'color-list_view_hidden',
      item: 'color-list__item',
      button: 'color-list__button'
    };

    this.onClickButtonColor = ({ target }) => {
      this.removeCurrentClassColor();
      this.setCurrentClassColor(target.dataset.className);
    };
  }

  static get isInline() {
    return true;
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  renderActions() {
    this.colorList = document.createElement('ul');
    this.colorList.classList.add(this.listColorClasses.list, this.listColorClasses.listHidden);

    this.classNameColors.forEach((className) => {
      const li = document.createElement('li');
      const button = document.createElement('button');

      button.classList.add(this.listColorClasses.button, className);
      button.type = 'button';
      button.textContent = 'C';

      button.dataset.className = className;

      this.buttonsList.push(button);

      li.classList.add(this.listColorClasses.item);
      li.appendChild(button);

      this.colorList.appendChild(li);
    });

    return this.colorList;
  }

  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag, Color.CSS);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    this.currentMark = document.createElement(this.tag);

    this.currentMark.classList.add(Color.CSS);
    this.setCurrentClassColor(this.classNameColors[0]);
    this.currentMark.appendChild(range.extractContents());

    range.insertNode(this.currentMark);

    this.api.selection.expandToTag(this.currentMark);
  }

  unwrap(termWrapper) {
    this.api.selection.expandToTag(termWrapper);

    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let unwrappedContent = range.extractContents();

    termWrapper.parentNode.removeChild(termWrapper);

    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  checkState() {
    this.currentMark = this.api.selection.findParentTag(this.tag, Color.CSS);
    const state = Boolean(this.currentMark);

    this.checkActions(state);

    this.button.classList.toggle(this.iconClasses.active, state);
  }

  get toolboxIcon() {
    return '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 469.336 469.336"><path d="M456.836,76.168l-64-64.054c-16.125-16.139-44.177-16.17-60.365,0.031L45.763,301.682 c-1.271,1.282-2.188,2.857-2.688,4.587L0.409,455.73c-1.063,3.722-0.021,7.736,2.719,10.478c2.031,2.033,4.75,3.128,7.542,3.128 c0.979,0,1.969-0.136,2.927-0.407l149.333-42.703c1.729-0.5,3.302-1.418,4.583-2.69l289.323-286.983 c8.063-8.069,12.5-18.787,12.5-30.192S464.899,84.237,456.836,76.168z M285.989,89.737l39.264,39.264L120.257,333.998 l-14.712-29.434c-1.813-3.615-5.5-5.896-9.542-5.896H78.921L285.989,89.737z M26.201,443.137L40.095,394.5l34.742,34.742 L26.201,443.137z M149.336,407.96l-51.035,14.579l-51.503-51.503l14.579-51.035h28.031l18.385,36.771 c1.031,2.063,2.708,3.74,4.771,4.771l36.771,18.385V407.96z M170.67,390.417v-17.082c0-4.042-2.281-7.729-5.896-9.542 l-29.434-14.712l204.996-204.996l39.264,39.264L170.67,390.417z M441.784,121.72l-47.033,46.613l-93.747-93.747l46.582-47.001 c8.063-8.063,22.104-8.063,30.167,0l64,64c4.031,4.031,6.25,9.385,6.25,15.083S445.784,117.72,441.784,121.72z"/></svg>';
  }

  showActions() {
    this.colorList.classList.remove(this.listColorClasses.listHidden);

    this.buttonsList.forEach(button => {
      button.addEventListener('click', this.onClickButtonColor);
    });
  }

  hideActions() {
    this.colorList.classList.add(this.listColorClasses.listHidden);

    this.buttonsList.forEach(button => {
      button.removeEventListener('click', this.onClickButtonColor);
    });
  }

  checkActions(state) {
    if (state) {
      this.showActions();
    } else {
      this.hideActions();
    }
  }

  setCurrentClassColor(className) {
    this.currentMark.classList.add(className);
    this.currentClassColor = className;
  }

  removeCurrentClassColor() {
    this.currentMark.classList.remove(this.currentClassColor);
  }

  static get sanitize() {
    return {
      mark: {
        class: Color.CSS
      }
    };
  }
}

export default Color;
