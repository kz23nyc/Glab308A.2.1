// ********************* Part 1: Humble Beginnings / *********************

// Create an object named adventurer
// Object has properties name, health, and inventory and, companion Leo
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo", // give Robin a compainon to travel with a furry friend they called "Leo"
    type: "Cat",
    companion: {
      // add a 'companion' sub-object to 'Leo' with the name, type and inventory
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
adventurer.inventory[0];
console.log(adventurer.inventory);
console.log(adventurer.inventory[0]); //sword

// create a loop that logs each item in Robin's inventory
adventurer.inventory.forEach((item) => console.log(item));

//Testing the method for 'dice rolls' method
adventurer.roll(); // robin rolled a 4
adventurer.roll(9); // 25
adventurer.roll(12); // 29
adventurer.roll(18); // 28

//********************* */ Part 2: Class Fantasy / *********************

//Create a Character class using the class keyword.
class Character {
  static MAX_HEALTH = 100; // Add a static MAX_HEALTH property to the Character class, equal to 100.(Part 4)
  constructor(name) {
    //Inside the class constructor, we define a parameter name used to set the character's name.
    //The constructor initializes three properties for each character object: name, health (set to the class's static MAX_HEALTH property of 100), and inventory (an empty array).
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  // add the roll method to the Character class
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
}

// Re-create robin using the Character class

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(robin.health);

robin.companion.companion.roll(5); //Frank rolled a 8
robin.companion.companion.roll(25);
robin.companion.companion.roll(90);
robin.companion.companion.roll(50);
robin.companion.companion.roll(45);

console.log(robin.companion.health);

// ********************* / Part 3 : Class Features / *********************

// When extending a class, the “child” class inherits all properties of its parents.
// This means that we do not need to account for the name, health, inventory, or roll method of Character children classes.
// Create an Adventure class

// Adventure class extends the Character class and adds a specific role to the adventure, role attribute is specific to adventure. (e.g Fighter, Healer)
class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"]; // Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” (Part 4)

  constructor(name, role) {
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role`); // Ensure that only valid roles are used in the game
    }
    super(name); // Call the constructor of the parent class(Character)
    this.role = role; // Set the role property
    this.inventory.push("bedroll", "50 gold coins"); //Every adventure starts with a bed and 50 gold coins. add items to the inventory
  }

  scout() {
    // Adventurers have the ability to scout ahead of them.
    console.log(`${this.name} is scouting ahead...`);
    super.roll(); //calls the roll method from the parent class
  }
}

//create a Companion class,
class Companion extends Character {
  // Companion class extends the Character class, adds a type attribute instead of a role. type attributes describes the kind of companion they are Cat, Dog and Flea.
  constructor(name, type) {
    super(name);
    this.type = type;
  }
}

// re-create robin using the Character class
const robinAdventure = new Adventurer("Robin", "Fighter"); //create an instance of Character
robinAdventure.inventory = ["sword", "potion", "artifact"];
robinAdventure.companion = new Companion("Leo", "Cat");
robinAdventure.companion.companion = new Companion("Frank", "Flea");
robinAdventure.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(robinAdventure);
console.log(robinAdventure.inventory);
console.log(robinAdventure.companion);
console.log(robinAdventure.companion.companion);
console.log(robinAdventure.companion.companion.inventory);

//********************* Part 4: Class Uniforms *************************
//Using static properties and methods, you can create uniform attributes for the class itself rather than instances of the class. Static properties are typically constant values that can be used elsewhere for reference, or utility methods that do not rely on the values of a specific class instance.
// Using the static keyword:
// Add a static MAX_HEALTH property to the Character class, equal to 100.
// Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” Feel free to add other roles, if you desire!
// Add a check to the constructor of the Adventurer class that ensures the given role matches one of these values.

//*********************** Part 5: Gather your Party *********************
// AdventureFactory create Adventurer objects with a specific role. It will store all the adventurers it creates in an array and provide methods to find adventurers by their index in the array or by their name.
class AdventurerFactory {
  constructor(role) {
    // The constructor takes a role as a parameter which is used to assign a specific role to all adventurers created by this factory.
    // The role all adventurers created by this factory will have
    this.role = role;
    // Array to store the adventures created by this factory
    this.adventurers = [];
  }

  // Generate Method to generate a new adventurer.
  // This method creates a new adventurer using the name provided and the role stoled in the factory.
  generate(name) {
    // Create a new Adventurer with the given name and the role specified by the factory
    const newAdventurer = new Adventurer(name, this.role);
    //Add the newly created adventurer to the array
    this.adventurers.push(newAdventurer);
  }

  // "findbyIndex"Method to find an adventurer by their index in the array
  // Return the adventurer at the specified index
  findByIndex(index) {
    return this.adventurers[index];
  }

  // "findByName" Method to find an adventurer by their name.
  // Return the adventurer with the specified name.
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

// Create a factory for Healers
const healers = new AdventurerFactory("Healer");

// Generate a healer named 'Robin'
healers.generate("Robin");

// Generate more healers
healers.generate("Yoni");
healers.generate("Noah");

// Find a healer by name
console.log(healers.findByName("Yoni"));
console.log(healers.findByName("Noah"));
console.log(healers.findByName("Robin"));

//*********************** */ Part 6: Developing Skills **********************

// The duel() method will take another Adventurer as an opponent. Both adventurers will "roll" to determine the outcome of each round, and the loser will lose 1 point of health. The duel continues until one adventurer's health drops to 50 or below.
// Use the roll() functionality to create opposing rolls for each adventurer.
// Subtract 1 from the adventurer with the lower roll.
// Log the results of this “round” of the duel, including the rolls and current health values.
// Repeat this process until one of the two adventurers reaches 50 health.
// Log the winner of the duel: the adventurer still above 50 health.
// What other properties and methods could these classes have? Should fighters, healers, and wizards have their own methods? Should companions have specific methods?
// Feel free to experiment with your own ideas, be they silly or practical. The goal of this exercise is to develop new skills for the characters and yourself! Express your creativity.

// 1.Extend the Adventurer Class: The AdventurewithDuel class is created by extending the existing Adventurer class. AdventureerwithDuel inherits all properties and methods of all the Adventurer class, name, health, inventory and roll().

class AdventurerwithDuel extends Adventurer {
  // 2.Define the roll Method : the roll method generates a random number between 1 and 20 using Math.floor(Math.random()*20)+1
  roll() {
    return Math.floor(Math.random() * 20) + 1;
  }

  // Existing scout method (for context) : the adventurer is scouting the area
  scout() {
    console.log(`${this.name} is scouting the area...`);
  }

  // New duel method
  //Implemented within AdventurerWithDuel class to allow two adventurers to engage in a duel until one’s health falls to or below 50 : takes another Adventurer as an opponent.

  duel(opponent) {
    console.log(
      `${this.name} (Health: ${this.health}) is dueling ${opponent.name} (Health: ${opponent.health})!`
    );

    // a while loop continues the duel as long as both adventurers have health above 50.
    while (this.health > 50 && opponent.health > 50) {
      // Each adventurer rolls using the roll method
      const myRoll = this.roll();
      const opponentRoll = opponent.roll();

      // the rolls are logged.
      console.log(`${this.name} rolls a ${myRoll}`);
      console.log(`${opponent.name} rolls a ${opponentRoll}`);

      // Determine who loses health
      // the adventurer with the lower roll loses 1 health point
      if (myRoll > opponentRoll) {
        opponent.health -= 1;
        console.log(
          `${opponent.name} loses 1 health! Current health: ${opponent.health}`
        );
      } else if (myRoll < opponentRoll) {
        this.health -= 1;
        console.log(
          `${this.name} loses 1 health! Current health: ${this.health}`
        );
      } else {
        console.log("It's a tie! No one loses health."); // if the rolls are tied, no one loses health
      }
    }

    // Log the winner
    if (this.health > 50) {
      console.log(
        `${this.name} wins the duel with ${this.health} health remaining!`
      );
    } else {
      console.log(
        `${opponent.name} wins the duel with ${opponent.health} health remaining!`
      );
    }
  }
}

// Create instances of AdventureWithDuel
const fighterRobin = new AdventurerwithDuel("Robin", "Fighter");
const fighterYoni = new AdventurerwithDuel("Yoni", "Fighter");

// Start a duel between the warrior and the mage
fighterRobin.duel(fighterYoni);
