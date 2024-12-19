const jwt = require("jsonwebtoken");
const sign = process.env.JWT_SECRET ;
module.exports = {
    generate(data) {
        return jwt.sign(data, sign);
    },
    verify(token) {
        try {
            return jwt.verify(token, sign);
        } catch (error) {
            throw new Error("Токен некорректный или истек");
        }
    }
};

