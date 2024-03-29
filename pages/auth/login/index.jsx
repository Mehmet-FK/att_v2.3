import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import Head from "next/head";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchStart());

    try {
      const res = await signIn("credentials", {
        username: inputVal.username,
        password: inputVal.password,
        redirect: false,
      });
      console.log(res);
    } catch (error) {
      console.log("CREDENTIALS ERROR=>", JSON.stringify(...error));
    } finally {
      dispatch(stopLoading());
      const session = await getSession();
      if (session?.user?.token) {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Attensam Login</title>
      </Head>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Login</h2>
          <input
            className={styles.inputAll}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Benutzername"
            required
          />
          <input
            className={styles.inputAll}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className={`${styles.inputAll} ${styles.submit}`}
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
