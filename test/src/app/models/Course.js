const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

var mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Course = new Schema({
    _id: {type:Number},
    name: {type:String, required: true},
    description: {type:String},
    image: {type:String},
    videoId: {type:String, required: true},
    level: {type:String},
    slug: { type: String, slug: 'name', unique: true},
    // createdAt: {type: Date, default: Date.now},
    // updatedAt: {type: Date, default: Date.now},
  }, {
    _id: false, // mongoose sẽ không can thiệp vào trường này nữa
    timestamps: true,
  });

  //Add phugin
  mongoose.plugin(slug);
  Course.plugin(AutoIncrement);
  Course.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true
  });

  module.exports = mongoose.model('Course', Course);