var title = [
		{txt : "精彩专题"},
		{txt : "热本文章"}
	];
var app = angular.module('myApp',["ngRoute"]);
app.controller("myCtrl",function($scope,$location){
	$scope.chooseBg = chooseBg;
	$scope.showData = showData;
	$scope.path = $location.$$path.slice(1);
	$scope.title = title;
	$scope.zhuanti = zhuanti;
	$scope.hotData = hotData;
	$scope.list = list;
	$scope.bol = false;
	$scope.allzhuanti = allzhuanti;
	$scope.everyData = everyData;
	$scope.moviesBol = true;
	$scope.moviesNum = 40;
	$scope.formClk = function (){
		setCookie('username','zz',1);
		setCookie('isLogin',1,1);
		$scope.username = getCookie ('username');
		if ($scope.username) {
			$scope.bol = true;
		}else{
			$scope.bol = false;
		}
	};
	$scope.nameFn = function(){
		var nicheng = $('.nicheng input:eq(0)').val()
		setCookie('username',nicheng,1)
	}
	$scope.moviesZan = function(){
		$scope.moviesBol = !$scope.moviesBol;
		if (!$scope.moviesBol){
			$scope.moviesNum++;
		}else{
			$scope.moviesNum--;
		}
	}
});
app.controller("switchCtrl",function($scope){
	$scope.moveFn = switchFn;
})
app.controller("bannerCtrl",function($scope,$location){
	$scope.bannerBg = bannerBg;
	bannerClk ($scope.bannerBg);
	$scope.path = $location.$$path.slice(1);
	var date = new Date();
	var h = date.getHours();
	if (h>=4 && h<9) {
		$scope.time = "早上好";
	}
	if (h>=9 && h<12) {
		$scope.time = "上午好";
	}
	if (h>=12 && h<14) {
		$scope.time = "中午好";
	}
	if (h>=14 && h<19) {
		$scope.time = "下午好";
	}
	if (h>=19 || h<4) {
		$scope.time = "晚上好";
	}
	$scope.path = "recommend";
	$('html,body').scrollTop(0);
});
app.directive("abc",function(){
	return {
		template : "<div class='title'>{{tt}}</div>",
		controller : function($scope,$element){
			$scope.tt = $element[0].dataset.title;
		}
	}
})
app.directive("special",function(){
	return {
		template : "<a href='#/everyZt'><div class='zhuanti' ng-repeat='item in zhuanti' style='background: url({{item.src}})'>{{item.txt}}</div></a>",
	}
})
app.directive("hot",function(){
	return {
		template : `
			<div class="hot" ng-repeat="item in hotData">
				<a href="{{'#/movies/'+item.id}}"><div class="hot-img">
					<img ng-src="{{item.src}}">
				</div>
				<div class="hot-txt">
					<h3>{{item.title}}</h3>
					<h5>{{item.source}}</h5>
				</div></a>
			</div>`
	}
})

app.directive("menu",function(){
	return {
		template : `
		<ul class="menu">
			<a ng-if="bol == false" ng-href="#/login" ng-repeat="item in list"><li class="list">{{item.name}}<span>></span></li></a>
			<a ng-if="bol == true" ng-href="#/{{item.type}}" ng-repeat="item in list"><li class="list">{{item.name}}<span>></span></li></a>
		</ul>
		`
	}
})
//热门  最新  关注
app.directive("message",function(){
	return {
		template : `
			<div class="message" ng-repeat="item in messageData">
				<div class="user-head" style="background: url({{item.src}}); background-size: contain"></div>
				<p class="user-name">{{item.name}}</p>
				<p class="user-time">{{item.time}}</p>
				<div class="user-txt">{{item.txt}}</div>
				<div class="brief">
					<div class="brief-txt">
						<div class="brief-title">{{item.title}}</div>
						<div class="brief-star">{{item.star}}</div>
					</div>
					<img ng-src="{{item.src}}">
				</div>
				<div class="message-line"></div>
				<div class="dianzan">
					<span class="pinglun"><img src="img/footer/iv_findview_pl_night.png"> 评论</span>
					<span class="zan"><img ng-src="{{item.zanBol? item.zanSrc2:item.zanSrc}}" ng-click="zanClk(item)"> {{item.id==0? "赞":item.id}}</span>
				</div>
			</div>
		`,
		controller : function($scope,$location){
			$scope.activeSrc = "img/footer/zan.png";
			$scope.bol = false;
			$scope.num = $location.$$path.slice(1);
			$scope.type = "span";
			$scope .messageData = messageData;
			$scope.handclk1 = function(){
				$scope.type = "span";
				$scope .messageData = messageData;
			}
			$scope.handclk2 = function(){
				$scope.type = "span2";
				$scope .messageData = heatData;
			}
			$scope.handclk3 = function(){
				$scope.type = "span3";
				$scope .messageData = messageData;
			}
			$scope.zanClk = function(item){
				item.zanBol = !item.zanBol;
				if (item.zanBol){
					 item.id ++;
					}else{
						item.id --;
					}
			}
		}
	}
})

// 二级页面全部专题
app.directive("allspecial",function(){
	return {
		template : `
			<div class="allztWrap" ng-repeat="item in allzhuanti">
				<a href="#/everyZt"><div class='allzt' style='background: url({{item.src}})'></div></a>
				<p class="ztTitle">{{item.title}}</p>
				<p class="dyrs">{{item.dingyue+item.peaple+'订阅'}}</p>
				<img ng-src="{{item.readBol == true? item.url2 : item.url}}" ng-click="readFn(item)">
			</div>
		`,
		controller : function($scope){
			$scope.readFn = function(item){
				item.readBol = !item.readBol;
				if (item.readBol) {
					item.peaple++;
				}else{
					item.peaple --;
				}
			}
		}
	}
})
//路由跳转
	app.config(function($routeProvider){
		$routeProvider.when("/",{
			templateUrl : "html/recommend.html",
			controller : "bannerCtrl",
		}).when("/recommend",{
			templateUrl : "html/recommend.html",
			controller : "bannerCtrl"
		}).when("/find",{
			templateUrl : "html/find.html",
			controller : function($scope,$location){
				$scope.path = $location.$$path.slice(1);
				$('html,body').scrollTop(0);
			}
		}).when("/fan",{
			templateUrl : "html/fan.html",
			controller : function($scope,$location){
				$scope.path = $location.$$path.slice(1);
				$('html,body').scrollTop(0);
			}
		}).when("/my",{
			templateUrl : "html/my.html",
			controller : function($scope,$location){
				$scope.path = $location.$$path.slice(1);
				var isLogin = getCookie("isLogin")*1;
				$scope.username = getCookie ('username');
				$scope.bol = !!isLogin;
				$('html,body').scrollTop(0);
			}
		}).when("/login",{
			templateUrl : "html/login.html",
			controller : function($scope,$location){
				$scope.path = $location.$$path.slice(1);
				$('html,body').scrollTop(0);
			}
		}).when("/allZhuanti",{
			templateUrl : "html/allZhuanti.html",
			controller : function($scope,$location){
				$scope.path = "find";
				$('html,body').scrollTop(0);
			}
		}).when("/everyZt",{
			templateUrl : "html/everyZt.html",
			controller : function($scope,$location){
				$scope.path = "find";
				$('html,body').scrollTop(0);
				$(window).scroll(function(){
					if($('body').scrollTop() > 280){
						$('.ztFix').css("background","white");
						$('.ztFix img:eq(0)').attr("src","img/footer/topic_title_black_return.png");
						$('.ztFix img:eq(1)').attr("src","img/footer/topic_title_black_share.png");
					}else{
						$('.ztFix').css("background","rgba(0,0,0,0)");
						$('.ztFix img:eq(0)').attr("src","img/footer/topic_title_return.png");
						$('.ztFix img:eq(1)').attr("src","img/footer/topic_title_share.png");
					}
				})
			}
		}).when("/myself",{
			templateUrl : "html/myself.html",
			controller : function($scope,$location){
				$scope.path = "fan";
				$('html,body').scrollTop(0);
				$scope.nicheng = getCookie ('username');
			}
		})
		.when("/movies/:id",{
			templateUrl : "html/movies.html",
			controller : function($scope,$location,$routeParams){
				$('html,body').scrollTop(0);
				$(window).scroll(function(){
					if($('body').scrollTop() > 20){
						$('.caozuo').css("display","none")
					}else{
						$('.caozuo').css("display","block")
					}
				})
				if($routeParams.id == 1){
					$scope.moviesData = moviesData;
					$scope.moviesData1 = $scope.moviesData[0];
				}
				if ($routeParams.id == 2) {
					$scope.moviesData = moviesData;
					$scope.moviesData1 = $scope.moviesData[1];
				}
			}
		}).otherwise({
			templateUrl : "html/other.html",
			controller : "bannerCtrl"
		})
	})


//创建一个cookie
function setCookie(key,value,day){
	var date = new Date();
	date.setTime(date.getTime() + day*24*60*60*1000);
	var t = date.toUTCString();
	return document.cookie = key +"="+ value+";expirse="+t;
}
function getCookie (key) {
	var arr = document.cookie.split(';');
	var name = key+'=';
	for (var i=0;i<arr.length;i++){
		var c = arr[i].trim();
		if (c.indexOf(name) == 0) {
			var a = c.slice(name.length);
		}
	}
	return a ;
}
//轮播效果
function bannerClk (arr) {
		var w = $(window).width();
		var len = arr.length;
		$('#banner').width(w*len);
		$('.banner').width(w*len);
		var index = 1;
		$('.banner').css("left",-w);
		$('.banner').click(function(){
			index ++;
			if (index>len-1) {
				$('.banner').css("left",-w)
				index = 2;
			}
			$('.banner').animate({left : -w*index})
			$('.btn li').each(function(i,v){
				v.className = '';
			})
			if (index>$('.btn li').length) {
				$('.btn li').eq(0).addClass('active');
				return;
			}
			$('.btn li').eq(index-1).addClass('active');
		})
		$('.banner').animate({left : -w*index},100); 
	}
//
function switchFn(){
	var w = $('.switch').width() - $('.switch img').width();
	var l = parseInt($('.switch img').css("marginLeft"))
	if (l == 0){
		$('.switch img').animate({"marginLeft":w},400);
		$('.switch').css("background","#274764");
	}else{
		$('.switch img').animate({"marginLeft":0},400);
		$('.switch').css("background","white");
	}
}