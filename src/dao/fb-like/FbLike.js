import immutable from "immutable";

let ImmutableFbLike = immutable.Record({
	id: null,
    postId: null,
    userId: null
});

export class FbLike extends ImmutableFbLike {
	constructor(id, postId, userId) {
		super({
			id: id,
			postId: postId,
            userId: userId
		});
	}

	getMutableCopy() {
		var mutable = {
			id: this.get("id"),
			postId: this.get("postId"),
            userId: this.get("userId")
		};
		return mutable;
	}
}
