import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from 'src/api/tasksApi';
import { Task } from '../models';

export const useTasks = () =>{
    const queryClient = useQueryClient();

    const tasksQuery = useQuery<Task[], Error>({ 
        queryKey: ['tasks'],
        queryFn: tasksApi.getAll,
    });

    const addTask = useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => queryClient.invalidateQueries({queryKey:['tasks']})
    });

    const deleteTask = useMutation({
        mutationFn: tasksApi.delete,
        onSuccess: () => queryClient.invalidateQueries({queryKey:['tasks']})
    });

    const toggleTask = useMutation({
        mutationFn: (task: Task) => tasksApi.toggle({id: task.id, completed: !task.completed}),
        onSuccess: () => queryClient.invalidateQueries({queryKey:['tasks']})
    });

    return {tasksQuery, addTask, deleteTask, toggleTask};
};
