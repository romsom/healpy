var subscriptionKey = "e23b9cad8ef54a63beb429b074a7b73b";
oxfordURL = "http://api.projectoxford.ai/vision/v1/analyses?";
getOxfordCV = function(file, features) {
    var params = {
	// Request parameters
	// "visualFeatures": "All",
	"visualFeatures": features
    };    
    HTTP.call('POST', oxfordURL, {
	content: file,
	params: params,
	headers: {
	    'Content-Type': "application/octet-stream",
	    'Access-Control-Allow-Origin': "*",
	    'Ocp-Apim-Subscription-Key': subscriptionKey
	}
    }, function(error, result) {
	if (error)
	    console.log(error);
	else
	    return result;
    });
	      /*
    $.ajax({
	url: "https://api.projectoxford.ai/vision/v1/analyses?" + $.param(params),
	beforeSend: function(xhrObj){
	    // Request headers
	    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
	    xhrObj.setRequestHeader("Access-Control-Allow-Origin","*");
	    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	},
	type: "POST",
	processData: false,
	// Request body
	//data: $('#file')['0'].files[0],
	data: file,
    }).done(function(data) {
	console.log(data);
    }).fail(function(error) {
	console.log(error);
    });
	      */
}
/*
var openFile = function(events) {
    var input = event.target;
    var reader = new FileReader();
    reader.readAsBinaryString(input.files[0]);
    reader.onload = function(){
	var arrayBuffer = reader.result;
	console.log('finished reading file', arrayBuffer);
	challenge.check(arrayBuffer);
    }
}
*/
