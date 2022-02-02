//You could transfer from products to users and accomplish the same objective
// get the client
const mysql = require('mysql2');

//see credentials file

const query = `SELECT * FROM Users`;

// //Simple Query - connection.query this takes a callback - onces your done executing it will call the parameters
// connection.query(query, (err, results, fields) => {
//     //it will display an error if theres an error
//     if(err){
//         console.log(err)
//     }
//     // this will show the results since there is no errors
//     console.log(results)

// });
// //query database using query

const getAllUsers = async () => {        
    const query = `SELECT * FROM Users`;
                                    // this will tell it you dont want a call back but to return it as promise
                                    // says execute this query I'll wait for this result and put it in this array
                                    //the first thing in the 
// const [err, results, fields] = await connection.promise().query(query) - this doesnt work
    const [results, fields] = await connection.promise().query(query)
//^ you remove the err, which was deconstructing fields from above - we were doing all the steps in one line, the mistake was it was expecting the first thing as err 
//but this query only returns two things, the library is saying the first element is result no matter what it is called in the array, you couldve also taken out field
    //this would be the long way of doing it // breaking down whats happening from above
    // const res = await connection.promise().query(query)
    // const err = res[0]
    // const results = res[1]
    // const fields = res[2]

console.log(results);
return results;
}




//creating a new product in a method// so we can reuse this function everytime to add new things 
const createUsers = async (users) => {
    //need backticks because you need to add information of the product in it, if its "" like this they will think its a string not a value
    const insertQuery = `INSERT INTO Users (firstName, lastName, Email)
    VALUES ('${users.firstName}', '${users.lastName}', '${users.Email}')`

    const [results,fields] = await connection.promise().query(insertQuery);
    
    console.log(results);
    return results;

};


//create users
createUsers ({
    firstName: "Brian",
    lastName: "Serein",
    Email: "brian@serein.com"
});

getAllUsers()
//this is to sever the connection after you run the database so there is no "memory leak"
connection.end();

