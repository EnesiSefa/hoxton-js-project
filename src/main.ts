import "./style.css";

type Item = {
  id: number;
  type: String;
  image: string;
  title: string;
  price: string;
  discountPrice: string;
  description: string;
};
type User = {
  id: number;
  email: string;
  password: string;
  name: string;
};

type State = {
  users: User[];
  store: Item[];
  selected: Item | null;
  // page:"main" | "tv" | "phone" | "";
  modal: "search" | "bag" | "user" | "";
  filterByType: "tv" | "phone" | null;
  filterByTitle: string;
  bag: Item[];
  currentUser: null | User;
  errorMessage: null | string;

};
const state: State = {
  users: [],
  store: [],
  selected: null,
  modal: "",
  filterByType: null,
  filterByTitle: "",
  bag: [],
  currentUser: null,
  errorMessage: null,
  // page:"main"
};
let appEl = document.querySelector("#app");

function render() {
  appEl.textContent = "";

  header();

  if (state.selected === null) {
    if (state.filterByType === "phone") {
      phoneOrTvPage();
    } else if (state.filterByType === "tv") {
      phoneOrTvPage();
    } else main();
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
  

  // let mainEl = document.createElement("main");
  // mainEl.textContent = "";


function header() {
  let headerEl = document.createElement("header");

  let navEl1 = document.createElement("nav");
  navEl1.className = "left-header-nav";

  let ulEl1 = document.createElement("ul");
  ulEl1.className = "header-list";

  let tvLiEl1 = document.createElement("li");
  tvLiEl1.className = "header-list-item";
  let tvSpanEl1 = document.createElement("span");
  tvSpanEl1.className = "material-symbols-outlined";
  tvSpanEl1.textContent = "tv";
  tvSpanEl1.addEventListener("click", function () {
    state.filterByType = "tv";

    render();
  });

  let phoneLiEl1 = document.createElement("li");
  phoneLiEl1.className = "header-list-item";
  let phoneSpanEl1 = document.createElement("span");
  phoneSpanEl1.className = "material-symbols-outlined";
  phoneSpanEl1.textContent = "phone_iphone";
  phoneSpanEl1.addEventListener("click", function () {
    state.filterByType = "phone";

    render();
  });

  let homeTitleLink = document.createElement("a");
  let homeTitleEL = document.createElement("h1");
  homeTitleEL.textContent = "Al Tech";
  homeTitleEL.addEventListener("click", function () {
    state.filterByType = null;
    state.selected = null;
    render();
    // main()
  });

  let navEl2 = document.createElement("nav");
  navEl2.className = "right-header-nav";

  let ulEl2 = document.createElement("ul");
  ulEl2.className = "header-list";

  let searchLiEl2 = document.createElement("li");
  searchLiEl2.className = "header-list-item";
  let searchSpanEl2 = document.createElement("span");
  searchSpanEl2.className = "material-symbols-outlined";
  searchSpanEl2.textContent = "search";
  searchSpanEl2.addEventListener("click", function () {
    state.modal = "search";
    render();
  });

  let shoppingBagLiEl2 = document.createElement("li");
  shoppingBagLiEl2.className = "header-list-item";
  let shoppingBagSpanEl2 = document.createElement("span");
  shoppingBagSpanEl2.className = "material-symbols-outlined";
  shoppingBagSpanEl2.textContent = "shopping_bag";
  shoppingBagSpanEl2.addEventListener("click", function () {
    state.modal = "bag";
    render();
  });

  let userLiEl2 = document.createElement("li");
  userLiEl2.className = "header-list-item";
  let userSpanEl2 = document.createElement("span");
  userSpanEl2.className = "material-symbols-outlined";
  userSpanEl2.textContent = "person_filled";
  userSpanEl2.addEventListener("click", function () {
    state.modal = "user";
    render();
  });

  userLiEl2.append(userSpanEl2);
  shoppingBagLiEl2.append(shoppingBagSpanEl2);
  searchLiEl2.append(searchSpanEl2);
  ulEl2.append(userLiEl2, shoppingBagLiEl2, searchLiEl2);
  navEl2.append(ulEl2);
  tvLiEl1.append(tvSpanEl1);
  phoneLiEl1.append(phoneSpanEl1);
  ulEl1.append(tvLiEl1, phoneLiEl1);
  navEl1.append(ulEl1);
  homeTitleLink.append(homeTitleEL);
  headerEl.append(homeTitleLink, navEl1, navEl2);
  appEl?.append(headerEl);
}

function main() {
  let mainEl = document.createElement("main");

  let navEl = document.createElement("nav");
  navEl.className = "main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "main-list";

  for (let item of searchByName()) {
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

function singleProduct(item: Item) {
  let mainEl = document.createElement("main");

  let navEl = document.createElement("nav");
  navEl.className = "single-main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "single-main-list";

  let productsLiEl = document.createElement("li");
  productsLiEl.className = "single-main-list-item";
  let imageEl = document.createElement("img");
  imageEl.className = "single-image";
  imageEl.src = item.image;
  imageEl.alt = item.title;

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

  let bagButtonEl = document.createElement("button");
  bagButtonEl.textContent = "Add to bag...";
  bagButtonEl.addEventListener("click", function () {
    // addToBag()
    state.bag.push(item);
    render();
  });

  priceDivEl.append(priceEl, discountEl);
  productsLiEl.append(imageEl, titleEl, priceDivEl, desciptionEl, bagButtonEl);
  ulEl.append(productsLiEl);

  navEl.append(ulEl);
  mainEl.append(navEl);
  appEl?.append(mainEl);
}

function phoneOrTvPage() {
  let mainEl = document.createElement("main");
  mainEl.textContent = "";

  let navEl = document.createElement("nav");
  navEl.className = "main-nav";

  let ulEl = document.createElement("ul");
  ulEl.className = "main-list";

  let filteredProductItems;
  if (state.filterByType === null) {
    filteredProductItems = state.store;
  } else {
    filteredProductItems = state.store.filter(
      (item) => item.type === state.filterByType
    );
  }

  for (let item of filteredProductItems) {
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

    state.filterByTitle = inputEl.value;
    state.modal = "";
    render();
  });

  let inputEl = document.createElement("input");
  formEl.append(inputEl);

  containerEl.append(closeButton, titleEl, formEl);
  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}

function searchByName() {
  let searchbyProductName = state.store.filter((item) =>
    item.title.toLowerCase().includes(state.filterByTitle.toLowerCase())
  );

  return searchbyProductName;
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

  // if there is no item in the bag display the message

  if (state.bag.length === 0) {
    let messageEl = document.createElement("p");
    messageEl.textContent = "your bag is currently empty.";
    containerEl.append(messageEl);
  }

  // create a bag item for each item in the bag

  for (let item of state.bag) {
    renderBagItem(containerEl, item);
  }

  // if the bag is not empty then display a "pay now" button

  if (state.bag.length !== 0) {
    //or >0
    // get the total
    // create a total
    let total = 0;
    // add the price of each item in the bag
    for (let item of state.bag) {
      total = total + Number(item.discountPrice);
    }

    let payNowButton = document.createElement("button");
    payNowButton.textContent = `Pay Now $${total.toFixed(2)}`;
    containerEl.append(payNowButton);
  }

  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}

function renderBagItem(containerEl: Element, item: Item) {
  let bagProductImage = document.createElement("div");
  bagProductImage.className = "bag-product-image";
  let imageEL = document.createElement("img");
  imageEL.src = item.image;
  imageEL.className = "bag-image";

  let bagProductInfo = document.createElement("div");
  bagProductInfo.className = "bag-product-info";

  let producTitleEl = document.createElement("h3");
  producTitleEl.textContent = item.title;
  let priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = `$ ${item.price}`;
  let discountEl = document.createElement("span");
  discountEl.className = "discount";
  discountEl.textContent = `$ ${item.discountPrice}`;
  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";

  bagProductInfo.append(producTitleEl, priceEl, discountEl, removeButton);
  bagProductImage.append(imageEL);
  containerEl.append(bagProductImage, bagProductInfo);
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

  for (let user of state.users) {
    const welcomeText = document.createElement('h1');
    welcomeText.textContent = `Welcome aboard, ${user.name}`
  }

    const buttonElLogOut = document.createElement('button');
    buttonElLogOut.textContent = "Log out"
    buttonElLogOut.addEventListener('click', () => {
      state.currentUser = null;
      state.errorMessage = null;
      localStorage.clear();
})

  let titleEl = document.createElement("h2");
  titleEl.textContent = "User";
  let formEl = document.createElement("form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    state.filterByType = inputEl.value;
    state.modal = "";
    render();
  });

  let inputEmail = document.createElement("input");
  inputEmail.placeholder ='Email'
  inputEmail.type = "email"
  let inputPassword = document.createElement("input")
  inputPassword.placeholder = 'Password'
  inputPassword.type = "password"

  let buttonEl = document.createElement('button');
    buttonEl.type = 'submit'
    buttonEl.textContent = "Log in"

    formEl.addEventListener('submit', (event) => {
      event.preventDefault()

      const email = inputEmail.value;
      const password = inputPassword.value;

      login(email, password) 
    })
  formEl.append(inputEmail, inputPassword, buttonEl);

  containerEl.append(closeButton, titleEl, formEl);
  wrapperEl.append(containerEl);
  appEl.append(wrapperEl);
}
function login(email: string, password: string) {
  fetch("http://localhost:3005/users")
    .then((r) => r.json())
    .then((users: User[]) => {
      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (foundUser) {
        state.currentUser = foundUser;
        localStorage.id = foundUser.id;
      } else {
        // TODO: this needs fixing for failed login => correct login path :P
        state.errorMessage = "No user found!";
      }

      render();
    });
}

function checkIfUserIsStoredLocallyAndLogInIfTheyDo() {
  // 1. check for user in localstorage
  const userId = localStorage.id;

  // 2. if the user is there => use it to login
  if (userId) {
    fetch(`http://localhost:3005/users/${userId}`)
      .then((r) => r.json())
      .then((user) => {
        state.currentUser = user;
        render();
      });
  } else {
    // 3. if not => show message to relogin - feel free to add one
  }
}

checkIfUserIsStoredLocallyAndLogInIfTheyDo();

getData();

render();

window.state = state;
