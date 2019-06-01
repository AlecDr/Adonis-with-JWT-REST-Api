"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    try {
      const user = await User.create(
        request.only(["username", "email", "password"])
      );

      const { username, email } = user.toJSON();
      return response
        .status(201)
        .send({ message: "User created with email: " + email });
    } catch (error) {
      console.log(error);
      return response.status(200).send({
        message: "A user with this these credentials already exists!"
      });
    }
  }
}

module.exports = UserController;
