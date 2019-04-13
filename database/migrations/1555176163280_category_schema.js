'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('description', 100)
      .notNullable()
      .unique()
      .comment('Column of description')

      table.boolean('sub_category')
      .defaultTo(false)
      .comment('Column to identify sub_category')
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
