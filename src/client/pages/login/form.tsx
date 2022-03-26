import { useSetState } from "ahooks";
import useEventHandler from "../../hooks/use-event-handler";
import type { Account } from "hackernews";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const AccountForm = (props: {
  title?: string;
  submitText?: string;
  onSubmit?: (payload: Account) => void;
}) => {
  const {
    title = "Account",
    submitText = "submit",
    onSubmit = () => void 0,
  } = props;

  const [form, setForm] = useSetState<Account>({
    username: "",
    password: "",
  });

  const onUsernameChange = useEventHandler<InputChangeEvent>({
    next: (e: InputChangeEvent) => setForm({ username: e.target.value }),
  });
  const onPasswordChange = useEventHandler<InputChangeEvent>({
    next: (e: InputChangeEvent) => setForm({ password: e.target.value }),
  });
  const handleSubmit = () => onSubmit(form);

  return (
    <>
      <b>{title}</b>
      <br />
      <br />
      <form>
        <table>
          <tbody>
            <tr>
              <td className="label">username:</td>
              <td>
                <input
                  onChange={onUsernameChange}
                  type="text"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  size={20}
                />
              </td>
            </tr>
            <tr>
              <td className="label">password:</td>
              <td>
                <input type="password" onChange={onPasswordChange} size={20} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <br />
      <input type="submit" value={submitText} onClick={handleSubmit} />
      <br />
    </>
  );
};

export default AccountForm;
