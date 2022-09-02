const gettingCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res) => res.json())
    .then((data) =>placingCategory(data))
}
gettingCategory();

const placingCategory =(data)=>{
    let catagories=data.data.news_category;
    const catagotryContainer=document.getElementById("catagotryContainer");
    let childContainer = document.createElement("div");
    childContainer.className='row gap-3';
    catagories.forEach(catagory => {
        let colContainer = document.createElement("div");
        colContainer.className="col py-2 text-center ";
        colContainer.innerHTML=`
        <button class="bg-transparent border-0" onclick="gettingNews(event,'${catagory.category_id}','${catagory.category_name}')">${catagory.category_name}</button>
        `;
        childContainer.appendChild(colContainer);
    });
    catagotryContainer.appendChild(childContainer);
}

const gettingNews=(e,id,catName)=>{
    // e.target.classList.toggle("activeBtn");
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) =>displayNewsPart(data,catName))
}

const displayNewsPart=(data,catName) =>{
    const news=data.data;
    const categoryName=catName;
    console.log(news);
    displayItemCountContainer(news,categoryName);
}

const displayItemCountContainer=(news,categoryName)=>{
    const container=document.getElementById("itemCountContainer");
    container.innerHTML=`
    <p class="ps-3 fw-bolder fs-4 py-3 bg-light rounded">${news.length} Itmes Founds For The Category ${categoryName}</p>
    `;
}