var dependencies = ['ui.router'];

// 嗅探检查是否引用了必要的依赖
function sniffer(list) {
  var name = null;
  for (var i = list.length - 1; i >= 0; i--) {
    name = list[i];
    try {
      if (!angular.module(name)) {
        throw name;
      }
    }
    catch (e) {
      list.splice(i, 1);
    }
  }
  return list;
}

// 定义模板 - html2js
var templates = angular.module('templates', []);

// 定义应用
var app = angular.module('app', sniffer(dependencies).concat(['templates']));

// 通用路由
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/account/members');
});

// bootstrap
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
