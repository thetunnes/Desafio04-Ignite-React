import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons/lib'
import { IconBase } from 'react-icons';

import { useField } from '@unform/core';
import { Container } from './styles';


interface InputProps {

  name: string;
  icon?: IconBaseProps;
  placeholder?: string;
}

export function Input({ name, icon: Icon, ...rest }: InputProps) {
  const [inputRef] = useState(useRef(null));

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
    // eslint-disable-next-line
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <IconBase size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

