interface PersonInstance {
  name: string;
  age: number;
  sayHello: () => void;
}

interface PersonConstructor {
  new (name: string, age: number): PersonInstance;
}

const Person: PersonConstructor = function(this: PersonInstance, name: string, age: number) {
    // 确保使用 new 调用构造函数
    if (!new.target) {
      throw new Error("Step must be called with new");
    }
    this.name = name;
    this.age = age;

    this.sayHello = function() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    };
} as any;


let person1 = new Person("Alice", 30);
let person2 = new Person("Bob", 25);

person1.sayHello(); // 输出: Hello, my name is Alice and I am 30 years old.
person2.sayHello(); // 输出: Hello, my name is Bob and I am 25 years old.

console.log(person1.name); // 输出: Alice
console.log(person2.age); // 输出: 25