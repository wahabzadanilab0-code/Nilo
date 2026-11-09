// Hero slider content and images
const slides = [
  {
    title: "Fresh style,<br>made for you",
    description: "Everyday essentials and standout pieces, curated for your style.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1500",
    thumbs: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500"
    ]
  },
  {
    title: "Beauty in every<br>choice",
    description: "Explore our latest clothing and accessories.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1500",
    thumbs: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    ]
  },
  {
    title: "Make your<br>own statement",
    description: "Your signature look is one choice away.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1500",
    thumbs: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500"
    ]
  }
];

let slideIndex = 0;

// Update the hero background and thumbnails
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length;
  const slide = slides[slideIndex];

  document.getElementById("heroBackground").style.backgroundImage = `url('${slide.image}')`;
  document.getElementById("heroTitle").innerHTML = slide.title;
  document.getElementById("heroDescription").textContent = slide.description;
  document.getElementById("slideNumber").textContent = "0" + (slideIndex + 1);

  document.querySelectorAll(".hero-thumb").forEach((button, i) => {
    button.style.backgroundImage = `url('${slide.thumbs[i]}')`;
    button.classList.toggle("active", i === 0);
  });
}

document.getElementById("heroNext").addEventListener("click", () => showSlide(slideIndex + 1));
document.getElementById("heroPrev").addEventListener("click", () => showSlide(slideIndex - 1));

document.querySelectorAll(".hero-thumb").forEach((button, index) => {
  button.addEventListener("click", () => {
    // Click a thumbnail to preview its image
    const slide = slides[slideIndex];
    document.getElementById("heroBackground").style.backgroundImage = `url('${slide.thumbs[index]}')`;
    document.querySelectorAll(".hero-thumb").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
  });
});

// Product catalog with image galleries
const products = [
  {id:1,name:"Classic cotton tee",category:"Clothing",price:650,oldPrice:800,description:"A soft, versatile cotton tee made for everyday wear.",images:["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700"],badge:"BESTSELLER"},
  {id:2,name:"Relaxed denim jeans",category:"Clothing",price:1100,oldPrice:1300,description:"Modern-fit denim with an effortless silhouette.",images:["https://images.unsplash.com/photo-1542272604-787c3835535d?w=700","https://images.unsplash.com/photo-1542272604-787c3835535d?w=700"],badge:"SALE"},
  {id:3,name:"Everyday sneakers",category:"Shoes",price:1750,oldPrice:0,description:"Comfortable sneakers for daily adventures.",images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700","https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700"],badge:"NEW"},
  {id:4,name:"Structured handbag",category:"Bags",price:1400,oldPrice:0,description:"A versatile handbag with a clean, timeless design.",images:["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700","https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700"],badge:""},
  {id:5,name:"Classic sunglasses",category:"Accessories",price:550,oldPrice:0,description:"The perfect finishing touch for your look.",images:["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700"],badge:""},
  {id:6,name:"Flowy day dress",category:"Clothing",price:1250,oldPrice:0,description:"A light, elegant dress for days and evenings.",images:["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700"],badge:"FEATURED"},
  {id:7,name:"Minimal wristwatch",category:"Accessories",price:950,oldPrice:0,description:"A refined watch with a classic profile.",images:["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700","https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"],badge:""},
  {id:8,name:"Mini bag",category:"Bags",price:890,oldPrice:0,description:"A compact everyday bag for your essentials.",images:["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700","https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700"],badge:""}
];

let activeCategory = "All";
let cart = [];
let wishlist = [];
let selectedProduct = null;
let selectedColor = "Black";

// Render product cards
function displayProducts(list) {
  const box = document.getElementById("productsGrid");
  box.innerHTML = "";
  document.getElementById("emptyMessage").style.display = list.length ? "none" : "block";

  list.forEach(product => {
    box.innerHTML += `
      <article class="product-card">
        <div class="product-photo" style="background-image:url('${product.images[0]}')" onclick="openDetails(${product.id})">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <button class="heart-button ${wishlist.includes(product.id) ? "liked" : ""}" onclick="toggleWishlist(event,${product.id})">♡</button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <div class="product-bottom">
            <span class="product-price">${product.price.toLocaleString("en-US")} AFN</span>
            <button class="add-button" onclick="addToCart(${product.id})">Add +</button>
          </div>
        </div>
      </article>`;
  });
}

// Combine category filtering and search
function filterProducts() {
  const word = document.getElementById("searchInput").value.trim().toLowerCase();

  let result = products.filter(product => {
    const categoryOK = activeCategory === "All" || product.category === activeCategory;
    const searchOK = product.name.toLowerCase().includes(word) || product.category.toLowerCase().includes(word);
    return categoryOK && searchOK;
  });

  const sort = document.getElementById("sortSelect").value;
  if (sort === "low") result.sort((a,b) => a.price - b.price);
  if (sort === "high") result.sort((a,b) => b.price - a.price);
  if (sort === "name") result.sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById("filterLabel").textContent = activeCategory === "All" ? "All Products" : activeCategory;
  displayProducts(result);
}

document.querySelectorAll(".collection-card").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".collection-card").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    filterProducts();
    document.getElementById("shop").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("searchInput").addEventListener("input", filterProducts);
document.getElementById("sortSelect").addEventListener("change", filterProducts);
document.getElementById("clearFilter").addEventListener("click", () => {
  activeCategory = "All";
  document.getElementById("searchInput").value = "";
  document.querySelectorAll(".collection-card").forEach(item => item.classList.toggle("active", item.dataset.category === "All"));
  filterProducts();
});

// Add a product to the cart
function addToCart(id) {
  const product = products.find(item => item.id === id);
  const found = cart.find(item => item.id === id);
  if (found) found.quantity++;
  else cart.push({...product, quantity:1, color:selectedColor, size:"Medium"});
  updateCart();
  showToast("Added to your cart.");
}

// Update cart totals and item list
function updateCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";
  let total = 0;
  let quantity = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    quantity += item.quantity;
    box.innerHTML += `
      <div class="cart-row">
        <img src="${item.images[0]}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString("en-US")} AFN</p>
          <div class="qty-control">
            <button onclick="changeQuantity(${item.id},1)">+</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id},-1)">−</button>
          </div>
        </div>
        <button class="remove-button" onclick="removeCartItem(${item.id})">Remove</button>
      </div>`;
  });

  if (cart.length === 0) box.innerHTML = '<p style="text-align:center;color:#999;padding:30px">Your cart is empty.</p>';
  document.getElementById("cartCount").textContent = quantity;
  document.getElementById("cartQuantity").textContent = quantity;
  document.getElementById("cartTotal").textContent = total.toLocaleString("en-US") + " AFN";
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) removeCartItem(id);
  else updateCart();
}

function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
  showToast("Item removed.");
}

// Open and close the cart drawer
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("screenCover").classList.add("show");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("screenCover").classList.remove("show");
}
document.getElementById("cartOpen").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("screenCover").addEventListener("click", closeCart);

// Product details and image gallery
function openDetails(id) {
  selectedProduct = products.find(item => item.id === id);
  document.getElementById("detailName").textContent = selectedProduct.name;
  document.getElementById("detailDescription").textContent = selectedProduct.description;
  document.getElementById("detailPrice").textContent = selectedProduct.price.toLocaleString("en-US") + " AFN";
  showProductImage(selectedProduct.images[0]);
  document.getElementById("miniImages").innerHTML = "";

  selectedProduct.images.forEach((image,index) => {
    const button = document.createElement("button");
    button.style.backgroundImage = `url('${image}')`;
    if (index === 0) button.classList.add("active");
    button.addEventListener("click", () => {
      showProductImage(image);
      document.querySelectorAll(".mini-images button").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
    });
    document.getElementById("miniImages").appendChild(button);
  });

  document.getElementById("productJADELYl").classList.add("show");
}

function showProductImage(image) {
  document.getElementById("mainProductImage").style.backgroundImage = `url('${image}')`;
}

document.getElementById("jadelylClose").addEventListener("click", () => {
  document.getElementById("productJADELYl").classList.remove("show");
});
document.getElementById("productJADELYl").addEventListener("click", event => {
  if (event.target.id === "productJADELYl") event.target.classList.remove("show");
});

// Product color selection
document.querySelectorAll(".color-dot").forEach(button => {
  button.addEventListener("click", () => {
    selectedColor = button.dataset.color;
    document.querySelectorAll(".color-dot").forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.getElementById("detailAddButton").addEventListener("click", () => {
  if (selectedProduct) {
    const size = document.getElementById("detailSize").value;
    const found = cart.find(item => item.id === selectedProduct.id && item.color === selectedColor && item.size === size);
    if (found) found.quantity++;
    else cart.push({...selectedProduct, quantity:1, color:selectedColor, size:size});
    updateCart();
    document.getElementById("productJADELYl").classList.remove("show");
    showToast("Added to your cart.");
  }
});

// Wishlist
function toggleWishlist(event,id) {
  event.stopPropagation();
  if (wishlist.includes(id)) wishlist = wishlist.filter(item => item !== id);
  else wishlist.push(id);
  filterProducts();
  showToast(wishlist.includes(id) ? "Added to your wishlist." : "Removed from your wishlist.");
}

function showWishlist() {
  const box = document.getElementById("wishlistItems");
  box.innerHTML = "";
  wishlist.forEach(id => {
    const product = products.find(item => item.id === id);
    box.innerHTML += `<div class="wish-row"><img src="${product.images[0]}"><span>${product.name}</span><button onclick="toggleWishlistFromPanel(${id})">×</button></div>`;
  });
  if (!wishlist.length) box.innerHTML = '<p style="padding:20px;color:#888">Your wishlist is empty.</p>';
  document.getElementById("wishlistPanel").classList.add("open");
  document.getElementById("screenCover").classList.add("show");
}
function toggleWishlistFromPanel(id) {
  wishlist = wishlist.filter(item => item !== id);
  showWishlist();
  filterProducts();
}
document.getElementById("wishlistOpen").addEventListener("click", showWishlist);
document.getElementById("wishlistClose").addEventListener("click", () => {
  document.getElementById("wishlistPanel").classList.remove("open");
  document.getElementById("screenCover").classList.remove("show");
});

// Expandable search panel
document.getElementById("searchOpen").addEventListener("click", () => document.getElementById("searchPanel").classList.add("show"));
document.getElementById("searchClose").addEventListener("click", () => document.getElementById("searchPanel").classList.remove("show"));
document.getElementById("searchSubmit").addEventListener("click", () => {
  document.getElementById("searchInput").value = document.getElementById("bigSearchInput").value;
  activeCategory = "All";
  filterProducts();
  document.getElementById("searchPanel").classList.remove("show");
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
});

// Contact form demo interaction
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("contactResult").textContent = "Your message has been sent. Thank you!";
  event.target.reset();
});

// Demo checkout interaction
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty.");
  } else {
    showToast("Your order is ready for checkout.");
  }
});

// Mobile navigation menu
document.getElementById("menuOpen").addEventListener("click", () => {
  document.querySelector(".header nav").classList.toggle("open");
});
document.querySelectorAll(".header nav a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".header nav").classList.remove("open"));
});

// Display a small notification
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// Initialize the storefront
showSlide(0);
displayProducts(products);
updateCart();
