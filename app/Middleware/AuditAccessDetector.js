'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Audit = use('App/Models/AuditAccessDetector')

class AuditAccessDetector {

  async handle ({ request }, next) {
    const data = {
      method: request.method(),
      ip: request.ip(),
      token: request.headers().authorization,
      user_agent: request.headers()['user-agent'],
      url: request.url()
    };

    await Audit.create(data)
    await next()
  }
}

module.exports = AuditAccessDetector
