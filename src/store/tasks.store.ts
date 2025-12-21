import {create} from 'zustand';
import { Task } from '../models';
import { tasksApi } from '../api/tasksApi';

interface TaskListState {
  tasks: Task[];
  error: string | null;
  loading: boolean;
  fetchTasks: ()=> Promise<void>;
  addTask: (text: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
}

export const useTasksStore = create<TaskListState>((set,get) => ({
  tasks: [],
  error: null,
  loading: false,

  fetchTasks: async () => {
    try {
      set ({loading:true, error:null});
      const tasks = await tasksApi.getAll();
      set ({tasks:tasks, loading:false});
    } catch {
      set({error: 'Не удалось загрузить задачи', loading:false})
    }
  },

  addTask: async(text) =>{
    const newTask = await tasksApi.create(text);
    set(state =>({
      tasks: [...state.tasks, newTask],
    }))
  },

  deleteTask: async (id) => {
    await tasksApi.delete(id);
    set (state =>({
      tasks: state.tasks.filter((t) => t.id !== id)
    }))
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    
    const updatedTask = await tasksApi.toggle(id, !task.completed)
    set (state =>({
      tasks: state.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        ),
    }));
  },
}));

