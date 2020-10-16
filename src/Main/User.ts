
interface IUser {
  FirstName: string;
  LastName: string;
  Role: string;
}
const User = (props: IUser) =>{
    const current = {
     FirstName:  props.FirstName,
     LastName: props.LastName,
     Role: props.Role  
    }
    return current
}
export default User