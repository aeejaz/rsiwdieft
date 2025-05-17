const userModel = require('../models/user.model');

// db to connect _- models for TABLEcontrollers for logic _- routes for validation _- 
// services for adding users
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}