
exports.seed = function(knex) {
  // Deletes ALL existing entries ☠️
  return knex('car-dealers').truncate()
    .then(function () {
      // Inserts seed entries 📩
      return knex('car-dealers').insert([
        { dealership: 'Ford', location: 'Austin' },
        { dealership: 'Dodge', location: 'Houston' },
        { dealership: 'Chevy', location: 'Dallas' },
        { dealership: 'Dodge', location: 'Corpus Christi' },
        { dealership: 'Ford', location: 'Austin' },
        { dealership: 'Chevy', location: 'Dallas' }
      ])
    })
}
