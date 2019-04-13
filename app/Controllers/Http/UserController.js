'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class UserController {

  async show ({ params, auth }) {
    const user = await User.findOrFail(params.id)

    if(user.id !== auth.user.id)
      throw new NotauthorizedException()

    return user
  }

  async update ({ params, request, auth }) {
    const user = await User.findOrFail(params.id)
    const data = await request.only(['email', 'password', 'username'])

    if(user.id !== auth.user.id)
      throw new NotauthorizedException()

    user.merge({...data})
    user.save()

    return user
  }
}

module.exports = UserController
