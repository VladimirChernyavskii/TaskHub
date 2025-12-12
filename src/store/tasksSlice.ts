import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksApi } from '../api/tasksApi';
import { Task } from '../models';
import { RootState } from './store';

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => await tasksApi.getAll()
);

export const addTaskThunk = createAsyncThunk<Task, string>(
  'tasks/addTask',
  async (text) => await tasksApi.create(text)
);

export const deleteTaskThunk = createAsyncThunk<number, number>(
  'tasks/deleteTask',
  async (id) => {
    await tasksApi.delete(id);
    return id;
  }
);

export const toggleTaskThunk = createAsyncThunk<
  Task,
  number,
  { state: RootState }
>('tasks/toggleTask', async (id, { getState }) => {
  const task = getState().tasks.list.find((t) => t.id === id);
  if (!task) throw new Error('Task not found');

  return await tasksApi.toggle(id, !task.completed);
});

interface TaskListState {
  list: Task[];
  error: string | null;
  loading: boolean;
}

const initialState: TaskListState = {
  list: [],
  error: null,
  loading: true,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  selectors: {
    selectTasks: (sliceState) => {
      return sliceState.list;
    },
    selectError: (sliceState) => {
      return sliceState.error;
    },
    selectLoading: (sliceState) => {
      return sliceState.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить задачи';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addCase(toggleTaskThunk.fulfilled, (state, action) => {
        state.list = state.list.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      });
  },
});

export const { selectTasks, selectError, selectLoading } = tasksSlice.selectors;
export default tasksSlice.reducer;
