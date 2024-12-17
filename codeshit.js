document.addEventListener('DOMContentLoaded', () => {
    const introPrompt = document.getElementById('introPrompt');
    const startBtn = document.getElementById('startBtn');
    const cardContainer = document.getElementById('cardContainer');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const reasonBtn = document.getElementById('reason');
    let currentCardIndex = 0;
    let isTransitioning = false;

    startBtn.addEventListener('click', () => {
        introPrompt.style.opacity = '0';
        setTimeout(() => {
            introPrompt.style.display = 'none';
            cardContainer.style.display = 'block';
            showCard(currentCardIndex);
        }, 500);
    });

    reasonBtn.addEventListener('click', () => {
        window.location.replace("reasons.html");
    });

    const starsContainer = document.getElementById('stars');
    const starCount = 50; 

    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer);
    }

    function showCard(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentCard = document.querySelector('.card.active');
        const nextCard = cards[index];

        if (currentCard) {
            currentCard.classList.remove('active');
            resetAnimations(currentCard);
            setTimeout(() => {
                nextCard.classList.add('active');
                setTimeout(() => {
                    isTransitioning = false;
                    triggerAnimations(nextCard);
                }, 1000);
            }, 1000);
        } else {
            nextCard.classList.add('active');
            setTimeout(() => {
                isTransitioning = false;
                triggerAnimations(nextCard);
            }, 1000);
        }

        if (index === 0) {
            document.querySelector('.nav-btn.prev').style.opacity = 0;
        }

        else if (index === 5) {
            document.querySelector('.nav-btn.next').style.opacity = 0;
        }

        else if (index != 0 || index != 3){
            document.querySelector('.nav-btn.prev').style.opacity = 1;
            document.querySelector('.nav-btn.next').style.opacity = 1;
        }


        
    }

    const heartPattern = document.getElementById('heartPattern');
    const numberOfHearts = 20;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        
        const size = Math.random() * 20 + 10; 
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        
        heart.style.setProperty('--heart-size', `${size}px`);

        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;

        
        heart.style.animationDelay = `${Math.random() * 5}s`;

        heartPattern.appendChild(heart);
    }

    function resetAnimations(card) {
        const elements = card.querySelectorAll('h2, p, .phool, .love-count, .desc2');
        elements.forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
    }

    function triggerAnimations(card) {
        const elements = card.querySelectorAll('h2, p, .phool, .love-count, .desc2');
        elements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.5s ease ${index * 0.2}s forwards`;
        });
    }


    

    function nextCard() {
        if (!isTransitioning) {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            showCard(currentCardIndex);
        }
    }

    function prevCard() {
        if (!isTransitioning) {
            currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
            showCard(currentCardIndex);
        }
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (!isTransitioning) {
            if (touchStartX - touchEndX > 50) {
                nextCard();
            } else if (touchEndX - touchStartX > 50) {
                prevCard();
            }
        }
    }

    
    cardContainer.style.display = 'none'; 
});

function createStar(container) {
    const star = document.createElement('div');
    star.classList.add('star');

    
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    
    star.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(star);
}

