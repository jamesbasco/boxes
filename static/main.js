var BoxModel = Backbone.Model.extend({
	defaults: {
		backgroundColor: 'blanchedalmond',
		interval: 1000 
	},

	colors: [
		'#2caae1',
		'#3b5998',
		'#3c9',
		'#dc4b38'
	],

	initialize: function () {
		this.setRandomInterval();
		this.initInterval();
	},

	initInterval: function () {
		var model = this;
		this.intervalId = setInterval(
			function () {
				model.setRandomColor();
			}, 
			this.get('interval')
		);
	},
	
	getRandomColor: function () {
		var randNum = Math.floor((Math.random() * 1000)) % 4;
		return this.colors[randNum];
	},

	setRandomColor: function () {
		this.set('backgroundColor', this.getRandomColor());
	},

	setRandomInterval: function () {
		this.set('interval', 2000 + Math.floor(Math.random() * 2000));
	}
});

var BoxModel2 = BoxModel.extend({
	url: '/randombox',

	initInterval: function () {
		var model = this;
		this.intervalId = setInterval(
			function () {
				model.fetch();
			},
			this.get('interval')
		)
	},

	parse: function (response) {
		console.log(response);
		return {
			backgroundColor: response.color,
			name: response.name
		};
	}
});

var BoxView = Backbone.View.extend({
	className: 'box',
	initialize: function () {
		_.bindAll(this, 'render');

		this.model.on('change:backgroundColor', this.render);
	},

	render: function (model) {
		var name = model.get('name');
		console.log('render');
		this.$el.css('backgroundColor', model.get('backgroundColor'));	
		if (name) {
			// this.$el.text(name);
			this.$el.html('<span>' + name + '</span>');
		}else {
			this.$el.html('<span>nocolor</span>');
		}

	}
});

$(document).ready(function () {
	var boxView = new BoxView({model: new BoxModel()});
		// boxView2 = new BoxView({model: new BoxModel2()});

	// $('.boxes').append(boxView.el);
	// $('.boxes').append((new BoxView({model: new BoxModel()})).el);
	// $('.boxes').append(boxView2.el);
	// var i = 0;
	// for (i; i < 10; i++) {
	// 	$('.boxes').append((new BoxView({model: new BoxModel2()})).el);
	// }
});
