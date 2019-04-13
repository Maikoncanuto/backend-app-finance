'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Payment = use('App/Models/Payment')
const Database = use('Database')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class PaymentController {

  async index ({ auth }) {
    const payments = await Database.from('payments').where('user_id', auth.user.id)
    return payments
  }

  async store ({ request, auth }) {
    const data = await request.only(['description'])
    const payment = await Payment.create({user_id: auth.user.id, ...data})
    return payment
  }

  async show ({ params, auth }) {
    const payment = await Payment.findOrFail(params.id)

    if(payment.user_id !== auth.user.id)
      throw new NotauthorizedException()

    return payment
  }

  async update ({ params, request, auth }) {
    const payment = await Payment.findOrFail(params.id)
    const data = await request.only(['description'])

    if(payment.user_id !== auth.user.id)
      throw new NotauthorizedException()

    payment.merge({...data})
    payment.save()
    return payment
  }

  async destroy ({ params, auth }) {
    const payment = await Payment.findOrFail(params.id)

    if(payment.user_id !== auth.user.id)
      throw new NotauthorizedException()

    payment.delete()
  }
}

module.exports = PaymentController
