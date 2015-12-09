// config routes
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('order', {
      url: '/order',
      "abstract": true,
      template: "<div ui-view></div>"
    })
    .state('order.orders', {
      url: '/orders',
      templateUrl: "modules/order/templates/orders.html",
      controller: 'orderController'
    });
});
