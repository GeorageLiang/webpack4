import './index.scss';

const dec = {};
// const promise = new Promise();
console.log('123');
// @dec
export default class A {
  render(...arg) {
    const {props} = this;
    console.log(...arg, props);
    return '';
  }
}