"use client";

import { useState, useEffect } from 'react';
import { Task, TaskStore } from '@/lib/types';

const STORAGE_KEY = 'ai-task-manager';

const defaultCategories = [
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Learning',
];

const defaultStore: TaskStore = {
  tasks: [],
  categories: defaultCategories,
};

export function useTasks() {
  const [store, setStore] = useState<TaskStore>(defaultStore);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setStore(JSON.parse(stored));
    }
  }, []);

  const saveStore = (newStore: TaskStore) => {
    setStore(newStore);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveStore({
      ...store,
      tasks: [...store.tasks, newTask],
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = store.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    saveStore({ ...store, tasks: updatedTasks });
  };

  const deleteTask = (taskId: string) => {
    saveStore({
      ...store,
      tasks: store.tasks.filter((task) => task.id !== taskId),
    });
  };

  const addCategory = (category: string) => {
    if (!store.categories.includes(category)) {
      saveStore({
        ...store,
        categories: [...store.categories, category],
      });
    }
  };

  return {
    tasks: store.tasks,
    categories: store.categories,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
  };
}