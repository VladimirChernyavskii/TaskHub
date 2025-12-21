import { Task } from '../models';

const BASE_URL = process.env.REACT_APP_API_URL + '/tasks';

export const tasksApi = {
  async getAll(): Promise<Task[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Ошибка при загрузке задач');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Ошибка при удалении задачи');
  },

  async toggle(id: number, completed: boolean): Promise<Task> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении задачи');
    return res.json();
  },

  async create(text: string): Promise<Task> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!res.ok) throw new Error('Ошибка при создании задачи');
    return res.json();
  },
};
