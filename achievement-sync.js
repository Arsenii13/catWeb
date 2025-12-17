import { getDatabase, ref, get, set } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

import { PREASSIGNED_ACHIEVEMENTS, calculateAutoAchievements }
  from "./achievements-rules.js";

import { ACHIEVEMENT_SVGS }
  from "./achievements-svg.js";

const db = getDatabase();

/* 🔁 Push predefined achievements to Firebase (run once or safely repeat) */
export async function syncPreassignedAchievements() {
  const achRef = ref(db, "achievements");
  await set(achRef, PREASSIGNED_ACHIEVEMENTS);
}

/* 🎖 Load & display achievements on cards */
export async function loadAchievementsOnCards() {
  const achSnap = await get(ref(db, "achievements"));
  if (!achSnap.exists()) return;

  const achievements = achSnap.val();

  document.querySelectorAll(".card").forEach(card => {
    const achBox = card.querySelector(".ach");
    const rating = card.querySelector(".rating");
    if (!achBox || !rating) return;

    const id = rating.dataset.id;
    achBox.innerHTML = "";

    (achievements[id] || []).forEach(code => {
      if (!ACHIEVEMENT_SVGS[code]) return;

      const span = document.createElement("span");
      span.className = "ach-icon";
      span.innerHTML = ACHIEVEMENT_SVGS[code];
      span.onclick = () =>
        location.href = `achievements.html#${id}`;

      achBox.appendChild(span);
    });
  });
}
