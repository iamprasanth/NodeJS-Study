var sampleLocalVar = 10;
exports.perimeter = (x, y) => {
    (2*(x+y));
}
// OR, since it has only single line we can reduce it to
exports.perimeter =  (x, y) => (2*(x+y));

exports.area = (x, y) => (x*y);

// Another way of exporting is declaring perimeter and area functiona as variable
// and adding those variables to exports object of the module
// module.exports = {perimeter, area}


