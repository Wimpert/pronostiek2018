
module.exports = function(app, passport) {



    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/api', // redirect to the secure profile section
        failureRedirect : '/api/login', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
                console.log(req.session);
            }
            res.redirect('/test');
    });

    // process the signup form
   /* app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/profile', // redirect to the secure profile section
        failureRedirect : '/api/signup', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }));*/

    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            console.log(err);
            console.log(user);
            console.log(info);
            res.send("hellow there");
           /* if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + user.username);
            });*/
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
        res.send({
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};


// route middleware to make sure
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send(401, "ah ah ah, nice try !");
}