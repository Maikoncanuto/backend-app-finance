'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register').prefix('api/v1');
Route.post('/authenticate', 'AuthController.authenticate').prefix('api/v1');

Route.group(() => {
    Route.resource('users', 'UserController').apiOnly().except('store', 'delete');
    Route.resource('categories', 'CategoryController').apiOnly();
    Route.resource('banks', 'BankController').apiOnly();
    Route.resource('payments', 'PaymentController').apiOnly();
    Route.resource('revenues', 'RevenueController').apiOnly();
    Route.resource('expenses', 'ExpenseController').apiOnly();
})
.prefix('api/v1')
.middleware(['auth']);