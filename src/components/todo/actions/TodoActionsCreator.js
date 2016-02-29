import {Injectable} from "angular2/core";

import {AppStore} from "../../../store/AppStore";
import {TodoActions} from "./TodoActions";

import {TodoDao} from "../../../dao/todo/TodoDao";

@Injectable()
export class TodoActionsCreator {
	constructor(appStore:AppStore, todoActions:TodoActions, todoDao:TodoDao) {
        this.appStore = appStore;
        this.todoActions = todoActions;
		this.todoDao = todoDao;
    }

	initializeListView(){
		this.appStore.dispatch(this.todoActions.loadTodosStart());
	}

    async loadTodos(){
        try{
            this.appStore.dispatch(this.todoActions.loadTodosStart());
			// load the list of todos from the database
			var todos = await this.todoDao.getList();

            this.appStore.dispatch(this.todoActions.loadTodosComplete(todos));
        }
        catch(ex){
			console.log(`loadTodos: Error Occured - ${ex.message}`);
            this.appStore.dispatch(this.todoActions.loadTodosFail(ex));
        }
    }

	selectTodo(todo){
		this.appStore.dispatch(this.todoActions.selectTodo(todo));
	}

	async saveTodo(todo){
		try{
			this.appStore.dispatch(this.todoActions.saveTodoStart(todo));

			var result = await this.todoDao.save(todo);

            this.appStore.dispatch(this.todoActions.saveTodoComplete(todo));

			// re-initialize the list view
			this.loadTodos();
		}
		catch(ex){
			console.log(`saveTodo: Error Occured - ${ex.message}`);
			this.appStore.dispatch(this.todoActions.saveTodoFail(ex));
		}
	}

	initializeDetailView(){
		this.appStore.dispatch(this.todoActions.initializeDetailView());
	}
}
