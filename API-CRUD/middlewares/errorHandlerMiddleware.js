const errorHandlerMiddleware = (err, req, res, next) => {
    // Print error to server's console
    console.log('!!! ERROR MESSAGE : ' + err.message)

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('index');
};

module.exports = errorHandlerMiddleware;