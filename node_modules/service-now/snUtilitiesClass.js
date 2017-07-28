'use strict';

class UtilitiesClass {

    // Initiate your service-now instance with your instance url.
    constructor(sn){
        this.sn = sn
    }

    // Simple implementation of lodash's groupBy to group documents by a specific key property.
    groupBy(data, property, callback){
        let jsonRes = _.groupBy(data,property);
        callback(jsonRes)
    }

    // Flattens embedded variable document array into it's parent document.
    flattenVariables(data, callback){
        let jsonRes = [];
        let itemCount = 0;
        data.forEach(r => {
            itemCount++;
            let varLen = r.variables.length;
            let varCount = 0;
            let variables = r.variables;
            delete r.variables;
            variables.forEach(v => {
                varCount++;
                r[v.question_text] = v.value;
                if(varCount === varLen){
                    jsonRes.push(r)
                }
                if(itemCount === data.length && varCount === varLen){
                    callback(jsonRes);
                }
            });
        });
    }

}

module.exports = UtilitiesClass;