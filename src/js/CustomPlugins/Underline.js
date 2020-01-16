class Underline {
  constructor({ api }) {
    this.api = api;

    this.button = null;
    this.tag = 'INS';

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
    let ins = document.createElement(this.tag);

    ins.appendChild(range.extractContents());
    range.insertNode(ins);

    this.api.selection.expandToTag(ins);
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
    return '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M14 12.4519H0V13.4615H14V12.4519Z"/><path d="M10.4453 0.538574V7.06321C10.4453 8.80987 8.89976 10.2309 7 10.2309C5.10024 10.2309 3.55469 8.80987 3.55469 7.06321V0.538574H2.46094V7.06321C2.46094 9.36658 4.49717 11.2405 7 11.2405C9.50283 11.2405 11.5391 9.36658 11.5391 7.06321V0.538574H10.4453Z" /></svg>';
  }

  static get sanitize() {
    return {
      INS: {}
    };
  }
}

export default Underline;
