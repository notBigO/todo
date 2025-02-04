"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Todo } from "@/types";

export default function TodoPage() {
  const params = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodo();
  }, [params.id]);

  const fetchTodo = async () => {
    try {
      const todoId = Number(params.id);
      console.log(typeof todoId);
      const response = await fetch(`http://localhost:3001/todos/${todoId}`);

      if (!response.ok) {
        throw new Error("Todo not found");
      }

      const data = await response.json();
      setTodo(data);
      setTitle(data.title);
    } catch (error) {
      console.error("Fetch error:", error);
      router.push("/");
    }
  };

  const updateTodo = async () => {
    if (!todo) return;

    await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    router.push("/");
  };

  const toggleTodo = async () => {
    if (!todo) return;

    await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    setTodo({ ...todo, completed: !todo.completed });
  };

  const deleteTodo = async () => {
    if (!todo) return;

    await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  if (!todo) return null;

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Edit Todo</CardTitle>
          <Button variant="ghost" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={todo.completed} onCheckedChange={toggleTodo} />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={updateTodo}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="destructive" onClick={deleteTodo}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
