import immutable from "immutable";

let ImmutableFbLikeVM = immutable.Record({
	id: null,
    user: null,
    postId: null
});

export class Like extends ImmutableFbLikeVM {
	constructor(id, user, postId) {
		super({
			id: id,
            user: user,
            postId: postId
		});
	}
}
