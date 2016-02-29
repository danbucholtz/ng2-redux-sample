import {Input, Component, EventEmitter} from "angular2/core";

import {AppStore} from "../../../store/AppStore";

import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FbPost} from "../../../dao/fb-post/FbPost";

@Component({
	selector: "add-post",
	template: `
    <div class="card post-padding">
        <span class="post-avatar-container">
            <img class="post-avatar" [src]="fbUser.imageUrl"/>
        </span>
        <input type="text" class="comment-input form-control"
		placeholder="What's on your mind?" [(ngModel)]="content">
        <button class="btn btn-primary" [disabled]="!content || content.length === 0" (click)="submitContent()">Post Status Update</button>
    </div>
  	`
})
export class AddPost {

	@Input() fbUser;

	constructor(appStore:AppStore, facebookActionsCreator:FacebookActionsCreator) {
		this.appStore = appStore;
		this.facebookActionsCreator = facebookActionsCreator;
	}

	ngOnInit() {
		this.unsubscribe = this.appStore.subscribe(() => {
			this.processStateChange(this.appStore.getState().facebookState);

		});
	}

	ngOnDestroy(){
		//this.unsubscribe();
	}

	processStateChange(state){

	}

	submitContent(){
		var post = new FbPost(null, this.fbUser.id, this.content);
		this.facebookActionsCreator.createPost(post);
		this.content = null;
	}
}
