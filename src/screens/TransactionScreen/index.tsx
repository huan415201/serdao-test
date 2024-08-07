import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../hooks/redux';
import { addTransactionsAction } from '../../states/reducers';
import { styles } from './styles';

const TransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const dispatch = useAppDispatch();

  const handleTransaction = () => {
    dispatch(
      addTransactionsAction({
        id: Date.now(),
        account: { firstName: name, lastName: '', IBAN: iban },
        amount: parseFloat(amount),
      }),
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

export default TransactionScreen;
