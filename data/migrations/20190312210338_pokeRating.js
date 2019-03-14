exports.up = function(knex, Promise) {
  return knex.schema.createTable('poke_rating', tbl => {
    tbl.increments();
    tbl.integer('rating').unsigned();
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
  return knex.schema.dropTableIfExists('pokeRating');
};
