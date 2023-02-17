
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/store';
import {useUiStore} from '../store/UIStates/store';
import { fetchNamesOfBoards } from '../helpers';

export const useBoard = () => {
    
const {user} = useAuthStore();
const {data,isLoading,isError,error} =  useQuery({queryKey:['boardNames'],queryFn:()=> fetchNamesOfBoards(user.uid)}) 


return{
    ...data,
      data,
      error,
      isLoading,
      isError
}
}
