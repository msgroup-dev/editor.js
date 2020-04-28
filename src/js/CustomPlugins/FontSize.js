class FontSize {
  static get CSS() {
    return 'cdx-font-size';
  };

  constructor({ api, config = {} }) {
    this.api = api;
    this.button = null;
    this.tag = 'SPAN';
    this.currentSpan = null;
    this.config = config || {};

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };

    this.classNameSizes = this.config.sizes || [`${FontSize.CSS}_view_12`, `${FontSize.CSS}_view_14`, `${FontSize.CSS}_view_16`];
    this.sizeList = null;
    this.buttonsList = [];

    this.listSizeClasses = {
      list: 'font-size-list',
      listHidden: 'font-size-list_view_hidden',
      item: 'font-size-list__item',
      button: 'font-size-list__button'
    };

    this.onClickButtonColor = ({ target }) => {
      this.removeCurrentClassSize();
      this.setCurrentClassSize(target.dataset.className);
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
    this.sizeList = document.createElement('ul');
    this.sizeList.classList.add(this.listSizeClasses.list, this.listSizeClasses.listHidden);

    this.classNameSizes.forEach((className) => {
      const li = document.createElement('li');
      const button = document.createElement('button');

      button.classList.add(this.listSizeClasses.button, className);
      button.type = 'button';
      button.textContent = className.replace(/\D+/g,'');

      button.dataset.className = className;

      this.buttonsList.push(button);

      li.classList.add(this.listSizeClasses.item);
      li.appendChild(button);

      this.sizeList.appendChild(li);
    });

    return this.sizeList;
  }

  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag, FontSize.CSS);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    this.currentSpan = document.createElement(this.tag);

    this.currentSpan.classList.add(FontSize.CSS);
    this.setCurrentClassSize(this.classNameSizes[0]);
    this.currentSpan.appendChild(range.extractContents());

    range.insertNode(this.currentSpan);

    this.api.selection.expandToTag(this.currentSpan);
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
    this.currentSpan = this.api.selection.findParentTag(this.tag, FontSize.CSS);
    const state = Boolean(this.currentSpan);

    this.checkActions(state);

    this.button.classList.toggle(this.iconClasses.active, state);
  }

  get toolboxIcon() {
    return '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2.1875 0V1.09375H7.54688V14H8.64062V1.09375H14V0H2.1875Z" /><path d="M0 8.20312V9.29688H2.10547V14H3.19922V9.29688H5.25V8.20312H0Z" /></svg>';
  }

  showActions() {
    this.sizeList.classList.remove(this.listSizeClasses.listHidden);

    this.buttonsList.forEach(button => {
      button.addEventListener('click', this.onClickButtonColor);
    });
  }

  hideActions() {
    this.sizeList.classList.add(this.listSizeClasses.listHidden);

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

  setCurrentClassSize(className) {
    this.currentSpan.classList.add(className);
  }

  removeCurrentClassSize() {
    this.classNameSizes.forEach(className => {
      if (this.currentSpan.classList.contains(className)) {
        this.currentSpan.classList.remove(className);
      }
    });
  }

  static get sanitize() {
    return {
      span: {
        class: true,
      }
    };
  }
}

export default FontSize;
