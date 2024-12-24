 
function Product(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}

 
Product.prototype.getDetails = function () {
    return `${this.name} - $${this.price} (${this.quantity} in stock)`;
};

Product.prototype.updateQuantity = function (amount) {
    this.quantity += amount;
    console.log(`${this.name} quantity updated to ${this.quantity}.`);
};

 
function Electronics(name, price, quantity, brand, model) {
    Product.call(this, name, price, quantity);  
    this.brand = brand;
    this.model = model;
}

 
Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

 
Electronics.prototype.powerOn = function () {
    console.log(`${this.brand} ${this.model} is now powered on.`);
};

Electronics.prototype.powerOff = function () {
    console.log(`${this.brand} ${this.model} is now powered off.`);
};

 
function Clothing(name, price, quantity, size, material) {
    Product.call(this, name, price, quantity);  
    this.size = size;
    this.material = material;
}

 
Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;

 
Clothing.prototype.tryOn = function () {
    console.log(`Trying on ${this.name} in size ${this.size}.`);
};

 
function Books(name, price, quantity, author, genre) {
    Product.call(this, name, price, quantity);  
    this.author = author;
    this.genre = genre;
}

 
Books.prototype = Object.create(Product.prototype);
Books.prototype.constructor = Books;

 
Books.prototype.read = function () {
    console.log(`Reading "${this.name}" by ${this.author}.`);
};

 
const laptop = new Electronics("Laptop", 1200, 10, "Dell", "XPS 13");
const tshirt = new Clothing("T-Shirt", 20, 50, "M", "Cotton");
const novel = new Books("The Great Gatsby", 15, 100, "F. Scott Fitzgerald", "Fiction");

 
console.log(laptop.getDetails());
console.log(tshirt.getDetails());
console.log(novel.getDetails());

 
laptop.powerOn();
laptop.powerOff();

tshirt.tryOn();

novel.read();

 
laptop.updateQuantity(-2);
tshirt.updateQuantity(10);
novel.updateQuantity(-5);

 
console.log(laptop instanceof Electronics); 
console.log(laptop instanceof Product); 
console.log(tshirt instanceof Clothing); 
console.log(novel instanceof Books); 
console.log(novel instanceof Product); 
