import data from "./resume.json";

export type Resume = typeof data;
export const resume = data;

export const stats = [
  { label: "Publications", value: 4, suffix: "" },
  { label: "Subject Distinctions", value: 6, suffix: "" },
  { label: "Gold Medal", value: 1, suffix: "x" },
  { label: "Languages", value: data.languages.length, suffix: "" },
];

export const PROFILE_IMG = "/mahek-graduation.jpeg";
export const HEADSHOT_IMG = "/mahek-headshot.jpg";
export const INSTAGRAM_HANDLE = "smilewithdrmahek";
export const INSTAGRAM_URL = "https://www.instagram.com/smilewithdrmahek/";
export const INSTAGRAM_FOLLOWERS = 5879;
export const INSTAGRAM_POSTS = 70;
export const INSTAGRAM_FOLLOWING = 1677;
export const INSTAGRAM_BIO = "Skincare • Smile care • Beauty tips";
export const INSTAGRAM_HIGHLIGHTS = [
  { label: "Residency", emoji: "👩🏻‍⚕️" },
  { label: "Pr/Collabs", emoji: "🌻" },
  { label: "UG", emoji: "🎓" },
  { label: "Indonesia", emoji: "🇮🇩" },
  { label: "Thailand", emoji: "🇹🇭" },
];
