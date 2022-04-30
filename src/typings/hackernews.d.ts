// see https://hackernews.api-docs.io/
interface Story {
  id: number;
  by: string;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  title: string;
  text: string;
  descendants: number; // in the case of stories or polls, the total comment count
  score: number; // The story's score, or the votes if it is a pollopt
  /**
   * @note 一些来自本站点的帖子在响应体中没有url字段，如https://news.ycombinator.com/item?id=30668137
   */
  url?: string; // The URL of the story
  kids?: number[]; // The ids of the item's comments, in ranked display order
  parts?: number[]; // A list of related pollopts, in display order
  time?: number; // creation date of the item, in Unix Time
  deleted?: boolean; // true if the item is deleted
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
