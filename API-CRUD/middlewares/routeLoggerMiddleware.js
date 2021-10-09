module.exports = (req, res, next) => {
    console.log('Middleware executed : ', req.method, req.url);
    // next function is important, so that the execution continues to render 'not-found' page
    next();
}
