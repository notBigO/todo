"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Todo } from "../types";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg group">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.title}
      </span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/todo/${todo.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
