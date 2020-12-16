/**
 * Routes
 *
 * This file defines all the routes for your express app.
 * Every item in the following array represents a single
 * route. A route item exists of the HTTP Method Verb,
 * the route and the controller with action to call.
 *
 * Schema:
 * 'METHOD ROUTE CONTROLLER.ACTION'
 *
 * Example:
 * A POST to /person should call the 'create' action
 * in the person.js controller. This would result in:
 *
 * 'POST /person person.create'
 */

export const routes = [
  "GET / app.hello",

  "GET /users auth.mustBeAdmin users.list",
  "GET /users/:id auth.mustBeUser users.getById",

  "GET /users/:id/testingLocations auth.mustBeUser testingLocations.list",
  "GET /users/:id/testingLocations/:locationId auth.mustBeUser testingLocations.getById",
  "POST /users/:id/testingLocations auth.mustBeUser testingLocations.create",
  "PUT /users/:id/testingLocations/:locationId auth.mustBeUser testingLocations.userUpdate",
  "DELETE /users/:id/testingLocations/:locationId auth.mustBeUser testingLocations.userRemove",

  "GET /testingLocations auth.mustBeAdmin testingLocations.adminList",
  "GET /testingLocations/:locationId auth.mustBeAdmin testingLocations.getById",

  "GET /* app.notFound",
];
