// function printName() {
//   console.log("Hello, world!\n", this.name);
// }

// const someObj = {
//   name: 'Angular',

//   printName() {
//     console.log("Hello, world! ", this.name);
//   }
// }

// printName.apply(someObj)  // Hey invoke yourself, and bind `this` to someObj

// someObj.printName()


// APPLY

// class SomeClass {
//   name = 'Angular';

//   printName() {
//     console.log('Hello, world! ', this.name);
//   }
// }

// const someObj = new SomeClass();

// const printFc = someObj.printName;

// someObj.printName();

// // printFc();
// printFc.apply(someObj)



// class SomeClass {
//   name = 'Angular';

//   printName(prefix, suffix) {
//     console.log('Hello, world! ', prefix, ': ', this.name, ' : ', suffix);
//   }
// }

// const someObj = new SomeClass();

// const printFc = someObj.printName;

// someObj.printName('Prefix');

// printFc();
// // printFc.apply(someObj, ['Prefix', 'sx'])
// // printFc.call(someObj, 'Prefix', 'suffix')


// const student = {
//   name: "Varun",
//   dob: "2004-05-20"
// }

// // printFc.apply(student, ['New'])

class UIButton {

  callback = null;

  addEventListener(callback) {
    this.callback = callback;
  }

  click() {
    if(this.callback) this.callback("Clicked", "Button");
  }
}

class SomeClass {
  name = 'Angular';

  constructor(aButton) {
    this.aButton = aButton;
    // this.printName = this.printName.bind(this)
    this.aButton.addEventListener(this.printName);
  }

  // Bind is needed only for function created using function keyword, not for arrow function
  // printName(prefix, suffix) {
  //   console.log('Hello, world! ', prefix, ': ', this.name, ' : ', suffix);
  // }
  printName = (prefix, suffix) => {
    console.log('Hello, world! ', prefix, ': ', this.name, ' : ', suffix);
  }
}

const aButton = new UIButton();
const someObj = new SomeClass(aButton);

aButton.click();

// const printFc = someObj.printName;

// someObj.printName('Prefix');

// printFc();
// // printFc.apply(someObj, ['Prefix', 'sx'])
// // printFc.call(someObj, 'Prefix', 'suffix')


// const student = {
//   name: "Varun",
//   dob: "2004-05-20"
// }

// printFc.apply(student, ['New'])