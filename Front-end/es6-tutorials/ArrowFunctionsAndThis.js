function IceCream() {
  this.scoops = 0;
}

IceCream.prototype.addScoop = function() {
  const cone = this;
  setTimeout(function() {
    cone.scoops++;
    console.log(cone.__proto__)
    console.log(cone.scoops);
    console.log('scoop added!');
  }, 500)
};

IceCream.prototype.removeScoop = function() {
  setTimeout(() => {
    this.scoops--;
    console.log(this.__proto__)
    console.log(this.scoops);
    console.log('scoop removed!');
  }, 500)
};

const dessert = new IceCream();
dessert.addScoop();
dessert.removeScoop();
