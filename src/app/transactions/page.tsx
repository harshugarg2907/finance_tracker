import TransactionList from './components/TransactonList';

export default function TransactionsPage() {
  return (
    <div className="p-4">
      <h1 className=" font-bold text-5xl">Transactions</h1>
      <TransactionList />
    </div>
  );
}