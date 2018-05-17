function getSessionStoreConf() {

    if (process.env.NODE_ENV === "production"){
        return {
            host: 'localhost',
            user: 'de_jackies',
            password : 'spelvreugde666',
            createDatabaseTable: true,
            database: 'pronostiek'
        };
    }
    return {
        host: 'localhost',
        user : 'root',
        createDatabaseTable: true,
        database: 'pronostiek'
    };

}

module.exports =  getSessionStoreConf();