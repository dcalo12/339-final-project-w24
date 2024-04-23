var containerEl = document.querySelector('.container');

var mixer = mixitup(containerEl, {
    load: {
        sort: 'published-date:desc'
    }
});