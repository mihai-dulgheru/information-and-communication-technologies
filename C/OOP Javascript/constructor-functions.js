// Constructor Functions
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  // if called with "new" it returns the object automatically
}

Elf.prototype.attack = function () {
  // this adds the "attack" method as prototype
  // of Elf
  return this.name + " attack with " + this.weapon;
};

const sam = new Elf("Sam", "bow");
const peter = new Elf("Peter", "bow");
console.log(sam.attack());
console.log(peter.attack());

// it is a common practice to differentiate Constructor functions
// from regular functions by starting their name with a capital letter
