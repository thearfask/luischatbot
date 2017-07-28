ServiceNow v1.0
----
Service Now JSONv2 API wrapper. Includes easy to use functions to perform common tasks. Formerly published as 'snow-query'.

Highlight Features:
* Querying tables (GET),
* Updating Records (POST),
* Specialized Classes and Methods for common tasks (i.e. Closing RITMs.).

SNOW JSONv2 API Reference:
* [Service Now JSONv2 Wiki](http://wiki.servicenow.com/index.php?title=JSONv2_Web_Service#gsc.tab=0)
* [SNOW Tables and Classes](http://wiki.servicenow.com/index.php?title=Tables_and_Classes#gsc.tab=0)


#### 1. Getting Started

##### Get ServiceNow now!
```
npm install service-now --save
```

##### Require, and Initiate
```Javascript
'use strict'
const ServiceNow = require('service-now');
var Snow  = new ServiceNow('https://<your-instance-name>.service-now.com/', yourUsername, yourPassword);
```

#### 2. GET and POST - How to Query and Update Records (Class: Snow)

##### getRecords
A streamlined method to set your table and query then retrieving records. 

*Note: by default query Object contains "displayVariables: true". 
Each record's primary key will be converted to their proper value.*
```Javascript
Snow.getRecords(queryObject,callback)
```
Code Example:
```Javascript
Snow.getRecords({
    table: 'sc_req_item',
    query: {
        number:'RITM0123456'
        }
    },(err,data) => {
    // Do Stuff Here.
});
```

##### setTable
Sets the table variable for your Snow instance.
```Javascript
Snow.setTable(Table)    // Table as String
```
Code Example:
```Javascript
Snow.setTable('sc_req_item');
```

##### setQuery
Sets the query variable for your Snow instance.
```Javascript
Snow.setQuery(Arguments[Object], DisplayVariables, DisplayValues)
```
Code Example:
```Javascript
Snow.setQuery({
    active: true,
    number: 'RITM0123456',
    }, 'true', 'false');
```

##### get
Gets records from using the variables set from the setTable and setQuery methods.
```Javascript
Snow.get(callback)
```
Code Example:
```Javascript
Snow.get((err,data) => {
    // Do Stuff Here.
});
```

##### post
Updates records using the variables set from the setTable and setQuery methods. This will update all records matching the query.
```Javascript
Snow.post(JSONbody[object], callback)
```
Code Example:
```Javascript
Snow.post({
    close_notes: 'Batch closing tickets from ServiceNow.',
    active: false
    }, (err, res) => {
    // Do stuff with updated records.
    }
);
```

#### 3. RITM Methods (Class: Snow.Ritm)

##### getRitms
Gets RITMs matching the queryObject passed to the function.
```Javascript
Snow.Ritm.getRitms(queryObject, callback)
```
Code Example:
```Javascript
Snow.Ritm.getRitms({active: true, assignment_group: ''},(err,data) => {
    // Do Stuff Here.
});
```

##### getActive
Gets all active RITMs.
```Javascript
Snow.Ritm.getActive(callback)
```
Code Example:
```Javascript
Snow.Ritm.getActive((err,data) => {
    // Do Stuff Here.
});
```

##### getByNumber
Gets a single RITM by number.
```Javascript
Snow.Ritm.getByNumber(Number, callback)
```
Code Example:
```Javascript
Snow.Ritm.getByNumber('RITM0123456',(err,data) => {
    // Do Stuff Here.
});
```

##### closeByNumber
Closes a single RITM by number.
```Javascript
Snow.Ritm.closeByNumber(Number, CloseNotes, callback)
```
Code Example:
```Javascript
Snow.Ritm.closeByNumber('RITM0123456', 'Closing the ticket, issue was resolved.',(err,data) => {
    // Do Stuff Here.
});
```

#### 4. User Methods (Class: Snow.User)

##### getUsers
Gets all users in your SNOW instance.
```Javascript
Snow.User.getUsers(callback)
```
Code Example:
```Javascript
Snow.User.getUsers((err,data) => {
    // Do Stuff Here.
});
```

##### getUserGroups
Gets all user groups in your SNOW instance.
```Javascript
Snow.User.getUserGroups(callback)
```
Code Example:
```Javascript
Snow.User.getUserGroups((err,data) => {
    // Do Stuff Here.
});
```

##### getUserByUserName
Gets a single user by their username in your SNOW instance.
```Javascript
Snow.User.getUserByUserName(username, callback)
```
Code Example:
```Javascript
Snow.User.getUserByUserName('JSmith', (err,data) => {
    // Do Stuff Here.
});
```

##### getUserById
Gets a single user by their sys_id in your SNOW instance.
```Javascript
Snow.User.getUserById(userId, callback)
```
Code Example:
```Javascript
Snow.User.getUserByUserName('007c75ce6f2c9100222a57ee2c3ee43d', (err,data) => {
    // Do Stuff Here.
});
```

#### 5. Category Methods (Class: Snow.Category)

##### getCategories
Gets all categories in your SNOW instance.
```Javascript
Snow.Category.getCategories(callback)
```
Code Example:
```Javascript
Snow.Category.getCategories((err,data) => {
    // Do Stuff Here.
});
```

##### getCategoryItems
Gets all category items in your SNOW instance.
```Javascript
Snow.Category.getCategoryItems(callback)
```
Code Example:
```Javascript
Snow.Category.getCategoryItems((err,data) => {
    // Do Stuff Here.
});
```

#### 6. Utility Methods (Class: Snow.Utilities)

##### groupBy
Groups an array of JSON documents by a specific oject property.
```Javascript
Snow.Utilities.groupBy(data, property, callback)
```
Code Example:
```Javascript
Snow.Ritm.getActive((err, data) => {
    Snow.Utilities.groupBy(data, 'cat_item', groupData => {
        // Do Stuff Here
    });
});
```

##### flattenVariables
Note: Only for use with RITM documents when querying the same cat_item.
Refactors the embedded variables document, to be included in the parent document.
```Javascript
Snow.Utilities.flattenVariables(data, callback)
```
Code Example:
```Javascript
Snow.Ritm.getActive((err, data) => {
    Snow.Utilities.flattenVariables(data, flatData => {
        // Do Stuff Here
    });
});
```


Script Examples
----
##### Query Records Script Example 1
This is the preferred method of querying records.
```Javascript
'use strict'
const ServiceNow = require('service-now');
var Snow  = new ServiceNow('https://<your-instance-name>.service-now.com/', yourUsername, yourPassword);

Snow.getRecords({
    table: 'sc_req_item',
    query: {
        number:'RITM0123456'
        }
    },(err,data) => {
    // Do Stuff Here.
});
```

##### Query Records Script Example 2
This is an alternative method of querying records.
```Javascript
'use strict'
const ServiceNow = require('service-now');
var Snow  = new ServiceNow('https://<your-instance-name>.service-now.com/', yourUsername, yourPassword);

// Input whatever table you like.
Snow.setTable('sc_req_item');

// Declare your query object, and the 'displayvariables' & 'displayvalues' boolean as a string. By default it is true.
// Snow.setQuery(QueryObject, DisplayVariables, DisplayValues);
Snow.setQuery({
    active: true,
    number: 'RITM0123456',
    }, 'true', 'false');

// Get your data and do stuff.
Snow.get((err,data) => {
    // Do Stuff Here.
});
```

##### Update Records Script Example 2
This is an example method of updating records.
```Javascript
'use strict'
const ServiceNow = require('service-now');
var Snow  = new ServiceNow('https://<your-instance-name>.service-now.com/', yourUsername, yourPassword);

// Set your table.
Snow.setTable('sc_req_item');

// Set your query.
Snow.setQuery({
    active:true,
    priority: 3
    }, 'true', 'true');

// In this example we close all the tickets matching our query.
Snow.post({
    close_notes: 'Batch closing tickets from ServiceNow.',
    active: false
    }, (err, res) => {
    // Do stuff with updated records.
    }
);
```


##### License
The MIT License (MIT)

Copyright (c) 2016 Elias Hussary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.