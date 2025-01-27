export function generateEmptyPlayboardArray(size) {
    const array = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        array[i][j] = 0;
      }
    }
    return array;
}