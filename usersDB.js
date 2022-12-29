require('dotenv').config();
const connectDB = require('./db/connection');
const UserSchema = require('./models/userSchema');
const usersData = require('./MOCK_DATA.json');


const start =async()=>{

    try{

        await connectDB(process.env.MONGODB_URI);
        await UserSchema.create(usersData)
        console.log('successc');

    }
    catch(error){

        console.log(error);
    }
}


start()
