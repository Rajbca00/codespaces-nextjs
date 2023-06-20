import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function Configure() {
    const router = useRouter();

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (!user) {
        router.push('/login');
    }

    return (<>
        <Navbar />
        <p>Configure</p>
    </>
    )
}