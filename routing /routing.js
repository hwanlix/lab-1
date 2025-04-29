const homeRouting = require("./home");
const productRouting = require("./product");
const logoutRouting = require("./logout");

const requestRouting = (request, response) => {
  const { url, method } = request;
  console.log(`INFO (${new Date().toUTCString()}): ${method} ${url}`);

  if (url === "/") {
    return homeRouting(method, response);
  }

  if (url.startsWith("/product")) {
    return productRouting(request, response);
  }

  if (url === "/logout") {
    return logoutRouting(method, response);
  }

  response.statusCode = 404;
  response.setHeader("Content-Type", "text/html");
  response.write("<html><body><h1>404 - Not Found</h1></body></html>");
  response.end();
  console.warn(`ERROR (${new Date().toUTCString()}): Page not found ${url}`);
};

module.exports = requestRouting;
