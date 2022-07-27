main();
var cart = JSON.parse(localStorage.getItem("data")) || [];

function main() {
  apiGetProducts().then(function (result) {
    let products = result.data;

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type;
    }
    display(products);
    displayCart(cart);
  });
}

const display = (products) => {
  let html = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    html += ` 
    <li class="st-col-item">
      <input type="text" id="MaSP" hidden value=${product.id} >
      
      <div class="single-product-wrap">
        <div class="product-image">
          <a
            class="pro-img"
            href="/collections/all/products/ladies-dress"
          >
            <img
              class="img-fluid img1"
              src="${product.img}"
              alt="CBD Chocolate"
            />
            <img
              class="img-fluid img2"
              src="//cdn.shopify.com/s/files/1/0569/2591/3250/products/p11_558X600_crop_center.jpg?v=1622304437"
              alt="CBD Chocolate"
            />
          </a>
          <div class="product-label">
            <span class="percent-count">-17%</span>
          </div>
          <div class="product-action">
            <a class="cart-title" id="cart" onclick="add(${product.id})">
              <i class="fa-solid fa-cart-shopping"></i>
            </a>
            <a class="quick-view">
              <i class="fa-solid fa-eye"></i>
            </a>
            <a class="Wishlist">
              <i class="fa-solid fa-heart"></i>
            </a>
          </div>
          <div class="product-detail">
            <h4>Thông tin chi tiết</h4>
            <p class="textscreen">Screen 68</p>
            <p class="textfrontCamera">
              ${product.frontCamera}
            </p>

            <p class="textbackCamera">
              ${product.backCamera}
            </p>
            <p class="text-desc">
              ${product.desc}
            </p>
          </div>
        </div>
        <div class="product-content">
          <div class="product-title">
            <a
              class="title"
              href="/collections/all/products/ladies-dress"
              title=${product.name}
              >${product.name}</a
            >
          </div>
          <div class="price-box">
            <span class="new-price">${product.price}</span>
          </div>
          <div class="product-ratting">
            <span
              class="spr-badge"
              id="spr_badge_6791669448866"
              data-rating="4.0"
              ><span
                class="spr-starrating spr-badge-starrating"
                ><i
                  class="spr-icon spr-icon-star"
                  aria-hidden="true"
                ></i
                ><i
                  class="spr-icon spr-icon-star"
                  aria-hidden="true"
                ></i
                ><i
                  class="spr-icon spr-icon-star"
                  aria-hidden="true"
                ></i
                ><i
                  class="spr-icon spr-icon-star"
                  aria-hidden="true"
                ></i
                ><i
                  class="spr-icon spr-icon-star-empty"
                  aria-hidden="true"
                ></i></span
              ><span class="spr-badge-caption"
                >1 review</span
              >
            </span>
          </div>
        </div>
      </div>
    </li>`;
  }
  document.getElementById("tblProduct").innerHTML = html;
};

document.getElementById("SortBy").onchange = function displayTypeProduct() {
  apiGetProducts().then(function (result) {
    let products = result.data;
    const displayTypeProduct = products.filter((product) => {
      const type = document.getElementById("SortBy").value;
      return product.type === type;
    });
    display(displayTypeProduct);
    console.log("Product: ", displayTypeProduct);
  });
};

let add = (id) => {
  const cart = JSON.parse(localStorage.getItem("data")) || [];
  apiGetProductDetail(id).then(function (result) {
    let product = result.data;
    let index = cart.findIndex((x) => x.id === product.id);

    if (index === -1) {
      cart.push({
        ...product,
        quantity: 1,
      });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("data", JSON.stringify(cart));
    document.getElementById("cart-tempty-title").style.display = "none";
    document.getElementById("cart-item-title").style.display = "block";
    displayCart(cart);
    showPay();
  });
};
const displayCart = (cart) => {
  let total = 0;
  let count = "";
  let html = "";
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
    total += product.quantity;
    html += `
        <li class="cart-item">
        <div class="cart-image">
          <a
            href="/products/ladies-dress?variant=40012702285986"
          >
            <img
              class="img-fluid"
              src="${product.img}"
              alt=""
            />
          </a>
        </div>
        <div class="cart-title">
          <h6 class="">
            <a
              href="/products/ladies-dress?variant=40012702285986"
              title="CBD Chocolate"
              >${product.name}</a
            >
          </h6>
          <div class="cart-pro-info">
            <div class="cart-qty-price">
              <i class="fa-solid fa-minus" onClick="decrement(${product.id})"></i>
              <span  class="quantity">${product.quantity}</span>
              <i class="fa-solid fa-plus" onClick="increment(${product.id})"></i>
              <span class="price-box">
                <span class="new-price">
                  $ ${product.price}
                </span>
              </span>
            </div>
            <div class="delete-item-cart">
              <a class="remove_from_cart">
                <i class="fa-solid fa-trash-can" onClick="removeItem(${product.id})"></i>
              </a>
            </div>
          </div>

        </div>
      </li>
        `;
  }
  count += `
  ${total}
  `;
  totalCal(cart);
  document.getElementById("wishlist-counter").innerHTML = `${total}`;
  document.getElementById("cart-total").innerHTML = count;
  document.getElementById("cart-item-loop").innerHTML = html;
  document.getElementById("cart-item-title").style.display = "block";

  if (cart.length !== 0) {
    document.getElementById("cart-tempty-title").style.display = "none";
  } else if (cart.length === 0) {
    document.getElementById("subtotal").style.display = "none";
    document.getElementById("cart-item-title").style.display = "block";
    document.getElementById("cart-tempty-title").style.display = "block";
  }
};

let increment = (id) => {
  const cart = JSON.parse(localStorage.getItem("data")) || [];
  apiGetProductDetail(id).then(function (result) {
    let product = result.data;
    let index = cart.findIndex((x) => x.id === product.id);
    // if (search === undefined) {
    if (index === -1) {
      cart.push({
        ...product,
        quantity: 1,
      });
    } else {
      cart[index].quantity += 1;
    }
    displayCart(cart);
    localStorage.setItem("data", JSON.stringify(cart));
    showPay();
  });
};
let decrement = (id) => {
  const cart = JSON.parse(localStorage.getItem("data")) || [];
  apiGetProductDetail(id).then(function (result) {
    let product = result.data;

    let index = cart.findIndex((x) => x.id === product.id);

    if (index === -1) {
      cart.push({
        ...product,
        quantity: 1,
      });
    } else if (cart[index].quantity <= 1) {
      const cartid = cart[index].id;
      update(cart, id, cartid);
      return;
    } else {
      cart[index].quantity -= 1;
    }

    localStorage.setItem("data", JSON.stringify(cart));
    displayCart(cart);
    showPay();
  });
};
let update = (cart, id, cartid) => {
  let x = cart.findIndex((x) => x.id === cartid);
  if (x != -1) {
    if ((cart[x].id = id)) {
      cart.splice(x, 1);
    }
  }

  displayCart(cart);
  localStorage.setItem("data", JSON.stringify(cart));
  return;
};
let totalCal = (cart) => {
  if (cart.length !== 0) {
    apiGetProducts().then(function (result) {
      let products = result.data;
      let amount = cart
        .map((x) => {
          let { quantity, id } = x;
          let search = products.find((y) => y.id === id) || [];
          return quantity * parseInt(search.price);
        })
        .reduce((x, y) => x + y, 0);
      document.getElementById("cart-sub-total").innerHTML = `$ ${amount}`;
    });
  } else return;
};
let Pay = () => {
  const cart = [];
  console.log(cart);
  displayCart(cart);
  hiddenPay();
  localStorage.setItem("data", JSON.stringify(cart));
};
let hiddenPay = () => {
  document.getElementById("cart-tempty-title").style.display = "block";
  document.getElementById("subtotal").style.display = "none";
};
let showPay = () => {
  document.getElementById("subtotal").style.display = "block";
  document.getElementById("cart-tempty-title").style.display = "none";
};
let removeItem = (id) => {
  const cart = JSON.parse(localStorage.getItem("data")) || [];
  for (let i = 0; i <= cart.length; i++) {
    if (parseInt(cart[i].id) === id) {
      alert("huy");
      cart.splice(0, 1);
      displayCart(cart);
      localStorage.setItem("data", JSON.stringify(cart));
    }
  }
};
