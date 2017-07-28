'use strict';

// Dependencies
const request           = require('request');
const qs                = require('querystring');

// ServiceNow Classes
const UserClass         = require('./snUserClass');
const RitmClass         = require('./snRitmClass');
const UtilitiesClass    = require('./snUtilitiesClass');
const CategoryClass     = require('./snCategoryClass');

// Constructor
class ServiceNow {

    // Initiate your service-now instance with your instance url.
    constructor(url, user, pass){
        !user ? user = 'username' : user;
        !pass ? pass = 'password' : pass; 
        
        // Beginning of SNOW initiation.
        this.url = url;
        this.table = 'sc_req_item';
        this.query = '';
        this.qs = {
            JSONv2: '',
            sysparm_query: this.query,
            displayvariables: true,
            displayvalue: true
        };
        this.auth = {
            user: user,
            pass: pass        
        };

        // Initiate other SQ Classes.
        this.User = new UserClass(this);
        this.Ritm = new RitmClass(this);
        this.Utilities = new UtilitiesClass(this);
        this.Category = new CategoryClass(this);

    }
    
    
    // Function to set your username and password.
    setAuth(Username, Password){
        this.auth.user = Username;
        this.auth.pass = Password;
    }

    // Function to set the preferred service-now table to query.
    setTable(Table){
        this.table = Table + '.do'
    }

    // Function to set your documents query.
    setQuery(Arguments, DisplayVariables, DisplayValues){
        this.qs.sysparm_query = qs.stringify(Arguments,'^');
        if(DisplayVariables){this.qs.displayvariables = DisplayVariables}
        if(DisplayValues){this.qs.displayvalue = DisplayValues}
    }

    // Function for retrieving all documents matching the setQuery arguments.
    get(callback){
        let options = {
            method: 'GET',
            url: this.url + this.table,
            qs: this.qs,
            auth: this.auth,
            headers: {'content-type': 'application/json'},
            json: true
        };
        request(options, (err, response, body) => {
            let res = JSON.parse(body);
            let jsonRes = res.records;
            callback(err, jsonRes)
        });
    }

    // Function for retrieving all documents matching the queryObject arguments passed within the fucntion.
    getRecords(queryObject, callback){
        let options = {
            method: 'GET',
            url: this.url + queryObject.table +'.do',
            qs: this.qs,
            auth: this.auth,
            headers: {'content-type': 'application/json'},
            json: true
        };
        options.qs.sysparm_query = qs.stringify(queryObject.query,'^');
        request(options, (err, response, body) => {
            try {
                var res = JSON.parse(body);
            } catch(e) {
                var res = body
            }
            let jsonRes = res.records;
            callback(err, jsonRes)
        });
    }

    // Function for posting updates to all documents matching the setQuery arguments.
    post(body, callback){
        let options = {
            method: 'POST',
            url: this.url + this.table,
            auth: this.auth,
            qs: {
                JSONv2: '',
                sysparm_query: this.query,
                displayvariables: 'true',
                displayvalues: 'true',
                sysparm_action: 'update'
            },
            headers: {'content-type': 'application/json'},
            body: body,
            json: true
        };
        request(options, (error, res, body) => {
            callback(error, body);
        });
    }
}


module.exports = ServiceNow;