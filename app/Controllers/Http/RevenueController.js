'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Revenue = use('App/Models/Revenue')

/**
 * Resourceful controller for interacting with revenues
 */
class RevenueController {
  /**
   * Show a list of all revenues.
   * GET revenues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const revenues = await Revenue.all()
    return revenues
  }
  
  /**
   * Create/save a new revenue.
   * POST revenues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth}) {
    const data = await request.only(['amount', 'description', 'category_id', 'sub_category_id', 'bank_id'])
    const revenue = await Revenue.create({ user_id: auth.user.id, ...data })
    return revenue
  }

  /**
   * Display a single revenue.
   * GET revenues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const revenue = await Revenue.findOrFail(params.id)
    return revenue
  }

  /**
   * Update revenue details.
   * PUT or PATCH revenues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const revenue = await Revenue.findOrFail(params.id)
    const data = await request.only(['amount', 'description', 'category_id', 'sub_category_id', 'bank_id'])

    revenue.merge({...data})
    revenue.save()

    return revenue
  }

  /**
   * Delete a revenue with id.
   * DELETE revenues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const revenue = await Revenue.findOrFail(params.id)
    revenue.delete()
  }
}

module.exports = RevenueController
