class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  }
  addTopping(topping) {
    this.toppings.push(topping);
  }
}

const choco = new IceCream('sweet', 100, ['choco'])
console.log(typeof IceCream);
console.log(choco);
console.log(choco.toString());
console.log(typeof choco);
console.log(choco.__proto__);
console.log(choco instanceof IceCream);
console.log(choco instanceof Dessert);