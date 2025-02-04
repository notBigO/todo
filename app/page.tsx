"use client";

import CreateTodo from "@/components/create-todo";
import { TodoFilters } from "@/components/todo-filters";
import { TodoItem } from "@/components/todo-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@/types";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (title: string) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = async () => {
    const completedTodos = todos.filter((t) => t.completed);
    await Promise.all(
      completedTodos.map((todo) =>
        fetch(`http://localhost:3001/todos/${todo.id}`, {
          method: "DELETE",
        })
      )
    );

    setTodos(todos.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main className="container mx-auto p-4 max-w-2xl h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Todo App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateTodo onAdd={addTodo} />

          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>

          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        </CardContent>
      </Card>
    </main>
  );
}
