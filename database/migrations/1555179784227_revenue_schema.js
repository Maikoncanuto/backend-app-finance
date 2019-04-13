'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RevenueSchema extends Schema {
  up () {
    this.create('revenues', (table) => {
      table.increments()
      table.datetime('date')
      .notNullable()
      .defaultTo(this.fn.now())
      
      table.decimal('amount')
      .notNullable()
      .defaultTo(0)

      table.string('description', 100)

      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('sub_category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('bank_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('banks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('revenues')
  }
}

module.exports = RevenueSchema
