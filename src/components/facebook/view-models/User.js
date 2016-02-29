import immutable from "immutable";

let ImmutableFbUserVM = immutable.Record({
	id: null,
    firstName: null,
    lastName: null,
    imageUrl: null
});

export class User extends ImmutableFbUserVM {
	constructor(id, firstName, lastName, imageUrl) {
		super({
			id: id,
            user: user,
            comments: comments,
            likes: likes,
			content: content
		});
	}
}
