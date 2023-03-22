
import { useQuery} from '@tanstack/react-query';
import { useUIStates } from './';
import {fetchBoardById } from '../helpers';

export const useFetchBoard = () => {
const {getActiveBoard} = useUIStates();
const {data,isLoading,isSuccess} = useQuery({queryKey:['getBoard'],queryFn:() => fetchBoardById(getActiveBoard()._id),retry:1});

  return {
   ...data,
    data,
    isLoading,
    isSuccess
  }
}


