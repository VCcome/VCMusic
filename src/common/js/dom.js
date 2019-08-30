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

export function getData(el, name, val) {
  name = 'data-' + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
};

// @title 浏览器能力检测
let elementStyle = document.createElement('div').style;

// @return 浏览器供应商
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== 'undefine') {
      return key;
    }
  }
  return false;
})();

// @title 为css属性添加前缀
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
