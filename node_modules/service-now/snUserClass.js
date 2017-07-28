'use strict';

class UserClass {

    // Initiate your service-now instance with your instance url.
    constructor(sn){
        this.sn = sn
    }
    
    // Gets all users.
    getUsers(callback){
        this.sn.getRecords({table:'sys_user',query:{}}, (err,data) => {
            callback(err,data)
        });
    }
    
    // Gets all user groups.
    getUserGroups(callback){
        this.sn.getRecords({table:'sys_user_group',query:{}}, (err,data) => {
            callback(err,data)
        })
    }
    
    // Gets a single user by username.
    getUserByUserName(username, callback){
        if(!username || typeof username != 'string' ) throw new Error('No username provided');
       this.sn.getRecords({table:'sys_user', query:{
           user_name: username
       }},(err,data) => {
           callback(err,data[0]);
       });
    }

    // Gets a single user by id.
    getUserById(userId, callback){
        if(!userId || typeof username != 'string' ) throw new Error('No userId provided');
        this.sn.getRecords({table:'sys_user', query:{
            sys_id: userId
        }},(err,data) => {
            callback(err,data[0]);
        });
    }

}

module.exports = UserClass;