const input = document.querySelector('.container__input');
const avtocomplit = document.querySelector('.avtocomplit');
const card = document.querySelector('.card');

const debounce = (fn, debounce = '400') => {
    let time;
    return function () {
        let newFn = () => { fn.apply(this, arguments)};

        clearTimeout(time);

        time = setTimeout(() => {
            newFn();
        }, debounce);

    }
};

input.addEventListener('input', debounce(function(event) {
    const value = event.target.value;

    if(!value) {
        avtocomplit.innerHTML  = '';
    }

    if (value) {
        fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`).then((response) => {
            return response.json();
        }).then((data) => {
            avtocomplit.innerHTML = '';

            data.items.forEach((item) => {
                const list = document.createElement('li');
                list.classList.add('avtocomplit__list');
                list.textContent = item.name;
                list.addEventListener('click', () => {
                    input.value = '';
                    avtocomplit.innerHTML  = '';
                    infoCard(item);
                });

                avtocomplit.appendChild(list);
            });
        }).catch((error) => {
            console.log(`Error: ${error}`);
        });
    }

}))

function infoCard(item) {
    const content = Object.assign(document.createElement('div'), {
        className: 'card__box',
    });

    const name = Object.assign(document.createElement('span'), {
        textContent: `Name: ${item.name}`,
        className: 'card__span card__name',
    });

    const owner = Object.assign(document.createElement('span'), {
        textContent: `Owner: ${item.owner.login}`,
        className: 'card__span card__owner',
    });

    const count = Object.assign(document.createElement('span'), {
        textContent: `Stars: ${item.stargazers_count}`,
        className: 'card__span card__stars',
    });

    const button = Object.assign(document.createElement('img'), {
        className: 'btn',
        src: './img/close.svg',
    })

    button.addEventListener('click', () => {
      card.removeChild(content);
    })

    content.appendChild(name);
    content.appendChild(owner);
    content.appendChild(count);
    content.appendChild(button);
    card.insertBefore(content, card.firstChild);
}









