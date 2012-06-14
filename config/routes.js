module.exports = function ( map ){
  map.get( '/','welcome#index' );

  map.get( '/carts/checkout', 'carts#checkout' );
  map.get( '/carts/ecreturn', 'carts#ecreturn' );
};