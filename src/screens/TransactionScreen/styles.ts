import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
  },
  submitButton: {
    marginTop: 12,
  },
  selectWrapper: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    height: 40,
    width: '80%',
    justifyContent: 'center',
  },
});
