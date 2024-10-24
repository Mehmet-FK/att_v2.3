import { useState } from "react";
import css from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { setUser } from "@/redux/slices/settingsSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toastErrorNotify } from "@/helpers/ToastNotify";
import ErrorModal from "@/components/ui-components/ErrorModal";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { error, errorMsg } = useSelector((state) => state.attensam);

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

    const res = await signIn("credentials", {
      username: inputVal.username,
      password: inputVal.password,
      redirect: false,
    });
    if (res.error) {
      console.log(res);
      toastErrorNotify(res.error);
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
    }
  };

  return (
    <>
      <Head>
        <title>Attensam Login</title>
      </Head>
      {/* {error && <ErrorModal error={errorMsg} />} */}
      <div className={css.container}>
        <form className={css.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Login</h2>
          <input
            className={css.inputAll}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Benutzername"
            required
          />

          <div className={css.password_wrapper}>
            <input
              className={css.inputAll}
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
              className={css.show_btn}
            />
            <span
              className={`${css.cross_line} ${
                showPassword && css.cross_line_active
              } `}
            ></span>
          </div>

          <input
            className={`${css.inputAll} ${css.submit}`}
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
