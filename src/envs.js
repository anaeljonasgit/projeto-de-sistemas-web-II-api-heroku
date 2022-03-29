module.exports = {
    server: {
        port: process.env.PORT || 3000
    },

    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/apiwebii'
    }
};