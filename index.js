// Part 1: Humble Beginnings
// Create an object named adventurer
// Object has properties name, health, and inventory and, companion Leo
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],   
  companion: {
    name: "Leo", // give Robin a compainon to travel with a furry friend they called "Leo"
    type: "Cat",
      companion: { // add a 'companion' sub-object to 'Leo' with the name, type and inventory
      name: "Frank",
      type: "Flea",
      inventory: ["a small hat", "sunglasses"],
    },
  },
  // define a method name roll with mod parameter defaults to 0, simulates a dice roll using Math.random(), calculates a random number between 1 and 20,adds the mod value
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`); // e.g Robin rolled a 4
  },
};

// find a sword at adventure.inventory[0]
adventurer.inventory[0]
console.log(adventurer.inventory);

// create a loop that logs each item in Robin's inventory
adventurer.inventory.forEach(item => console.log(item))

//Testing the method for 'dice rolls' method
adventurer.roll(); // robin rolled a 4
adventurer.roll(9); // 25
adventurer.roll(12); // 29
adventurer.roll(18); // 28


// Part 2: Class Fantasy
//Create a Character class using the class keyword. 
class Character {
    static MAX_HEALTH = 100 // Add a static MAX_HEALTH property to the Character class, equal to 100.(Part 4)
  constructor(name) { //Inside the class constructor, we define a parameter name used to set the character's name.
    //The constructor initializes three properties for each character object: name, health (set to the class's static MAX_HEALTH property of 100), and inventory (an empty array).
    this.name = name;
    this.health = 100; 
    this.inventory = [];
  }
  // add the roll method to the Character class
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
}

// re-create robin using the Character class
// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];



// console.log(robin.health);


// robin.companion.companion.roll(5); //Frank rolled a 8
// robin.companion.companion.roll(25);
// robin.companion.companion.roll(90);
// robin.companion.companion.roll(50);
// robin.companion.companion.roll(45);

// console.log(robin.companion.health);

// Part 3 : Class Features
// When extending a class, the “child” class inherits all properties of its parents. 
// This means that we do not need to account for the name, health, inventory, or roll method of Character children classes.
// Create an Adventure class 

class Adventurer extends Character { // Adventure class extends the Character class and adds a specific role to the adventure, role attribute is specific to adventure. (e.g Fighter, Healer)
    static ROLES = ["Fighter", "Healer", "Wizard"] // Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” (Part 4)
    constructor(name, role) {
        if(!Adventurer.ROLES.includes(role)) {
            throw new Error (`Invalid role:${role}`); // to ensure that only valid roles are used in the game
        }
        super(name);  // calls the constructor of the parent class(Character)
        this.role = role; // sets the role property
        this.inventory.push('bedroll', '50 gold coins'); //Every adventure starts with a bed and 50 gold coins. add items to the inventory
    }
        scout() { // Adventurers have the ability to scout ahead of them.
        console.log(`$[this.name] is scouting ahead...`);
        super.roll(); //calls the roll method from the parent class
    }
}

//create a Companion class,
class Companion extends Character { // Companion class extends the Character class, adds a type attribute instead of a role. type attributes describes the kind of companion they are Cat, Dog and Flea.
    constructor(name, type) {
        super(name);
        this.type = type;
    }
}

// // re-create robin using the Character class
const robin = new Adventurer("Robin", "Fighter"); //create an instance of Character
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Companion("Leo", "Cat");
robin.companion.companion = new Companion("Frank","Flea");
robin.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(robin);
console.log(robin.inventory);
console.log(robin.companion);




