const jwt = require("jsonwebtoken")

const SECRET_KEY = "SECR3T"

var token = jwt.sign(
    { "username": "admin", "userid": "12345", "emailid": "admin@company.com" }, 
    SECRET_KEY, 
    {expiresIn: "1m"}
);

console.log(token);

try {
    var decoded = jwt.verify(token, SECRET_KEY);
    console.table(decoded);
} catch(err) {
    console.log(err);
}
