const homeRouting = (method, response) => {
    if (method === "GET") {
      response.setHeader("Content-Type", "text/html");
      return response.end(`
        <html>
          <body>
            <h1>Home Page</h1>
            <ul>
              <li><a href="/product/add">Add Product</a></li>
              <li><a href="/product/new">Last Product</a></li>
              <li><a href="/student">View Student</a></li>
              <li><a href="/student/add">Add Student</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </body>
        </html>
      `);
    }
  
    response.statusCode = 405;
    response.setHeader("Content-Type", "text/plain");
    response.end("Method Not Allowed");
  };
  
  module.exports = homeRouting;
  
