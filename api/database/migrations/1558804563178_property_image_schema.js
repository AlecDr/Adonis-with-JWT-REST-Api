"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PropertyImageSchema extends Schema {
  up() {
    this.create("property_images", table => {
      table.increments();
      table
        .integer("property_id")
        .unsigned()
        .references("id")
        .inTable("properties")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("path").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("property_images");
  }
}

module.exports = PropertyImageSchema;
