const mongoose = require('mongoose');
const registryDB = 'mongodb://127.0.0.1:27017/registry';

const registry = async () => {
    await mongoose.connect(registryDB);
}


registry().then(() => {
    console.log("Connection Open!!");
}).catch( err => {
    console.log("Whoops...");
    console.log( err );
});

module.exports = registry;