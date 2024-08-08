import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationProps } from '../../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTransactionsAction } from '../../states/reducers';
import { styles } from './styles';

const TransactionScreen = ({ navigation }: { navigation: NavigationProps }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      amount: '',
      beneficiaryId: '',
    },
  });
  const beneficiaryList = useAppSelector(state => state.app.beneficiaries);
  const balance = useAppSelector(state => state.app.balance);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const handleTransaction = (data: {
    amount: string;
    beneficiaryId: string;
  }) => {
    dispatch(
      addTransactionsAction({
        id: Date.now(),
        beneficiaryId: data.beneficiaryId,
        amount: parseFloat(data.amount),
      }),
    );
    navigation.goBack();
  };

  useEffect(() => {
    if (isFocused && beneficiaryList?.[0]?.id) {
      setValue('beneficiaryId', beneficiaryList[0].id);
    }
  }, [isFocused, beneficiaryList, setValue]);

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
        name="beneficiaryId"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.selectWrapper}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              placeholder="Recipient">
              {beneficiaryList.map(item => (
                <Picker.Item
                  label={`${item.firstName} ${item.lastName}`}
                  value={item.id}
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors.beneficiaryId && (
        <Text style={styles.errorText}>Recipient is required</Text>
      )}
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
