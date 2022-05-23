function getRandomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(minimum: number, maximum: number) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export { getRandomElement, getRandomInt, getRandomArbitrary };
