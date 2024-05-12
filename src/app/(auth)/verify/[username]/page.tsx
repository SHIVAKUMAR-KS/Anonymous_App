import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as  z from 'zod'

const VerifyAccount = () => {
    const router =useRouter()
    const param =useParams<{username: string}>()
    const {toast} =useToast

    const form =useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        
        
    })
    const onSubmit =async (data: z.infer<typeof verifySchema>)=>{

        try {
            
        } catch (error) {
            
        }
    }

  return (
    <div>
      VerifyAccount
    </div>
  )
}

export default VerifyAccount
