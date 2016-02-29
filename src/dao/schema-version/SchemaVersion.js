export class SchemaVersion {
    constructor(id, version){
        this.id = id;
        this.version = version;
    }

    getPureObject(){
        var schemaVersion = new SchemaVersion();
        schemaVersion.id = this.id;
        schemaVersion.version = this.version;
        return schemaVersion;
    }
}
