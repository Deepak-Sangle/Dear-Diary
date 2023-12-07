const isDev = process.env.NODE_ENV === 'development' ;

module.exports = {
 BASE_URI : isDev ? "https://api.deardiary.tech" : "http://localhost:5000"
}