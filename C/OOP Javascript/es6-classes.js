// ES6 classes
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return this.name + " attack with " + this.weapon;
    // this basically adds "attack" as a prototype method of any objects
    // created with the constructor
  }
}

const sam = new Elf("Sam", "bow");
const peter = new Elf("Peter", "bow");
// even is called multiple times, the "attack" method is stored only once in memory
console.log(sam.attack());
console.log(sam instanceof Elf); // returns true
console.log(sam.hasOwnProperty("name")); // returns true
console.log(sam.hasOwnProperty("attack")); // returns false
