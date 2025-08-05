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


// 캐러셀 슬라이드

const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.dots');

        // 복제 슬라이드 추가
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, track.firstChild);

        let allSlides = Array.from(track.children);
        let currentIndex = 1;
        let slideWidth = slides[0].getBoundingClientRect().width + 20; // gap 포함
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        // 도트 생성
        const realSlideCount = slides.length;
        let dots = [];
        for (let i = 0; i < realSlideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index % realSlideCount].classList.add('active');
        }

        function updateSlideStyles() {
            allSlides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.remove('dimmed');
                } else {
                    slide.classList.add('dimmed');
                }
            });
        }

        function moveToSlide(index) {
            track.style.transition = "transform 0.5s ease-in-out";
            track.style.transform = `translateX(-${slideWidth * index}px)`;
            currentIndex = index;
            updateDots(index - 1);
            updateSlideStyles();
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex >= allSlides.length - 1) return;
            moveToSlide(currentIndex + 1);
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex <= 0) return;
            moveToSlide(currentIndex - 1);
            resetAutoSlide();
        });

        track.addEventListener('transitionend', () => {
            if (allSlides[currentIndex].isSameNode(firstClone)) {
                track.style.transition = "none";
                currentIndex = 1;
                requestAnimationFrame(() => {
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                });
                updateSlideStyles();
            }
            if (allSlides[currentIndex].isSameNode(lastClone)) {
                track.style.transition = "none";
                currentIndex = allSlides.length - 2;
                requestAnimationFrame(() => {
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                });
                updateSlideStyles();
            }
        });

        // 자동 슬라이드 (5초 간격)
        let autoSlide = setInterval(() => {
            if (currentIndex >= allSlides.length - 1) return;
            moveToSlide(currentIndex + 1);
        }, 5000);

        // 도트 클릭 시 해당 슬라이드로 이동
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                moveToSlide(idx + 1);
                resetAutoSlide();
            });
        });

        // 창 크기 변경 대응
        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width + 20;
            track.style.transition = "none";
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            updateSlideStyles();
        });

        // 자동 슬라이드 재시작 함수
        function resetAutoSlide() {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 5000);
        }

        updateSlideStyles();