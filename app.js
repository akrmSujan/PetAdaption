const fetchCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await response.json()
    showData(data.categories)
}
let allData
const fetchById=(id)=>{
fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
.then(response=>response.json())
.then(data=>{
    detailsModal(data.petData)
})
}
const fetchPetsByCategory = (category) => {
    const buttons=document.getElementsByClassName('border-[1.5px] border-[rgb(14,122,129)] bg-[rgba(14,122,129,0.1)]')
    for(let btn of buttons){
        btn.classList.remove('border-[1.5px]', 'border-[rgb(14,122,129)]', 'bg-[rgba(14,122,129,0.1)]')
    }
    if(event.target.tagName!=='IMG'){
        event.target.classList.add('border-[1.5px]', 'border-[rgb(14,122,129)]', 'bg-[rgba(14,122,129,0.1)]')
    }

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            showPets(data.data)
            allData=data.data
            setTimeout(() => {
                hideLoading() 
            }, 2000);
        })
}
const showData = (categories) => {
    categories.forEach(category => {
        const oldContainer = document.getElementById('button-container')
        const div = document.createElement('div')
        div.innerHTML = `
    <button onclick="fetchPetsByCategory('${category.category}')" class="btn py-6 px-10 font-bold rounded-xl"><img class="w-8" src="${category.category_icon}" alt=""> ${category.category} </button>
    `
        oldContainer.appendChild(div)
    });
}
const showPets = (pets) => {
     const oldSection = document.getElementById('pet-container');
    oldSection.innerHTML = '';
    if(pets.length<1){
oldSection.classList.remove('md:grid', 'md:grid-cols-4')
const errorMsg=document.createElement('div')
errorMsg.innerHTML=`
<div class="text-center py-10 lg:py-30 rounded-xl bg-gray-100">
    <img class="mx-auto" src="images/error.webp" alt="">
    <h1 class="text-2xl font-bold">No Information Available</h1>
    <p class="text-gray-500 w-4/5 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
</div>
`
oldSection.appendChild(errorMsg)
    }
   
else{
    oldSection.classList.add('md:grid', 'md:grid-cols-3')
    pets.forEach(pet => {

        const card = document.createElement('div');
        card.innerHTML = `
    <div class="card bg-base-100 shadow-sm pb-4">
         <figure class="px-5 pt-5">
            <img class="rounded-lg  w-full" src="${pet.image}"alt="Shoes" class="rounded-xl" />
         </figure>
            <div class="w-4/5 py-2 mb-2 mx-auto border-b-1 border-b-gray-200 space-y-0.5">
                <div class="text-xl font-bold">${pet.pet_name}</div>
                <div class="text-gray-500">Breed: ${pet.breed}</div>
                <div class="text-gray-500">Birth: ${pet.date_of_birth ?? " 2024"}</div>
            <div class="text-gray-500">Gender: ${pet.gender ?? " Not Specified"}</div>
                    <div class="text-gray-500">Price :${pet.price ?? " On talk"}</div>
            </div>
            <div class="mx-auto flex justify-around gap-2 lg:gap-5 xl:gap-10 mt-2">
                            <button onclick="handleLove('${pet.image}')" class="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="2.5" stroke="currentColor" class="size-[1.2em]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                            <button onclick="handlePrice(${pet.price})" class="btn">Adopt</button>
                            <button onclick="fetchById(${pet.petId})" class="btn">Detail</button>
            </div>
    </div>
    `
        oldSection.appendChild(card)
    })
}

}
const detailsModal=(pet)=>{
document.getElementById('pet-modal').showModal()
const modal=document.getElementById('pet-modal');
modal.innerHTML=""
const newModal=document.createElement('div');
newModal.innerHTML=`
<div class="modal-box overflow-hidden px-4 pt-4">
                  <img class="w-full" src="${pet.image}" alt="">
                  <div class="px-5 py-5">
                      <p class="text-lg font-bold">${pet.pet_name}</p>
                      <div class="flex gap-9">
                          <div>
                              <p>Breed: ${pet.breed ??"Not specified"}</p>
                              <p>Gender: ${pet.gender ?? "Not specified"}</p>
                              <p>Vaccinated status: ${pet.vaccinated_status ?? "Ongoing"}</p>
                          </div>
                          <div>
                              <p>Birth: ${pet.date_of_birth ?? "2024"}</p>
                              <p>Price: ${pet.price ?? "On Talk"}</p>
                          </div>
                      </div>
                      <div>
                          <h1 class="text-lg font-bold">Detailed Information</h1>
                          <p>${pet.pet_details}</p>
                      </div>
                  </div>
                  <div>
                    <form method="dialog">
                      <!-- if there is a button in form, it will close the modal -->
                      <button class="btn btn-block">Cancel</button>
                    </form>
                  </div>
                </div>

`
modal.appendChild(newModal)

}
const sortHandler=()=>{
   const sortedData=allData.sort((a,b)=>a.price-b.price)
   showPets(sortedData)
}
let totalPrice=0;
let totalQuantity=0;
let totalCart=0;
function handlePrice(price){
    if(price==null||price==undefined){
        price='600';
    }   
totalPrice=totalPrice+price;
totalQuantity=totalQuantity+1;
totalCart=totalCart+1;
document.getElementById('cart').innerText=totalCart;
document.getElementById('quantity').innerText=totalQuantity;
document.getElementById('price').innerText=totalPrice;

}
function showLoading()
{
    document.getElementById('loading').classList.remove('hidden')  
}
function hideLoading()
{ 
        document.getElementById('loading').classList.add('hidden') 
}
function handleLove(image){
const oldSec=document.getElementById('liked-pet');
oldSec.classList.remove('hidden')
const newDiv=document.createElement('div')
newDiv.innerHTML=`
<img class="rounded-xl" src="${image}" alt="">
`

oldSec.appendChild(newDiv)
}
fetchCategory()