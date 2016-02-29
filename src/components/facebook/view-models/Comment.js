import immutable from "immutable";

let ImmutableFbCommentVM = immutable.Record({
	id: null,
    user: null,
    postId: null,
    content: null
});

export class Comment extends ImmutableFbCommentVM {
	constructor(id, user, postId, content) {
		super({
			id: id,
            user: user,
            postId: postId,
            content: content
		});
	}
}
