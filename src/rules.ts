const count = (value: number, arr: number[]): number => {
  return arr.filter((item) => item === value).length;
};

const sum = (arr: number[]): number => {
  return arr.reduce((acc, value) => acc + value, 0);
};

const frequency = (arr: number[]): number[] => {
  const freq: { [key: number]: number } = {};
  arr.forEach((item) => {
    freq[item] = freq[item] ? freq[item] + 1 : 1;
  });
  return Object.values(freq);
};

const totalAmount = (value: number, arr: number[]) => {
  return (): number => {
    return value * count(value, arr);
  };
};

const threeOfKind = (arr: number[]) => {
  return () => {
    const freq = frequency(arr);
    return freq.some((item) => item >= 3) ? sum(arr) : 0;
  };
};

const fourOfKind = (arr: number[]) => {
  return () => {
    const freq = frequency(arr);
    return freq.some((item) => item >= 4) ? sum(arr) : 0;
  };
};

const fullHouse = (arr: number[]) => {
  return () => {
    const freq = frequency(arr);
    return freq.includes(3) && freq.includes(2) ? 25 : 0;
  };
};

const smallStraight = (arr: number[]) => {
  return () => {
    const firstCase =
      arr.includes(2) && arr.includes(3) && arr.includes(4) && (arr.includes(1) || arr.includes(5));
    if (firstCase) return 30;

    const secondCase =
      arr.includes(3) && arr.includes(4) && arr.includes(5) && (arr.includes(2) || arr.includes(6));
    if (secondCase) return 30;

    return 0;
  };
};

const largeStraight = (arr: number[]) => {
  return () =>
    arr.includes(2) &&
    arr.includes(3) &&
    arr.includes(4) &&
    arr.includes(5) &&
    (arr.includes(1) || arr.includes(6))
      ? 40
      : 0;
};

const chance = (arr: number[]) => {
  return () => sum(arr);
};

const yahtzee = (arr: number[]) => {
  return (): number => {
    const freq = frequency(arr);
    return freq[0] === 5 ? 50 : 0;
  };
};

export default {
  totalAmount,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  chance,
  yahtzee,
};
