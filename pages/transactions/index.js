import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Index() {

    const [transactions, setTransactions] = useState(null);


    return <>
        <Navbar/>
        <h2>Transactions</h2>
    </>
}