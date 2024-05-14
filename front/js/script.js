const baseUrl = "http://localhost:3333/api/"


const load = document.getElementById("load");
const containerId = document.getElementById("container-products");	

if (load){
  containerId.hidden = true;
  load.hidden = true;
}

const searchProducts = async () => {
  try {
    const value = document.getElementsByClassName("search-inpunt")[0].value;
    if (!value) {
      alert('Informe o produto que deseja buscar.');
      return;
    }
    document.getElementById("load").hidden = false;
    const response = await fetch(`${baseUrl}items/?q=${value}`);
    const data = await response.json();
    document.getElementById("load").hidden = true;
    if (data) {
      containerId.hidden = false;
      document.querySelector('#category').textContent = data.categoryBreadCrumb;

      const li = document.getElementById("list");
      for (const item of data.items.splice(0, 4)) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="card-container">
         <a href="./details-product.html?id=${item.id}" class="card-link">
          <img src="${item.picture}" alt="${item.title}">
          <div class="card-info">
              <h2 class="card-info-price">${item.price?.amount ? item.price.amount.toLocaleString('pt-br', { style: 'currency', currency: item.price.currency }) : 0.00}</h2>
              <p class="card-info-title">${item.title} </p>
            </div>
            <div class="tag">
              <span>${item.category}</span>
            </div>
            </a>
            <div>
        `;
        li.appendChild(card);
      }
    }
  } catch (error) {
    console.log(error);
    alert('Erro ao realizar consulta.');
  }
}


const getProductById = async (id) => {
  const response = await fetch(`${baseUrl}items/${id}`);
  const data = await response.json();
  if (data && data.item) {
    document.getElementById("img-details").src = data.item.picture;
    document.querySelector('#category-details').textContent = data.categoryBreadCrumb;
    document.querySelector('#title-details').textContent = data.item.title;
    document.querySelector('#condition-details').textContent = data.item.condition;
    document.querySelector('#price-details').textContent = data.item.price?.amount ? data.item.price.amount.toLocaleString('pt-br', { style: 'currency', currency: data.item.price.currency }) : 0.00
    document.querySelector('#description-details').textContent = data.item.description;
  }
}

(async () => {
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const id = url.searchParams.get("id");
  if (id) {
    getProductById(id);
  }
})();