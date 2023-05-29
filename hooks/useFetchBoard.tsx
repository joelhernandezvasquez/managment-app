import { useCallback } from 'react';
import { useQuery} from '@tanstack/react-query';
import { useUIStates } from './';
import {fetchBoardById } from '../helpers';
import { BoardListResponse } from '../types/types';

export const useFetchBoard = () => {

const {getActiveBoard} = useUIStates();

const {data:board,isLoading,isSuccess} = 
useQuery(
  {
   queryKey:['getBoard', getActiveBoard()._id],
   queryFn:() => fetchBoardById(getActiveBoard()._id),
   staleTime:10000
  }
  );
 
  return {
   ...board,
    board,
    isLoading,
    isSuccess
  }
}


