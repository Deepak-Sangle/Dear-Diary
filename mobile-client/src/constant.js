const isDev = process.env.NODE_ENV === 'development' ;

module.exports = {
 BASE_URI : isDev ? "https://api.deardiary.tech" : "http://localhost:5000",
 PRIMARY_COLOR : "#aa8443",
 SECONDARY_COLOR : "#2d2d2d",
}