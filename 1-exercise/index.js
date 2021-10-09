// ILLUSTRATES importing a package and using the package's function

var rect = {
    perimeter: function (x, y) {
        return (2 * (x + y));
    },
    area: function (x, y) {
        return (x * y);
    }
};

// OR rect variable can be initialized by importing the rectangle js file
var moduleName = require('./rectangle');

function solveRect(l, b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if (l < 0 || b < 0) {
        console.log("Rectangle dimensions should be greater than zero:  l = "
            + l + ",  and b = " + b);
    }
    else {
        console.log("The area of a rectangle of dimensions length = "
            + l + " and breadth = " + b + " is " + moduleName.area(l, b));
        console.log("The perimeter of a rectangle of dimensions length = "
            + l + " and breadth = " + b + " is " + moduleName.perimeter(l, b));
    }
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);
