Template.bookAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var book = {
			title: $(e.target).find('.js-new-book-title').val(),
			author: $(e.target).find('.js-new-book-author').val()
		};

		//calling method in collections/books.js
		Meteor.call('bookAdd', book, function(error, result) {
			if (error)
				FlashMessages.sendError(error.reason, { autoHide: false, hideDelay: 5000 });
				Router.go('bookAdd');

			if (result.bookExists)
				FlashMessages.sendWarning('This book has already been posted', { autoHide: true, hideDelay: 5000 });

			if (!result.bookExists)
				FlashMessages.sendSuccess('Book successfully added to the bookshelf', {autoHide: true, hideDelay: 5000 });

			Router.go('bookPage', {_id: result._id});
		});
	}
});