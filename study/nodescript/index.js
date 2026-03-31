function printName() {
  setTimeout(() => {
    console.log(this.name);
  }, 1000);
}

const obj = {
  name: 'John Doe',
  printName: printName,
};

obj.printName();