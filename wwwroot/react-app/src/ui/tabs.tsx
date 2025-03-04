import React from "react";

interface TabsProps<T> {
  items: {
    label: string;
    value: T;
  }[];
  active: T;
  onChange: (tab: T) => void;
}

export function Tabs<T>({ items, active, onChange }: TabsProps<T>) {
  return (
    <div className="web-space-x-4">
      {items.map((item) => (
        <button
          onClick={() => onChange(item.value)}
          key={String(item.value)}
          className={`web-font-medium !web-border !web-border-solid ${
            active === item.value
              ? "web-bg-blue-600 web-text-white !web-bg-blue-600!"
              : "web-text-blue-600 !web-border-gray-600!"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
