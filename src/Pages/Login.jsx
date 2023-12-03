import loginImg from "../assets/Images/login.webp"
// import Template from "../components/core/Auth/Template"
import Template from "../components/cors/Auth/Template"
import Loading from "./Loading"
import {useSelector} from 'react-redux'

function Login() {

  // const {loading} = useSelector((state)=> state.auth);
    const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      {
        loading ? (<Loading/>) : (
          <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
        )
      }
    </div>
  )
}

export default Login