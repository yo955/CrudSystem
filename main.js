let title = document.getElementById(`title`);
let price = document.getElementById(`price`);
let taxes = document.getElementById(`taxes`);
let ads = document.getElementById(`ads`);
let discount = document.getElementById(`discount`);
let total = document.getElementById(`total`);
let count = document.getElementById(`count`);
let cateogry = document.getElementById(`cateogry`);
let submit = document.getElementById(`submit`);
// get total
function getTotal()
{
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = `#040`;
        console.log(total.value);
    }else{
        total.innerHTML = "";
        total.style.background = `#a00d02`;
    }
}
// create product
let dataproduct;
if(localStorage.product != null){
    dataproduct = JSON.parse(localStorage.product)
}else{
    dataproduct=[];
}
submit.onclick = function(){
    let newproduct={  //TO save 1product
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        cateogry:cateogry.value.toLowerCase(),
    }
    // araay.push(newproduct);
    //count
    if(newproduct.count > 1){
        for(let i = 0;i<newproduct.count;i++){
            dataproduct.push(newproduct);
        }
    }else{
        dataproduct.push(newproduct);
    }
     // save local storage
    localStorage.setItem(`product`,JSON.stringify(dataproduct));
    clearData(); //TO Clear Data
    showData(); //TO show Data
}

//clear inputs
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    cateogry.value = "";
}
//read
function showData(){
    let table = '';
    for(let i =0;i<dataproduct.length;i++){
        table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].cateogry}</td>
                    <td><button id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById(`tbody`).innerHTML = table;
    let btnDelete = document.getElementById(`deleteAll`);
    if(dataproduct.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataproduct.length})</button>
        `
    }else{
        btnDelete.innerHTML = ``;
    }
}
showData();
//delete
function deleteData(i){
    dataproduct.splice(i,1);
    localStorage.product = JSON.stringify(dataproduct);
    showData(); // TO refresh All Data in Html
}
function deleteAll(){
    localStorage.clear();
    dataproduct.splice(0);
    showData(); // TO refresh All Data in Html
}

//update
//search
let searchMood = `title`;
function getSearchMood(id){
    let search = document.getElementById(`search`);
    if(id===`searchTitle`){
        searchMood = `title`;
        // search.placeholder="Search By Tittle"; //delete
    }else{
        searchMood = `Cateogry`;
        // search.placeholder="Search By Cateogry"; //delete
    }
    search.placeholder = `Search By ` + searchMood; //The Best Code
    search.focus();
    search.value=``;
    showData();
}
function searchData(value){
    let table=``;
    if(searchMood===`title`){
        for(let i=0;i<dataproduct.length;i++){
            if(dataproduct[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].cateogry}</td>
                    <td><button id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }
        }
    }else{
        for(let i=0;i<dataproduct.length;i++){
            if(dataproduct[i].cateogry.includes(value.toLowerCase())){
                table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].cateogry}</td>
                    <td><button id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }
        }
    }
    document.getElementById(`tbody`).innerHTML=table;
};
//clean data
