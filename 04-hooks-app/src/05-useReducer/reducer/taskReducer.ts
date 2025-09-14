import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskSate {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTaskInitialState = (): TaskSate => {
  const localStorageState = localStorage.getItem("tasks-state");

  if (!localStorageState) {
    return {
      completed: 0,
      length: 0,
      pending: 0,
      todos: [],
    };
  }

  //Validar por zod
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

  if (result.error) {
    console.log(result.error);
    return {
      completed: 0,
      length: 0,
      pending: 0,
      todos: [],
    };
  }

  return result.data;
};

export const taskReducer = (state: TaskSate, action: TaskAction): TaskSate => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }
    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (action.payload === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      const completedTodos = updatedTodos.filter(
        (todo) => todo.completed === true
      ).length;

      return {
        ...state,
        todos: updatedTodos,
        completed: completedTodos,
        pending: updatedTodos.length - completedTodos,
      };
    }
    case "DELETE_TODO": {
      const updateTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updateTodos,
        length: updateTodos.length + 1,
        completed: updateTodos.filter((todo) => todo.completed === true).length,
        pending: updateTodos.filter((todo) => todo.completed === false).length,
      };
    }
    default:
      return state;
  }
};
