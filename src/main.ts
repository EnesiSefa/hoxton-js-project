import "./style.css";

type Item = {
  id: number;
  image: string;
  title: string;
  price: string;
  discountPrice: string;
  description: string;
};

type State = {
  store: Item[];
  selected: Item | null;
  modal: "search" | "bag" | "user" | "";
  bag: Item | null
};
let state: State = {
  store: [],
  selected: null,
  modal: "",
  bag : null
};
let appEl = document.querySelector("#app");

function render() {
  appEl.textContent = "";
  header();

  if (state.selected === null) {
    main();
  } else {
    singleProduct(state.selected);
  }

  if (state.modal === "bag") {
    renderBagModal();
  }
  if (state.modal === "search") {
    renderSearchModal();
  }

  if (state.modal === "user") {
    renderUserModal();
  }
}

function header() {
  let headerEl = document.createElement("header");

  let homeTitleLink = document.createElement("a");
  let homeTitleEL = document.createElement("h1");
  homeTitleEL.textContent = "Al Tech";
  homeTitleEL.addEventListener("click", function () {
    state.selected = null;
    render();
    // main()
  });

  let navEl = document.createElement("nav");
  navEl.className = "header-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "header-list";

  let searchLiEl = document.createElement("li");
  searchLiEl.className = "header-list-item";
  let searchSpanEl = document.createElement("span");
  searchSpanEl.className = "material-symbols-outlined";
  searchSpanEl.textContent = "search";
  searchSpanEl.addEventListener("click", function () {
    state.modal = "search";
    render();
  });

  let shoppingBagLiEl = document.createElement("li");
  shoppingBagLiEl.className = "header-list-item";
  let shoppingBagSpanEl = document.createElement("span");
  shoppingBagSpanEl.className = "material-symbols-outlined";
  shoppingBagSpanEl.textContent = "shopping_bag";
  shoppingBagSpanEl.addEventListener("click", function () {
    state.modal = "bag";
    render();
  });

  let userLiEl = document.createElement("li");
  userLiEl.className = "header-list-item";
  let userSpanEl = document.createElement("span");
  userSpanEl.className = "material-symbols-outlined";
  userSpanEl.textContent = "person_filled";
  userSpanEl.addEventListener("click",function(){
    state.modal = "user"
    render()
  })

  userLiEl.append(userSpanEl);
  shoppingBagLiEl.append(shoppingBagSpanEl);
  searchLiEl.append(searchSpanEl);
  ulEl.append(userLiEl, shoppingBagLiEl, searchLiEl);
  navEl.append(ulEl);
  homeTitleLink.append(homeTitleEL);
  headerEl.append(homeTitleLink, navEl);
  appEl?.append(headerEl);
}

function main() {
  let mainEl = document.createElement("main");

  let navEl = document.createElement("nav");
  navEl.className = "main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "main-list";

  for (let item of state.store) {
    let productsLiEl = document.createElement("li");
    productsLiEl.className = "main-list-item";
    let imageEl = document.createElement("img");
    imageEl.className = "image";
    imageEl.src = item.image;
    imageEl.alt = item.title;
    imageEl.addEventListener("click", function () {
      state.selected = item;
      render();
    });

    let titleEl = document.createElement("h3");
    titleEl.textContent = item.title;

    let priceDivEl = document.createElement("div");
    priceDivEl.className = "price-container";
    let priceEl = document.createElement("span");
    priceEl.className = "price";
    priceEl.textContent = `$ ${item.price}`;

    let discountEl = document.createElement("span");
    discountEl.className = "discount";
    discountEl.textContent = `$ ${item.discountPrice}`;

    let desciptionEl = document.createElement("p");
    desciptionEl.textContent = item.description;

    priceDivEl.append(priceEl, discountEl);
    productsLiEl.append(imageEl, titleEl, priceDivEl, desciptionEl);
    ulEl.append(productsLiEl);
  }
  navEl.append(ulEl);
  mainEl.append(navEl);
  appEl?.append(mainEl);
}

function getData() {
  fetch("http://localhost:3005/store")
    .then((resp) => resp.json())
    .then((data) => {
      state.store = data;
      render();
    });
}

function singleProduct(store: Item) {
  let mainEl = document.createElement("main");

  let navEl = document.createElement("nav");
  navEl.className = "single-main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "single-main-list";

  let productsLiEl = document.createElement("li");
  productsLiEl.className = "single-main-list-item";
  let imageEl = document.createElement("img");
  imageEl.className = "single-image";
  imageEl.src = store.image;
  imageEl.alt = store.title;

  let titleEl = document.createElement("h3");
  titleEl.textContent = store.title;

  let priceDivEl = document.createElement("div");
  priceDivEl.className = "price-container";
  let priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = `$ ${store.price}`;

  let discountEl = document.createElement("span");
  discountEl.className = "discount";
  discountEl.textContent = `$ ${store.discountPrice}`;

  let desciptionEl = document.createElement("p");
  desciptionEl.textContent = store.description;

  let bagButtonEl = document.createElement("button")
  bagButtonEl.textContent ="Add to bag..."
  bagButtonEl.addEventListener("click",function(){
    state.selected = store;
    render();
  })
  

  priceDivEl.append(priceEl, discountEl);
  productsLiEl.append(imageEl, titleEl, priceDivEl, desciptionEl,bagButtonEl);
  ulEl.append(productsLiEl);

  navEl.append(ulEl);
  mainEl.append(navEl);
  appEl?.append(mainEl);
}

function renderSearchModal() {
  let wrapperEl = document.createElement("div");
  wrapperEl.className = "modal-wrapper";

  let containerEl = document.createElement("div");
  containerEl.className = "modal-container";

  let closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "modal-close-button";
  closeButton.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let titleEl = document.createElement("h2");
  titleEl.textContent = "Search";

  let formEl = document.createElement("form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    state.filter = inputEl.value;
    state.modal = "";
    render();
  });

  let inputEl = document.createElement("input");
  formEl.append(inputEl);

  containerEl.append(closeButton, titleEl, formEl);
  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}

function renderBagModal() {
  let wrapperEl = document.createElement("div");
  wrapperEl.className = "modal-wrapper";

  let containerEl = document.createElement("div");
  containerEl.className = "modal-container";

  let closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "modal-close-button";
  closeButton.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let titleEl = document.createElement("h2");
  titleEl.textContent = "Bag";

  containerEl.append(closeButton, titleEl);
  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}

function renderUserModal() {
  let wrapperEl = document.createElement("div");
  wrapperEl.className = "modal-wrapper";

  let containerEl = document.createElement("div");
  containerEl.className = "modal-container";

  let closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "modal-close-button";
  closeButton.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let titleEl = document.createElement("h2");
  titleEl.textContent = "user";
  let formEl = document.createElement("form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    state.filter = inputEl.value;
    state.modal = "";
    render();
  });

  let inputEl = document.createElement("input");
  formEl.append(inputEl);

  containerEl.append(closeButton, titleEl,formEl);
  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}

getData();

render();
