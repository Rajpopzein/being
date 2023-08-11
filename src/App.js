import "./App.css";
import resimg from "./resource/login_bg2.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userdatass } from "./redux/slice/userslice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
      navigate('/Dashboard')
    }
  },[])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userdata, setData] = useState({
    mobile_no: "",
    password: "",
  });

  const [responce, setResponce] = useState();

  const handleusername = (e) => {
    const uname = { ...userdata, mobile_no: e.target.value };
    setData(uname);
  };

  const handlepassword = (e) => {
    const upassword = { ...userdata, password: e.target.value };
    setData(upassword);
  };

  const signindata = async (cred) => {
    console.log("cred", cred);
    const dds = null
    const responce = await axios
      .post("https://demo.emeetify.com:81/pet/users/login", cred)
      .then((dd) => {
        dispatch(userdatass(dd?.data?.data));
        console.log("dd",dd)
        if (dd?.data?.token) {
          localStorage.setItem("token", dd?.data?.token);
        }
      });

    console.log(responce);
    if (responce) {
      setResponce(true);
    }

    if (localStorage.getItem("token")) {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
  };

  // const reddata = useSelector((state) => state.userdetails)


  const handlesubmit = (e) => {
    e.preventDefault();
    signindata(userdata);
  };

  useEffect(() => {}, [userdata, responce]);

  return (
    <main className="loginMain">
      <div class="card mainCard">
        <div class="row cardrow">
          <div class="col formCol">
            <h3>Hello There!</h3>
            <p className="para">
              Welcome back dear friends! Please login and enjoy our services.
            </p>
            <div className="Form">
              <form onSubmit={handlesubmit}>
                <label for="username">User Name</label>
                <input
                  type="text"
                  name="username"
                  className="username"
                  onChange={handleusername}
                />
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="password"
                  onChange={handlepassword}
                />
                <div className="rememberme">
                  <input className="check" type="checkbox" />
                  <p>Remember Me</p>
                </div>
                <input
                  type="submit"
                  name="login"
                  className="lgn-btn"
                  value="LOGIN"
                />
                <a href="*" className="link">
                  Forgot password?
                </a>
              </form>
            </div>
          </div>
          <div class="col column2">
            <h3 className="petsale">
              <span>Pet</span> Sales
            </h3>
            <img src={resimg} className="sideImage" alt="dogimg" />
            <p className="bottom-txt-img">
              Welcome back dear friends! Please login and enjoy our services.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
