"use client";

import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onStatusChange: (status: Task['status']) => void;
  onDelete: () => void;
}

const priorityIcons = {
  low: Clock,
  medium: AlertTriangle,
  high: AlertTriangle,
};

const priorityColors = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const PriorityIcon = priorityIcons[task.priority];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <PriorityIcon
            className={cn('h-4 w-4', priorityColors[task.priority])}
          />
          <Badge variant="outline">{task.category}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
        {task.dueDate && (
          <p className="text-sm text-muted-foreground mt-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant={task.status === 'todo' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onStatusChange('todo')}
          >
            Todo
          </Button>
          <Button
            variant={task.status === 'in-progress' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onStatusChange('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={task.status === 'completed' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onStatusChange('completed')}
          >
            <CheckCircle2 className="mr-1 h-4 w-4" />
            Completed
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}