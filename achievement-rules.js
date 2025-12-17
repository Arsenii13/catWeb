export const PREASSIGNED_ACHIEVEMENTS = {
  "mini-lapa": ["milk-lover", "mischief"],
  "elizabeth": ["popular"],
  "black": ["popular"],
  "martha": ["legend", "popular"],
  "timothy": ["popular"]
};

/*
 AUTO RULES:
 ratings = { total, votes }
 meta = optional future data
*/
export function calculateAutoAchievements(id, ratings) {
  const list = [];

  if (!ratings) return list;

  if (ratings.votes >= 20) list.push("popular");
  if (ratings.votes >= 50 && ratings.total / ratings.votes >= 4.6)
    list.push("legend");

  return list;
}
