
const isDev = process.env.NODE_ENV !== 'development' ;

console.log({environment : process.env.NODE_ENV, isDev})

module.exports = {
 BASE_URI : isDev ? "https://dear-diary-api.onrender.com" : "http://localhost:5000"
}