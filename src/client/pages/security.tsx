import HTMLPage from "@/components/html-page";

function Security() {
  return (
    <HTMLPage
      title="Hacker News Security"
      article={
        <>
          <br />
          <br />
          <b>Hacker News Security</b>
          <p>
            If you find a security hole, please let us know at{" "}
            <a href="mailto:security@ycombinator.com">
              security@ycombinator.com
            </a>
            . We try to respond (with fixes!) as soon as possible, and really
            appreciate the help.
          </p>

          <p>
            Thanks to the following people who have discovered and responsibly
            disclosed security holes in Hacker News:
          </p>

          <p>
            <b>
              2021-07-04: <a href="https://twitter.com/ryotkak">RyotaK</a>
            </b>
          </p>
          <ul>
            <li>
              URL tricks could display the wrong domain for some websites.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2021-06-07:{" "}
              <a href="https://news.ycombinator.com/user?id=atamyrat">
                Atamyrat Hezretgulyyev
              </a>
            </b>
          </p>
          <ul>
            <li>A CSRF logout was still possible in some cases.</li>
          </ul>
          <p></p>

          <p>
            <b>
              2021-02-14: <a href="https://Kyht.com">Michael Brooks</a>
            </b>
          </p>
          <ul>
            <li>
              Set the SameSite cookie attribute for better CSRF protection.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2017-04-30:{" "}
              <a href="http://www.michaelflaxman.com">Michael Flaxman</a>
            </b>
          </p>
          <ul>
            <li>
              The minor version of bcrypt used for passwords was susceptible to
              a collision in some cases.
            </li>
          </ul>
          <p></p>

          <p>
            <b>2017-04-14: Blake Rand</b>
          </p>
          <ul>
            <li>
              Links in comments were vulnerable to an IDN homograph attack.
            </li>
          </ul>
          <p></p>

          <p>
            <b>2017-03-15: Blake Rand</b>
          </p>
          <ul>
            <li>
              The right-to-left override character could be used to obscure link
              text in comments.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2017-03-01:{" "}
              <a href="https://twitter.com/_iamjk">Jaikishan Tulswani</a>
            </b>
          </p>
          <ul>
            <li>{"Logged-in users could bypass 'old password' form field."}</li>
          </ul>
          <p></p>

          <p>
            <b>
              2016-02-17: <a href="http://www.tjosse.me">Eric Tjossem</a>
            </b>
          </p>
          <ul>
            <li>Logout and login were vulnerable to CSRF.</li>
          </ul>
          <p></p>

          <p>
            <b>
              2016-01-13:{" "}
              <a href="https://twitter.com/merttasci_">Mert Taşçi</a>
            </b>
          </p>
          <ul>
            <li>
              {"The 'forgot password' link was vulnerable to reflected XSS."}
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2015-09-07: <a href="http://www.s4ndeep.com">Sandeep Singh</a>
            </b>
          </p>
          <ul>
            <li>
              An open redirect was possible by passing a URL with a mixed-case
              protocol as the <em>goto</em> parameter.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2015-09-04:{" "}
              <a href="http://twitter.com/umenmactech">Manish Bhattacharya</a>
            </b>
          </p>
          <ul>
            <li>
              The site name display for stories was vulnerable to an{" "}
              <a href="https://en.wikipedia.org/wiki/IDN_homograph_attack">
                IDN homograph attack.
              </a>
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2015-08-27:{" "}
              <a href="http://twitter.com/chrismarlow9">Chris Marlow</a>
            </b>
          </p>
          <ul>
            <li>
              {"Revisions to HN's markup caused an HTML injection regression."}
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2015-06-24:{" "}
              <a href="http://stephensclafani.com">Stephen Sclafani</a>
            </b>
          </p>
          <ul>
            <li>
              A form handling bug led to a XSS vulnerability using{" "}
              <a href="http://www.slideshare.net/Wisec/http-parameter-pollution-a-new-category-of-web-attacks">
                HTTP parameter polution
              </a>
              .
            </li>
          </ul>
          <p></p>

          <p>
            <b>2015-03-02: Max Bond</b>
          </p>
          <ul>
            <li>
              Information leaked during /r processing allowed an attacker to
              discover valid profile edit links and the user for which they were
              valid.
            </li>
            <li>
              <em>goto</em> parameters functioned as open redirects.
            </li>
          </ul>
          <p></p>

          <p>
            <b>2014-11-01: Ovidiu Toader</b>
          </p>
          <ul>
            <li>
              {`In rare cases some users' profiles (including email addresses and
              password hashes) were mistakenly published to the Firebase API.
              More `}
              <a href="https://news.ycombinator.com/item?id=8604586">here</a>.
            </li>
          </ul>
          <p></p>

          <p>
            <b>2014-10-27: San Tran</b>
          </p>
          <ul>
            <li>
              Some pages displaying forms were vulnerable to reflected XSS when
              provided malformed query string arguments.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2014-05-01: <a href="https://titanous.com">Jonathan Rudenberg</a>
            </b>
          </p>
          <ul>
            <li>Some YC internal pages were vulnerable to persistent XSS.</li>
          </ul>
          <p></p>

          <p>
            <b>
              2012-08-01: <a href="http://louislang.com/">Louis Lang</a>
            </b>
          </p>
          <ul>
            <li>
              Redirects were vulnerable to HTTP response splitting via the{" "}
              <em>whence</em> argument.
            </li>
            <li>
              Persistent XSS could be achieved via the <em>X-Forwarded-For</em>{" "}
              header.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              {"2012-07-20: "}
              <a href="http://www.tinfoilsecurity.com">Michael Borohovski</a>
            </b>
          </p>
          <ul>
            <li>
              Incorrect handling of unauthenticated requests meant anyone could
              change rsvp status for Demo Day.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2010-01-12: <a href="https://twitter.com/zainy">Zain Memon</a>
            </b>
          </p>
          <ul>
            <li>
              Someone creating a new account could sometimes take an existing
              username.
            </li>
          </ul>
          <p></p>

          <p>
            <b>
              2009-06-03:{" "}
              <a href="https://www.dfranke.us/">Daniel Fox Franke</a>
            </b>
          </p>
          <ul>
            <li>
              The state of the PRNG used to generate cookies could be determined
              from observed outputs. This allowed an attacker to fairly easily
              determine valid user cookies and compromise accounts. More{" "}
              <a href="https://news.ycombinator.com/item?id=639976">here</a>.
            </li>
          </ul>
          <p></p>

          <p>
            <b>Missing From This List?</b>
            {`If you reported a vulnerability to us and don't see your name,
            please shoot us an email and we'll happily add you. We crawled
            through tons of emails trying to find all reports but inevitably
            missed some.`}
          </p>
        </>
      }
    />
  );
}

export default Security;
