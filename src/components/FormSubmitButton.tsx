import React, {FC} from 'react';
import { useFormApi } from "informed";
import { Button, ButtonProps } from 'react-native-paper';

export type FormSubmitButtonProps = Omit<ButtonProps, 'onPress' | 'theme'>;

export const FormSubmitButton: FC<FormSubmitButtonProps> = ({...rest}) => {
  const formApi = useFormApi();
  return <Button {...rest} onPress={formApi.submitForm} />;
};
