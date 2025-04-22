import { useInlineEdit } from "../features/editor/hooks/useInlineEdit";

interface EditableTextProps {
  value: string;
  onUpdate: (value: string) => void;
  className?: string;
  multiline?: boolean;
}

export const EditableText = ({ 
  value, 
  onUpdate, 
  className = '', 
  multiline = false 
}: EditableTextProps) => {
  const {
    isEditing,
    value: currentValue,
    setValue,
    inputRef,
    startEditing,
    stopEditing,
    handleKeyDown
  } = useInlineEdit(value, onUpdate);

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={stopEditing}
        onKeyDown={handleKeyDown}
        className={`w-full bg-opacity-80 ${className}`}
      />
    ) : (
      <input
        type="text"
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={stopEditing}
        onKeyDown={handleKeyDown}
        className={`w-full bg-opacity-80 ${className}`}
      />
    );
  }

  return (
    <div 
      onClick={startEditing} 
      className={`cursor-text ${className}`}
    >
      {value || (multiline ? 'Click to edit...' : 'Edit')}
    </div>
  );
};