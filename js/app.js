
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
	id : 3,
	email : 'dima@dfsd.com',
	phone : '123-345=456'
});

var masha = new Member({
	name : 'Masha',
	id : 4,
	email : 'maria@dfsd.com',
	phone : '456-457-78',
	groupid: 3
});
var members = []
members.push(vera, dima)
var AdressBook = {
	members: [vera, dima, masha],
	groups: [{name: 'all contacts', id: 0},{name: 'family', id : 1},{name: 'friends', id : 2},{name: 'coworkers', id : 3}],
	addMember: function(name){
		var member = new Member({name:name})
		this.members.push(member)
	},
	getCurrent: function(id){
		for (var i = 0; i < this.members.length; i++) {
			for (var key in this.members[i]) {
				if( key == 'id' && this.members[i][key] == id){
					return i
				}
			}
		}
	},
	editMember: function(){},
	deleteMember: function(item){
		var i = this.getCurrent(item.details.id)
		this.members.splice(i, 1)
	}
}
var phonecatApp = angular.module('adressBook', [])

/* if(typeof(localStorage) == "undefined" ) {
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
} */

phonecatApp.controller('AdressBookCtrl', function ($scope) {
 // should retrieve json data by $http.get
	$scope.groups = {
		items: AdressBook.groups,
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
		items: AdressBook.members,
		showDetails : function(item){
			$scope.details = {};
			$scope.details = item.member;
			$scope.details.disabled = true;
			$scope.selectedGroup = $scope.groups.items[item.member.groupid]
		},
		addMember:  function(name){
			if(name) {
				AdressBook.addMember(name);
				$scope.name = "";
			}
		},
		deleteUser: function(item){
			AdressBook.deleteMember(item);
			$scope.details = null;
		},
		editMember: function(item){
			item.details.disabled = false
		},
		changeGroup: function(item){
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