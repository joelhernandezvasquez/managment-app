import {useState} from 'react';

export const useModal = () => {
  const [isModalOpen,setModal] = useState<boolean>(false);

   const toggleModal = () =>{
       setModal(!isModalOpen);
   }

   return{
    isModalOpen,
    toggleModal
   }
}
