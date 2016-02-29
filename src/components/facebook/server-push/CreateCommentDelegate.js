import {CharacterContentGenerator} from "./CharacterContentGenerator";
import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FbComment} from "../../../dao/fb-comment/FbComment";
import {FbPostDao} from "../../../dao/fb-post/FbPostDao";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";
import {randomNumberInRange} from "../../../util/RandomNumberInRange";

export class CreateCommentDelegate{
    constructor(characterContentGenerator:CharacterContentGenerator, facebookActionsCreator:FacebookActionsCreator, fbPostDao:FbPostDao, fbUserDao:FbUserDao){
        this.characterContentGenerator = characterContentGenerator;
        this.facebookActionsCreator = facebookActionsCreator;
        this.fbPostDao = fbPostDao;
        this.fbUserDao = fbUserDao;
    }

    async generateComment(){
        try{
            // get the background users
            let users = await this.fbUserDao.getBackgroundUsers();
            // choose a random one from the list to make a post
            let randomIndex = randomNumberInRange(0, users.length - 1);
            let user = users[randomIndex];

            // get the posts
            let posts = await this.fbPostDao.getAll();
            if ( posts.length === 0 ){
                return;
            }
            randomIndex = randomNumberInRange(0, posts.length - 1);
            let post = posts[randomIndex];

            let content = this.characterContentGenerator.getRandomContentForUser(user.firstName);

            let comment = new FbComment(null, post.id, user.id, content);

            this.facebookActionsCreator.addComment(comment);
        }
        catch(ex){
            alert(`Failed to create comment from background - ${ex.message}`);
        }
    }
}
