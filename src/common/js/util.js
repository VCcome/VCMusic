/**
 * @title 返回[min, max]之间的随机数
 *
 * @param {*} min
 * @param {*} max
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * @title 返回一个乱序的数组
 *
 * @export
 * @param {*} arr
 */
export function shuffle(arr) {
  let _arr = arr.slice(); // 修改副本arr，不会影响愿数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i); // 注意max传入的是i，这是关键
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
};