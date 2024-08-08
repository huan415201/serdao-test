import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransactionState = {
  id: number;
  amount: number;
  beneficiaryId: string;
};

export type BeneficiaryState = {
  id: string;
  firstName: string;
  lastName: string;
  iban: string;
};

type AppState = {
  balance: number;
  transactions: TransactionState[];
  beneficiaries: BeneficiaryState[];
};

const initialState: AppState = {
  balance: 1000,
  transactions: [],
  beneficiaries: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTransactionsAction: (state, action: PayloadAction<TransactionState>) => {
      state.transactions = [...state.transactions, action.payload];
      state.balance -= action.payload.amount;
    },
    addBeneficiariesAction: (
      state,
      action: PayloadAction<BeneficiaryState>,
    ) => {
      state.beneficiaries = [...state.beneficiaries, action.payload];
    },
  },
});

export const { addTransactionsAction, addBeneficiariesAction } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
