exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_poke_rating', tbl => {
    tbl
      .integer('users_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('rating_id')
      .unsigned()
      .references('id')
      .inTable('pokeRating')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('usersPokeRating');
};
