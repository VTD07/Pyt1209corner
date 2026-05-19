function show_image()
{
    document.getElementById('overlay').style.display='flex';
}
function hide_image()
{
    document.getElementById('overlay').style.display='none';
}
const track   = document.getElementById('track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function getScrollStep() {
    const firstImage = track.querySelector('img');
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return firstImage ? firstImage.getBoundingClientRect().width + gap : 0;
}

function scrollNext() {
    const STEP = getScrollStep();

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: STEP, behavior: 'smooth' });
    }
}

function scrollPrev() {
    const STEP = getScrollStep();

    if (track.scrollLeft <= 0) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: -STEP, behavior: 'smooth' });
    }
}

if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', scrollNext);
    prevBtn.addEventListener('click', scrollPrev);

    let timer = setInterval(scrollNext, 3000);
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => { timer = setInterval(scrollNext, 3000); });
}
