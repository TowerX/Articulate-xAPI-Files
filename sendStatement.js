/**********
 * This function gathers the parameters that the xAPI framework looks for and sends them to your LRS.
 * 
 * First it gathers userName and emailAddress data that is stored in Articulate Storyline.  
 * GetPlayer() and GetVar are built-in functions that allow you to pull Storyline data into your own custom code.  
 * A great resource to learn more about Storyline Variables is https://community.articulate.com/articles/articulate-storyline-360-user-guide-how-to-work-with-variables
 * 
 * Next, ths xAPI statement needs to be built. The components included (actor, verb, object) of this are to meet general needs, however there's a lot more you can do if these don't meet your needs.
 * A great resource to learn more is https://xapi.com/statements-101/
 * 
 * You will need to call this function (sendStatement) within a learning experience to capture something that you want to send to your LRS.
 * 
 * For example, in Articulate Storyline, you will add a trigger that uses custom JavaScript.  
 * Your JavaScript might look something like this:
 * sendStatement("completed","http://adlnet.gov/expapi/verbs/completed","http://mywebpage.com/learning/basketweaving","Finished basketweaving","Learner clicked the finish button");
**********/



// Send statement function
function sendStatement(verb, verbID, objID, objName, objDesc){

	// Get Username & Email from Articulate Storyline
	userName = GetPlayer().GetVar("userName");
	emailAddress = GetPlayer().GetVar("emailAddress");

	// Structure the statement for xAPI
	var statement = {  
	    "actor": {  
	        "mbox": "mailto:"+emailAddress,  
	        "name": userName,  
	        "objectType": "Agent"  
	    },  
	    "verb": {  
	        "id": verbID,  
	        "display": {"en-US": verb}  
	    },  
	    "object": {  
	        "id": objID,  
	        "definition": {  
	            "name": {"en-US": objName},  
	            "description": {"en-US": objDesc}  
	        },  
	        "objectType": "Activity"  
	    }  
	};

	// Send the prepared statement to the xAPI wrapper
	ADL.XAPIWrapper.sendStatement(statement);
	
	// dirty debug step to make sure it worked
	console.log(verb + " statement has been sent!");
}
