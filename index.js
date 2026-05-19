function show_image()
{
    document.getElementById('overlay').style.display='flex';
}
function hide_image()
{
    document.getElementById('overlay').style.display='none';
}

const bgMusic = document.getElementById('bg-music');

if (bgMusic) {
    const startMusic = () => {
        bgMusic.play().then(() => {
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
            document.removeEventListener('keydown', startMusic);
        }).catch(() => {});
    };

    window.addEventListener('load', startMusic);
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('keydown', startMusic);
}

const track   = document.getElementById('track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (track && nextBtn && prevBtn) {
    nextBtn.setAttribute('hidden', '');
    prevBtn.setAttribute('hidden', '');

    const originalItems = Array.from(track.children);
    originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    const speed = 32;

    function setGalleryLoop() {
        const firstItem = track.children[0];
        const firstClone = track.children[originalItems.length];
        const loopWidth = firstItem && firstClone ? firstClone.offsetLeft - firstItem.offsetLeft : 0;

        if (loopWidth > 0) {
            track.style.setProperty('--gallery-loop-distance', `${loopWidth}px`);
            track.style.setProperty('--gallery-loop-duration', `${loopWidth / speed}s`);
            track.classList.add('is-looping');
        }
    }

    window.addEventListener('load', setGalleryLoop);
    window.addEventListener('resize', setGalleryLoop);
    setGalleryLoop();
}
