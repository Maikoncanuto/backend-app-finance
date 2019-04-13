'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const Antl = use('Antl')

const message = Antl.formatMessage('exceptions.notAuthorized')
const status = '401'
const code = 'E_NOT_AUTHORIZED'

class NotauthorizedException extends LogicalException {
  constructor(){
    super(message, status, code)
  }
}

module.exports = NotauthorizedException
