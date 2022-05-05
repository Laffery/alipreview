// see https://hackernews.api-docs.io/
interface HackerNewsItemBase {
  /** The item's unique id. */
  id: number;
  /** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  /** `true` if the item is deleted. */
  deleted?: boolean;
  /** The username of the item's author. */
  by?: string;
  /** Creation time of the item, in Unix Time. */
  time?: number;
  /** `true` if the item is dead. */
  dead?: boolean;
  /** The ids of the item's comments, in ranked display order. */
  kids?: number[];
}

interface Story extends HackerNewsItemBase {
  /** in the case of stories or polls, the total comment count */
  descendants?: number;
  /** The story's score */
  score?: number;
  /** The title of the story. */
  title?: string;
  /**
   * The URL of the story
   * @default http://stoplight.io/prism/
   */
  url?: string;
}

interface Job extends HackerNewsItemBase {
  /** The job text. HTML */
  text?: string;
  /** The URL of the story */
  url?: string;
  /** The title of the story, poll or job */
  title?: string;
}

interface Poll extends HackerNewsItemBase {
  /** in the case of stories or polls, the total comment count */
  descendants?: number;
  /** The story's score */
  score?: number;
  /** The title of the story, poll, or job. */
  title?: string;
  /** The poll text. HTML */
  text?: string;
}

interface PollOpt extends HackerNewsItemBase {
  /** The item's parent, the relevant poll. */
  parent?: number;
  /** The story's votes */
  score?: number;
}

interface Comment extends HackerNewsItemBase {
  /** The item's parent, either another comment or the relevant story. */
  parent?: number;
  /** The comment text. HTML. */
  text?: string;
}

interface Account {
  username: string;
  password: string;
}

interface User {
  /** The user's unique username. Case-sensitive. */
  id: string;
  /** Creation date of the user, in Unix Time. */
  created: number;
  /** The user's karma. */
  karma: number;
  /** The user's optional self-description. HTML. */
  about?: string;
  /** List of the user's stories, polls and comments. */
  submitted?: number[];
  /** Delay in minutes between a comment's creation and its visibility to other users. */
  delay?: number;
}
