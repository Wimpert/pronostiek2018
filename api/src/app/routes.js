var messages = require('../shared/models/messages');
var DBUtils = require('./DBUtils');
var constants =  require('../shared/models/Constants')

module.exports = function(app, passport) {



  app.post('/api/login' , function (req, res, next) {
       passport.authenticate('local-login', function (err, user ,info) {

           if(err){
               return next(err)
           }
           if(!user){
               if(info){
                   return res.send(409, info);
               }
           }
           req.logIn(user, function (err) {
               if (err) {
                   return next(err);
               }

               //here we set the cookies maxage:
               if(req.body.remember){
                  //"we want to be remebered:"
                   const tenYears = 1000*60*60*24*365*10;
                   req.session.cookie.maxAge = tenYears;
                   res.cookie(constants.COOKIE_NAME,user.id,{maxAge:tenYears});
               } else {
                   res.cookie(constants.COOKIE_NAME,user.id);
               }

               return res.send(200, user);
           });
       })(req, res, next);
   });


    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
           if (err) {
                return next(err);
            }
            if (!user) {
                if(info){
                    return res.send(409, info)
                }
                return res.redirect('');
           }
           
            req.logIn(user, function(err) {

                if (err) { return next(err); }

                //here we set the cookies maxage:
                if(req.body.remember){
                    //"we want to be remebered:"
                    const tenYears = 1000*60*60*24*365*10;
                    req.session.cookie.maxAge = tenYears;
                    res.cookie(constants.COOKIE_NAME,user.id,{maxAge:tenYears});
                } else {
                    res.cookie(constants.COOKIE_NAME,user.id);
                }


                return res.send(200, user);
            });
        })(req, res, next);
    });


    app.get('/api', function (req, res) {
        res.send("hellow there");
    })

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/api/profile', isLoggedIn, function(req, res) {
        console.log(req.user);
        console.log(req.session);
        res.send({
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.cookie(constants.COOKIE_NAME,"",{expires:new Date()});
        res.send(200, messages.logoutMessages.success.logoutSuccess);
    });

    app.get('/api/isadmin', function(req,res){
        let isAdmin = false;
        if(req.user !== undefined && req.user.admin === 1){
            isAdmin = true;
        }
        res.send(200, isAdmin);
    });

    /**
     * this will return the pronotiek base on who is logged in:
     */
    app.get('/api/pronostiek', isLoggedIn, DBUtils.PronostiekUtils.getPronostiek);
    app.get('/api/pronostiek/all', isAdmin, DBUtils.PronostiekUtils.getAllPronostiek);
    app.post('/api/pronostiek', isLoggedIn, DBUtils.PronostiekUtils.savePronostiek);
    
    app.put('/api/keys/:number', isLoggedIn, DBUtils.PronostiekUtils.createKeys);
    app.get('/api/keys', isAdmin, DBUtils.PronostiekUtils.getKeys);

    app.get('/api/users', isAdmin, DBUtils.PronostiekUtils.getAllUsers);


};


// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send(401, "ah ah ah, nice try !");
}

function isAdmin(req, res, next){
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        if(req.user.admin === 1){
            return next();
        }
    }
    // if they aren't redirect them to the home page
    res.send(401, "ah ah ah, nice try !");

}