module.exports = {
    // ensureAuth: function (req, res, next) {
    //     if(req.isAuthenticated()){
    //         return next();
    //     }else{
    //         res.redirect('/');
    //     }
    // },
    // ensureGuest: function (req, res, next){
    //     if(req.isAuthenticated()){
    //         res.redirect('/auth/login');
    //     }else{
    //         return next();
    //     }
    // }
    checkAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            console.log('auth1')
            return next();
        }
        console.log('not auth1')
        res.redirect('/login');
    },
    checkNotAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            console.log("not auth")
            return res.redirect('/');
        }
        console.log('auth');
        next();
        
    }
}