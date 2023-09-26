import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import {prisma} from "../../../lib/prisma"
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession()

    if (!session) {
        return res.status(404).json({ message: "Kamu harus login terlebih dahulu" })
    }

    const {code} = req.query

    // Get Detail By Code

    // Delete By Code
    if(req.method === "DELETE"){
        const result = await prisma.votes.update({
            where:{
                code: code as string,
            },
            data:{
                deleteAt : new Date().toString()
            }
        })
    }
}
