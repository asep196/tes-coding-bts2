'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Users API
Route.post('api/users/signup', 'UserController.store')
Route.post('api/users/signin', 'UserController.show')
Route.group(() => {
  Route.get('/', 'UserController.index')
}).prefix('api/users').middleware(['auth:jwt'])

// Shopping API
Route.post('api/shopping', 'ShoppingController.store')
Route.group(() => {
  Route.get('/', 'ShoppingController.index')
  Route.get('/:id', 'ShoppingController.show')
  Route.delete('/:id', 'ShoppingController.destroy')
  Route.put('/:id', 'ShoppingController.update')
}).prefix('api/shopping').middleware(['auth:jwt'])
