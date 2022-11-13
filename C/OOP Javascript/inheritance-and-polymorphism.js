// inheritance and polymorphism
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return this.name + ' attack with ' + this.weapon;
  }
}

class Elf extends Character {
  constructor(name, weapon, type) {
    // console.log('what am i?', this); this gives an error
    super(name, weapon); // calls the prototype object's constructor
    // while also inheriting its methods
    console.log('what am i?', this);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  makeFort() {
    // this is like extending our prototype.
    return 'strongest fort in the world made';
  }
  attack() {
    // this overwrites the prototype "attack" method
    return 'aaargh';
  }
}

const houseElf = new Elf('Dolby', 'cloth', 'house');
// houseElf.makeFort() // error
console.log(houseElf.hasOwnProperty('type')); // true
console.log(houseElf.hasOwnProperty('name')); // still true
console.log(houseElf.hasOwnProperty('attack')); // false
console.log(houseElf.attack()); // "Dolby attack with cloth"

const shrek = new Ogre('Shrek', 'club', 'green');
console.log(shrek.makeFort()); // "strongest fort in the world made"
