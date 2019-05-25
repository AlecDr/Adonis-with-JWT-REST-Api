"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    try {
      const user = await User.create(
        request.only(["username", "email", "password"])
      );

      const { username, email } = user.toJSON();
      return { username, email };
    } catch (error) {
      console.log(error);
      return response.status(409).send({
        message: "A user with this these credentials already exists!"
      });
    }
  }
}

module.exports = UserController;
