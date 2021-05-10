import React, { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from '../styles/styles';
import { useFocus } from '../utils/useFocus';

interface NewItemFromProps {
  onAdd(text: string): void;
}

const NewItemForm = ({ onAdd }: NewItemFromProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export default NewItemForm;
