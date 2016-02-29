import immutable from "immutable";

let ImmutableFbUser = immutable.Record({
	id: null,
	firstName: null,
    lastName: false,
	imageUrl: null
});

export class FbUser extends ImmutableFbUser {
	constructor(id, firstName, lastName, imageUrl) {
		super({
			id: id,
			firstName: firstName,
            lastName: lastName,
			imageUrl: imageUrl
		});
	}

	getMutableCopy() {
		var mutable = {
			id: this.get("id"),
			firstName: this.get("firstName"),
            lastName: this.get("lastName"),
			imageUrl: this.get("imageUrl")
		};
		return mutable;
	}
}
