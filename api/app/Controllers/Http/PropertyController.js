"use strict";

const Property = use("App/Models/Property");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const { latitude, longitude, distance } = request.all();

      const properties = await Property.query()
        .nearBy(latitude, longitude, distance)
        .fetch();

      return properties;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const property = await Property.query()
        .where({ id: params.id })
        .with("images")
        .first();

      /**
       * If the property exists, send it back,
       * if not, send a 404 with a message
       */
      return property
        ? property
        : response.status(404).send({ message: "Property not found!" });
    } catch (error) {
      console.log(error);
      return response.status(500).send({ message: "Something went wrong!" });
    }
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    try {
      const property = Property.findOrFail(params.id);

      if (property.user_id !== auth.user.id)
        return response.status(401).send({ message: "Not authorized!" });

      await property.delete();
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Something wrong happened!" });
    }
  }
}

module.exports = PropertyController;
