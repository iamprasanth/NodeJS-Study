// Program mimicing the asynchronous style of execution by using setTimeout
function solveRect(l,b) {
    console.log("*** Solving for rectangle with l = "
                + l + " and b = " + b + " ***");
    rect(l,b, (err,rectangle) => {
        // Executed as callback for the function call
        // l & b is the parameter passed
        // err, rectangle is returned from the rect function
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
};

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);