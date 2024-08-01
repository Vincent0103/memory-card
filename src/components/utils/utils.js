const methodsExpension = () => {
  // Fisher–Yates shuffle algorithm
  Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]; // Swap elements
    }
    return this;
  }
}
export default methodsExpension;
