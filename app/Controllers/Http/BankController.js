'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Bank = use('App/Models/Bank')

/**
 * Resourceful controller for interacting with banks
 */
class BankController {
  /**
   * Show a list of all banks.
   * GET banks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const banks = await Bank.all()
    return banks
  }

  /**
   * Create/save a new bank.
   * POST banks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = await request.only(['description'])
    const bank = await Bank.create(data)
    return bank
  }

  /**
   * Display a single bank.
   * GET banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const bank = await Bank.findOrFail(params.id)
    return bank
  }

  /**
   * Update bank details.
   * PUT or PATCH banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const bank = await Bank.findOrFail(params.id)
    const data = await request.only(['description'])
    bank.merge({...data})
    bank.save()
    return bank
  }

  /**
   * Delete a bank with id.
   * DELETE banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const bank = await Bank.findOrFail(params.id)
    bank.delete()
  }
}

module.exports = BankController
