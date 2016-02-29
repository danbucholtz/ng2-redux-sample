import immutable from "immutable";

let ImmutableFbPost = immutable.Record({
	id: null,
	userId: null,
	content: null
});

export class FbPost extends ImmutableFbPost {
	constructor(id, userId, content) {
		super({
			id: id,
			userId: userId,
			content: content
		});
	}

	getMutableCopy() {
		var mutable = {
			id: this.get("id"),
			userId: this.get("userId"),
			content: this.get("content")
		};
		return mutable;
	}
}
