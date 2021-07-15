exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        
        // Inserts seed entries
        return knex('users').insert([
          {login: 'luansilva', password: 'luansilva'},
          {login: 'luansilva23', password: 'luansilva'},
          {login: 'luansilva34', password: 'luansilva'},
        ]);
      });
  };