class IdHandler {
  constructor(initialValue, addend) {
    this.initialValue = initialValue || 0;
    this.id = this.initialValue;
    this.addend = addend || 1;
  }

  increment() {
    this.id += this.addend;
  }

  reset() {
    this.id = this.initialValue;
  }
}
exports.IdHandler = IdHandler;
