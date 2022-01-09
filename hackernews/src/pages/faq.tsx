import HTMLPage from "components/html-page";

function FAQ() {
  return (
    <HTMLPage
      article={
        <>
          <br />
          <br />
          <b>Hacker News FAQ</b>
          <br />
          <br />
          <b>Are there rules about submissions and comments?</b>
          <p>
            <a href="newsguidelines.html">
              https://news.ycombinator.com/newsguidelines.html
            </a>
          </p>
          <p>
            <b>How are stories ranked?</b>
          </p>
          <p>
            {`The basic algorithm divides points by a power of the time since a
            story was submitted. Comments in threads are ranked the same way.`}
          </p>
          <p>
            {`Other factors affecting rank include user flags, anti-abuse
            software, software which demotes overheated discussions, account or
            site weighting, and moderator action.`}
          </p>
          <p>
            <b>{"How is a user's karma calculated?"}</b>
          </p>
          <p>
            {`Roughly, the number of upvotes on their posts minus the number of
            downvotes. These don't match up exactly. Some votes are dropped by
            anti-abuse software.`}
          </p>
          <p>
            <b>Do posts by users with more karma rank higher?</b>
          </p>
          <p>No.</p>
          <p>
            <b>{"Why don't I see down arrows?"}</b>
          </p>
          <p>
            {`There are no down arrows on stories. They appear on comments after
            users reach a certain karma threshold, but never on direct replies.`}
          </p>
          <p>
            <b>What kind of formatting can you use in comments?</b>
          </p>
          <p>
            <a href="formatdoc">http://news.ycombinator.com/formatdoc</a>
          </p>
          <p>
            <b>How do I submit a question?</b>
          </p>
          <p>
            Use the submit link in the top bar, and leave the url field blank.
          </p>
          <p>
            <b>How do I submit a poll?</b>
          </p>
          <p>
            <a href="newpoll">http://news.ycombinator.com/newpoll</a>
          </p>
          <p>
            <b>How do I make a link in a text submission?</b>
          </p>
          <p>
            {`You can't. This is to prevent people from submitting a link with
            their comments in a privileged position at the top of the page. If
            you want to submit a link with comments, just submit it, then add a
            regular comment.`}
          </p>
          <p>
            <b>What are Ask HN and Show HN?</b>
          </p>
          <p>
            <a href="ask">Ask HN</a>
            {" lists questions and other text submissions."}
            <a href="show">Show HN</a>
            {` is for sharing your personal work and has
            special `}
            <a href="showhn.html">rules</a>.
          </p>
          <p>
            <b>{"Why hasn't my submission appeared on Ask HN or Show HN?"}</b>
          </p>
          <p>
            {"All Ask HNs appear on "}
            <a href="newest">newest</a>
            {" and "}
            <a href="asknew">asknew</a>
            {", and all Show HNs on "}
            <a href="newest">newest</a> and <a href="shownew">shownew</a>
            {`, but
            there is a small points threshold before a post makes it to `}
            <a href="ask">ask</a> or <a href="show">show</a>.
          </p>
          <p>
            <b>What do green usernames mean?</b>
          </p>
          <p>Green indicates a new account.</p>
          <p>
            <b>Why are some comments faded?</b>
          </p>
          <p>
            {`Faded text means that a comment has been downvoted. You can read the
            comment in normal text by clicking on its timestamp to go to its
            page.`}
          </p>
          <p>
            <b id="flag">What does [flagged] mean?</b>
          </p>
          <p>
            {"Users flagged the post as breaking the "}
            <a href="newsguidelines.html">guidelines</a>
            {" or otherwise not belonging on HN."}
          </p>
          <p>
            {`Moderators sometimes also add [flagged] (though not usually on
            submissions), and sometimes turn flags off when they are unfair.`}
          </p>
          <p>
            <b id="cflag">How do I flag a comment?</b>
          </p>
          <p>
            {`Click on its timestamp to go to its page, then click the 'flag' link
            at the top. There's a small karma threshold before flag links
            appear.`}
          </p>
          <p>
            <b id="dead">What does [dead] mean?</b>
          </p>
          <p>The post was killed by software, user flags, or moderators.</p>
          <p>
            {`Dead posts aren't displayed by default, but you can see them all by
            turning on 'showdead' in your profile.`}
          </p>
          <p id="cvouch">
            {`If you see a [dead] post that shouldn't be dead, you can vouch for
            it. Click on its timestamp to go to its page, then click 'vouch' at
            the top. When enough users do this, the post is restored. There's a
            small karma threshold before vouch links appear.`}
          </p>
          <p>
            <b id="deleted">What does [deleted] mean?</b>
          </p>
          <p>
            {"The author deleted the post outright, or asked us to. Unlike "}
            <a href="#dead">dead</a>
            {` posts, these remain deleted even when
            showdead is turned on.`}
          </p>
          <p>
            <b id="reposts">Are reposts ok?</b>
          </p>
          <p>
            {`If a story has not had significant attention in the last year or so,
            a small number of reposts is ok. Otherwise we bury reposts as
            duplicates.`}
          </p>
          <p>
            {`Please don't delete and repost the same story. Deletion is for
            things that shouldn't have been submitted in the first place.`}
          </p>
          <p>
            <b>Are paywalls ok?</b>
          </p>
          <p>
            {`It's ok to post stories from sites with paywalls that have
            workarounds.`}
          </p>
          <p>
            {`In comments, it's ok to ask how to read an article and to help other
            users do so. But please don't post complaints about paywalls. Those
            are `}
            <a href="item?id=10178989">off topic</a>
            {". More "}
            <a href="https://hn.algolia.com/?query=paywalls%20by:dang&amp;dateRange=all&amp;page=0&amp;prefix=false&amp;sort=byDate&amp;type=comment">
              here
            </a>
            .
          </p>
          <p>
            <b id="ring">Can I ask people to upvote my submission?</b>
          </p>
          <p>
            {`No. Users should vote for a story because they personally find it
            intellectually interesting, not because someone has content to
            promote. We penalize or ban submissions, accounts, and sites that
            break this rule, so please don't.`}
          </p>
          <p>
            <b>Can I ask people to comment on my submission?</b>
          </p>
          <p>
            {`No, for the same reason. It's also not in your interest: HN readers
            are sensitive to this and will detect it, flag it, and use unkind
            words like 'spam'.`}
          </p>
          <p>
            <b>Can I post a job ad?</b>
          </p>
          <p>{"Please don't post job ads as submissions to HN."}</p>
          <p>
            {`A regular "Who Is Hiring?" thread appears on the first weekday of
            each month (or Jan 2). Most job ads are welcome there. Only an
            account called`}
            <a href="submitted?id=whoishiring">whoishiring</a>
            {` is allowed to
            submit the thread itself. This prevents a race to post it first.`}
          </p>
          <p id="jobads">
            {`Another kind of job ad is reserved for YC-funded startups. These
            appear on the front page, but are not stories: they have no vote
            arrows, points, or comments. They begin part-way down and fall
            steadily. Only one is on the front page at a time. The rest are
            listed at `}
            <a href="jobs">jobs</a>.
          </p>
          <p>
            <b id="yc">{"What's the relationship between YC and HN?"}</b>
          </p>
          <p>
            <a href="https://ycombinator.com">Y Combinator</a>
            {` owns and funds
            HN. The HN team is `}
            <a href="https://venturebeat.com/2015/09/29/y-combinator-spins-out-hacker-news-to-give-it-full-editorial-independence/">
              editorially
            </a>{" "}
            <a href="https://blog.ycombinator.com/two-hn-announcements/">
              independent
            </a>
            .
          </p>
          <p>
            {"HN gives three features to YC: job ads (see "}
            <a href="#jobads">above</a>
            {") and startup "}
            <a href="launches">launches</a>
            {`get placed on the front page, and YC founder names are displayed to
            other YC alumni in orange.`}
          </p>
          <p>
            <b>Are negative stories about YC suppressed on HN?</b>
          </p>
          <p>
            {"No, we moderate "}
            <a href="https://hn.algolia.com/?query=moderate%20less%20not%20more%20yc%20by:dang&amp;dateRange=all&amp;page=0&amp;prefix=false&amp;sort=byDate&amp;type=comment">
              less, not more
            </a>
            {`, when YC or a YC startup is the topic. The good will of the
            community is worth more than any story.`}
          </p>
          <p>
            <b>{"Why can't I post a comment to a thread?"}</b>
          </p>
          <p>
            {`Threads are closed to new comments after two weeks, or if the
            submission has been killed by software, moderators, or user flags.`}
          </p>
          <p>
            <b>
              {`Why is A ranked below B even though A has more points and is
              newer?`}
            </b>
          </p>
          <p>
            {`You can't derive rank from votes and time alone. See "How are
            stories ranked?" above.`}
          </p>
          <p>
            <b>In my profile, what is delay?</b>
          </p>
          <p>
            {`It gives you time to edit your comments before they appear to
            others. Set it to the number of minutes you'd like. The maximum is
            10.`}
          </p>
          <p>
            <b>In my profile, what is noprocrast?</b>
          </p>
          <p>
            {`It's a way to help you prevent yourself from spending too much time
            on HN. If you turn it on you'll only be allowed to visit the site
            for maxvisit minutes at a time, with gaps of minaway minutes in
            between. The defaults are 20 and 180, which would let you view the
            site for 20 minutes at a time, and then not allow you back in for 3
            hours.`}
          </p>
          <p>
            <b>How do I reset my password?</b>
          </p>
          <p>
            {"If you have an email address in your profile, you can do that "}
            <a href="https://news.ycombinator.com/forgot?id=">here</a>
            {`. If you
            haven't, email hn@ycombinator.com for help.`}
          </p>
          <p>
            <b>Can I change my username?</b>
          </p>
          <p>{"Yes. Email hn@ycombinator.com and we'll help."}</p>
          <p>
            <b>Can I delete my account?</b>
          </p>
          <p>
            {`We try not to delete entire account histories because that would gut
            the threads the account had participated in. However, we care about
            protecting individual users and take care of privacy requests every
            day, so if we can help, please email hn@ycombinator.com. We don't
            want anyone to get in trouble from anything they posted to HN. More `}
            <a href="item?id=23623799">here</a>.
          </p>
          <p>
            <b>My IP address seems to be banned. How can I unban it?</b>
          </p>
          <p>
            {`If you request many pages too quickly, your IP address might get
            banned. This `}
            <a href="https://news.ycombinator.com/item?id=4761102">
              self-serve unbanning procedure
            </a>{" "}
            works most of the time. If not, email hn@ycombinator.com.
          </p>
          <br />
          <br />
          <br />
        </>
      }
    />
  );
}

export default FAQ;
