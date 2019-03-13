exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_backpack', tbl => {
    tbl
      .integer('backpack_id')
      .unsigned()
      .references('id')
      .inTable('backpack');
    tbl
      .integer('users_id')
      .unsigned()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_backpack');
};
