// The only thing the site stores in the browser. The Cookie Policy lists this
// key, so it is defined once here for both the app and the policy.
export const PROGRAMME_STORAGE_KEY = "programmeIds";

// Programme saved from a previous visit; storage can be unavailable or hold bad data.
export function loadProgramme() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRAMME_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveProgramme(programmeIds) {
  try {
    localStorage.setItem(PROGRAMME_STORAGE_KEY, JSON.stringify(programmeIds));
  } catch {
    // Storage unavailable (e.g. private browsing); the programme just won't persist.
  }
}
