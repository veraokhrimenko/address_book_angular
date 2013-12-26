
// will implement pattern observe
var Member = function(opt){
	this.name = opt.name;
	this.id = opt.id;
	this.phone = opt.phone || 'no phone';
	this.email = opt.email || 'no email';
	this.groupid = opt.groupid || 0;
	this.hide = false;
}	
var vera = new Member({
	name : 'vera',
	id : 0
});

var dima = new Member({
	name : 'Dime',
	id : 1,
	email : 'dima@dfsd.com',
	phone : '123-345=456'
});
var members = []
members.push(vera, dima)
var phonecatApp = angular.module('adressBook', [])

if(typeof(localStorage) == "undefined" ) {
	alert('do not support localStorage!');
} else {
	try {
		if( !localStorage.getItem('members')) {
			localStorage.setItem('members', JSON.stringify(members));
		}
	}
	catch (e) {
		alert(e); 
	}
}
console.log(localStorage.getItem('members'))
phonecatApp.controller('AdressBookCtrl', function ($scope) {
 // should retrieve json data by $http.get
	$scope.groups = {
		items: [
			{name: 'all contacts', id: 0},
			{name: 'family', id : 1},
			{name: 'friends', id : 2},
			{name: 'coworkers', id : 3}
		],
		inGroup: function(item){
			for (var i = 0; i < $scope.members.items.length; i++) {
				for (var key in $scope.members.items[i]) {
					if( key == 'groupid' && $scope.members.items[i][key] != item.group.id){
						console.log('no find')
					} else {
						console.log('find')
					}
				}
			}
		
		},
		grouping : function(id){
			for (var i = 0; i < $scope.members.items.length; i++) {
				for (var key in $scope.members.items[i]) {
					if( key == 'id' && $scope.members.items[i][key] == id){
						return i
					}
				}
			}
		}
	}
	$scope.members = {
		items: JSON.parse(localStorage.getItem('members')),
		showDetails : function(item){
			$scope.details = {};
			$scope.details = item.member;
			$scope.details.disabled = true;
			$scope.selectedGroup = $scope.groups.items[item.member.groupid]
		},
		deleteUser: function(item){
			for (var i = 0; i < $scope.members.items.length; i++) {
				for (var key in $scope.members.items[i]) {
					if( key == 'id' && $scope.members.items[i][key] == item.details.id){
						$scope.members.items.splice(i, 1)
						$scope.details = null;
					}
				}
			}
		},
		addMember: function(name){
			if(name) {
				members.push(new Member({name:name}))
				localStorage.setItem('members', JSON.stringify(members));
				//$scope.members.items.push({name: name})
				$scope.name = ""
				console.log(localStorage.getItem('members'))
			}
		},
		editMember: function(item){
			item.details.disabled = false
		},
		grouping: function(item){
			for (var i = 0; i < $scope.members.items.length; i++) {
				for (var key in $scope.members.items[i]) {
					if( key == 'id' && $scope.members.items[i][key] == item.details.id){
						$scope.members.items[i]['groupid'] = item.selectedGroup.id;
					}
				}
			}			
		}
	}
});