'use strict';

const cardsContainer = document.querySelector('#cards-container');
const cards = document.querySelectorAll('.card');
const links = document.querySelectorAll('.link');

const getData = async function() {
    const response = await fetch('./assets/data.json');
    const data = await response.json();

    return data;
};

const renderCards = function(data, type) {
    // Clear Content First
    cardsContainer.innerHTML = '';

    let previousText;
    if (type === 'daily') {
        previousText = `Yesterday`;
    } else if (type === 'weekly') {
        previousText = `Last Week`;
    } else if (type === 'monthly') {
        previousText = `Last Month`;
    }

    data.forEach(card => {
        const timeframes = card.timeframes[type];

        const htmlMarkup = `
            <div class="card card--${card.title.toLowerCase()}">
                <!-- Upper Div -->
                <div class="card__hero">
                    <img src="./assets/images/icon-${card.title.toLowerCase()}.svg" alt="">
                </div>

                <!-- Bottom Div -->
                <div class="card__details">
                    <div class="info">
                        <h2>${card.title}</h2>
                        <svg class="info__menu" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill-rule="evenodd"/></svg>
                    </div>

                    <!-- Stats Wrapper -->
                    <div class="stats">
                        <!-- Current Stats -->
                        <p class="stats__current">${timeframes.current}hrs</p>
                        <!-- Previous Stats -->
                        <p class="stats__previous">${previousText} - ${
			timeframes.previous
		}hrs</p>
                    </div>
                </div>
            </div>
    `;

        cardsContainer.insertAdjacentHTML('beforeend', htmlMarkup);
    });
};

const handleClick = async function(e) {
    e.preventDefault();
    const cardsDetails = await getData();
    const link = e.target.closest('.link');

    // Render Cards
    renderCards(cardsDetails, link.dataset.type);

    // Remove Active class from all elements
    links.forEach(link => link.classList.remove('link--active'));

    // Add Active class to current element
    link.classList.add('link--active');
};
links.forEach(link => link.addEventListener('click', handleClick));

// Initialize App with Daily
const Init = async function() {
    const cardsDetails = await getData();
    // Render Cards
    renderCards(cardsDetails, 'daily');
};
Init();