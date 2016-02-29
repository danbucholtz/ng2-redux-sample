import immutable from "immutable";

let ImmutableTodo = immutable.Record({
	id: null,
	text: null,
    completed: false
});

export class Todo extends ImmutableTodo {
	constructor(id, text, completed) {
		super({
			id: id,
			text: text,
            completed: completed
		});
	}

	getMutableCopy() {
		var mutable = {
			id: this.get("id"),
			text: this.get("text"),
            completed: this.get("completed")
		};
		return mutable;
	}
}
