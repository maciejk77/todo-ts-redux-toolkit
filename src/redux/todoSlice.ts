import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models/Todo';
import { v4 as uuidv4 } from 'uuid';

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, { payload }: PayloadAction<Todo>) => {
        state.push(payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      }),
    },
    removeTodo(state, { payload }: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === payload);
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      { payload }: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === payload.id);
      state[index].completed = payload.completed;
    },
  },
});

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
