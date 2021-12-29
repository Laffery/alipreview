export default function timeAgo(time?: number): string {
  if (!time) return "";
  const t = 1e3 * 60;
  const a = new Date().getTime() - 1e3 * time;
  const r = Math.floor(a / t);
  if (r < 1) return "moment ago";
  if (r < 60) return `${r} minutes ago`;
  if (r < 60 * 24) return `${Math.floor(r / 60)} hours ago`;
  if (r < 60 * 24 * 30) return `${Math.floor(r / 1440)} days ago`;
  if (r < 60 * 24 * 30 * 12) return `${Math.floor(r / 43200)} months ago`;
  return "";
}
