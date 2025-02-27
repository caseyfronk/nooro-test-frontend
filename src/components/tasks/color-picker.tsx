import { TaskColor, taskColors } from "@/lib/types";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  value: TaskColor;
  onChange: (color: TaskColor) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-3" role="radiogroup" aria-label="Pick a color">
      {taskColors.map((color) => (
        <button
          key={color}
          className={cn(
            "size-13 rounded-full border-2 border-transparent hover:cursor-pointer",
            value === color && "border-white",
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`Select ${color}`}
          role="radio"
          type="button"
          aria-checked={value === color}
        />
      ))}
    </div>
  );
}
