'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Bank = use('App/Models/Bank')
const Database = use('Database')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class BankController {

  async index ({ auth }) {
    const banks = await Database.from('banks').where('user_id', auth.user.id)
    return banks
  }

  async store ({ request, auth }) {
    const data = await request.only(['description'])
    const bank = await Bank.create({user_id: auth.user.id, ...data})
    return bank
  }

  async show ({ params, auth }) {
    const bank = await Bank.findOrFail(params.id)

    if(bank.user_id !== auth.user.id)
      throw new NotauthorizedException()

    return bank
  }

  async update ({ params, request, auth }) {
    const bank = await Bank.findOrFail(params.id)
    const data = await request.only(['description'])

    if(bank.user_id !== auth.user.id)
      throw new NotauthorizedException()

    bank.merge({...data})
    bank.save()
    return bank
  }

  async destroy ({ params, auth }) {
    const bank = await Bank.findOrFail(params.id)

    if(bank.user_id !== auth.user.id)
      throw new NotauthorizedException()

    bank.delete()
  }
}

module.exports = BankController
