import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  const { onPress, title, style, disabled } = props;
  return (
    <Pressable style={[styles.button, style, ... disabled ? [styles.disabled] : []]} onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create( {
  button: {
    backgroundColor: "rgb(224 224 224)",
    borderColor: 'grey',
    borderRadius: '20%',
    borderWidth: 2,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: "grey"
  },
})