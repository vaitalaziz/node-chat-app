  const expect = require('expect');

  const {Users} = require('./users');

  describe('Users', () => {
    var users;
  //it'll be called before each single test case, helps to initialize some data
    beforeEach(() => {
      users = new Users();
      users.users = [{ // here have 3 objects seed data in the array
        id: '1',
        name: 'Apon',
        room: 'Foods & Drinks'
      },
      {
        id: '2',
        name: 'Aziz',
        room: 'Study'
      },
      {
        id: '3',
        name: 'Anna',
        room: 'Foods & Drinks'
      }];
    });

    it('should add new user', () => {
      var users = new Users();
      var user = {  // here custom data
        id: '123',
        name: 'AlAmin',
        room: 'The Office Fans'
      };
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
      var userId = '99';
      var user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
      var userId = '1';
      var user = users.getUser(userId);

      expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
      var userId = '100';
      var user = users.getUser(userId);

      expect(user).toNotExist();
    });

    it('should return names for Foods & Drinks', () => {
      var userList = users.getUserList('Foods & Drinks');

      expect(userList).toEqual(['Apon', 'Anna']);
    });

    it('should return names for Study', () => {
      var userList = users.getUserList('Study');

      expect(userList).toEqual(['Aziz']);
    });

  });
