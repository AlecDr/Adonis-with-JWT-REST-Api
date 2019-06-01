"use strict";

class AuthController {
  /**
   * @param {Request} {request}
   * @return {JWT Token} token
   */
  async create({ request, auth, response }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);

      return token;
    } catch (error) {
      console.log(error);
      return response.status(401).send({ message: "Email or password wrong!" });
    }
  }
}

module.exports = AuthController;
