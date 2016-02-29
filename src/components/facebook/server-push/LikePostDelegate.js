import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FbLike} from "../../../dao/fb-like/FbLike";
import {FbPostDao} from "../../../dao/fb-post/FbPostDao";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";
import {randomNumberInRange} from "../../../util/RandomNumberInRange";

export class LikePostDelegate{
    constructor(facebookActionsCreator:FacebookActionsCreator, fbPostDao:FbPostDao, fbUserDao:FbUserDao){
        this.facebookActionsCreator = facebookActionsCreator;
        this.fbPostDao = fbPostDao;
        this.fbUserDao = fbUserDao;
    }

    async likePost(){
        try{
            // get the background users
            let users = await this.fbUserDao.getBackgroundUsers();
            // choose a random one from the list to make a post
            let randomIndex = randomNumberInRange(0, users.length - 1);
            let user = users[randomIndex];

            // get the posts
            let posts = await this.fbPostDao.getAll();
            randomIndex = randomNumberInRange(0, posts.length - 1);
            let post = posts[randomIndex];

            if ( posts.length === 0 ){
                return;
            }

            let like = new FbLike(null, post.id, user.id);

            this.facebookActionsCreator.likePost(like);
        }
        catch(ex){
            alert(`Failed to like post from background - ${ex.message}`);
        }
    }
}
