import { useNavigate } from "react-router-dom";

import SignInForm from "../components/users/SignInForm";

// SignInPage makes the signup form and page on the client side
function SignInPage() {
  const navigate = useNavigate();

  function SignInHandler(signInData) {
    navigate("/", { replace: true });
  }

  return (
    <section>
      <h1 style={{color: "yellow"}}>Sign In</h1>
      <SignInForm SingInUser={SignInHandler} />
    </section>
  );
}

export default SignInPage;
