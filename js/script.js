function Contacts(data) {
    this.name = ko.observable(data.name);
    this.phone = ko.observable(data.phone);
    this.email = ko.observable(data.email) || 'sd';
    this.group = ko.observable(data.group);
	this.highlight = ko.observable(false) ;
	this.groupid = ko.observable(data.groupid) ;
	this.ingroup = ko.observable(false) ;
	this.isedit = ko.observable(false) ;
}
function Groups(data) {
	this.name = ko.observable(data.name);
	this.id = ko.observable(data.id);
	this.highlight = ko.observable(false) ;
}
function TaskListViewModel() {
    var self = this;
	self.groups = ko.observableArray([])
	self.lists = ko.observableArray([]);
	self.name = ko.observable() ;
	self.detailView = ko.observableArray([]) ;
	searchTerm = ko.observable();
	
	self.showDetail = function(data){	
		self.detailView.splice(0, self.detailView().length, data)		
	},
	
	self.removeContact = function(data) { 
		self.lists.remove(data)
		self.detailView([])
	};
	self.lists.push(new Contacts({ name: 'vera', phone: '05808795', email: 'vera@dfm.com', groupid: 2}) )
	self.lists.push(new Contacts({ name: 'masha', phone: '0513434', email: 'masha@gmail.com', groupid: 3}) )
	self.lists.push(new Contacts({ name: 'dima', phone: '5487895', email: 'dm@fm.com', groupid: 2}) )
	self.groups.push(new Groups({ name: 'all contact', id: 1}))
	self.groups.push(new Groups({ name: 'family', id: 2}))
	self.groups.push(new Groups({ name: 'friends', id: 3}))
	self.groups.push(new Groups({ name: 'coworkers', id: 4}))
}
TaskListViewModel.prototype.editContact = function() {
	if ( this.isedit()){
		this.isedit(false)
	} else {
		this.isedit(true)
	};
};
TaskListViewModel.prototype.search = function(){
	var self = this;
	var query = searchTerm()
	for(var i = 0; i < self.lists().length; i++) {
		if (query.length && self.lists()[i].name().indexOf(query) != -1) {
			 self.lists()[i].highlight(true)
		} else{
			self.lists()[i].highlight(false)
		}
	}
	for(var i = 0; i < self.groups().length; i++) {
		if (query.length && self.groups()[i].name().indexOf(query) != -1) {
			 self.groups()[i].highlight(true)
		} else{
			self.groups()[i].highlight(false)
		}
	}	
};
TaskListViewModel.prototype.groupContact = function(id){
	var self = this;
	groupid = id
	self.lists().filter(function(element) {
		if(element.groupid() == groupid || groupid == 1){
			element.ingroup(false)
		} else {
			element.ingroup(true)
		}
	}) 		
};
TaskListViewModel.prototype.addList = function() {
	var self = this;
    self.lists.push(new Contacts({ name: this.name(), phone: 'enter phone number', email: 'enter email', group: 'enter group'}));
	self.name("");
};
ko.applyBindings(new TaskListViewModel());