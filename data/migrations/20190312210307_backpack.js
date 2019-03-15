exports.up = function(knex, Promise) {
  return knex.schema.createTable('backpack', tbl => {
    tbl.increments();
    tbl.string('type1').notNullable();
    tbl.string('type2');
    tbl.string('name').notNullable();
    tbl
      .integer('pokedex_number')
      .notNullable()
      .unsigned();
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
