/* NodeJS events */
var events = require('events');

// Define Account
// Wire up all event emitter components for the object
Account.prototype = events.EventEmitter.prototype;

function Account() {
  this.balance = 0;
  // After our initialising is done, instantiate event emitter for the parent
  events.EventEmitter.call(this);

  this.deposit = function(amount) {
    this.balance += amount;
    this.emit('balanceChanged');
  };

  this.withdraw = function(amount) {
    this.balance -= amount;
    this.emit('balanceChanged');
  };
}

// handlers
function displayBalance() {
  console.log('Account balance: $%d', this.balance);
}

function checkOverdraw() {
  if (this.balance < 0) {
    console.log('Account overdrawn!!');
  }
}

// Handler accepts parameters
function checkGoal(acc, goal) {
  if (acc.balance > goal) {
    console.log('Goal achieved!');
  }
}

// Implement - bind the handlers to the events
var account = new Account();
account.on('balanceChanged', displayBalance);
account.on('balanceChanged', checkOverdraw);
account.on('balanceChanged', function() {
  checkGoal(this, 1000);
});

// Use
account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withdraw(1200);