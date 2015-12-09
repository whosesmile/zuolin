// config routes
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('account', {
      url: '/account',
      "abstract": true,
      template: "<div ui-view></div>"
    })
    .state('account.members', {
      url: '/members',
      templateUrl: "modules/account/templates/members.html",
      controller: 'memberController'
    });
});
