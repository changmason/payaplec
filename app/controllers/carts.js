var Application = require( CONTROLLER_DIR + 'application' );
var util        = require( 'util' );
var qs          = require( 'querystring' );
var request     = require( 'request' );

var api_url = 'https://api-3t.sandbox.paypal.com/nvp';


module.exports = Application.extend({

  checkout : function ( req, res, next ){
    var params  = {
      USER      : 'seller_1339472528_biz_api1.gmail.com',
      PWD       : '1339472553',
      SIGNATURE : 'AFcWxV21C7fd0v3bYYYRCpSSRl31Af-aECo8vsiP1HospgIyBCFncbx3',
      METHOD    : 'SetExpressCheckout',
      VERSION   : '78',
      returnUrl : 'http://localhost:4000/carts/ecreturn',
      cancelUrl : 'http://localhost:4000/carts/eccancel',
      SOLUTIONTYPE                   : 'sole',
      PAYMENTREQUEST_0_AMT           : '11.99',
      PAYMENTREQUEST_0_CURRENCYCODE  : 'USD',
      PAYMENTREQUEST_0_PAYMENTACTION : 'Sale',
      PAYMENTREQUEST_0_DESC          : 'Sa-shi-mi'
    };
    var url = api_url + '?' + qs.stringify( params );

    request.get( url, function ( err, response, body ){
      if( err ) next( err );

      res.render( 'carts/checkout', { token : qs.parse( body )[ 'TOKEN' ]});
    });
  },

  ecreturn : function ( req, res, next ){
    var params  = {
      USER      : 'seller_1339472528_biz_api1.gmail.com',
      PWD       : '1339472553',
      SIGNATURE : 'AFcWxV21C7fd0v3bYYYRCpSSRl31Af-aECo8vsiP1HospgIyBCFncbx3',
      METHOD    : 'GetExpressCheckoutDetails',
      VERSION   : '78',
      TOKEN     : req.query.token
    };
    var url = api_url + '?' + qs.stringify( params );

    request.get( url, function ( err, response, body ){
      if( err ) next( err );

      var params  = {
        USER      : 'seller_1339472528_biz_api1.gmail.com',
        PWD       : '1339472553',
        SIGNATURE : 'AFcWxV21C7fd0v3bYYYRCpSSRl31Af-aECo8vsiP1HospgIyBCFncbx3',
        METHOD    : 'DoExpressCheckoutPayment',
        VERSION   : '78',
        TOKEN     : qs.parse( body )[ 'TOKEN' ],
        PAYERID   : qs.parse( body )[ 'PAYERID' ],
        PAYMENTREQUEST_0_AMT           : '11.99',
        PAYMENTREQUEST_0_CURRENCYCODE  : 'USD',
        PAYMENTREQUEST_0_PAYMENTACTION : 'Sale',
        PAYMENTREQUEST_0_DESC          : 'Sa-shi-mi'
      };
      var url = api_url + '?' + qs.stringify( params );

      request.get( url, function ( err, response2, body2 ){
        if( err ) next( err );

        res.render( 'carts/ecreturn', { body : util.inspect( qs.parse( body2 ))});
      });
    });
  },




});