


var builder = require('botbuilder');
var restify = require('restify');
//const ServiceNow = require('service-now');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: '79cd64a4-818e-4cec-b629-6d4565643ae8',
    appPassword: 'c7OkDzudhLi5Agsw6Yhd7vF'
});

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/181857c7-2760-473d-bfc5-70e797409c5d?subscription-key=0cd2a4d65c584da0ab06248a0ba35e80&timezoneOffset=0&verbose=true');
var intents = new builder.IntentDialog({ recognizers:[recognizer]});

//var instance = new ServiceNow('https://dev25419.service-now.com/', 'admin', 'ArfaaShaikh@123');
//var arrayOfQuestions = ['I am not able to receive emails', 'unable to send emails','send receive error in outlook'];
var sol1 = 'Check if you connected to internet';
var sol2 = 'Check if your LAN cable is connected or connected to Wifi';
var sol3 = 'Check if your MS outlook is connected to MS exchange or if you are working offline';
var arrayOfAnswers = [sol1, sol2, sol3]; 

var commonSol = 'reset password using self-service portal in Browser- http://self service .vsnl.co.in';
var windowsSol = 'On Locked Screen , press ALT- CTRL - DEL and Click on reset password and follow steps to reset password';

var macSol = ' Go to system preferences then user account , click on change password and follow steps to reset';
var arrayOfWindowsSolutions = [commonSol, windowsSol, macSol];

bot.dialog('/', intents);


intents.matches('GreetUser', [
    function (session){
        session.send( "Hi, How can I Help You ? ");
        //session.beginDialog('askQuerry');
    }
])

intents.matches('Emailissues', [
    function(session){
        session.send('Try these Solutions :' + "\n\n" + '1)' + sol1 + "\n\n" + '2)' + sol2 + "\n\n" + '3)' + sol3  )
        builder.Prompts.text(session, 'Did that work ? | Yes | No |')
    },
    (session, results)=>{
        var userInput = results.response;

        if(userInput.toLowerCase() == "yes"){
            session.send("Glad to help you...")
        }else if( userInput.toLowerCase() == "no" ){
            session.beginDialog('askQuerry')
        }else{
            session.send("email issues...")
        }
    }
])

intents.matches('PasswordReset', [
    function(session){
        session.beginDialog('passwordReset')
    }
])

bot.dialog('passwordReset',[

   (session)=>{

      session.send('Which Operating system do you use ? \n\n   <b>Select One :</b> \n\n - Windows \n\n - Macintosh')
       session.endDialog()
   }
])

intents.matches('MacintoshUser',[
    (session)=>{
        session.beginDialog('configMac')
    }
]);

intents.matches('WindowsUser',[
    (session)=>{
        session.beginDialog('configWindows')
    }
])

bot.dialog('askQuerry',[
	
    function(session){
            if(intents.matches('NotHelping')){
           builder.Prompts.text(session,"Select an option : \n\n | Raise a Request |  Talk to our Executive | ?")
        }else{
            session.send("invalid");
        }
    },
    function(session, results){
        if(intents.matches('RaiseTicket')){
            session.send("A Ticket has been raised for your issue \n\n")
            session.send("Ticket ID : 405949")
            session.send("Ticket Title : Email Issues")
            session.endDialog()
        }else{
            session.send("invalid")
        }
    }
	
]);


bot.dialog('configWindows', [
    (session)=>{
        session.send('Try : ' + arrayOfWindowsSolutions[0]);
        builder.Prompts.text(session, 'Did that work ? | Yes | No |');
    },
    (session, results)=>{
        var udata = results.response;
        if(udata.toLowerCase() == "yes"){
            session.send('Happy to help you, keep asking me querries..');
            
        }else if(udata.toLowerCase() == "no"){
            session.send( 'Try another Solution : ' + arrayOfWindowsSolutions[1] );
            builder.Prompts.text(session, 'Did that work ? | Yes | No |' )
        }else{
            session.send('Try Again !! ')
        }
    },
    (session, results)=>{
        var udata = results.response;
        if(udata.toLowerCase() == "yes"){
            session.send('Happy to help you, keep asking me querries..');
            session.endDialog()
        }else{
            session.beginDialog('askQuerry')
        }
    }
])

intents.matches('problemResolved', [
    (session)=>{
        session.send("You're Welcome :-) ")
    }
])

intents.matches('TalkToExecutive', [
    (session)=>{
        session.send('Our engineer will soon contact you for further guidance..')

    }
])

bot.dialog('configMac', [
    (session)=>{
        session.send('Try : ' + arrayOfWindowsSolutions[0]);
        builder.Prompts.text(session, 'Did that work ? | Yes | No |');
    },
    (session, results)=>{
        var udata = results.response;
        if(udata.toLowerCase() == "yes"){
            session.send('Happy to help you, keep asking me querries..');
            if(intents.matches('problemResolved')){
                session.send("You're welcome !!")
            }
        }else if(udata.toLowerCase() == "no"){
            session.send( 'Try another Solution : ' + arrayOfWindowsSolutions[2] +"Mac");
            builder.Prompts.text(session, 'Did that work ? | Yes | No |' )
        }else{
            session.send('Try Again !! ')
        }
    },
    (session, results)=>{
        var udata = results.response;
        if(udata.toLowerCase() == "yes"){
            session.send('Happy to help you, keep asking me querries..');
           session.endDialog();
        }else{
            session.beginDialog('askQuerry')
        }

    }
])