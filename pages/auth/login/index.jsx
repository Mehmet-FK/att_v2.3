import { useEffect, useState } from "react";
import css from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { setSessionExpired, setUser } from "@/redux/slices/settingsSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toastErrorNotify } from "@/helpers/ToastNotify";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    setIsLoading(true);

    const res = await signIn("credentials", {
      username: inputVal.username,
      password: inputVal.password,
      redirect: false,
    });
    if (res.error) {
      toastErrorNotify(res.error);
      setIsLoading(false);

      return;
    }

    const session = await getSession();
    if (session) {
      const { user } = session;
      const credentials = {
        avatar: user?.avatar,
        roles: user?.roles,
        token: user?.token,
        refreshToken: user?.refreshToken,
        ...user.userInfo,
      };

      dispatch(setUser({ user: credentials }));
      router.push("/");
    } else {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setSessionExpired({ isSessionExpired: false }));
  }, []);

  return (
    <>
      <Head>
        <title>Attensam Login</title>
      </Head>
      <div className={css.container}>
        <form className={css.form} onSubmit={(e) => handleSubmit(e)}>
          <img src="/assets/attensam-logo.svg" />
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

          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            type="submit"
            fullWidth
            className={css.submit}
            style={{ color: "#000" }}
          >
            Login
          </LoadingButton>
        </form>
      </div>
    </>
  );
};

export default Login;
