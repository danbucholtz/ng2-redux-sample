import {Injectable} from "angular2/core";

@Injectable()
export class TodoActions {
	constructor() {
	}

	static INITIALIZE_LIST_VIEW = "INITIALIZE_LIST_VIEW";
	static INITIALIZE_DETAIL_VIEW = "INITIALIZE_DETAIL_VIEW";
    static LOAD_TODOS_START = "LOAD_TODOS_START";
    static LOAD_TODOS_COMPLETE = "LOAD_TODOS_COMPLETE";
    static LOAD_TODOS_FAIL = "LOAD_TODOS_FAIL";
    static SELECT_TODO = "SELECT_TODO";
    static SAVE_TODO_START = "SAVE_TODO_START";
    static SAVE_TODO_COMPLETE = "SAVE_TODO_COMPLETE";
    static SAVE_TODO_FAIL = "SAVE_TODO_FAIL";
    static DELETE_TODO_START = "DELETE_TODO_START";
    static DELETE_TODO_COMPLETE = "DELETE_TODO_COMPLETE";
    static DELETE_TODO_FAIL = "DELETE_TODO_FAIL";

	initializeListView(){
		return {
			type: TodoActions.INITIALIZE_LIST_VIEW
		};
	}

	initializeDetailView(){
		return {
			type: TodoActions.INITIALIZE_DETAIL_VIEW
		};

	}

	loadTodosStart(){
        return {
            type: TodoActions.LOAD_TODOS_START
        };
    }

    loadTodosComplete(todos){
        return {
            type: TodoActions.LOAD_TODOS_COMPLETE,
            todos: todos
        };
    }

    loadTodosFail(error){
        return {
            type: TodoActions.LOAD_TODOS_FAIL,
            error: error
        };
    }

    selectTodo(todo){
        return {
            type: TodoActions.SELECT_TODO,
            todo: todo
        };
    }

    saveTodoStart(todo){
        return {
            type: TodoActions.SAVE_TODO_START,
            todo: todo
        };
    }


    saveTodoComplete(todo){
        return {
            type: TodoActions.SAVE_TODO_COMPLETE,
            todo: todo
        };
    }

    saveTodoFail(error){
        return {
            type: TodoActions.SAVE_TODO_FAIL,
            error: error
        };
    }

    deleteTodoStart(id){
        return {
            type: TodoActions.DELETE_TODO_START,
            id: id
        }
    }

    deleteTodoComplete(id){
        return {
            type: TodoActions.DELETE_TODO_COMPLETE,
            id: id
        };
    }

    deleteTodoFail(error){
        return {
            type: TodoActions.DELETE_TODO_FAIL,
            error: error
        };
    }
}
