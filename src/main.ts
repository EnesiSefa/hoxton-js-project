import "./style.css";

type Store = {
  id: number;
  image: string;
  title: string;
  price: string;
  discountPrice: string;
  description: string;
};

type State = {
  store: Store[];
  selected: Store | null;
};
let state: State = {
  store: [],
  selected: null,
};
let appEl = document.querySelector("#app");

function render() {
  appEl.textContent = "";
  header();
  // main()
  if (state.selected === null) {
    main();
  } else singleProduct(state.selected);
}

function header() {
  let headerEl = document.createElement("header");

  let h1El = document.createElement("h1");
  h1El.textContent = "Al Tech";
  h1El.addEventListener("click", function () {
    
    render();
    main();
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

  let shoppingBagLiEl = document.createElement("li");
  shoppingBagLiEl.className = "header-list-item";
  let shoppingBagSpanEl = document.createElement("span");
  shoppingBagSpanEl.className = "material-symbols-outlined";
  shoppingBagSpanEl.textContent = "shopping_bag";

  let userLiEl = document.createElement("li");
  userLiEl.className = "header-list-item";
  let userSpanEl = document.createElement("span");
  userSpanEl.className = "material-symbols-outlined";
  userSpanEl.textContent = "person_filled";

  userLiEl.append(userSpanEl);
  shoppingBagLiEl.append(shoppingBagSpanEl);
  searchLiEl.append(searchSpanEl);
  ulEl.append(userLiEl, shoppingBagLiEl, searchLiEl);
  navEl.append(ulEl);
  headerEl.append(h1El, navEl);
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

    let priceEl = document.createElement("span");
    priceEl.textContent = item.price;

    let discountEl = document.createElement("span");
    discountEl.textContent = item.discountPrice;

    let desciptionEl = document.createElement("p");
    desciptionEl.textContent = item.description;

    productsLiEl.append(imageEl, titleEl, priceEl, discountEl, desciptionEl);
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

function singleProduct(store: Store) {
  let mainEl = document.createElement("main");

  let navEl = document.createElement("nav");
  navEl.className = "single-main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "single-main-list";

  //    for(let item of state.store){
  let productsLiEl = document.createElement("li");
  productsLiEl.className = "single-main-list-item";
  let imageEl = document.createElement("img");
  imageEl.className = "single-image";
  imageEl.src = store.image;
  imageEl.alt = store.title;

  let titleEl = document.createElement("h3");
  titleEl.textContent = store.title;

  let priceEl = document.createElement("span");
  priceEl.textContent = store.price;

  let discountEl = document.createElement("span");
  discountEl.textContent = store.discountPrice;

  let desciptionEl = document.createElement("p");
  desciptionEl.textContent = store.description;

  productsLiEl.append(imageEl, titleEl, priceEl, discountEl, desciptionEl);
  ulEl.append(productsLiEl);

  navEl.append(ulEl);
  mainEl.append(navEl);
  appEl?.append(mainEl);
}
getData();

render();
