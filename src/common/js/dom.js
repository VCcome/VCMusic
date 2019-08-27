export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)'); // className：传入的类名
  return reg.test(el.className); // el.className：className是el这个dom的一个属性
};

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' '); // el.className：className是el这个dom的一个属性
  newClass.push(className);
  el.className = newClass.join(' ');
};
