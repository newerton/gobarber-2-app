import { useField } from '@unform/core';
import type React from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, unknown>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  props,
  ref,
) => {
  const { name, icon, ...rest } = props;
  const inputElementRef = useRef<RNTextInput | null>(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current?.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current?.value);
  }, []);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666260'}
      />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        // @ts-expect-error - styled-components typing doesn't expose ref properly
        ref={inputElementRef as unknown}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          if (inputValueRef.current) {
            inputValueRef.current.value = value;
          }
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
