import path from 'path';

const methodsExpension = () => {
  // Fisher–Yates shuffle algorithm
  Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i >= 0; i--) {
      const j  = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]; // Swap elements
    }
    return this;
  }
}

const getAudioExtension = (file) => {
  const validExtensions = ["mp3", "wav", "ogg", "aac"];
  const extension = path.extname(file).slice(1).toLowerCase();
  if (!validExtensions.includes(extension)) {
    throw Error(
      `Invalid file extension for ${extension}, the accepted formats are mp3, wav, ogg and acc`
    );
  }
  return extension;
}

export default methodsExpension;
export { getAudioExtension }
