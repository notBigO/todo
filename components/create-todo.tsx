"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CreateTodoProps {
  onAdd: (title: string) => void;
}

const CreateTodo = ({ onAdd }: CreateTodoProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default CreateTodo;
