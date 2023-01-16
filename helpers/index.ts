
export const isValidForm = (fields:any):boolean =>{
 
 const formFields = Object.values(fields);
 return formFields.every((field:any)=> field.length > 0)
    
}