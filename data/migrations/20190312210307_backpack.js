exports.up = function(knex, Promise) {
  return knex.schema.createTable('backpack', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl
      .integer('users_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('backpack');
};
