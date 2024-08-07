import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTransactionsAction } from '../../states/reducers';
import { franceIBANPattern } from '../../utils';
import { styles } from './styles';

const TransactionScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      name: '',
      iban: '',
    },
  });

  const balance = useAppSelector(state => state.app.balance);
  const dispatch = useAppDispatch();

  const handleTransaction = data => {
    dispatch(
      addTransactionsAction({
        id: Date.now(),
        account: { firstName: data.name, lastName: '', IBAN: data.iban },
        amount: parseFloat(data.amount),
      }),
    );
    navigation.goBack();
  };

  useEffect(() => {
    console.log('errors:::', errors);
  }, [errors]);

  return (
    <View style={styles.container}>
      <Controller
        name="amount"
        control={control}
        rules={{ min: 0, max: balance }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            placeholder="Enter amount"
          />
        )}
      />
      {errors.amount?.type === 'min' && (
        <Text style={styles.errorText}>Invalid amount</Text>
      )}
      {errors.amount?.type === 'max' && (
        <Text style={styles.errorText}>Insufficient balance</Text>
      )}
      <Controller
        name="name"
        control={control}
        rules={{}}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Recipient Name"
          />
        )}
      />
      {/* E.g: FR7630006000011234567890189 */}
      <Controller
        name="iban"
        control={control}
        rules={{ pattern: franceIBANPattern }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Recipient IBAN"
          />
        )}
      />
      {errors.iban && <Text style={styles.errorText}>Invalid IBAN</Text>}
      <View style={styles.submitButton}>
        <Button
          title="Submit Transaction"
          onPress={handleSubmit(handleTransaction)}
        />
      </View>
    </View>
  );
};

export default TransactionScreen;
