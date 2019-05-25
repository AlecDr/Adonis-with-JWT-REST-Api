"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const user = await User.create(
      request.only(["username", "email", "password"])
    );

    const { username, email } = user.toJSON();
    return { username, email };
  }
}

module.exports = UserController;
