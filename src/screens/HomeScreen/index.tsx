import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks/redux';
import { TransactionState } from '../../states/reducers';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {
  const { transactions, balance } = useAppSelector(state => state.app);

  const renderItem = ({ item }: { item: TransactionState }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>
            To: {`${item.account.firstName} ${item.account.lastName}`}
          </Text>
          <Text style={styles.itemText}>IBAN: {item.account.IBAN}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction')}
      />
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
