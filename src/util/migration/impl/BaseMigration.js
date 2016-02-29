export class BaseMigration {
	constructor() {}

	getVersion() {
		throw new Error("Must be implemented by child");
	}

	migrate() {
		throw new Error("Must be implemented by child");
	}
}
