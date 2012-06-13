var Application = require( CONTROLLER_DIR + 'application' );
var qs          = require( 'querystring' );
var request     = require( 'request' );

var api_url = 'https://api-3t.sandbox.paypal.com/nvp';
var params  = {
  USER      : 'seller_1339472528_biz_api1.gmail.com',
  PWD       : '1339472553',
  SIGNATURE : 'AFcWxV21C7fd0v3bYYYRCpSSRl31Af-aECo8vsiP1HospgIyBCFncbx3',
  METHOD    : 'SetExpressCheckout',
  VERSION   : '78',
  returnUrl : 'http://localhost:4000/carts/return',
  cancelUrl : 'http://localhost:4000/carts/cancel',
  PAYMENTREQUEST_0_AMT          : '11.99',
  PAYMENTREQUEST_0_CURRENCYCODE : 'USD',
  PAYMENTREQUEST_0_DESC         : 'Sashimi'
};

module.exports = Application.extend({

  checkout : function ( req, res, next ){
    var url = api_url + '?' + qs.stringify( params );

    request.get( url, function ( err, response, body ){
      if( err ) next( err );

      var token = qs.parse( body )[ 'TOKEN' ];

      res.render( 'carts/checkout', { token : token });
    });
  }
});