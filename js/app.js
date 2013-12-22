var phonecatApp = angular.module('adressBook', []);
 
phonecatApp.controller('AdressBookCtrl', function ($scope) {
 // should retrieve json data by $http.get
	var groups = {
		items: [
			{name: 'all contacts', id: 0},
			{name: 'family', id : 1},
			{name: 'friends', id : 2},
			{name: 'coworkers', id : 3}
		],
		
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
		items: [
			{id: 0, name: 'vera', phone: '05808795', email: 'vera@dfm.com', groupid: 2},
			{id: 1, name: 'Maria', phone: '0513434', email: 'masha@gmail.com', groupid: 3},
			{id: 2, name: 'Igor', phone: '5487895', email: 'dm@fm.com', groupid: 2}
		],
		showDetails : function(item){
			$scope.details = {};
			$scope.details = item.member;
			console.log($scope.details)
			$scope.details.disabled = true;
			$scope.selectedGroup = groups.items[item.member.groupid]
		},
		deleteUser: function(item){
			for (var i = 0; i < $scope.members.items.length; i++) {
				for (var key in $scope.members.items[i]) {
					if( key == 'id' && $scope.members.items[i][key] == item.details.id){
						$scope.members.items.splice(i, 1)
						$scope.details = {}
					}
				}
			}
		},
		addMember: function(name){
			if(name) {
				$scope.members.items.push({name: name})
				$scope.name = ""
			}
		},
		editMember: function(item){
			item.details.disabled = false
		}
	}
	$scope.groups = groups
});