
import { useQuery} from '@tanstack/react-query';
import { useUIStates } from './';
import {fetchBoardById } from '../helpers';

export const useFetchBoard = () => {

const {getActiveBoard} = useUIStates();
const {data:board,isLoading,isSuccess} = 
useQuery(
  {
   queryKey:['getBoard', getActiveBoard()._id],
   queryFn:() => fetchBoardById(getActiveBoard()._id)
  }
  );
 
  return {
   ...board,
    board,
    isLoading,
    isSuccess
  }
}


