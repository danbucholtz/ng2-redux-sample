import {Component, View} from "angular2/core";

import {TodoDetails} from "../todo-details/TodoDetails";
import {TodoList} from "../todo-list/TodoList";

import {AppStore} from "../../../store/AppStore";

@Component({
  selector: "app"
})
@View({
  directives: [TodoDetails, TodoList],
  template: `
    <div class="row">
      <ol class="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li class="active">Todos</li>
      </ol>
    </div>
    <div class="row">
        <div class="col-md-4">
            <todo-list (itemSelected)="showDetailsForTodo($event)"></todo-list>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-6">
            <todo-details *ngIf="showDetails"></todo-details>
        </div>
    </div>
  `
})

export class TodoMasterDetail {
    constructor(appStore:AppStore){
        this.appStore = appStore;
    }

    ngOnInit() {
		this.unsubscribe = this.appStore.subscribe(() => {
			this.processStateChange(this.appStore.getState().todosState);
		});
	}

    ngOnDestroy(){
		//this.unsubscribe();
	}

	processStateChange(state){
		this.showDetails = state.get("showDetails");
	}
}
