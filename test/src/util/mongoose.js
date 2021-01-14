module.exports = {
    mutipleMongoosetoObject: function (mongooseArray) {
         return mongooseArray.map(function(mongoose){
            return mongoose.toObject();
         })       
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}