import React, {FunctionComponent, PropsWithChildren} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useAppNav } from '../navigation';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    flexShrink: 1,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 30,
    minHeight: 450,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center',
  },
  pressableBackdrop: {
    flexGrow: 1,
    height: 400,
    width: '100%'
  },
  sideElement: {
    minWidth: 40
  }
});

interface ModalWrapperProps {
  title: string;
  leftElement?: string;
  onLeftPress?: () => void;
  rightElement?: string;
  onRightPress?: () => void;
}

export const ModalWrapper: FunctionComponent<PropsWithChildren<ModalWrapperProps>> = ({
  title,
  leftElement,
  onLeftPress,
  rightElement,
  onRightPress,
  children
}) => {
  const {goBack} = useAppNav();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.pressableBackdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <>
          <View style={styles.header}>
            {leftElement ? (
              <Text
                style={styles.sideElement}
                onPress={onLeftPress}
              >
                {leftElement}
              </Text>
            ) : <View style={styles.sideElement} />}
            <Text style={styles.title}>{title}</Text>
            {rightElement ? (
              <Text
                style={styles.sideElement}
                onPress={onRightPress}
              >
                {rightElement}
              </Text>
            ) : <View style={styles.sideElement} />}
          </View>
        </>
        {children}
      </View>
    </View>
  );
};
