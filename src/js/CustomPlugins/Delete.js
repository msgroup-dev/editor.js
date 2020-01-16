class Delete {
  constructor({ api }) {
    this.api = api;

    this.button = null;
    this.tag = 'DEL';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
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

  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    let del = document.createElement(this.tag);

    del.appendChild(range.extractContents());
    range.insertNode(del);

    this.api.selection.expandToTag(del);
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
    const termTag = this.api.selection.findParentTag(this.tag);

    this.button.classList.toggle(this.iconClasses.active, Boolean(termTag));
  }

  get toolboxIcon() {
    return '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M14 6.37322H7.05638C4.8926 6.01816 3.56804 5.71104 3.56804 4.12808C3.56799 2.46927 5.41679 1.88068 7 1.88068C8.69329 1.88068 9.96633 2.49092 10.3224 3.47317L11.5011 3.04594C11.2172 2.26278 10.6125 1.62513 9.75223 1.20191C8.98754 0.825795 8.03583 0.626953 7 0.626953C4.19733 0.626953 2.31426 2.03397 2.31426 4.12808C2.31426 5.06917 2.63162 5.82116 3.25882 6.37322H0V7.62695H6.95374C9.11153 7.98134 10.432 8.29043 10.432 9.87209C10.432 11.5309 8.58321 12.1195 7 12.1195C5.30617 12.1195 4.03296 11.509 3.67736 10.5261L2.49844 10.9528C2.78199 11.7364 3.38666 12.3744 4.2471 12.7978C5.01187 13.1743 5.96383 13.3732 7 13.3732C9.80267 13.3732 11.6857 11.9662 11.6857 9.87209C11.6857 8.93117 11.3688 8.17918 10.7423 7.62695H14V6.37322Z" /></svg>';
  }

  static get sanitize() {
    return {
      DEL: {}
    };
  }
}

export default Delete;
