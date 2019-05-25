"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/user/create", "UserController.store");
Route.post("/auth/authenticate", "AuthController.create");

Route.any("*", ({ response }) => {
  return response.status(404).send({ message: "This route does not exist!" });
});
