var fs = require('fs');
var layer = require('cloud/layer-parse-module/layer-module.js');


var layerProviderID = 'layer:///providers/79242c48-71e5-11e5-8085-f95800000e96';  // Should have the format of layer:///providers/<GUID>
var layerKeyID = 'layer:///keys/8fd0c24e-71f9-11e5-9b5b-f95800000e96';   // Should have the format of layer:///keys/<GUID>
var privateKey = fs.readFileSync('cloud/layer-parse-module/keys/layer-key.js');
layer.initialize(layerProviderID, layerKeyID, privateKey);


Parse.Cloud.define("generateToken", function(request, response) {
    var currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');
    var userID = currentUser.id;
    var nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');
        response.success(layer.layerIdentityToken(userID, nonce));
});



// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});
