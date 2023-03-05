import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import Ai from './component/getimg_ai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import "semantic-ui-css/semantic.min.css"

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient();

const Home: NextPage = () => {
    const router = useRouter();
    const num = router.query.num
    if (num === undefined) {
        return <p>Error</p>;
    }
    return (
        <div
            className={styles.main}
        >
            <QueryClientProvider client={queryClient} >
                <div>
                    <Link href="/">
                        <h1>バズパズ</h1>
                    </Link>
                    <div className={styles.container}>
                        <Ai splitNum={Number(num)} />
                    </div>
                </div>
            </QueryClientProvider>
        </div>
    );
};
export default Home;