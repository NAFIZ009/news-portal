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
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) =>displayNewsPart(data,catName))
}
// news data empliment
const displayNewsPart=(data,catName) =>{
    const news=data.data;
    const categoryName=catName;
    displayItemCountContainer(news,categoryName);
    displayCart(news)
}
// item count container
const displayItemCountContainer=(news,categoryName)=>{
    const container=document.getElementById("itemCountContainer");
    container.innerHTML=`
    <p class="ps-3 fw-bolder fs-4 py-3 bg-white rounded">${news.length} Itmes Founds For The Category ${categoryName}</p>
    `;
}
// news container
const displayCart=(news)=>{
    let parentContainer=document.getElementById("newsContainer");
    parentContainer.innerHTML='';
    news.forEach((sNews)=>{
        let childContainer = document.createElement("div");
        childContainer.innerHTML=`
        <div class="card mb-4 border-0 rounded shadow" style="max-width: 100%;">
            <div class="row py-3 g-0">
                <div class="col-md-3 d-flex justify-content-center">
                    <img src="${sNews.thumbnail_url}" class="img-fluid rounded-start " alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body d-flex flex-column gap-3">
                        <h5 class="card-title fs-3 fw-bolder">${sNews.title}</h5>
                        <p class="card-text">${sNews.details.length > 400 ? `${sNews.details.slice(0,400)}...` : `${sNews.details}`}</p>
                        <div class='row align-items-center'>
                            <div class="col d-flex align-items-center gap-3">
                                <div>
                                    <img src="${sNews.author.img}" class="rounded-pill" width="50px" alt="...">
                                </div>
                                <div class="d-flex flex-column justify-content-center mt-3">
                                    <p class="fw-bold mb-0">${sNews.author.name ? `${sNews.author.name}` : `Not Available`}</p>
                                    <p class="mt-1">${sNews.author.published_date ? `${sNews.author.published_date}` : `Not Available`}</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center gap-2 fontSize"><i class="fa-solid fa-eye"></i> ${sNews.total_view ? `${sNews.total_view}` : `No View`}</div>
                            <div class="col d-flex justify-content-center fontSize">${ratings(sNews.rating.number)}<i class="fa-solid fa-star-half"></i></div>
                            <div class="col d-flex justify-content-end fontSize">
                                  <i class="fa-solid fa-arrow-right me-5 fw-bold"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `
      parentContainer.appendChild(childContainer);
    })
}
// ratings star
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