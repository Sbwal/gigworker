module.exports = {
    "app": {
        "port": process.env.PORT
    },
    "mongoConfig": {
        "host": process.env.MONGO_HOST,
        "mongoPort": process.env.MONGO_PORT,
        "dbName": process.env.DB_NAME,
        "userName": process.env.USER_NAME,
        "password": process.env.PASSWORD,
    }
}