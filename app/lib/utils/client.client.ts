export function toggleSidebar(force?: boolean) {
  const sidebar = document.querySelector(".responsive-sidebar");
  const clickable = document.querySelector(".sidebar-clickable");

  if (!sidebar) {
    // eslint-disable-next-line quotes
    return console.error('Could not locate "responsive-sidebar"!');
  }

  clickable?.classList.toggle("active");
  sidebar.classList.toggle("active", force);
}
