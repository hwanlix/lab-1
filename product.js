const fs = require("fs");
const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  REDIRECT: 302,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const renderAddProductPage = (response) => {
  response.writeHead(STATUS_CODE.OK, { "Content-Type": "text/html" });
  response.end(`
    <html>
      <body>
        <h1>Add Product</h1>
        <form method="POST" action="/product/add">
          <input type="text" name="product" placeholder="Enter product name" required />
          <button type="submit">Add</button>
        </form>
      </body>
    </html>
  `);
};

const renderNewProductPage = (response) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err) {
      response.writeHead(STATUS_CODE.SERVER_ERROR, { "Content-Type": "text/plain" });
      return response.end("Error reading product.");
    }
    response.writeHead(STATUS_CODE.OK, { "Content-Type": "text/html" });
    response.end(`<html><body><h1>Last Product</h1><p>${data}</p></body></html>`);
  });
};

const addNewProduct = (request, response) => {
  let body = "";

  request.on("data", chunk => {
    body += chunk.toString();
  });

  request.on("end", () => {
    const product = new URLSearchParams(body).get("product");
    fs.writeFile("product.txt", product, (err) => {
      if (err) {
        response.writeHead(STATUS_CODE.SERVER_ERROR, { "Content-Type": "text/plain" });
        return response.end("Error saving product.");
      }
      response.statusCode = STATUS_CODE.REDIRECT;
      response.setHeader("Location", "/product/new");
      response.end();
    });
  });
};

const productRouting = (request, response) => {
  const { url, method } = request;

  if (method === "GET" && url === "/product/add") {
    return renderAddProductPage(response);
  }

  if (method === "POST" && url === "/product/add") {
    return addNewProduct(request, response);
  }

  if (method === "GET" && url === "/product/new") {
    return renderNewProductPage(response);
  }

  if (method === "GET" && url.startsWith("/product/")) {
    const productId = url.split("/")[2];
    response.writeHead(STATUS_CODE.OK, { "Content-Type": "text/plain" });
    return response.end(`Details of product with ID: ${productId}`);
  }

  response.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "text/plain" });
  response.end("Product not found.");
};

module.exports = productRouting;
