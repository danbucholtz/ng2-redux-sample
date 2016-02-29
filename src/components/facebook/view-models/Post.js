import immutable from "immutable";

let ImmutableFbPostVM = immutable.Record({
	id: null,
    user: null,
    comments: null,
    likes: null,
	content: null
});

export class Post extends ImmutableFbPostVM {
	constructor(id, user, comments, likes, content) {
		super({
			id: id,
            user: user,
            comments: comments,
            likes: likes,
			content: content
		});
	}
}
