'use strict';

class RitmClass {

    // Initiate your service-now instance with your instance url.
    constructor(sn){
        this.sn = sn
    }

    // Gets RITMs matching the query object.
    getRitms(QueryObject, callback){
        if(!number || typeof number != 'string') throw new Error('QueryObject not defined');
        this.sn.getRecords({
            table:'sc_req_item',
            query: QueryObject
        }, (err,data) => {
            callback(err,data)
        });
    }

    // Gets all active tickets.
    getActive(callback){
        this.sn.getRecords({
            table:'sc_req_item',
            query:{
                active: true
            }
        }, (err,data) => {
            callback(err,data)
        });
    }

    // Gets a single RITM by it's number.
    getByNumber(number, callback){
        if(!number || typeof number != 'string') throw new Error('RITM not defined');
        this.sn.getRecords({
            table:'sc_req_item',
            query:{
                number: number
            }
        }, (err,data) => {
            callback(err,data[0])
        });
    }

    // Closes a single RITM by its number.
    closeByNumber(RITM,CloseNotes,callback){
        if(!RITM || typeof RITM != 'string') throw new Error('RITM not defined');
        if(!CloseNotes || typeof CloseNotes != 'string') throw new Error('Close Notes not defined');
        let options = {
            method: 'POST',
            url: this.sn.url + 'sc_req_item.do',
            auth: this.sn.auth,
            qs: {
                JSONv2: '',
                sysparm_query: 'number=' + RITM,
                displayvariables: 'true',
                displayvalues: 'true',
                sysparm_action: 'update'
            },
            headers: {'content-type': 'application/json'},
            body: {close_notes: CloseNotes, active: false},
            json: true
        };
        request(options, (error, res, body) => {
            callback(error, body);
        });
    }

}

module.exports = RitmClass;