import immutable from "immutable";

let ImmutableFbComment = immutable.Record({
	id: null,
    postId: null,
    userId: null,
	content: null
});

export class FbComment extends ImmutableFbComment {
	constructor(id, postId, userId, content) {
		super({
			id: id,
			postId: postId,
            userId: userId,
            content: content
		});
	}

	getMutableCopy() {
		var mutable = {
			id: this.get("id"),
			postId: this.get("postId"),
            userId: this.get("userId"),
            content: this.get("content")
		};
		return mutable;
	}
}
