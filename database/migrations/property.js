'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertySchema extends Schema {
  up () {
    this.create('properties', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('propietary').unique()
      table.string('country', 50)
      table.string('state', 50)
      table.string('city', 90)
      table.string('district', 90)
      table.string('street', 150)
      table.string('postal_code', 20)
      table.string('complement')
      table.string('house_number')
      table.decimal('latitude',8,6)
      table.decimal('longitude',8,6)
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('properties')
  }
}

module.exports = PropertySchema
