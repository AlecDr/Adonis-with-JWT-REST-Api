"use strict";
const User = use("App/Models/User");

class AuthController {
  /**
   * @param {Request} {request}
   * @return {JWT Token} token
   */
  async create({ request, auth, response }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      const user = await User.query()
        .where("email", email)
        .first();

      return response
        .status(201)
        .send({ token, user: { email: user.email, name: user.username } });
    } catch (error) {
      console.log(error);
      return response.status(200).send({ message: "Email or password wrong!" });
    }
  }
}

module.exports = AuthController;
