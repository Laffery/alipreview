import { useMemo, useState } from "react";
import { login, register } from "@/apis/index";
import { relRootPath, Status } from "@/utils";
import query from "query-string";
import LoginForm from "@/components/login-form";

/**
 * @param message 顶部信息提示文案
 * @param goto 登录成功重定向地址
 */
function Login(props: { message?: string; goto?: string }) {
  const goto = useMemo(() => {
    if (props.goto) return props.goto;
    const { search } = window.location;
    return (query.parse(search) as Record<string, string>)["goto"] ?? "/";
  }, []);

  const [message, setMessage] = useState(props.message ?? "");

  function handleResponse(msg: string) {
    if (msg !== Status.Success) return setMessage(msg);
    window.location.replace(relRootPath(goto));
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

      <LoginForm title="Login" submitText="login" onSubmit={handleLogin} />
      <br />
      <a href="forgot">Forget your password?</a>
      <br />
      <br />
      <LoginForm
        title="Create Account"
        submitText="create account"
        onSubmit={handleRegister}
      />
    </div>
  );
}

export default Login;
