import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import Menu from '../../components/Menu';
import CandidatItem from '../../components/CandidatItem';
import Button from '../../components/Button';
import CountDown from '../../components/CountDown/CountDown';
import { showAlert } from '../../components/Alert';
import { useSession } from 'next-auth/react';
import RestrictedPage from '../../components/Page/RestrictedPage';


export default function DetailParticipant() {
    const router = useRouter();
    const { code } = router.query;

    const { data: session } = useSession();
    if (!session) {
        return <RestrictedPage />;
    }
    return (
        <div className='container mx-auto'>
            <Head>
                <title>Mulai Voting</title>
            </Head>

            <Menu />

            <div>
                <h1 className='text-4xl mt-10 text-center'>Judul Voting</h1>
                {/* Timer */}
                <CountDown className="mt-10" />
                {/* End Timer */}

                {/* Kandidat */}
                <div className='mt-10 space-y-3 mx-auto w-2/3'>
                    <CandidatItem />
                    <CandidatItem />
                    <CandidatItem />
                    <CandidatItem />
                    <CandidatItem />
                </div>
                {/* End Kandidat */}

                {/* Submit */}
                <div className='text-center mt-10'>
                    <Button text="Kirim Vote Saya 🙂" onClick={() => 
                        showAlert({
                            title: "Yeay!", 
                            message: "Kamu berhasil melakukan vote",
                            positiveBtntext: "Ya",
                            onPositiveClick() {},
                        })}
                    />
                </div>
                {/* End Submit */}
            </div>
        </div>
    )
}
