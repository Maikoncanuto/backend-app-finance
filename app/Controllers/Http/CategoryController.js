'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/Category')
const Database = use('Database')
const NotauthorizedException = use('App/Exceptions/NotauthorizedException')

class CategoryController {

  async index ({ auth }) {
    throw new NotauthorizedException()
    const categories = await Database.from('categories').where('user_id', auth.user.id)
    return categories
  }

  async store ({ request, auth }) {
    const data = request.only(['description',  'parent_category_id'])
    const category = await Category.create({user_id: auth.user.id, ...data})
    return category
  }

  async show ({ params, auth }) {
    const category = await Category.findOrFail(params.id)

    if(auth.user.id !== category.user_id)
      throw new NotauthorizedException()

    return category
  }

  async update ({ params, request, auth }) {
    const category = await Category.findOrFail(params.id)
    const data = await request.only(['description', 'parent_category_id'])
    
    if(category.user_id !== auth.user.id)
      throw new NotauthorizedException()

    category.merge({...data})
    category.save()

    return category
  }

  async destroy ({ params, auth }) {
    const category = await Category.findOrFail(params.id)

    if(category.user_id !== auth.user.id)
      throw new NotauthorizedException()

    category.delete()
  }
}

module.exports = CategoryController
