exports.up = function(knex, Promise) {
  return knex.schema.createTable('backpack', tbl => {
    tbl.increments();
    tbl.string('poke_name');
    tbl.integer('pokedex_number');
    tbl
      .integer('pokemon_id')
      .unsigned()
      .references('pokedex_number')
      .inTable('pokemon')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('backpack');
};
