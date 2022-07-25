import Layout from "@/components/layout";
import { useAuth } from "@/hooks";
import Login from "./login";
import "./index.css";

function Submit() {
  const [user] = useAuth();
  if (!user) return <Login message="You have to be logged in to submit." />;
  return (
    <div className="App">
      <Layout header="Submit" footer={false}>
        <section id="submit">
          <table>
            <tbody>
              <tr>
                <td>title</td>
                <td>
                  <input type="text" size={50} />
                </td>
              </tr>
              <tr>
                <td>url</td>
                <td>
                  <input type="url" size={50} />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <b>or</b>
                </td>
              </tr>
              <tr>
                <td>text</td>
                <td>
                  <textarea rows={4} cols={49} />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="submit" />
                  <br />
                  <br />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  Leave url blank to submit a question for discussion. If there
                  is no url, the text (if any) will appear at the top of the
                  thread.
                  <br />
                  <br />
                  You can also submit via&nbsp;
                  <a id="link" href="bookmarklet.html">
                    bookmarklet
                  </a>
                  <br />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </Layout>
    </div>
  );
}

export default Submit;
