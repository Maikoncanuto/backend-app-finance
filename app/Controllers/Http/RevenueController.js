'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Revenue = use('App/Models/Revenue')
const Database = use('Database')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class RevenueController {

  async index ({ auth }) {
    const revenues = await Database.from('revenues').where('user_id', auth.user.id)
    return revenues
  }

  async store ({ request, auth }) {
    const data = await request.only(['amount', 'date', 'description', 'category_id', 'bank_id'])
    const revenue = await Revenue.create({ user_id: auth.user.id, ...data })
    return revenue
  }

  async show ({ params, auth }) {
    const revenue = await Revenue.findOrFail(params.id)

    if(revenue.user_id !== auth.user.id)
      throw new NotauthorizedException()

    return revenue
  }

  async update ({ params, request, auth }) {
    const revenue = await Revenue.findOrFail(params.id)
    const data = await request.only(['amount', 'description', 'category_id', 'sub_category_id', 'bank_id'])

    if(revenue.user_id !== auth.user.id)
      throw new NotauthorizedException()

    revenue.merge({...data})
    revenue.save()

    return revenue
  }

  async destroy ({ params, auth }) {
    const revenue = await Revenue.findOrFail(params.id)

    if(revenue.user_id !== auth.user.id)
      throw new NotauthorizedException()

    revenue.delete()
  }
}

module.exports = RevenueController
