let fruitArea = document.querySelector(`#FruitArea`);

// temp working with cors-anywhere proxy
axios.get(`https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/all`)
  .then(res => {
    console.log(`Fruit Grab was Successful`);
    let fruits = res.data;
    console.log(res.data);
    
    for (let i = 0; i < fruits.length; i++) {
        let name = fruits[i].name;
        let genus = fruits[i].genus;
        let family = fruits[i].family;
        let order = fruits[i].order;
        let fruitDiv = document.createElement(`div`);
        let fruitName = document.createElement(`h2`);
        let fruitGenus = document.createElement(`h3`);
        let fruitFamily = document.createElement(`h4`);
        let fruitOrder = document.createElement(`h5`);
        fruitName.innerText = name;
        fruitGenus.innerText = `Genus: ${genus}`;
        fruitDiv.classList.add(`${genus}`)
        fruitFamily.innerText = `Family: ${family}`;
        fruitDiv.classList.add(`${family}`)
        fruitOrder.innerText = `Order: ${order}`;
        fruitDiv.classList.add(`${order}`)
        fruitDiv.setAttribute(`id`, `${name}`);
        fruitArea.appendChild(fruitDiv);
        fruitDiv.appendChild(fruitName);
        fruitDiv.appendChild(fruitGenus);
        fruitDiv.appendChild(fruitFamily);
        fruitDiv.appendChild(fruitOrder);
    };

  })
  .catch(err => {
    console.log(`Fruit Grab was NOT Successful`);
    console.log(err);
  });