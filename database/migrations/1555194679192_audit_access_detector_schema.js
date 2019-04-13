'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditAccessDetectorSchema extends Schema {
  up () {
    this.create('audit_access_detectors', (table) => {
      table.increments()
      table.string('method')
      table.string('ip')
      table.string('token')
      table.string('user_agent')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('audit_access_detectors')
  }
}

module.exports = AuditAccessDetectorSchema
