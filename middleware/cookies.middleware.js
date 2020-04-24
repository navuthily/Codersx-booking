let cookies_req = {};
let counter = 0;

module.exports = {
  countCookieRequest: (req, res, next) => {
    try {
      // let counter = cookies_req[req.cookies];
      if (counter || counter === 0) {
        cookies_req[req.cookies] = counter += 1;
      } else {
        cookies_req[req.cookies] = 0;
      }
      console.log(req.cookies, `:${counter}`);
      next();
    } catch (err) {
      console.log(err);
    }
  }
};
