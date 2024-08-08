import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addBeneficiariesAction,
  BeneficiaryState,
} from '../../states/reducers';
import { franceIBANPattern } from '../../utils';
import { styles } from './styles';

const BeneficiaryScreen = () => {
  const dispatch = useAppDispatch();
  const beneficiaryList = useAppSelector(state => state.app.beneficiaries);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      iban: '',
    },
  });

  const createBeneficiary = (value: Omit<BeneficiaryState, 'id'>) => {
    dispatch(
      addBeneficiariesAction({ id: `beneficiary_${Date.now()}`, ...value }),
    );
    reset();
    Keyboard.dismiss();
  };

  const renderItem = ({ item }: { item: BeneficiaryState }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>First name: {item.firstName}</Text>
      <Text style={styles.itemText}>Last name: {item.lastName}</Text>
      <Text style={styles.itemText}>IBAN: {item.iban}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Controller
        name="firstName"
        control={control}
        rules={{}}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="First Name"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{}}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Last Name"
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
          title="Create Beneficiary"
          onPress={handleSubmit(createBeneficiary)}
        />
      </View>

      <FlatList
        data={beneficiaryList}
        renderItem={renderItem}
        keyExtractor={(item: BeneficiaryState, index: number) =>
          `${item.iban}_${index}`
        }
      />
    </View>
  );
};

export default BeneficiaryScreen;
