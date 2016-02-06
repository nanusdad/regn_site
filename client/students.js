  Session.setDefault("counter", 0);

  Meteor.subscribe("userData");

  Template.main.helpers({
    site_title: function() {
      return site.title;
    }
  });

var handles = [];
	['students'].forEach(function(name){
		var handle = Meteor.subscribe(name, function() {
		});
		handles.push(handle);
	});


	var students = function() {
		return Students.find().fetch().map(function(it){
			return {value: it.sname, id: it._id};
		});
	};

Template.search_box.helpers({
	students: function(){
		return [
			{
				name: 'students',
				valueKey: 'sname',
				local: function() {
					return Students.find().fetch();
				},
				header: '<h3 class="league-name">Students</h3>',
				template: 'student'
			}
	//			{
	//				name: 'other',
	//				header: '<h3 class="league-name">Other</h3>',
	//				local: function(query, callback) {
	//					Meteor.call('search', query, {}, function(err, res) {
	//						if (err) {
	//							console.log(err);
	//							return;
	//						}
	//						callback(res.map(function(v){ return {value: v.name}; }));
	//					});
	//				}
	//			}
		];
	}
});


Template.search_box.rendered = function() {
  Meteor.typeahead.inject();
};

