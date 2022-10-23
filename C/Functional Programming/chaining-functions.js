// as seen on freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/

// Let’s write a function that returns someone’s name.
getName = (person) => person.name;
getName({ name: "Buckethead" }); // 'Buckethead'

// Let’s write a function that uppercases strings.
uppercase = (string) => string.toUpperCase();
uppercase("Buckethead"); // 'BUCKETHEAD'

// What if we want to add a function that gets the first 6 characters of a string?
get6Characters = (string) => string.substring(0, 6);
get6Characters("Buckethead"); // 'Bucket'

// Let’s get really crazy and add a function to reverse strings.
reverse = (string) => string.split("").reverse().join("");
reverse("Buckethead"); // 'daehtekcuB'

// chaining all the operations would result in
reverse(get6Characters(uppercase(getName({ name: "Buckethead" })))); // 'TEKCUB'

// Function composition enabling pipe functionality using reduce()
const pipe =
  (...functions) =>
  (input) =>
    functions.reduce((acc, fn) => fn(acc), input);

console.log(
  pipe(getName, uppercase, get6Characters, reverse)({ name: "Buckethead" })
); // 'TEKCUB'

const g = (n) => n + 1;
const f = (n) => n * 2;

const h = (x) => f(g(x));
h(30); // => 62

const compose = (f, g) => (x) => f(g(x));
console.log(compose(f, g)(30)); // => 62
