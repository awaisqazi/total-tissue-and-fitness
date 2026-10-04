// Gallery lightbox on a native <dialog>. Without JavaScript the links still open the image.
const dialog = document.querySelector<HTMLDialogElement>('#lightbox');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
if (dialog && links.length && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector<HTMLImageElement>('img')!;
  const counter = dialog.querySelector<HTMLElement>('.lightbox-counter')!;
  let current = 0;
  let opener: HTMLElement | null = null;

  const show = (index: number) => {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt ?? '';
    counter.textContent = `${current + 1} / ${links.length}`;
  };

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
    });
  });
  dialog.querySelector('.lightbox-prev')?.addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lightbox-next')?.addEventListener('click', () => show(current + 1));
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  // A click on the backdrop (outside the figure) closes; Escape is handled by the browser.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
}
