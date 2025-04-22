import { useState, useRef, useEffect } from 'react';
type InputType = 'text' | 'number' | 'textarea';

export const useInlineEdit = <T extends string | number>(
    initialValue: T,
    onUpdate: (value: T) => void,
    inputType: InputType = 'text'
  ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<T>(initialValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputType === 'text' || inputType === 'textarea') {
        try {
          (inputRef.current as HTMLInputElement).setSelectionRange(0, String(value).length);
        } catch (e) {
          console.debug("Selection not supported for this input type", e);
        }
      }
    }
  }, [isEditing, inputType]);

  const startEditing = () => setIsEditing(true);
  
  const stopEditing = () => {
    setIsEditing(false);
    onUpdate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      stopEditing();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      stopEditing();
    }
  };

  return {
    isEditing,
    value,
    setValue,
    inputRef,
    startEditing,
    stopEditing,
    handleKeyDown
  };
};