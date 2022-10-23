// add two numbers
const add1 = (a) => (b) => a + b;

const add2 = (a) => {
  return (b) => {
    return a + b;
  };
};

function add3(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add1(2)(3));
console.log(add2(2)(3));
console.log(add3(2)(3));
