import { useState } from "react";
// import css from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { setUser } from "@/redux/slices/settingsSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toastErrorNotify } from "@/helpers/ToastNotify";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { error, errorMsg } = useSelector((state) => state.attensam);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(fetchStart());
    setIsLoading(true);

    const res = await signIn("credentials", {
      username: inputVal.username,
      password: inputVal.password,
      redirect: false,
    });
    if (res.error) {
      toastErrorNotify(res.error);
      setIsLoading(false);
      // const errorMessage =
      //   res.status === 401
      //     ? "Anmeldedaten sind nicht korrekt!"
      //     : "Etwas ist schiefgelaufen!";
      // dispatch(fetchFail({ message: `${res.status} ${errorMessage}` }));
      // dispatch(stopLoading());
      return;
    }

    // dispatch(stopLoading());
    const session = await getSession();
    if (session) {
      const { user } = session;
      const credentials = {
        avatarUrl: user.avatar,
        roles: user.roles,
        token: user.token,
        ...user.userInfo,
      };
      dispatch(setUser({ user: credentials }));
      router.push("/");
    } else {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Attensam Login</title>
      </Head>
      {/* {error && <ErrorModal error={errorMsg} />} */}
      <div className={"log_container"}>
        <form className={"log_form"} onSubmit={(e) => handleSubmit(e)}>
          <img src="/assets/attensam-logo.svg" />
          {/* <h2>Login</h2> */}
          <input
            className={"log_inputAll"}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Benutzername"
            required
          />

          <div className={"log_password_wrapper"}>
            <input
              className={"log_inputAll"}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <VisibilityIcon
              onClick={togglePassword}
              fontSize="small"
              sx={{ color: "#000" }}
              className={"log_show_btn"}
            />
            <span
              className={`log_cross_line ${
                showPassword && "log_cross_line_active"
              } `}
            ></span>
          </div>

          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            type="submit"
            fullWidth
            // startIcon={<SaveIcon />}
            className={"log_submit"}
            style={{ color: "#000" }}
          >
            Login
          </LoadingButton>
          {/* <input
            className={`${css.inputAll} ${css.submit}`}
            type="submit"
            value="Login"
          /> */}
        </form>
      </div>
    </>
  );
};

export default Login;
