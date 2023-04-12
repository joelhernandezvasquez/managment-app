
import { useQuery} from '@tanstack/react-query';
import { useUIStates } from './';
import {fetchBoardById } from '../helpers';

export const useFetchBoard = () => {

const {getActiveBoard} = useUIStates();
const {data,isLoading,isSuccess} = useQuery({queryKey:['getBoard', getActiveBoard()._id],queryFn:() => fetchBoardById(getActiveBoard()._id),retry:1,refetchOnMount: true });

  return {
   ...data,
    data,
    isLoading,
    isSuccess
  }
}


