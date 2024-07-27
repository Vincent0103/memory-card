import { beforeEach, describe, it, vi } from "vitest";
import methodsExpension from "../utils";

describe('methodsExpension module', () => {
  describe(('Array.shuffle method', () => {
    let lengthArray1;
    let lengthArray2;
    let lengthArray3;

    beforeEach(() => {
      lengthArray1 = [4, 2, 0, 1, 3];
      lengthArray2 = [1, 7, 5, 4, 0, 6, 2, 3];
      lengthArray3 = [1, 0];
    });


    Array.prototype.shuffle = vi.fn(function() {
      const shuffledArray = [];
      this.forEach(() => {
        shuffledArray.push(lengthArray1.shift());
      });

      return shuffledArray;
    });

    it('shuffles the array when given an array ', () => )
  }))
});
