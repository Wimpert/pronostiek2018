// config/database.ts

function getDBConf() {
    console.log("env:");
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"){
        return {
            'connection': {
                'host': 'localhost',
                'user': 'de_jackies',
                'password' : 'spelvreugde666'
         },
            'database': 'pronostiek',
            'users_table': 'users'
        };
    }
    return {
        'connection': {
            'host': 'localhost',
            'user' : 'root',

        },
        'database': 'pronostiek',
        'users_table': 'users'
        };
}

module.exports =  getDBConf();




/*
module.exports = {
    'connection': {
        'host': 'localhost',
        'user' : 'root'
        /!*'user': 'de_jackies',
        'password' : 'spelvreugde666'*!/

    },
    'database': 'pronostiek',
    'users_table': 'users'
};*/
