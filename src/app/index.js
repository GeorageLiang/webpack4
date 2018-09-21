import './index.scss';

// const dec = {};
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);
console.log('123');
// @dec
export default class A {
  render(...arg) {
    const { props } = this;
    console.log(...arg, props);
    return '';
  }
}
