// config/database.ts

function getDBConf() {

    console.log(process.env.NODE_ENV);
    
    
    if (process.env.NODE_ENV === "production"){
        return {
            'connection': {
                'host': 'localhost',
                'user': 'de_jackies',
                'password' : 'spelvreugde666',
               'createDatabaseTable': 'true'

         },
            'database': 'pronostiek',
            'users_table': 'users'
        };
    }
    return {
        'connection': {
            'host': 'localhost',
            'user' : 'root'
        },
        'database': 'pronostiek',
        'users_table': 'users'
        };
}

module.exports =  getDBConf();

