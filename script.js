const overlay=document.getElementById('overlay')
const AddModal=document.getElementById("Add-modal")
const EditModal = document.getElementById('edit-modal')
const deleteModal = document.getElementById('delete-modal')
// **** buttons ****
const btn_close=document.querySelectorAll('[data-close-button]')
var btn_delete = document.getElementById("deleteRow")
var btn_Edit = document.getElementById("editRow")
var btnProAdd = document.getElementById("btnProAdd")
var btnProEdit = document.getElementById("btnProEdit")
// **** infoPro ****
var totalProducts = document.getElementById("totalProducts");
var tableBody = document.getElementById("table-body");
// **** inputs ****
var inputs = document.getElementsByClassName("form-ctrl");
var inputs_edit = document.getElementsByClassName("form-ctrl-edit");
var NameInput = document.getElementById("name");
var NameInput_edit = document.getElementById("name-edit");
var CodeInput = document.getElementById("code");
var CodeInput_edit = document.getElementById("code-edit");
var products = [];

if (JSON.parse(localStorage.getItem("productList") != null)) {
   products = getLocalStorage();
   displayData();
   totalProd();
}
//! **** onclick buttons ****
btnProAdd.onclick = function () {
   getData();
   displayData();
   totalProd();
};
btnProEdit.onclick = function () {
   EditRow();
   displayData();
   totalProd(); 
};
// --------------------  Functions -------------------- //
/**** Edit functions ****/
let currentIndexEdit = 0;
function EditModel(index) {
   currentIndexEdit = index;
   for (var i = 0; i < Object.keys(products[index]).length; i++) {
      inputs_edit[i].value = Object.values(products[index])[i];
   }
   openModal(EditModal);
}
function EditRow() {
   var product = {
      name: NameInput_edit.value,
      code: CodeInput_edit.value,
   };
   products[currentIndexEdit] = product;
   setLocalStorage();
   closeModal(EditModal)
}

/**** Add functions ****/
function getData() {
   var product = {
      name: NameInput.value,
      code: CodeInput.value,
   };
   products.push(product);
   setLocalStorage();
}
function displayData() {
   var pro = "";
   for (var i = 0; i < products.length; i++) {
      pro += `
      <div class="product-table" >
      <div class="products">
         <div class="icons">
         <button  onclick="EditModel(${i})"  class="edit"  data-modal-target="#edit-modal">
            <i class="fas fa-edit"></i>
         </button>
         <button onclick="DeleteAlert(${i})" class="delete" data-modal-target="#delete-modal">
            <i class="fas fa-trash"></i>
         </button>
         </div>
         <div class="info">
         <p class="name">${products[i].name}</p>
         <p>|</p>
         <p class="code">SKU:<span>${products[i].code}</span></p>
         </div>
      </div>
      </div>
      `;
   }
   tableBody.innerHTML = pro;
}
/**** Delete functions ****/
let currentIndexDelete = 0;
function DeleteAlert(index) {
   currentIndexDelete = index;
   openModal(deleteModal);
}
function DeleteRow() {
   products.splice(currentIndexDelete, 1);
   displayData();
   totalProd();
   setLocalStorage();
   const modal = document.getElementById('delete-modal');
   closeModal(modal)
}
/**** totalProducts function ****/
function totalProd() {
   totalProducts.innerHTML = `${products.length}`;
}

/**** LocalStorage functions ****/
function setLocalStorage() {
   localStorage.setItem("productList", JSON.stringify(products));
}
function getLocalStorage() {
   return JSON.parse(localStorage.getItem("productList"));
}
/******************************************************************************* */
btn_close.forEach(button=>{
   button.addEventListener('click',()=>{
      const modal=button.closest('.modal')
      closeModal(modal)
   })
})
function AddModel(){
   openModal(AddModal)
}
function openModal (modal){
   if (modal==null) return
   modal.classList.add('active')
   overlay.classList.add('active')
}

function closeModal (modal){
   if (modal==null) return
   modal.classList.remove('active')
   overlay.classList.remove('active')
}


