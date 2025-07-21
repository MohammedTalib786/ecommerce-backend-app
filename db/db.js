const mongoose = require('mongoose');

// >>>>>>>>>>>>>>>>>>>> Old Method (For Single DB UseCase)
// mongoose.connect(process.env.USER_DATABASE_CONNECTION_URI)
//     .then(res =>  console.log('✅ MongoDB connected to DB:', mongoose.connection.name) )
//     .catch(err => console.log('Error Occured', err.message))



const prodsDB = mongoose.createConnection(process.env.PRODS_DATABASE_CONNECTION_URI)
prodsDB.on('connected', () =>
    console.log('✅ Connected to Product DB:', prodsDB.name)
);


const blogDB = mongoose.createConnection(process.env.BLOG_DATABASE_CONNECTION_URI)
blogDB.on('connected', () =>
    console.log('✅ Connected to User DB:', blogDB.name)
);




module.exports = { blogDB, prodsDB };
