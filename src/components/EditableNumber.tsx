import { useInlineEdit } from "../features/editor/hooks/useInlineEdit";
interface EditableNumberProps {
  value: number;
  onUpdate: (value: number) => void;
  className?: string;
  min?: number;
}

export const EditableNumber = ({ 
  value, 
  onUpdate, 
  className = '', 
  min = 0 
}: EditableNumberProps) => {
  const {
    isEditing,
    value: currentValue,
    setValue,
    inputRef,
    startEditing,
    stopEditing,
    handleKeyDown
  } = useInlineEdit(value.toString(), (val) => onUpdate(parseInt(val) || min));

  if (isEditing) {
    return (
      <input
        type="number"
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={stopEditing}
        onKeyDown={handleKeyDown}
        min={min}
        className={`w-16 bg-opacity-80 ${className}`}
      />
    );
  }

  return (
    <div 
      onClick={startEditing} 
      className={`cursor-text ${className}`}
    >
      {value}
    </div>
  );
};