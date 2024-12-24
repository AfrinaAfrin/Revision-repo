 
function Car(make, model, year, type, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type; 
    this.isAvailable = isAvailable;
}

 
function Customer(name) {
    this.name = name;
    this.rentedCars = [];
}

 
Customer.prototype.rentCar = function (car) {
    if (car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
        console.log(`${this.name} rented ${car.make} ${car.model}.`);
    } else {
        console.log(`Sorry, the ${car.make} ${car.model} is already rented.`);
    }
};


Customer.prototype.returnCar = function (car) {
    const carIndex = this.rentedCars.indexOf(car);
    if (carIndex > -1) {
        car.isAvailable = true;
        this.rentedCars.splice(carIndex, 1);
        console.log(`${this.name} returned ${car.make} ${car.model}.`);
    } else {
        console.log(`The car is not in ${this.name}'s rented cars.`);
    }
};

 
function PremiumCustomer(name, discountRate) {
    Customer.call(this, name); 
    this.discountRate = discountRate;
}

 
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

 
function calculateRentalPrice(car, days, customer) {
    const baseRate = 50; 
    const carTypeRates = { SUV: 1.2, Sedan: 1.0, Truck: 1.5 };  
    const typeRate = carTypeRates[car.type] || 1.0;

    let totalPrice = days * baseRate * typeRate;

     
    if (customer instanceof PremiumCustomer) {
        totalPrice *= 1 - customer.discountRate / 100;
    }

    return totalPrice.toFixed(2);
}

 
function maintenance(car, delay) {
    console.log(`The ${car.make} ${car.model} is under maintenance.`);
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`The ${car.make} ${car.model} is now available.`);
    }, delay);
}

 
const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Ford", "Explorer", 2021, "SUV");
const car3 = new Car("Chevrolet", "Silverado", 2019, "Truck");
 
const customer1 = new Customer("Alice");
const premiumCustomer1 = new PremiumCustomer("Bob", 10);

 
customer1.rentCar(car1);
premiumCustomer1.rentCar(car2);

 
console.log(`Price for Alice (3 days): $${calculateRentalPrice(car1, 3, customer1)}`);
console.log(`Price for Bob (3 days): $${calculateRentalPrice(car2, 3, premiumCustomer1)}`);

 
customer1.returnCar(car1);
premiumCustomer1.returnCar(car2);

 
maintenance(car3, 2000);

 
const rentCorolla = customer1.rentCar.bind(customer1, car1);
rentCorolla();
