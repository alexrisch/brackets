import React, { FC, useCallback } from 'react';
import { FieldProps, useField } from 'informed';
import { TextInput, TextInputProps } from 'react-native-paper';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

type FormCompProps = Omit<TextInputProps, 'onChange' | 'onFocus' | 'onBlur' | 'theme'> & FieldProps<undefined>;

interface TextFormInputProps extends FormCompProps {
  name: string;
  validate?: (value: string | unknown, values: Record<string, unknown>) => string | undefined;
  required?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const TextFormInput: FC<TextFormInputProps> = ({
  name,
  onBlur,
  onFocus,
  ...props
}) => {
  const { render, informed, userProps, ref, fieldApi, fieldState } = useField<TextFormInputProps, string>({
    type: 'text',
    name,
    ...props,
  });

  const compOnBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.();
  }, [onBlur, fieldState]);

  const compOnFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.();
  }, [onFocus, fieldState]);

  return render(
    <TextInput
      {...informed}
      {...userProps}
      onFocus={compOnFocus}
      onBlur={compOnBlur}
      onChange={fieldApi.setValue}
      ref={ref}
      error={fieldState.showError}
    />
  );
};
