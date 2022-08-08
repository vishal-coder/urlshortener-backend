import jwt from "jsonwebtoken";
// custom middleware
export const verifyAWT = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    if (!token) return response.status(401).send("Access Denied");
    console.log(token);
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    request.user = verified;
    next();
  } catch (err) {
    response.status(401).send({ error: err.message });
  }
};

// jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
//   if (err) {
//     console.log(err);
//     response.status(401).send({ error: err.message ,auth:false});
//   } else {
//     console.log("decoded token is- ", decodedToken);
//     console.log("decoded token..id is- ", decodedToken.id);
//     next();
//   }
// });
