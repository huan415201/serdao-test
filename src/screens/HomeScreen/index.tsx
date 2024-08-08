import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { NavigationProps } from '../../../App';
import { useAppSelector } from '../../hooks/redux';
import { TransactionState } from '../../states/reducers';
import { SCREEN_KEY } from '../../utils';
import { styles } from './styles';

const HomeScreen = ({ navigation }: { navigation: NavigationProps }) => {
  const { transactions, balance } = useAppSelector(state => state.app);
  const beneficiaryList = useAppSelector(state => state.app.beneficiaries);

  const renderItem = ({ item }: { item: TransactionState }) => {
    const currentRecipient = beneficiaryList.find(
      i => item.beneficiaryId === i.id,
    );
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
        <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
        {item.beneficiaryId && (
          <>
            <Text style={styles.itemText}>
              To:{' '}
              {`${currentRecipient?.firstName} ${currentRecipient?.lastName}`}
            </Text>
            <Text style={styles.itemText}>IBAN: {currentRecipient?.iban}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate(SCREEN_KEY.Beneficiary)}
      />
      <View style={styles.transactionButton}>
        <Button
          title="Add Transaction"
          onPress={() => navigation.navigate(SCREEN_KEY.Transaction)}
        />
      </View>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HomeScreen;
