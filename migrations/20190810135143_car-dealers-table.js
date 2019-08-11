
exports.up = function(knex) {
  // the change we want to make to our schema 🚀
  return knex.schema.createTable('car-dealers', table => {
    table.increments()
    table.text('dealership', 128)
      // .unique()
      .notNullable()
    table.text('location')
  })

}

exports.down = function(knex) {
  // undoing that change ✂️
  return knex.schema.dropTableIfExists('car-dealers')

}