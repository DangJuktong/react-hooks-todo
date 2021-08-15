// 接口名加I前缀
export interface ITodo {
    id: number;
    content: string;
    completed: boolean;
}

export interface IState {
    todoList: ITodo[]
}

export interface IAction {
    type: ACTION_TYPE;
    payload: ITodo | ITodo[] | number
}

// 枚举类型
export enum ACTION_TYPE {
    ADD_TODO = 'addTodo',
    REMVOE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo',
    INIT_TODOLIST = 'initTodoList'
}