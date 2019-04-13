'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()

      table.datetime('date')
      .notNullable()
      .defaultTo(this.fn.now())
      
      table.decimal('amount')
      .notNullable()
      .defaultTo(0)

      table.string('description', 100)

      table.boolean('paid').defaultTo(false)

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
      .integer('bank_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('banks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('payment_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('payments')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
