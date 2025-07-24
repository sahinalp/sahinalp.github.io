document.addEventListener('DOMContentLoaded', () => {
    const allSkillsListWrapper = document.querySelector('.all-skills-list-wrapper');
    const allSkillsList = document.getElementById('unified-skills-list');
    const originalSkillItems = Array.from(document.querySelectorAll('#unified-skills-list .skill-item'));

    const slideLeftButton = document.getElementById('slide-left');
    const slideRightButton = document.getElementById('slide-right');

    let currentScrollPosition = 0;
    let itemWidthWithGap = 0;
    let clonedItemsCount = 0;

    const calculateItemDimensions = () => {
        if (originalSkillItems.length === 0) return;
        itemWidthWithGap = originalSkillItems[0].offsetWidth + 20;
    };

    const setupInfiniteScroll = () => {
        calculateItemDimensions();

        if (itemWidthWithGap === 0) {
            setTimeout(setupInfiniteScroll, 100);
            return;
        }

        const wrapperWidth = allSkillsListWrapper.offsetWidth;
        clonedItemsCount = Math.ceil(wrapperWidth / itemWidthWithGap) + 2;

        for (let i = 0; i < clonedItemsCount; i++) {
            const itemToClone = originalSkillItems[originalSkillItems.length - 1 - (i % originalSkillItems.length)];
            const clonedItem = itemToClone.cloneNode(true);
            allSkillsList.prepend(clonedItem);
        }

        for (let i = 0; i < clonedItemsCount; i++) {
            const itemToClone = originalSkillItems[i % originalSkillItems.length];
            const clonedItem = itemToClone.cloneNode(true);
            allSkillsList.appendChild(clonedItem);
        }

        currentScrollPosition = clonedItemsCount * itemWidthWithGap;
        allSkillsList.style.transform = `translateX(-${currentScrollPosition}px)`;
        allSkillsList.style.transition = 'transform 0.3s ease-in-out';
    };

    const infiniteSlide = (direction) => {
        const transitionDuration = parseFloat(getComputedStyle(allSkillsList).transitionDuration) * 1000;
        const resetPosition = () => {
            allSkillsList.style.transition = 'none';
            if (currentScrollPosition <= (clonedItemsCount * itemWidthWithGap) - (originalSkillItems.length * itemWidthWithGap)) {
                currentScrollPosition = originalSkillItems.length * itemWidthWithGap;
            }
            else if (currentScrollPosition >= (clonedItemsCount * itemWidthWithGap) + originalSkillItems.length * itemWidthWithGap) {
                currentScrollPosition = clonedItemsCount * itemWidthWithGap;
            }

            allSkillsList.style.transform = `translateX(-${currentScrollPosition}px)`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    allSkillsList.style.transition = 'transform 0.3s ease-in-out';
                });
            });
        };


        if (direction === 'left') {
            currentScrollPosition -= itemWidthWithGap;
            allSkillsList.style.transform = `translateX(-${currentScrollPosition}px)`;
            setTimeout(resetPosition, transitionDuration + 50);
        } else if (direction === 'right') {
            currentScrollPosition += itemWidthWithGap;
            allSkillsList.style.transform = `translateX(-${currentScrollPosition}px)`;
            setTimeout(resetPosition, transitionDuration + 50);
        }
    };

    if (slideLeftButton && slideRightButton && allSkillsList && allSkillsListWrapper) {
        slideLeftButton.addEventListener('click', () => {
            infiniteSlide('left');
        });

        slideRightButton.addEventListener('click', () => {
            infiniteSlide('right');
        });
    }

    setupInfiniteScroll();
});