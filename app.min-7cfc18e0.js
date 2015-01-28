"use strict";function config(e){e.when("/",{templateUrl:"sections/home/home.tpl.html",controller:"HomeController as home"}).when("/premieres",{templateUrl:"sections/premieres/premieres.tpl.html",controller:"PremieresController as premieres",resolve:{shows:["ShowService",function(e){return e.getPremieres()}]}}).when("/search",{templateUrl:"sections/search/search.tpl.html",controller:"SearchController as search"}).when("/search/:query",{templateUrl:"sections/search/search.tpl.html",controller:"SearchController as search"}).when("/popular",{templateUrl:"sections/popular/popular.tpl.html",controller:"PopularController as popular",resolve:{shows:["ShowService",function(e){return e.getPopular()}]}}).when("/view/:id",{templateUrl:"sections/view/view.tpl.html",controller:"ViewController as view",resolve:{show:["ShowService","$route",function(e,a){return e.get(a.current.params.id)}]}}).otherwise({redirectTo:"/"})}function configs(e){var a=["$location","$log","$q",function(e,a,n){function t(e){return 401===e.status?a.error("You are unauthorised to access the requested resource (401)"):404==e.status?a.error("The requested resource could not be found (404)"):e.status==e.status==500&&a.error("Internal server error (500)"),n.reject(e)}function s(e){return e}return function(e){return e.then(s,t)}}];e.interceptors.push(a)}function runs(e,a){e.$on("$routeChangeStart",function(){a.loading=!0}),e.$on("$routeChangeSuccess",function(){a.loading=!1})}function dataService(e,a,n,t,s){function o(t,s){var o=n+"/"+t+"?api_key="+a;return angular.forEach(s,function(e,a){o=o+"&"+a+"="+e}),e({url:o,method:"GET",headers:{"Content-Type":"application/json"},cache:!0}).then(function(e){return e.data}).catch(u)}function i(){var e=new Date;return e.setDate(1),o("discover/tv",{"first_air_date.gte":s(e).format("DD-MM-YYYY"),append_to_response:"genres"}).then(function(e){return e.results})}function r(e){return o("tv/"+e,{})}function l(e){return o("tv/"+e+"/credits",{})}function c(e){return o("search/tv",{query:e}).then(function(e){return e.results})}function p(){return o("tv/popular",{}).then(function(e){return e.results})}function u(e){return t.error("XHR Failed for ShowService"),t.error(e),e}var h={getPremieres:i,get:r,search:c,getPopular:p,getCast:l};return h}function show(e){function a(a){a.genres=[],e.get(a.show.id).then(function(e){a.genres=e.genres})}var n={link:a,templateUrl:"components/show/show.tpl.html",restrict:"E",scope:{show:"="}};return n}function ngEnter(){return function(e,a,n){a.bind("keydown keypress",function(a){13===a.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),a.preventDefault())})}}angular.module("app.routes",["ngRoute"]).config(config),config.$inject=["$routeProvider"],angular.module("app.config",[]).config(configs).run(runs),configs.$inject=["$httpProvider"],runs.$inject=["$rootScope","PageValues"],angular.module("app.core",[]),angular.module("app.services",[]),angular.module("app",["ngRoute","ngAnimate","angularMoment","angular-preload-image","truncate","app.routes","app.core","app.services","app.config","app.templates"]),angular.module("app.core").controller("HomeController",["$scope","PageValues",function(e,a){a.title="HOME",a.description="Learn AngularJS using best practice real world examples.";var n=this;n.tutorials=[{title:"INTRODUCTION",description:"An introduction to the AngularJS by example application and the tutorial series. All about why this project exists, what the tutorial series is likely to include and who the tutorials are for.",link:"http://www.google.com/"},{title:"PROJECT STRUCTURE & MODULARITY",description:"Looking at project structure in terms of AngularJS modularity and also how best to lay out your directories to make development a breeze.",link:"#"},{title:"CONTROLLERS",description:"Investigating the different ways you can write AngularJS controllers along with recommended best practices.",link:"#"},{title:"SHARING DATA WITH SERVICES",description:"How to effectively share data around your AngularJS application and when best to use the different types of service available.",link:"#"},{title:"WRITING DIRECTIVES",description:"Theories behind directive design and how to best implement them within your application.",link:"#"},{title:"BUILD PROCESS",description:"So you have an awesome AngularJS app, how do you get it ready for production and deployment? Using Gulp & GitFlow to get the job done.",link:"#"}]}]),angular.module("app.core").controller("PremieresController",["$scope","shows","PageValues",function(e,a,n){n.title="PREMIERES",n.description="Brand new shows showing this month.";var t=this;t.shows=a}]),angular.module("app.core").controller("SearchController",["$location","$routeParams","ShowService","PageValues",function(e,a,n,t){t.title="SEARCH",t.description="Search for your favorite TV shows.";var s=this;s.query=null,s.shows=[],s.loading=null,s.setSearch=function(){var a=encodeURI(s.query);e.path("/search/"+a)},s.performSearch=function(e){s.loading=!0,n.search(e).then(function(e){s.shows=e,s.loading=!1})},"undefined"!=typeof a.query&&(s.performSearch(a.query),s.query=decodeURI(a.query))}]),angular.module("app.core").controller("ViewController",["$scope","$location","PageValues","show","ShowService","$routeParams",function(e,a,n,t,s){n.title="VIEW",n.description="Overview, seasons & info for '"+t.original_name+"'.";var o=this;o.show=t,o.setBannerImage=function(){return{background:"url() no-repeat","background-size":"100%","background-position":"100% 0%"}},o.show.cast=[],s.getCast(o.show.id).then(function(e){o.show.cast=e.cast})}]),angular.module("app.core").controller("BarController",["$scope","PageValues",function(e,a){var n=this;n.data=a}]),angular.module("app.core").controller("PopularController",["$scope","PageValues","shows",function(e,a,n){a.title="POPULAR",a.description="The most popular TV shows.";var t=this;t.shows=n}]),angular.module("app.services").constant("API_KEY","87de9079e74c828116acce677f6f255b").constant("BASE_URL","http://api.themoviedb.org/3").factory("ShowService",dataService),dataService.$inject=["$http","API_KEY","BASE_URL","$log","moment"],angular.module("app.core").value("PageValues",{title:null,description:null,loading:!1}),angular.module("app.core").directive("show",show),show.$inject=["ShowService"],angular.module("app.core").directive("ngEnter",ngEnter),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("components/show/show.tpl.html",'<div class="show-frame">\n    <ul class="genres">\n        <li data-ng-repeat="genre in genres" class="animate-repeat" data-ng-style="{\'background-color\': \'rgba(59, 185, 187, \' + genres.length / $index / 5 + \')\'}">{{genre.name}}</li>\n    </ul>\n    <img preload-image default-image="assets/images/loading.jpg" fallback-image="assets/images/fallback.jpg" ng-src="http://image.tmdb.org/t/p/w780/{{show.backdrop_path}}" />\n    <div class="date label label-dark"><span class="icon icon-calendar"></span> {{show.first_air_date | amDateFormat:\'DD-MM-YYYY\'}}</div>\n    <h2>{{show.original_name | characters:40}}</h2>\n    <div class="inner">\n        <ul class="info">\n            <!--<li class="col-md-4"></li>-->\n            <li class="col-xs-6 rating"><span class="icon icon-heart3"></span> {{show.vote_average}}</li>\n            <li class="col-xs-6 country"><span class="icon icon-earth"></span> <span data-ng-repeat="country in show.origin_country">{{country}}{{$last ? \'\' : \', \'}}</span> <span data-ng-if="show.origin_country.length == 0">--</span></li>\n            <div class="clearfix"></div>\n        </ul>\n        <div class="buttons">\n            <a href="#/view/{{show.id}}" class="btn btn-info"><span class="icon icon-arrow-right7"></span> View</a>\n        </div>\n    </div>\n</div>')}])}(),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("sections/home/home.tpl.html",'<div class="home-frame">\n    <div class="home-banner">\n        <div class="container inner">\n            <img class="hidden-sm hidden-xs" src="assets/images/angular.png" width="400" height="400" />\n            <h1>LEARN ANGULARJS <span>THE EASY WAY</span>.</h1>\n            <h2>Learn how to build superb AngularJS web applications using real world best practice examples coupled with in-depth tutorials from <a href="#">revillweb.com</a>.</h2>\n            <p>This website is a living and breathing AngularJS web application built using recommended best practices. <strong>AngularJS by example</strong> provides you with a complete application demonstrating recommended best practices from app structure all the way through to production deployment.</p>\n            <div class="home-buttons">\n                <a href="https://github.com/RevillWeb/angularjs-by-example" target="_blank" class="btn btn-lg btn-primary"><span class="icon icon-github2"></span> GitHub</a>\n                <a href="http://www.revillweb.com" target="_blank" class="btn btn-lg btn-default"><span class="icon icon-home"></span> RevillWeb</a>\n            </div>\n        </div>\n    </div>\n    <div class="clearbanner"></div>\n    <div class="tutorials-title">\n        <div class="container">\n            ARTICLES & TUTORIALS\n            <div class="hidden-xs share-buttons">\n                <div class=\'shareaholic-canvas\' data-app=\'share_buttons\' data-app-id=\'15135403\'></div>\n            </div>\n        </div>\n    </div>\n    <div class="container">\n        <ul class="tutorials">\n            <li data-ng-repeat="tutorial in home.tutorials track by $index" data-ng-class="{\'offline\': (tutorial.link == \'#\')}">\n                <div class="number">#{{$index + 1}}</div>\n                <h3>{{tutorial.title}}</h3>\n                <p>{{tutorial.description}}</p>\n                <a href="{{tutorial.link}}" data-ng-class="{\'disabled\': (tutorial.link == \'#\')}" class="btn btn-lg btn-primary"><span class="icon icon-arrow-up-right5"></span> View</a>\n                <div class="clearfix"></div>\n            </li>\n        </ul>\n        <p class="no-data tuts">More tutorials coming soon...</p>\n    </div>\n</div>\n')}])}(),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("sections/popular/popular.tpl.html",'<div class="trending-results">\n    <div class="no-data" data-ng-if="trending.shows.length == 0">There are no popular shows available to display</div>\n    <ul class="list-of-shows">\n        <li class="col-xs-6 col-md-4 repeat-animation" data-ng-repeat="show in popular.shows">\n            <show data-show="show"></show>\n        </li>\n    </ul>\n</div>')}])}(),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("sections/premieres/premieres.tpl.html",'<ul class="list-of-shows">\n    <li class="col-xs-6 col-md-4" data-ng-repeat="show in premieres.shows">\n        <show data-show="show"></show>\n    </li>\n</ul>')}])}(),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("sections/search/search.tpl.html",'<div class="search-top">\n    <div class="input-group">\n        <input type="text" class="form-control input-lg" data-ng-model="search.query" data-ng-enter="search.setSearch()">\n        <span class="input-group-btn">\n            <button class="btn btn-info btn-lg search-btn" type="button" data-ng-disabled="!search.query" data-ng-click="search.setSearch()"><span class="glyphicon glyphicon-search"></span> Search</button>\n        </span>\n    </div>\n</div>\n<div class="search-results">\n    <div class="no-data" data-ng-if="search.loading == null">Use the search box above to find your favorite TV shows</div>\n    <div class="no-data" data-ng-if="search.shows.length == 0 && search.loading == false">Your search did not return any results</div>\n    <div class="throbber" data-ng-show="search.loading"></div>\n    <ul class="list-of-shows" data-ng-show="search.loading == false">\n        <li class="col-xs-6 col-md-4 repeat-animation" data-ng-repeat="show in search.shows">\n            <show data-show="show"></show>\n        </li>\n    </ul>\n</div>')}])}(),function(e){try{e=angular.module("app.templates")}catch(a){e=angular.module("app.templates",[])}e.run(["$templateCache",function(e){e.put("sections/view/view.tpl.html",'<div class="view-banner" preload-bg-image="http://image.tmdb.org/t/p/original/{{view.show.backdrop_path}}" default-image="assets/images/shattered.png"></div>\n<div class="view-title">\n    <div class="container">\n        {{view.show.original_name}} ({{view.show.first_air_date | amDateFormat:\'YYYY\'}})\n        <ul class="pull-right">\n            <li><span class="icon icon-heart3"></span> {{view.show.vote_average}}</li>\n            <li><span class="icon icon-tags"></span> <span data-ng-repeat="genre in view.show.genres">{{genre.name}}{{$last ? \'\' : \', \'}}</span> </li>\n            <li><span class="icon icon-info2"></span> {{view.show.status}}</li>\n        </ul>\n    </div>\n</div>\n<div class="view-container">\n    <h2>Show Summary</h2>\n    <div class="view-section view-top" data-ng-switch="view.show.overview != null">\n        <div class="poster"><img preload-image default-image="assets/images/loading.jpg" fallback-image="assets/images/fallback-thin.jpg" data-ng-src="http://image.tmdb.org/t/p/w342/{{view.show.poster_path}}" /></div>\n        <p data-ng-switch-when="true">{{view.show.overview}}</p>\n        <p data-ng-switch-when="false" class="no-overview">No overview is available for this show</p>\n        <div class="buttons">\n            <a href="{{view.show.homepage}}" target="_blank" class="btn btn-lg btn-info"><span class="icon icon-home"></span> Homepage</a>\n        </div>\n        <div class="clearfix"></div>\n    </div>\n    <h2>Seasons</h2>\n    <div class="view-section" data-ng-switch="view.show.seasons.length > 0">\n        <ul class="view-list" data-ng-switch-when="true">\n            <li data-ng-repeat="season in view.show.seasons" data-ng-if="season.episode_count > 0">\n                <img preload-image default-image="assets/images/loading.jpg" fallback-image="assets/images/fallback-thin.jpg" data-ng-src="http://image.tmdb.org/t/p/w185/{{season.poster_path}}" />\n                <div class="item-info">\n                    <div class="col-md-2">#{{season.season_number}}</div>\n                    <div class="col-md-10">Episode Count: {{season.episode_count}}</div>\n                </div>\n            </li>\n        </ul>\n        <p class="no-data" data-ng-switch-when="false">No season information available</p>\n    </div>\n    <!-- Information available through additional API calls -->\n    <h2>Cast</h2>\n    <div class="view-section cast-container" data-ng-switch="view.show.cast.length > 0">\n        <ul class="view-list" data-ng-switch-when="true">\n            <li data-ng-repeat="actor in view.show.cast">\n                <img preload-image default-image="assets/images/loading.jpg" fallback-image="assets/images/fallback-thin.jpg" data-ng-src="http://image.tmdb.org/t/p/w185/{{actor.profile_path}}" />\n                <div class="item-info">\n                    {{actor.name}} as <br />\n                    <strong>{{actor.character}}</strong>\n                </div>\n            </li>\n        </ul>\n        <p class="no-data" data-ng-switch-when="false">No cast information available</p>\n    </div>\n</div>\n')}])}();