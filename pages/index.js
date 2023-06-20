import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Tile from '../components/Tile';
import { BankNotes, CreditCard, Transaction, Expense } from '../components/SVGIcons'
import SpendingLineChart from '../components/SpendingLineChart';
import PieChart from '../components/PieChart';
import Dropdown from '../components/Dropdown';
import BalanceTile from '../components/BalanceTile';


const transactions = [
  {
    "id": "1",
    "date": "2023-06-01",
    "category": "Groceries",
    "amount": 50.25,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "2",
    "date": "2023-06-02",
    "category": "Dining Out",
    "amount": 35.75,
    "account": "Credit Card",
    "type": "Expense"
  },
  {
    "id": "3",
    "date": "2023-06-03",
    "category": "Transportation",
    "amount": 20.0,
    "account": "Debit Card",
    "type": "Expense"
  },
  {
    "id": "4",
    "date": "2023-06-04",
    "category": "Shopping",
    "amount": 75.0,
    "account": "Savings Account",
    "type": "Expense"
  },
  {
    "id": "5",
    "date": "2023-06-05",
    "category": "Entertainment",
    "amount": 15.5,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "6",
    "date": "2023-06-06",
    "category": "Bills",
    "amount": 100.0,
    "account": "Credit Card",
    "type": "Expense"
  },
  {
    "id": "7",
    "date": "2023-06-07",
    "category": "Healthcare",
    "amount": 45.0,
    "account": "Debit Card",
    "type": "Expense"
  },
  {
    "id": "8",
    "date": "2023-06-08",
    "category": "Travel",
    "amount": 200.0,
    "account": "Savings Account",
    "type": "Expense"
  },
  {
    "id": "9",
    "date": "2023-06-09",
    "category": "Groceries",
    "amount": 55.75,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "10",
    "date": "2023-06-10",
    "category": "Dining Out",
    "amount": 42.0,
    "account": "Credit Card",
    "type": "Expense"
  },
  {
    "id": "11",
    "date": "2023-06-11",
    "category": "Transportation",
    "amount": 25.5,
    "account": "Debit Card",
    "type": "Expense"
  },
  {
    "id": "12",
    "date": "2023-06-12",
    "category": "Shopping",
    "amount": 120.0,
    "account": "Savings Account",
    "type": "Expense"
  },
  {
    "id": "13",
    "date": "2023-06-13",
    "category": "Entertainment",
    "amount": 18.75,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "15",
    "date": "2023-06-15",
    "category": "Healthcare",
    "amount": 35.25,
    "account": "Debit Card",
    "type": "Expense"
  },
  {
    "id": "16",
    "date": "2023-06-16",
    "category": "Travel",
    "amount": 180.0,
    "account": "Savings Account",
    "type": "Expense"
  },
  {
    "id": "17",
    "date": "2023-06-17",
    "category": "Groceries",
    "amount": 60.5,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "18",
    "date": "2023-06-18",
    "category": "Dining Out",
    "amount": 50.0,
    "account": "Credit Card",
    "type": "Expense"
  },
  {
    "id": "19",
    "date": "2023-06-19",
    "category": "Transportation",
    "amount": 30.25,
    "account": "Debit Card",
    "type": "Expense"
  },
  {
    "id": "20",
    "date": "2023-06-20",
    "category": "Shopping",
    "amount": 95.0,
    "account": "Savings Account",
    "type": "Expense"
  },
  {
    "id": "21",
    "date": "2023-06-21",
    "category": "Entertainment",
    "amount": 25.75,
    "account": "Checking Account",
    "type": "Expense"
  },
  {
    "id": "22",
    "date": "2023-06-22",
    "category": "Salary",
    "amount": 2500.0,
    "account": "Checking Account",
    "type": "Income"
  },
  {
    "id": "23",
    "date": "2023-06-23",
    "category": "Transfer",
    "amount": 500.0,
    "account": "Savings Account",
    "accountTo": "Checking Account",
    "type": "Transfer"
  },
  {
    "id": "24",
    "date": "2023-06-24",
    "category": "Interest",
    "amount": 50.0,
    "account": "Savings Account",
    "type": "Income"
  },
  {
    "id": "25",
    "date": "2023-06-25",
    "category": "Transfer",
    "amount": 200.0,
    "account": "Checking Account",
    "accountTo": "Savings Account",
    "type": "Transfer"
  }
]

const accounts = [
  {
    "name": "Checking Account",
    "balance": 5000
  },
  {
    "name": "Savings Account",
    "balance": 10000
  },
  {
    "name": "Credit Card",
    "balance": -2500
  },
  {
    "name": "Investment Account",
    "balance": 50000
  }
]

export default function Home() {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    router.push('/login');
  }

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const currentYear = currentDate.getFullYear();

  // Filter transactions for the current month and type as 'Income'
  const incomeTransactions = transactions.filter(
    (transaction) =>
      transaction.type === 'Income' &&
      new Date(transaction.date).getMonth() + 1 === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
  );

  // Calculate the total income
  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Filter transactions for the current month and type as 'Expense'
  const expenseTransactions = transactions.filter(
    (transaction) =>
      transaction.type === 'Expense' &&
      new Date(transaction.date).getMonth() + 1 === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
  );

  // Calculate the total expense
  const totalExpense = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Filter transactions for the current month and type as 'Transfer'
  const transferTransactions = transactions.filter(
    (transaction) =>
      transaction.type === 'Transfer' &&
      new Date(transaction.date).getMonth() + 1 === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
  );

  // Calculate the total transfers
  const totalTransfers = transferTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Update account balances based on the transactions
  transactions.forEach((transaction) => {
    const { account, amount, type } = transaction;

    // Find the account in the accounts array
    const accountToUpdate = accounts.find((acc) => acc.name === account);

    if (accountToUpdate) {
      if (type === 'Income') {
        accountToUpdate.balance += amount;
      } else if (type === 'Expense') {
        accountToUpdate.balance -= amount;
      } else if (type === 'Transfer') {
        accountToUpdate.balance -= amount;

        // Find the 'accountTo' in the accounts array for transfers
        const accountTo = accounts.find((acc) => acc.name === transaction.accountTo);

        if (accountTo) {
          accountTo.balance += amount;
        }
      }
    }
  });

  // Calculate the total amount of all accounts
  const totalAmount = accounts.reduce((total, account) => total + account.balance, 0);

  // function getAllMonthsAndYears(numOfMonths) {
  //   const monthsAndYears = [];

  //   const currentDate = new Date();

  //   for (let i = 0; i < numOfMonths; i++) {
  //     const month = currentDate.toLocaleString('default', { month: 'short' });
  //     const year = currentDate.getFullYear();
  //     const monthYear = `${month} ${year}`;

  //     monthsAndYears.push(monthYear);

  //     currentDate.setMonth(currentDate.getMonth() - 1);
  //   }

  //   return monthsAndYears;
  // }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getUniqueMonthAndYears = (transactions) => {
    const uniqueMonthAndYears = new Set();

    transactions.forEach((transaction) => {
      const { date } = transaction;
      const [year, month] = date.split('-');
      const formattedMonthAndYear = `${monthNames[parseInt(month) - 1]} ${year}`;

      uniqueMonthAndYears.add(formattedMonthAndYear);
    });

    return Array.from(uniqueMonthAndYears);
  };

  const monthsAndYears = getUniqueMonthAndYears(transactions);

  const accountNames = accounts.map((account) => account.name);

  return (
    <>
      <Navbar />
      <div className='container flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-2'>
        <div id="filters" className='bg-white shadow-xl p-6 flex flex-col'>
          <h3 className='font-bold'>Filters</h3>
          <div className='mt-2'>
            <div className='text-gray-600 font-semibold'>Period</div>
            <Dropdown data={monthsAndYears} />
          </div>

          <div className='mt-2'>
            <div className='text-gray-600 font-semibold'>Account</div>
            <Dropdown data={accountNames} />
          </div>

        </div>
        <div id='dashboard' className='w-full'>
          <h3 className='mx-6 px-2 font-bold'>Dashboard</h3>
          <div id='tiles' className="flex justify-between mt-2">
            <Tile title="Income" amount={`$${totalIncome}`} style="text-green-500 " IconImage={BankNotes} />
            <Tile title="Expenses" amount={`$${totalExpense}`} style="text-red-500 " IconImage={Expense} />
            <Tile title="Transfers" amount={`$${totalTransfers}`} style="text-blue-500" IconImage={Transaction} />
            <Tile title="Total Balance" amount={`$${totalAmount}`} style="text-orange-500" IconImage={CreditCard} />
          </div>
          <div id="charts" className='flex m-2 justify-equally'>
            <div className='bg-white shadow-xl p-6 rounded basis-2/3'>
              <SpendingLineChart />
            </div>
            <div className='bg-white shadow-xl p-6 ml-4 rounded basis-1/3'>
              <PieChart />
            </div>
          </div>
          <div id="balances" className='bg-white shadow-xl p-6 m-2'>
            <h3 className='px-2 font-bold'>Balances</h3>
            <div className='flex'>
              {
                accounts.map(({name, balance, index}) => (
                  <BalanceTile accountName={name} balance={balance} key={index} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



