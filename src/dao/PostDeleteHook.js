export class PostDeleteHook {
    constructor(){}

    postDelete(deletedEntity){
        throw new Error("Must be implemented by sub-class");
    }
}
