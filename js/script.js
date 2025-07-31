// 스티키스크롤
const sections = document.querySelectorAll('.sticky_content_section');
const images = document.querySelectorAll('.sticky-image img');

window.addEventListener('scroll', () => {
    let currentIndex = 0;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
            currentIndex = index;
        }
    });

    images.forEach((img) => {
        img.classList.remove('active');
        if (parseInt(img.dataset.index) === currentIndex) {
            img.classList.add('active');
        }
    });
});


const content = document.getElementsByClassName("fade_content");
window.addEventListener("scroll", () => {
    const winH = window.innerHeight;
    for (let i = 0; i < content.length; i++) {
        const contnenTop = content[i].getBoundingClientRect().top;
        if (contnenTop - winH < 0) {
            content[i].classList.add("in");
        } else {
            content[i].classList.remove("in");
        }
    };
});