import { create } from 'zustand';
import { devtools,persist} from 'zustand/middleware';
import { Board } from '../../components/Board/Board';
import {BoardResponse, BoardTask} from '../../types/types';

interface BoardState{
 boards: BoardResponse [],

 addBoardToStore:(board:BoardResponse) => void,
 addTaskToBoard:(newBoard:BoardResponse) => void
}

export const BoardStore = create <BoardState>()(
    devtools(
      
      persist(
        (set) => ({
            boards:[],

             /*
               adding board
               adding task to board
               deleting board
               updating board

               boards :[
                {
                  id(from database)
                  name:'name',
                  columns:['','',''],
                  tasks:[],
                  userId:'1111'
              }
               ]

             */
                 
          addBoardToStore:(board:BoardResponse) => set((state)=>({
            boards:[...state.boards,board]
          })),
          
          addTaskToBoard:(newBoard:BoardResponse) => set((state)=>({
           boards: state.boards.map((board) => board._id === newBoard._id ? newBoard:board)
       
          })),




          
        
        }),
       

        {
          
          name: 'board-storage', 
          serialize: (state) => btoa(JSON.stringify(state)),
          deserialize: (storedState) => JSON.parse(atob(storedState))
        }
      ),
      
      
    )
  )

