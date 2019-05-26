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

// Authentication routes
Route.post("/users/create", "UserController.store");
Route.post("/auth/authenticate", "AuthController.create");

// Properties routes
Route.resource("/properties", "PropertyController")
  .apiOnly()
  .middleware("auth");
Route.post("/properties/:id/images/store", "ImageController.store").middleware(
  "auth"
);
Route.get("/images/:path", "ImageController.show");

Route.any("*", ({ response }) => {
  return response.status(404).send({ message: "This route does not exist!" });
});
