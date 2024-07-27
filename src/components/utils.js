const methodsExpension = () => {
  Array.prototype.shuffle = function () {
    const lengthArray = Array.from({ length: this.length }, (_, i) => i);

    const shuffledArray = [];
    this.forEach(() => {
      const index = Math.floor(Math.random() * lengthArray.length);
      shuffledArray.push(lengthArray.splice(index), 1);
    });

    return shuffledArray;
  }
}

export default methodsExpension;
