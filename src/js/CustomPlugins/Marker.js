class Marker {
  static get CSS() {
    return 'cdx-marker';
  };

  constructor({ api, config = {} }) {
    this.api = api;
    this.button = null;
    this.tag = 'MARK';
    this.currentMark = null;
    this.config = config || {};

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };

    this.classNameColors = this.config.colors || [`${Marker.CSS}_view_default`, `${Marker.CSS}_view_danger`, `${Marker.CSS}_view_success`];
    this.colorList = null;
    this.buttonsList = [];

    this.listColorClasses = {
      list: 'background-color-list',
      listHidden: 'background-color-list_view_hidden',
      item: 'background-color-list__item',
      button: 'background-color-list__button'
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

    let termWrapper = this.api.selection.findParentTag(this.tag, Marker.CSS);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    this.currentMark = document.createElement(this.tag);

    this.currentMark.classList.add(Marker.CSS);
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
    this.currentMark = this.api.selection.findParentTag(this.tag, Marker.CSS);
    const state = Boolean(this.currentMark);

    this.checkActions(state);

    this.button.classList.toggle(this.iconClasses.active, state);
  }

  get toolboxIcon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 2 13 12" width="14" height="14"><path d="M8.367 9.633L10.7 10.98l-.624 1.135-.787-.025-.78 1.35H6.94l1.193-2.066-.407-.62.642-1.121zm.436-.763l2.899-5.061a1.278 1.278 0 011.746-.472c.617.355.835 1.138.492 1.76l-2.815 5.114-2.322-1.34zM2.62 11.644H5.39a.899.899 0 110 1.798H2.619a.899.899 0 010-1.798z"/></svg>';
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
  }

  removeCurrentClassColor() {
    this.classNameColors.forEach(className => {
      if (this.currentMark.classList.contains(className)) {
        this.currentMark.classList.remove(className);
      }
    });
  }

  static get sanitize() {
    return {
      mark: {
        class: Marker.CSS
      }
    };
  }
}

export default Marker;
