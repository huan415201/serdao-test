import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useAppDispatch } from '../hooks/redux';
import { addTransactionsAction } from '../states/reducers';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

export default TransactionScreen;
