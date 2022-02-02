// get the client
const mysql = require('mysql2');

//see credentials

const query = `SELECT * FROM Products`;

// //Simple Query - connection.query this takes a callback - onces your done executing it will call the parameters
// connection.query(query, (err, results, fields) => {
//     //it will display an error if theres an error
//     if(err){
//         console.log(err)
//     }
//     // this will show the results since there is no errors
//     console.log(results)

// });
//query database using query

const getAllProducts = async () => {        
    const query = `SELECT * FROM Products`;
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
const createProduct = async (product) => {
    //need backticks because you need to add information of the product in it, if its "" like this they will think its a string not a value
    const insertQuery = `INSERT INTO Products (Description, SKU, UserId)
    VALUES ('${product.description}', '${product.sku}', ${product.userId})`

    const [results,fields] = await connection.promise().query(insertQuery);
    
    console.log(results);
    return results;

};




//create product
createProduct ({
    description: "Brians new Product",
    sku: "Brian1234",
    userId: 1
});

getAllProducts()
//this is to sever the connection after you run the database so there is no "memory leak"
connection.end();

