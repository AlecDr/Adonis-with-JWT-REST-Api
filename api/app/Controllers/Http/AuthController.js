"use strict";

class AuthController {
  /**
   * @param {Request} {request}
   * @return {JWT Token} token
   */
  async create({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
