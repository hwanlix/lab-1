const logoutRouting = (method, response) => {
    if (method === "GET") {
      response.setHeader("Content-Type", "text/html");
      return response.end(`
        <html>
          <body>
            <h1>You have been logged out.</h1>
            <a href="/">Return to Home</a>
          </body>
        </html>
      `);
    }
  
    response.statusCode = 405;
    response.setHeader("Content-Type", "text/plain");
    response.end("Method Not Allowed");
  };
  
  module.exports = logoutRouting;
  