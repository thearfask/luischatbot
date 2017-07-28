'use strict';

// Dependencies
const SnowQuery     = require('./service-now.js');


class CategoryClass {

    // Initiate your service-now instance with your instance url.
    constructor(sn){
        this.sn = sn
    }
    
    getCategories(callback){
        this.sn.getRecords({table: 'sc_category', query:{}}, (err,data) =>{
            callback(err,data)
        })
    }
    
    getCategoryItems(callback){
        this.sn.getRecords({table: 'sc_cat_item', query:{}}, (err,data) => {
            callback(err,data)
        })
    }

}

module.exports = CategoryClass;