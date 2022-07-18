import './style.css'

type Store = {
    id: number,
    image: string,
    title: string,
    price: number
    discountPrice: number
}

type State ={
    store: Store[]
}
let state: State ={
    store: []
}
let appEl = document.querySelector("#app")

function render(){
    header(appEl)
    main(appEl)
}

function header(appEl : Element){
    
    let headerEl = document.createElement("header")
    
    let h1El = document.createElement("h1")
    h1El.textContent = "Al tech"

    
    let navEl = document.createElement("nav")
    navEl.className = "header-nav"

    
    let ulEl = document.createElement("ul")
    ulEl.className = "header-list"

   
    let searchLiEl = document.createElement("li")
    searchLiEl.className = "header-list-item"
    let searchSpanEl = document.createElement("span")
    searchSpanEl.className = "material-symbols-outlined"
    searchSpanEl.textContent = "search"
    
    
    let shoppingBagLiEl = document.createElement("li")
    shoppingBagLiEl.className = "header-list-item"
    let shoppingBagSpanEl = document.createElement("span")
    shoppingBagSpanEl.className = "material-symbols-outlined"
    shoppingBagSpanEl.textContent = "shopping_bag"

    
    let userLiEl = document.createElement("li")
    userLiEl.className = "header-list-item"
    let userSpanEl = document.createElement("span")
    userSpanEl.className = "material-symbols-outlined"
    userSpanEl.textContent = "person_filled"
   
    userLiEl.append(userSpanEl)
    shoppingBagLiEl.append(shoppingBagSpanEl)
    searchLiEl.append(searchSpanEl)
    ulEl.append(userLiEl,shoppingBagLiEl,searchLiEl)
    navEl.append(ulEl)
    headerEl.append(h1El,navEl)
    appEl.append(headerEl)
    
}

function main(appEl : Element){
    // <main>
    let mainEl = document.createElement("main")
    //     <nav class="main-nav">
    let navEl = document.createElement("nav")
    navEl.className = "main-nav"
    //       <ul class="main-list">
    let ulEl= document.createElement("ul")
    ulEl.className = "main-list"
    //         <li class="main-list-item">
    let productsLiEl = document.createElement("li")
    productsLiEl.className = "main-list-item"
    //           <img class="image" src="https://images.samsung.com/is/image/samsung/p6pim/al/2202/gallery/al-galaxy-a53-5g-a536-sm-a536blbleuc-531392710?$650_519_PNG$" alt="samsung a53" />
    let imageEl = document.createElement("img")
    imageEl.className = "image"
    imageEl.src = "https://images.samsung.com/is/image/samsung/p6pim/al/2202/gallery/al-galaxy-a53-5g-a536-sm-a536blbleuc-531392710?$650_519_PNG$"
    imageEl.alt = "samsung a53"
    //           <h3>samsung</h3>
    let titleEl = document.createElement("h3")
    titleEl.textContent = "samsung"
    //           <span>$23,44</span>
    let priceEl = document.createElement("span")
    priceEl.textContent = "$23,44"
   
    let discountEl = document.createElement("span")
    discountEl.textContent = "$19,44"
    //           <p>samsung</p>
    let desciptionEl = document.createElement("p")
    desciptionEl.textContent = "samsung new phone"
    //         </li>
    //       </ul>
    //     </nav>
    //   </main>

    productsLiEl.append(imageEl,titleEl,priceEl,discountEl,desciptionEl)
    ulEl.append(productsLiEl)
    navEl.append(ulEl)
    mainEl.append(navEl)
    appEl.append(mainEl)
}
renderHeader(appEl)

render()
