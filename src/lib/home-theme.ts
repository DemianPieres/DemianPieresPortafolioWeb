export const HOME_THEME_KEY = "demian-home-theme";
const themeEvent = "home-theme-change";
export type HomeTheme = "light" | "dark";

// Se ejecuta antes de pintar: la preferencia no produce un flash de tema claro.
export const homeThemeScript = `(()=>{let theme="light";try{if(localStorage.getItem("${HOME_THEME_KEY}")==="dark")theme="dark"}catch{}document.documentElement.dataset.homeTheme=theme})()`;

export function getHomeTheme(): HomeTheme {
  return document.documentElement.dataset.homeTheme === "dark" ? "dark" : "light";
}

export function getServerHomeTheme(): HomeTheme {
  return "light";
}

export function toggleHomeTheme() {
  const next = getHomeTheme() === "dark" ? "light" : "dark";
  const request = new CustomEvent("theme-swap-request", { detail: next, cancelable: true });
  if (window.dispatchEvent(request)) applyHomeTheme(next);
}

export function applyHomeTheme(next: HomeTheme) {
  document.documentElement.dataset.homeTheme = next;
  try { localStorage.setItem(HOME_THEME_KEY, next); } catch { /* Sigue funcionando sin almacenamiento. */ }
  window.dispatchEvent(new Event(themeEvent));
}

export function subscribeHomeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== HOME_THEME_KEY && event.key !== null) return;
    document.documentElement.dataset.homeTheme = event.newValue === "dark" ? "dark" : "light";
    onChange();
  };
  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
