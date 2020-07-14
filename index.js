class Card {
    constructor(name, rating, offers, favourite, image, cities) {
        this.name = name;
        this.rating = rating;
        this.offers = offers;
        this.favourite = favourite;
        this.image = image;
        this.cities = cities;
    }

    get getRatings() {
        let rating_html = '';
        for (let index = 1; index <= 5; index++) {
            if(index <= this.rating) {
                rating_html += `<i class="fa fa-star" aria-hidden="true"></i>`;
            } else {
                rating_html += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
            }
        }
        return rating_html;
    }

    getTemplate() {
        let modal_title = this.name.replace("'", "\\'");
        let fav_class = this.favourite ? 'fa-heart' : 'fa-heart-o';
        let card_template = `
            <div class="card" onclick="openPopUp('./images/restaurents/${this.image}', '${modal_title}')">
            <img
                class="card-img-top"
                src="./images/restaurents/${this.image}"
                alt="Card image cap"
            />
            <div class="card-body">
                <div class="card-title">
                <div class="title-line">
                <div class='title-bold' title='${this.name}'>${this.name}</div>
                <div>
                    <span class='rating-container'>
                    ${this.getRatings}
                </span>
                    ${this.rating}
                </div>
                </div>

                <div class='city-list'>${this.cities}</div>
            </div>
                <div class="card-text card-offers">
                <div>${this.offers[0]}</div>
                </div>
                <div class="title-line" style='align-items: flex-end;'>
                <div style='color:#dc3545'><i class="fa ${fav_class} heart-ic" aria-hidden="true"></i></div>
                <div><a onclick="event.stopPropagation();" href="./images/restaurents/${this.image}" target="_blank" class="btn btn-outline-secondary btn-buynow">Buy Now</a></div>
                </div>
                
            </div>
            </div>
    `;
    return card_template;
    }
}

function loadData(data) {
    let html_data = '';
    data.forEach((el, i) => {
        html_data +=  new Card(el.name, el.rating, el.offers, el.favourite, el.image, el.cities).getTemplate();
    });
    // console.log('htnl data - ', html_data);
    document.querySelector('#container').innerHTML = html_data;
}

function openPopUp(imgUrl, title) {
    let img_html = `<img src="${imgUrl}" alt="${title}" />`;
    document.querySelector('.modal-body').innerHTML = img_html;
    $('#exampleModalLongTitle').html(title);
    document.querySelector('#modal-btn').click();
}

function performSearch(term) {
    let searchData = data.filter(val => val.name.toLowerCase().indexOf(term.toLowerCase()) > -1 );
    loadData(searchData);
}

// document.querySelector('#submit').addEventListener('click', function(){
//     let searchTerm = document.querySelector('#search').value;
//     performSearch(searchTerm);
// });

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let searchTerm = document.querySelector('#search').value;
    performSearch(searchTerm);
})

window.addEventListener('load', function(){loadData(data)});
