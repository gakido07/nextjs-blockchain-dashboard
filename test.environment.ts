/** Important to extend the default jest environment jsdom in order to add Text encoder instances. ES5 syntax is intentional */

const Environment = require("jest-environment-jsdom").default;

module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
    this.global.Response = Response;
    this.global.Request = Request;
  }
};
