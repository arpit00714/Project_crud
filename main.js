  // Put DOM elements into variables
const myForm = document.querySelector('#my-form')
const ProductInput = document.querySelector('#Product')
const amountInput = document.querySelector('#amount')
const msg = document.querySelector('.msg')
const list = document.querySelector('#list')


const url = "https://crudcrud.com/api/fb9166eec8554024a87cc6b184520560"



window.onload = getData

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (ProductInput.value === '' || amountInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('alert')
    msg.innerHTML = 'Please enter all fields'

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000)
  } else {

    let details = {
      amount : amountInput.value,
      Product : ProductInput.value,
    }
    try {
      const response = await axios.post(url + "/Product" ,details)
      showUser(response.data)
    } catch (err) {
      msg.classList.add('alert')
        msg.innerHTML = err
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000)
    }
    amountInput.value = ''
    ProductInput.value = ''

  }
}


async function deleteItem(id) {
  try {
    await axios.delete(`${url}/Product/${id}`)
    list.removeChild(document.getElementById(id))
  } catch (err) {
    msg.classList.add('alert')
      msg.innerHTML = err
      setTimeout(() => msg.remove(), 3000)
  }

}


async function getData() {

  try {
    const res = await axios.get(url + "/Product")
    res.data.forEach(obj => showUser(obj))
    
  } catch (err) {
    msg.classList.add('alert')
    msg.innerHTML = err
    setTimeout(() => msg.remove(), 3000)
  }

}

function showUser(details) {

  list.innerHTML  += `<li class="list-group-item" id=${details._id}>
  <span>${details.amount} - ${details.Product} </span>
 <button class="btn btn-danger" onclick=deleteItem('${details._id}')>X</button></li>`
//  <button class="btn btn-success" onclick="edit('${details._id}')">Edit</button></li>
 }
