import { useNavigate } from 'react-router-dom';

import NewUserForm from "../components/users/NewUserForm";

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
      <NewUserForm onAddUser={AddUserHandler} />
    </section>
  );
}

export default NewUserPage;
