import type { NextPage } from 'next'
import Head from 'next/head'
import Menu from '../components/Menu'
import Image from 'next/image'
import Button from '../components/Button'
import { LinkIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useVotes from '../lib/useVotes'
import { useEffect, useState } from 'react'
import { votes } from "@prisma/client"
import moment from 'moment'
import { showAlert } from '../components/Alert'

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: dataVotesApi, error, isLoading } = useVotes();


  const [votes, setVotes] = useState<votes[]>()

  const handleDelete = (code: string) =>{
    showAlert({
      title: "Anda yakin?",
      message: "ingin menghapus data ini?",
      onPositiveClick(){},
    })
  }

  useEffect(() => {
    if (dataVotesApi) {

      setVotes(dataVotesApi.data)
    }
  }, [dataVotesApi])

  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      {/* Header */}
      <div className="flex flex-col place-items-center py-44 space-y-3">
        <h1 className="text-5xl font-bold">Ayo Mulai Voting</h1>
        <h2 className="text-lg bg-zinc-100 px-3 py-1">Web Voting No.1 Di Indonesia</h2>
        <Image alt={"Header"} src={"assets/header.svg"} height={243} width={275} />

        <div className="space-x-10">
          <Button text="Buat Vote Baru" className='font-bold' onClick={() => router.push("/vote/create")} />
          <Button text="Ikutan Vote" type="secondary" className='font-bold' onClick={() => router.push('participant')} />
        </div>

      </div>
      {/* End Header */}

      {/* Table */}
      {session && (
        <div>
          <p className="py-5 text-lg font-bold">Vote yang saya buat</p>
          <table className="table-auto w-full border border-zinc-100">
            <thead>
              <tr className="border-b border-zinc-100">
                <th>No</th>
                <th>Judul</th>
                <th>Kandidat</th>
                <th>Kode</th>
                <th>Mulai</th>
                <th>Selesai</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {votes && votes.length > 0 ? (
                votes.map((vote: votes, index: number) => (
                  <tr>
                    <td className="p-5 text-left">{index + 1}</td>
                    <td className="p-5 text-left">{vote.title}</td>
                    <td className="p-5 text-left">{vote.candidates.map((c: Candidate, index: number) => (
                      <span key={index}>
                        {c.name + (index < vote.candidates.length - 1 ? " vs " : "")}
                      </span>
                    ))}</td>
                    <td className="p-5 text-left font-bold">{vote.code}</td>
                    <td className="p-5 text-left">{moment(vote.startDateTime).format("MM DD YYYY hh:mm:ss")}</td>
                    <td className="p-5 text-left">{moment(vote.endDateTime).format("MM DD YYYY hh:mm:ss")}</td>
                    <td className="p-5 text-left">
                      <div>
                        <button>
                          <LinkIcon className="w-8 h-8 p-2 hover:bg-zinc-100" />
                        </button>

                        <button onClick={() => handleDelete(vote.code)}>
                          <TrashIcon className="w-8 h-8 p-2 hover:bg-zinc-100" />
                        </button>

                      </div>

                    </td>
                  </tr>

                ))
              ) : "Belum ada votes yang dibuat"}
            </tbody>
          </table>
        </div>
      )}
      {/* End Table */}
    </div>
  )
}

export default Home
