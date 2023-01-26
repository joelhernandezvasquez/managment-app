
import { create } from 'zustand';

import { devtools} from 'zustand/middleware'

interface AuthState{
    status:string,
    errorMessage:string,
    onChecking:() => void,
    onLogin:(user:userPayload) => void
    onLogOut:(errorMsg:string) => void
    clearErrorMessage:() => void

}

interface userPayload{
    name:string,
    uid:string
}

export const useAuthStore = create <AuthState>()(
    devtools(
        (set) => ({
          status:'checking', // 'authenticated' , 'not-authenticated'
          user:{},
          errorMessage:'',
          
          onChecking:() =>  set((state)=> ({
            status:'checking',
            user:{},
           errorMessage:undefined
          })),

          onLogin:(payload:userPayload) =>  set((state)=> ({
            status:'authenticated',
            user:payload,
            errorMessage:undefined
          })),

          onLogOut:(errorMsg:string) =>  set((state)=> ({
            status:'not-authenticated',
            user:{},
            errorMessage:errorMsg
          })),

          clearErrorMessage:() =>  set((state)=> ({
            errorMessage:undefined
          })),

        }),
       
      
    )
  )

 