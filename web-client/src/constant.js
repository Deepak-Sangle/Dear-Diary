const { REACT_APP_SERVER_URI, REACT_APP_LOCAL_ENV} = process.env

const isDev = process.env.NODE_ENV === 'development' ;

module.exports = {
 BASE_URI : !isDev ? REACT_APP_SERVER_URI : REACT_APP_LOCAL_ENV
}