"use client";

import { Button } from "./ui/button";

type FilterType = "all" | "active" | "completed";

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export function TodoFilters({
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center">
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </Button>
      </div>
      <Button variant="destructive" onClick={onClearCompleted}>
        Clear Completed
      </Button>
    </div>
  );
}
