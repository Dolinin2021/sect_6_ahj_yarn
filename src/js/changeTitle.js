export default function changeTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => {
    title.addEventListener('click', (e) => {
      e.target.textContent = '';
    });
  });
}
