// Background hero loop: honors reduced motion and Save-Data, and always offers a visible pause control.
const video = document.querySelector<HTMLVideoElement>('.hero-video');
const toggle = document.querySelector<HTMLButtonElement>('.hero-video-toggle');
if (video && toggle) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  const render = (playing: boolean) => {
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.querySelector('.toggle-icon')!.textContent = playing ? '❚❚' : '▶';
    toggle.querySelector('.toggle-label')!.textContent = playing ? 'Pause video' : 'Play video';
  };
  const stop = () => {
    video.pause();
    video.removeAttribute('autoplay');
    render(false);
  };
  if (reduced || saveData) stop();
  else
    video
      .play()
      .then(() => render(true))
      .catch(stop);
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    if (video.paused)
      video
        .play()
        .then(() => render(true))
        .catch(stop);
    else stop();
  });
}
