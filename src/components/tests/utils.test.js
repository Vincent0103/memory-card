import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe('methodsExpension module', () => {
  let lengthArray1;
  let lengthArray2;
  let lengthArray3;

  beforeEach(() => {

    lengthArray1 = [4, 2, 0, 1, 3];
    lengthArray2 = [1, 7, 5, 4, 0, 6, 2, 3];
    lengthArray3 = [1, 0];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('shuffles the array when given an array of length 5', () => {
    Array.prototype.shuffle = vi.fn(function() {
      for (let i = this.length - 1; i >= 0; i--) {
        const j = lengthArray1[i];
        [this[i], this[j]] = [this[j], this[i]]; // Swap elements
      }
      return this;
    });


    expect(['John', 'Mario', 'Smith', 'Albert', 'Simon'].shuffle()).toEqual(['Albert', 'John', 'Simon', 'Mario', 'Smith']);
    expect(Array.prototype.shuffle).toHaveBeenCalled();

    expect([null, null, 'target1', null, 'target2'].shuffle()).toEqual([null, null, 'target2', null, 'target1']);
    expect(Array.prototype.shuffle).toHaveBeenCalledTimes(2);
  });

  it('shuffles the array when given an array of length 8', () => {
    Array.prototype.shuffle = vi.fn(function() {
      for (let i = this.length - 1; i >= 0; i--) {
        const j = lengthArray2[i];
        [this[i], this[j]] = [this[j], this[i]]; // Swap elements
      }
      return this;
    });

    expect([1, 2, 3, 4, 5, 6, 7, 8].shuffle()).toEqual([4, 5, 3, 1, 8, 7, 6, 2]);
  });

  it('shuffles the array when given an array of length 2', () => {
    Array.prototype.shuffle = vi.fn(function() {
      for (let i = this.length - 1; i >= 0; i--) {
        const j = lengthArray3[i];
        [this[i], this[j]] = [this[j], this[i]]; // Swap elements
      }
      return this;
    });

    expect([8, 4].shuffle()).toEqual([8, 4]);
  });
});
