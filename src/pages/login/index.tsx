import { useMemo, useState } from "react";
import { login, register } from "apis";
import type { Account } from "hackernews";
import { relRootPath, Status } from "utils";
import { useLocation, useNavigate } from "react-router-dom";
import query from "query-string";
import AccountForm from "./form";
import "./index.css";

/**
 * @param message 顶部信息提示文案
 * @param goto 登录成功重定向地址
 */
function Login(props: { message?: string; goto?: string }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const goto = useMemo(() => {
    if (props.goto) return props.goto;
    return (query.parse(search) as Record<string, string>)["goto"] ?? "/";
  }, []);
  const [message, setMessage] = useState(props.message ?? "");

  function handleResponse(msg: string) {
    if (msg !== Status.Success) {
      return setMessage(msg);
    }

    navigate(relRootPath(goto), { replace: true });
  }

  function handleLogin(form: Account) {
    login(form).subscribe({ next: handleResponse });
  }

  function handleRegister(form: Account) {
    register(form).subscribe({ next: handleResponse });
  }

  return (
    <div className="login">
      {message !== "" && (
        <>
          {message}
          <br />
          <br />
        </>
      )}

      <AccountForm title="Login" submitText="login" onSubmit={handleLogin} />
      <br />
      <a href="forgot">Forget your password?</a>
      <br />
      <br />
      <AccountForm
        title="Create Account"
        submitText="create account"
        onSubmit={handleRegister}
      />
    </div>
  );
}

export default Login;
