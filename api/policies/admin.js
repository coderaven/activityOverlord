
module.exports = function(req, res, next){
    // User is allowed, proceeed to controller
    if (req.session.User && req.session.User.admin){
        return next();
    }

    // User is not allowed
    else {
        var requiredAdminError = [{name: 'requiredAdminError', message: 'You must be an admin to access this.'}];
        req.session.flash = {
            err: requiredAdminError
        };
        res.redirect('/session/new');
        return;
    }
};