
//START OF FETCH.JS

// JavaScript Fetch, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// The set HTTP headers. These will be used by Fetch when making requests to the api
const HTTP_REQ_HEADERS = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
});



// Requests will use the GET method and permit cross origin requests
const GET_INIT = { method: 'GET', credentials: 'include', headers: HTTP_REQ_HEADERS, mode: 'cors', cache: 'default' };

// Requests will use the GET method and permit cross origin requests
const DELETE_INIT = { method: 'DELETE', credentials: 'include', headers: HTTP_REQ_HEADERS, mode: 'cors' };

// Proct API URL
const BASE_URL = `http://localhost:8000/`;


// Asynchronous Function getDataAsync from a url and return
async function getDataAsync(url) {
  // Try catch 
  try {
    // Call fetch and await the respose
    // Initally returns a promise
    const response = await fetch(url, GET_INIT);

    // As Resonse is dependant on fetch, await must also be used here
    const json = await response.json();

    // Output result to console (for testing purposes) 
    console.log(json);

    // Call function( passing he json result) to display data in HTML page
    //displayData(json);
    return json;

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }

}


// Asynchronous Function to POST or PUT data to a url
async function postOrPutDataAsync(url, reqBody, reqMethod) {

  // create request object
  const request = {
      method: reqMethod,
      headers: HTTP_REQ_HEADERS,
      credentials: 'include', // important
      mode: 'cors',
      body: reqBody
      };

  // Try catch 
  try {
    // Call fetch and await the respose
    // Initally returns a promise
    const response = await fetch(url, request);

    // As Resonse is dependant on fetch, await must also be used here
    const json = await response.json();

    // Output result to console (for testing purposes) 
    console.log(json);

    // Call function( passing he json result) to display data in HTML page
    //displayData(json);
    return json;

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }

}

// Delete
async function deleteDataAsync(url) {

  // Try catch 
  try {
      // Call fetch and await the respose
      // Initally returns a promise
      const response = await fetch(url, DELETE_INIT);
  
      // As Resonse is dependant on fetch, await must also be used here
      const json = await response.json();
  
      // Output result to console (for testing purposes) 
      console.log(json);
  
      // Call function( passing he json result) to display data in HTML page
      //displayData(json);
      return json;
  
      // catch and log any errors
    } catch (err) {
      console.log(err);
      return err;
    }
}

//END OF FETCH.JS


// Product.js

// JavaScript for the product page
//

// CRUD operations 


// Parse JSON
// Create product rows
// Display in web page
function displayProducts(products) {

  // Use the Array map method to iterate through the array of products (in json format)
  // Each products will be formated as HTML table rowsand added to the array
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Finally the output array is inserted as the content into the <tbody id="productRows"> element.

  const rows = products.map(product => {
    // returns a template string for each product, values are inserted using ${ }
    // <tr> is a table row and <td> a table division represents a column

      let row = `<tr>
              <td>${product.ProductId}</td>
              <td>${product.ProductName}</td>
              <td>${product.ProductDescription}</td>
              <td>${product.ProductStock}</td>
              <td class="price">&euro;${Number(product.ProductPrice).toFixed(2)}</td>`
    
      // If user logged in then show edit and delete buttons
      // To add - check user role        
      if (userLoggedIn() === true && sessionStorage.role === "admin") { 
          row+= `<td><button class="btn" data-toggle="modal" data-target="#ProductFormDialog" onclick="prepareProductUpdate(${product.ProductId})"><span class="fa fa-pencil"></span></button></td>
                 <td><button class="btn" onclick="deleteProduct(${product.ProductId})"><span class="fa fa-trash"></span></button></td>`
      }
      row+= '</tr>';

     return row;       
  });

  // Set the innerHTML of the productRows root element = rows
  // Why use join('') ???
  document.getElementById('productRows').innerHTML = rows.join('');
} // end function


// load and display categories in a bootstrap list group
function displayCategories(categories) {
  //console.log(categories);
  const items = categories.map(category => {
    return `<a href="#" class="list-group-item list-group-item-action" onclick="updateProductsView(${category.CategoryId})">${category.CategoryName}</a>`;
  });

  // Add an All categories link at the start
  items.unshift(`<a href="#" class="list-group-item list-group-item-action" onclick="loadProducts()">Show all</a>`);

  // Set the innerHTML of the productRows root element = rows
  document.getElementById('categoryList').innerHTML = items.join('');
} // end function


// Get all categories and products then display
async function loadProducts() {
  try {
    const categories = await getDataAsync(`${BASE_URL}category`);
    displayCategories(categories);

    const products = await getDataAsync(`${BASE_URL}product`);
    displayProducts(products);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
}

// update products list when category is selected to show only products from that category
async function updateProductsView(id) {
  try {
    const products = await getDataAsync(`${BASE_URL}product/bycat/${id}`);
    displayProducts(products);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
}

// When a product is selected for update/ editing, get it by id and fill out the form
async function prepareProductUpdate(id) {

  try {
      // Get broduct by id
      const product = await getDataAsync(`${BASE_URL}product/${id}`);
      // Fill out the form
      document.getElementById('productId').value = product.ProductId;
      console.log("value = " +  document.getElementById('productId').value);
      // uses a hidden field - see the form
      document.getElementById('categoryId').value = product.CategoryId;
      document.getElementById('productName').value = product.ProductName;
      document.getElementById('productDescription').value = product.ProductDescription;
      document.getElementById('productStock').value = product.ProductStock;
      document.getElementById('productPrice').value = product.ProductPrice;
  } // catch and log any errors
  catch (err) {
  console.log(err);
  }
}

// Called when form submit button is clicked
async function addOrUpdateProduct() {

  // url
  let url = `${BASE_URL}product`

  // Get form fields
  
  const pId = document.getElementById('productId').value; 
  // checking the value, making sure it updates right one 
  console.log("value = " +  document.getElementById('productId').value);
  const catId = document.getElementById('categoryId').value;
  const pName = document.getElementById('productName').value;
  const pDesc = document.getElementById('productDescription').value;
  const pStock = document.getElementById('productStock').value;
  const pPrice = document.getElementById('productPrice').value;

  // build request body
  const reqBody = JSON.stringify({
  categoryId: catId,
  productName: pName,
  productDescription: pDesc,
  productStock: pStock,
  productPrice: pPrice
  });

  // Try catch 
  try {
      let json = "";
      // determine if this is an insert (POST) or update (PUT)
      // update will include product id
      if (pId > 0) {
          url+= `/${pId}`;
          json = await postOrPutDataAsync(url, reqBody, 'PUT');
      }
      else {  
          json = await postOrPutDataAsync(url, reqBody, 'POST');
      }
    // Load products
    document.getElementById('productId').value = 0;
    loadProducts();
    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Delete product by id using an HTTP DELETE request
async function deleteProduct(id) {
      
  if (confirm("Are you sure?")) {
      // url
      const url = `${BASE_URL}product/${id}`;
      
      // Try catch 
      try {
          const json = await deleteDataAsync(url);
          console.log("response: " + json);

          loadProducts();

      // catch and log any errors
      } catch (err) {
          console.log(err);
          return err;
      }
  }
}

// Show product button
function showAddProductButton() {

let addProductButton= document.getElementById('AddProductButton');

if (userLoggedIn() === true && sessionStorage.role === "admin") {
  addProductButton.style.display = 'block';
}
else {
  addProductButton.style.display = 'none';
}
}

// show login or logout
showLoginLink();

// Load products
loadProducts();

showAddProductButton();

// END OF PRODUCT.JS

//START OF USER.JS

// Function to display login link if no user logged in
// When user is logged in show logout link
// Also adds an event listener or Bootstrap modal for login dialog
function showLoginLink() {
  const link = document.getElementById('loginLink')

  // Read session storage value (set during login) and set link
  if (userLoggedIn() === true) {
    link.innerHTML = 'Logout';
    link.removeAttribute('data-toggle');
    link.removeAttribute('data-target');
    link.addEventListener("click", logout);
    document.getElementById("registerLink").setAttribute('hidden', 'true');
  }
  else {
    link.innerHTML = 'Login';
    link.setAttribute('data-toggle', 'modal');
    link.setAttribute('data-target', '#LoginDialog');
    document.getElementById("registerLink").removeAttribute('hidden');
    // link.addEventListener('click', login);
  }

}

// Login a user
async function login() {

  // Login url
  const url = `${BASE_URL}login/auth`

  // Get form fields
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('password').value;
  // build request body
  const reqBody = JSON.stringify({
    username: email,
    password: pwd
  });

  // Try catch 
  try {
    const json = await postOrPutDataAsync(url, reqBody, 'POST');
    console.log("response: " + json.user);

    // A successful login will return a user
    if (json.user != false || json.user !== undefined) {

      // If a user then record in session storage
      sessionStorage.loggedIn = true;
      sessionStorage.role = json.role;
      
      // force reload of page
      location.reload(true);
    }

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }

}

async function logout() {

  // logout url
  const url = `${BASE_URL}login/logout`
  // Try catch 
  try {

    // send request and via fetch
    const json = await getDataAsync(url);
    console.log("response: " + JSON.stringify(json));

    // forget user in session storage
    sessionStorage.loggedIn = false;
    sessionStorage.role = "";

    // force reload of page
    location.reload(true);


    // reload 

    // catch and log any errors
    }catch (err) {
      console.log(err);
      return err;
    }
}
// register is passed, when the register button is clicked . it runs this function
async function register(){
  const url = `${BASE_URL}login/register`

  // Get form fields
  const fname = document.getElementById('firstname').value;
  const lname = document.getElementById('lastname').value;
  const em = document.getElementById('regemail').value;
  const pwd = document.getElementById('password1').value;
 

  // build request body
  const reqBody = JSON.stringify({
  firstName: fname,
  lastName: lname,
  email: em,
  password:pwd
 
  }); 

  try {
    const json = await postOrPutDataAsync(url, reqBody, 'POST');
  // alert(fname + " " + lname + " has been registered!");
  alert(JSON.stringify(json));
 console.log("Response: " + json);

    // catch and log any errors
  } catch (err) {
    // alert();
    console.log(err);
    return err;
  }
}

function userLoggedIn() {

  if (sessionStorage.loggedIn == 'true' ) {
    return true;
  }
  else {
    return false;
  }
}

// END OF USER.JS


// script

 //showpassword
 function myFunction() {
   // matching the id password
  var x = document.getElementById("password");
  // if type = password then change it to text else leave it to password
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

//  showpassword2
 function myFunction2() {
  // matching the id password1
  var x = document.getElementById("password1");
  // if type = password then change it to text else leave it to password
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

// search bar
async function searchProduct(){
    
  // Retrieve the keyword input from the search bar
  let productName = document.getElementById("search").value;
  // Pass that keyword into the url endpoint
  const url = `${BASE_URL}product/search/${productName}`;

  // Pass it on then to the request body
  const request = {
      method:'GET',
      headers:HTTP_REQ_HEADERS,
      mode:'cors'
  }
  // Fetch the reponse 
  const response = await fetch(url, request);
  // Converts the response in json format
  const json = await response.json();

  // If the response is 200 ok, go into this if statement
  if(response.ok){
      console.log(`${productName} has been found`);
      // Call the display method and pass in the json variable
      // And it will display the specific product content for the user
      displayProducts(json);
  } else {
      console.log(`We could not find ${productName}`);
  }
}

document.getElementById("searchBtn").addEventListener("click",searchProduct);