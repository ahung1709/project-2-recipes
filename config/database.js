const mongoose = require('mongoose');

// mongoose.connect(, {"mongodb+srv://sei_rocks_1:<password>@cluster0.vi1st2j.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(process.env.DATABASE_URL, 
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // useCreateIndex: true
    }
)

const db = mongoose.connection;

// database connection event
db.on('connected', function() {
    console.log(`Mongoose connected to: ${db.host}:${db.port}`)
})