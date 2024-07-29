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

const getAudioExtension = (fileUrl) => {
  const validExtensions = ["mp3", "wav", "ogg", "aac"];
  const pattern = /(mp3)|(aac)|(ogg)|(wav)/g
  const extension = fileUrl.split('.').pop().match(pattern)[0];
  if (!validExtensions.includes(extension)) {
    throw Error(
      `Invalid file extension for ${extension}, the accepted formats are mp3, wav, ogg and acc`
    );
  }
  return extension;
}

export default methodsExpension;
export { getAudioExtension }
