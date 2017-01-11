
// for users data structures
[{
  id: '/#39fhgkebfmmn',
  name: 'Aziz',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    // filter takes function as argument & here used ES6 code
    // .filter((user) => {
    //   return user.room === room; });
    var users = this.users.filter((user) => user.room === room);
    //map takes function as filter & return properties of object as needed
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

/*
  var users = [];

  var addUsers = (id, name, room) => {
    users.push({})
  }
  modules.export= {addUsers}
*/
// the above codes by -> ES6 class instance
// class Person {
 //   constructor (name, age) {
//      console.log(name, age);
 //     this.name = name;
 //     this.age = age;
 //   }
 //   getUserDescription () {
 //     return `${this.name} is ${this.age} year(s) old.`;
 //   }
 // }
 //
 // var me = new Person('Aziz', 31);
 //  console.log('this.name', me.name);
 //  console.log('this.age', me.age);
 // var description = me.getUserDescription();
 // console.log(description);
