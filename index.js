// category fetch
const gettingCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res) => res.json())
    .then((data) =>placingCategory(data))
}
gettingCategory();
// display categories
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
// news data fetch
const gettingNews=(e,id,catName)=>{
    // e.target.classList.toggle("activeBtn");
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) =>displayNewsPart(data,catName))
}
// news data empliment
const displayNewsPart=(data,catName) =>{
    const news=data.data;
    const categoryName=catName;
    console.log(news);
    displayItemCountContainer(news,categoryName);
    displayCart(news)
}
// item count container
const displayItemCountContainer=(news,categoryName)=>{
    const container=document.getElementById("itemCountContainer");
    container.innerHTML=`
    <p class="ps-3 fw-bolder fs-4 py-3 bg-light rounded">${news.length} Itmes Founds For The Category ${categoryName}</p>
    `;
}
// news container
const displayCart=(news)=>{
    let parentContainer=document.getElementById("newsContainer");
    parentContainer.innerHTML='';
    news.forEach((sNews)=>{
        let childContainer = document.createElement("div");
        childContainer.innerHTML=`
        <div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${sNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fs-5 fw-bolder">${sNews.title}</h5>
                        <p class="card-text">${sNews.details.length > 400 ? `${sNews.details.slice(0,400)}...` : `${sNews.details}`}</p>
                        <div class='row'>
                            <div class="col d-flex ">
                                <div>
                                    <img src="${sNews.author.img}" class="rounded-pill" width="50px" alt="...">
                                </div>
                                <div class="d-flex flex-column align-items-baseline justify-contant-center">
                                    <p class="fw-bold">${sNews.author.name ? `${sNews.author.name}` : `Not Available`}</p>
                                    <p>${sNews.author.published_date ? `${sNews.author.published_date}` : `Not Available`}</p>
                                </div>
                            </div>
                            <div class="col"><i class="fa-solid fa-eye"></i> ${sNews.total_view}</div>
                            <div class="col">${ratings(sNews.rating.number)}<i class="fa-solid fa-star-half"></i></div>
                            <div class="col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `
      parentContainer.appendChild(childContainer);
    })
}

const ratings=(data)=>{
    let count=data.toString()[0];
    let parent=document.createElement('div');
    for (let i = 1; i <= count; i++) {
        let child=document.createElement('i');     
        child.className='fa-solid fa-star';
        parent.appendChild(child);
    }
    return parent.innerHTML;
}