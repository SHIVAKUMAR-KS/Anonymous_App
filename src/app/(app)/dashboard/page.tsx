'use client'
import { useToast } from "@/components/ui/use-toast"
import { Message } from "@/model/User"
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"

const page = () => {
  const [messages,setMessages] =useState<Message[]>([])
  const [isLoading,setIsLoading] = useState(false)
  const [isSwitching,setIsSwitchLoading] =useState(false)
  const {toast} =useToast()

  const handleDeleteMessage =(messageId: string)=>{
    setMessages(messages.filter((message)=> message.id !== messageId))
  }

  const {data:session} =useSession()

  const form =useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })

  const {register,watch,setValue} =form

  const acceptMessages =watch('acceptMessages')

  const fetchAcceptMessage =useCallback(async () => {
    setIsSwitchLoading(true)

    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessage)
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title:"Error",
        description:axiosError.response?.data.message || "Failed to fetch message settings",
        variant:"destructive"
      })
    }
    finally{
      setIsSwitchLoading(false)
    }
  },[setValue])

  const fetchMessages = useCallback(async (refresh:boolean =false) =>{

    setIsLoading(true)
    setIsSwitchLoading(false)

    try {
      
    } catch (error) {
      
    }

  },[])


  return (
    <div>
      Dashboard
    </div>
  )
}

export default page
