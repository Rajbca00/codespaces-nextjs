import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Transactions() {
    const router = useRouter();

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (!user) {
        router.push('/login');
    }

    const [transactions, setTransactions] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [deletedTransaction, setDeletedTransaction] = useState({});

    const handleAddTransaction = () => {
        // Implement your logic to add a transaction to the 'transactions' state
        // You can use setTransactions() to update the state with the new transaction
    };

    const handleEditTransaction = (transaction) => {
        setEditMode(true);
        setEditedTransaction(transaction);
    };

    const handleUpdateTransaction = () => {
        // Implement your logic to update the edited transaction
        // You can use setTransactions() to update the state with the updated transaction
        setEditMode(false);
        setEditedTransaction({});
    };

    const handleDeleteTransaction = (transaction) => {
        setDeleteMode(true);
        setDeletedTransaction(transaction);
    };

    const handleConfirmDelete = () => {
        // Implement your logic to delete the transaction from the 'transactions' state
        // You can use setTransactions() to update the state by removing the deleted transaction
        setDeleteMode(false);
        setDeletedTransaction({});
    };

    return (<>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>

            {editMode ? (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Edit Transaction</h2>
                    {/* Render your form for editing the transaction */}
                    {/* Make sure to bind the form inputs to 'editedTransaction' state */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleUpdateTransaction}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
                    {/* Render your form for adding a new transaction */}
                    {/* Make sure to bind the form inputs to appropriate state variables */}
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleAddTransaction}
                    >
                        Add
                    </button>
                </div>
            )}

            <h2 className="text-lg font-semibold my-4">Transaction List</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render the transaction list using 'transactions' state */}
                    {/* Each row should have buttons to edit and delete the transaction */}
                    {/* Use handleEditTransaction() and handleDeleteTransaction() onClick of respective buttons */}
                </tbody>
            </table>
            {deleteMode && (
                <div>
                    <p className="text-red-600 font-semibold mt-4">
                        Are you sure you want to delete this transaction?
                    </p>
                    <p className="mb-2">
                        <strong>Date:</strong> {deletedTransaction.date}
                    </p>
                    <p className="mb-2">
                        <strong>Description:</strong> {deletedTransaction.description}
                    </p>
                    <p className="mb-2">
                        <strong>Amount:</strong> {deletedTransaction.amount}
                    </p>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleConfirmDelete}
                    >
                        Confirm Delete
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={() => setDeleteMode(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    </>
    )
}