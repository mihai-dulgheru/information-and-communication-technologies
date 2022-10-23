// Object.create()
const elfFunctions = {
  attack: function () {
    return "attack with " + this.weapon;
  },
};

function createElf(name, weapon) {
  newElf = Object.create(elfFunctions); // it adds a hidden property __proto__
  // to the empty newElf object, pointing to the methods of elfFunctions
  newElf.name = name;
  newElf.weapon = weapon;
  newElf.attack = function () {
    return this.name + " " + newElf.__proto__.attack.call(this);
  };
  return newElf;
}

const sam = createElf("Sam", "bow");
const peter = createElf("Peter", "bow");
console.log(sam);
console.log(sam.attack());
console.log(sam.hasOwnProperty("name")); // returns true
console.log(sam.hasOwnProperty("attack")); // returns false
