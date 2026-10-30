// EDIT THIS NUMBER before publishing: Pakistan country code +92, without + or leading 0.
const WHATSAPP_NUMBER = "923027058484";

const products = [
  {id:1,name:"Cozy Crochet Flower",category:"Crochet",price:850,emoji:"✿",description:"A handmade little keepsake."},
  {id:2,name:"Mini Crochet Bouquet",category:"Crochet",price:1500,emoji:"💐",description:"A sweet gift for someone special."},
  {id:3,name:"Personalized Gift Box",category:"Gifts",price:1800,emoji:"🎁",description:"A thoughtful gift, made personal."},
  {id:4,name:"Custom Photo Canvas",category:"Personalized",price:2200,emoji:"▧",description:"Turn a favourite memory into art."},
  {id:5,name:"Name Keychain",category:"Personalized",price:450,emoji:"♡",description:"A small personalised accessory."},
  {id:6,name:"Minimal Wall Art",category:"Art",price:1200,emoji:"✳",description:"A lovely detail for your space."},
  {id:7,name:"Wedding Favour Set",category:"Gifts",price:950,emoji:"❀",description:"Little details for a special day."},
  {id:8,name:"Handmade Crochet Charm",category:"Crochet",price:600,emoji:"✧",description:"A cute handmade everyday charm."}
];
let cart = JSON.parse(localStorage.getItem("khaareedo-cart") || "[]");
let activeCategory = "All";
const money = n => "Rs. " + n.toLocaleString("en-PK");

function renderProducts(){
  const shown = activeCategory==="All" ? products : products.filter(p=>p.category===activeCategory);
  document.getElementById("product-grid").innerHTML = shown.map(p=>`
    <article class="product-card">
      <div class="product-image"><span class="image-placeholder">${p.emoji}</span></div>
      <div class="product-info">
        <span class="product-category">${p.category}</span><h3>${p.name}</h3>
        <div class="product-row"><span class="price">${money(p.price)}</span><button class="add-button" onclick="addToCart(${p.id})">+ Add</button></div>
      </div>
    </article>`).join("");
}
function saveCart(){localStorage.setItem("khaareedo-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("cart-count").textContent=count;document.getElementById("subtotal").textContent=money(total);
  document.getElementById("cart-items").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-line"><div><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join(""):'<p class="empty-cart">Your bag is waiting for something lovely.</p>';
}
function openCart(){document.getElementById("cart-drawer").classList.add("open");document.getElementById("cart-overlay").classList.add("show");document.getElementById("cart-drawer").setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cart-drawer").classList.remove("open");document.getElementById("cart-overlay").classList.remove("show");document.getElementById("cart-drawer").setAttribute("aria-hidden","true");}
function checkout(){
  if(!cart.length){alert("Your cart is empty. Add a product first.");return;}
  if(WHATSAPP_NUMBER.includes("X")){alert("Store setup: add your WhatsApp number in script.js before using checkout.");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `• ${p.name} x ${x.qty} = ${money(p.price*x.qty)}`}).join("\n");
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  const msg=`Assalam-o-Alaikum Khaareedo.pk! I would like to place an order:\n\n${lines}\n\nSubtotal: ${money(total)}\n\nMy name:\nDelivery address:\nCity:\n`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("open-cart").addEventListener("click",openCart);
document.getElementById("close-cart").addEventListener("click",closeCart);
document.getElementById("cart-overlay").addEventListener("click",closeCart);
document.getElementById("checkout").addEventListener("click",checkout);
document.getElementById("contact-link").addEventListener("click",e=>{if(WHATSAPP_NUMBER.includes("X")){e.preventDefault();alert("Add your WhatsApp number in script.js before publishing.");}else e.currentTarget.href=`https://wa.me/${WHATSAPP_NUMBER}`;});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();