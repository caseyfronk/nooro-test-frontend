import { TaskColor, taskColors } from "@/lib/types";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  value: TaskColor;
  onChange: (color: TaskColor) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-3">
      {taskColors.map((color) => (
        <div
          key={color}
          className={cn(
            "size-10 rounded-full border-2 border-transparent hover:cursor-pointer",
            value === color && "border-white",
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        ></div>
      ))}
    </div>
  );
}
