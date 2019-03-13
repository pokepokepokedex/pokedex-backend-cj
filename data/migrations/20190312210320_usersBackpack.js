exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_backpack', tbl => {
    tbl
      .integer('backpack_id')
      .unsigned()
      .references('id')
      .inTable('backpack')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('users_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('usersBackpack');
};
