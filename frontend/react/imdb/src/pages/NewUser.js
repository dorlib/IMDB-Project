import { useNavigate } from 'react-router-dom';

import {SignUpForm} from "../components/accounts/signupForm";

function NewUserPage() {
    const navigate = useNavigate();

  function AddUserHandler(userData) {
    fetch(
      "https://react-getting-started-af0bd-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
      }
    ).then(() => {
        navigate('/',{replace:true});
    });
  }

  return (
    <section>
      <h1 style={{color: "yellow"}}>Create New User</h1>
      <SignUpForm onAddUser={AddUserHandler} />
    </section>
  );
}

export default NewUserPage;
