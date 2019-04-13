'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Expense = use('App/Models/Expense')
const Database = use('Database')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class ExpenseController {

  async index ({ auth}) {
    const expenses = await Database.from('expenses').where('user_id', auth.user.id)
    return expenses
  }

  async store ({ request, auth }) {
    const data = await request.only([''])
    const expense = await Expense.create({user_id: auth.user.id, ...data})
    return expense
  }

  async show ({ params, auth }) {
    const expense = await Expense.findOrFail(params.id)

    if(expense.user_id !== auth.user.id)
      throw new NotauthorizedException()

    return expense
  }

  async update ({ params, request, auth }) {
    const expense = await Expense.findOrFail(params.id)
    const data = await request.only([''])

    if(expense.user_id !== auth.user.id)
      throw new NotauthorizedException()

    expense.merge({...data})
    expense.save()
    return expense
  }

  async destroy ({ params, auth }) {
    const expense = await Expense.findOrFail(params.id)

    if(expense.user_id !== auth.user.id)
      throw new NotauthorizedException()

    expense.delete()
  }
}

module.exports = ExpenseController
