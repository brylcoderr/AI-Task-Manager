"use client";

import { useState } from 'react';
import { Task } from '@/lib/types';
import { useTasks } from '@/hooks/use-tasks';
import { TaskCard } from '@/components/task-card';
import { TaskForm } from '@/components/task-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, ListTodo } from 'lucide-react';

export default function Home() {
  const { tasks, categories, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Task['status']>('todo');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTasks = tasks.filter(
    (task) =>
      task.status === filter &&
      (categoryFilter === 'all' || task.category === categoryFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">AI Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-4">
            <TaskForm categories={categories} onSubmit={addTask} />
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <ListTodo className="h-5 w-5" />
                <h2 className="font-semibold">Task Statistics</h2>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  Total Tasks: {tasks.length}
                </p>
                <p className="text-sm">
                  Todo: {tasks.filter((t) => t.status === 'todo').length}
                </p>
                <p className="text-sm">
                  In Progress:{' '}
                  {tasks.filter((t) => t.status === 'in-progress').length}
                </p>
                <p className="text-sm">
                  Completed:{' '}
                  {tasks.filter((t) => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as Task['status'])}>
              <TabsList className="w-full">
                <TabsTrigger value="todo" className="flex-1">
                  Todo
                </TabsTrigger>
                <TabsTrigger value="in-progress" className="flex-1">
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">
                  Completed
                </TabsTrigger>
              </TabsList>
              {['todo', 'in-progress', 'completed'].map((status) => (
                <TabsContent key={status} value={status}>
                  <div className="space-y-4">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No tasks found
                      </div>
                    ) : (
                      filteredTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onStatusChange={(newStatus) =>
                            updateTask(task.id, { status: newStatus })
                          }
                          onDelete={() => deleteTask(task.id)}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}