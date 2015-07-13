exports.author = function(req, res, err) {
	res.render('author', 
		{
			author: {
				displayName: 'Joan ORTEGA',
				location: 'Paris, FR',
				position: 'Ingéniero desarrolador en Ekino.',
				twitter: 'http://twitter.com/jomaora',
				avatar: 'http://gravatar.com/avatar/48cc72593948885123893720843c1b7a'
			}	
		}
	);	
};