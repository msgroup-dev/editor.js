class Color {
  static get CSS() {
    return 'cdx-color';
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

    this.classNameColors = this.config.colors || [`${Color.CSS}_view_default`, `${Color.CSS}_view_danger`, `${Color.CSS}_view_success`];
    this.colorList = null;
    this.buttonsList = [];

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
    this.currentSpan = document.createElement(this.tag);

    this.currentSpan.classList.add(Color.CSS);
    this.setCurrentClassColor(this.classNameColors[0]);
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
    this.currentSpan = this.api.selection.findParentTag(this.tag, Color.CSS);
    const state = Boolean(this.currentSpan);

    this.checkActions(state);

    this.button.classList.toggle(this.iconClasses.active, state);
  }

  get toolboxIcon() {
    return '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M10.2935 0.604492L10.56 0.342536L13.6506 3.37986L13.3841 3.64182L10.2935 0.604492Z"/><path d="M10.5612 3.86215C10.5612 3.77115 10.5254 3.68522 10.4593 3.62077L10.3156 3.47933C10.251 3.41584 10.1614 3.37939 10.07 3.37939C9.97718 3.37939 9.88999 3.41488 9.82441 3.47957L4.52283 8.6895C4.457 8.75395 4.42114 8.83964 4.42114 8.93064C4.42114 9.02212 4.457 9.10781 4.52283 9.17226L4.66651 9.31346C4.79791 9.44308 5.02732 9.44212 5.15774 9.31346L10.4593 4.10353C10.5254 4.03884 10.5612 3.95315 10.5612 3.86215V3.86215Z" /><path d="M13.9995 2.23083C13.9995 1.63486 13.7635 1.07462 13.3349 0.653172C12.906 0.231965 12.3362 0 11.7298 0H10.9089L13.9997 3.03752L13.9995 2.23083Z" /><path d="M13.4047 4.34197L9.57655 0.579834L1.33252 8.45025L5.16066 12.2124L13.4047 4.34197ZM4.31919 9.65473L4.1755 9.51352C4.01708 9.35783 3.93013 9.15073 3.93013 8.93083C3.93013 8.71045 4.01708 8.50335 4.1755 8.34766L9.47708 3.13773C9.79466 2.82611 10.3468 2.82683 10.6634 3.13773L10.8071 3.27918C10.9657 3.43487 11.0527 3.64173 11.0527 3.86187C11.0527 4.08201 10.9657 4.28887 10.8071 4.4448L5.5055 9.65473C5.34684 9.81042 5.13634 9.89587 4.91259 9.89587C4.68834 9.89587 4.47761 9.81042 4.31919 9.65473V9.65473Z" /><path d="M0.029541 12.8635L1.14119 13.0197L1.8628 12.3102L1.22789 11.686L0.029541 12.8635Z"/><path d="M2.3124 12.0686H4.31906L1.47363 9.27222V11.2445L2.3124 12.0686Z"/><path d="M2.06665 13.9996H13.9996V13.5171H2.55788L2.06665 13.9996Z"/></svg>';
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
    this.currentSpan.classList.add(className);
  }

  removeCurrentClassColor() {
    this.classNameColors.forEach(className => {
      if (this.currentSpan.classList.contains(className)) {
        this.currentSpan.classList.remove(className);
      }
    });
  }

  static get sanitize() {
    return {
      span: {
        class: Color.CSS
      }
    };
  }
}

export default Color;
