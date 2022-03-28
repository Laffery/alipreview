import "./index.css";

function Forgot() {
  return (
    <div className="login">
      <b>Reset your password</b>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td className="label">username:</td>
            <td>
              <input type="text" size={20} />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="Send reset Email" />
    </div>
  );
}

export default Forgot;
