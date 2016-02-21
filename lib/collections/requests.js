Meteor.methods({
	borrowBook: function(book, user, request) {
		var bookId = book._id,
				userId = user._id

		Books.update(bookId, {$set: {borrowedBy: user, borrowedOn: new Date(), requestedBy: ''}});
		Meteor.users.update(userId, {$set: {borrowing: book, requesting: ''}});

    Requests.remove({_id: request._id});

    return {
    	_id: bookId
    }
	}
});