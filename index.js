// category fetch
const gettingCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res) => res.json())
    .then((data) =>placingCategory(data))
    .catch((err)=>{
        console.error(err);
        displayErr();
        loader(false);
    })
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
    .catch((err)=>{
        console.log(err);
        displayErr();
        loader(false);
    });
    loader(true)
}
// news data empliment
const displayNewsPart=(data,catName) =>{
    const news=data.data;
    const categoryName=catName;
    displayItemCountContainer(news,categoryName);
    document.getElementById("sortBarContainer").classList.remove("d-none");
    document.getElementById("todaysPickBtn").classList.add("parpelback");
    document.getElementById("trandingBtn").classList.remove("parpelback");
    displayCart(news);
    document.getElementById("trandingBtn").addEventListener("click", (e) =>{
        [...e.target.parentElement.children].forEach((child) =>{
            child.classList.remove("parpelback");
        })
        e.target.classList.add("parpelback");
        sortingNewsByTranding(news,categoryName);
    })
    document.getElementById("todaysPickBtn").addEventListener("click", (e) =>{
        [...e.target.parentElement.children].forEach((child) =>{
            child.classList.remove("parpelback");
        })
        e.target.classList.add("parpelback");
        displayCart(news);
        displayItemCountContainer(news,categoryName);
        
    });
    dropdownBtn("DefaultBtn",()=>{
        displayCart(news);
        displayItemCountContainer(news,categoryName);
    });
    dropdownBtn("topRatedBtn",()=>{
        let editedNews=news.filter((newz)=>{
            return newz.rating.badge=="Excellent"
        })
        displayCart(editedNews);
        displayItemCountContainer(editedNews,categoryName);
    });
    dropdownBtn("TPBtn",()=>{
        let editedNews=news.filter((newz)=>{
            return newz.others_info.is_todays_pick==true;
        })
        displayCart(editedNews);
        displayItemCountContainer(editedNews,categoryName);
    })
}
// sorting by tranding
const sortingNewsByTranding=(news,categoryName)=>{
    let trandingNews=news.filter((sNews)=>{
        return sNews.others_info.is_trending==true;
    });
    displayCart(trandingNews);
    displayItemCountContainer(trandingNews,categoryName,true);
}
// item count container
const displayItemCountContainer=(news,categoryName,tranding=false)=>{
    const container=document.getElementById("itemCountContainer");
    container.innerHTML=`
    <p class="ps-3 fw-bolder fs-4 py-3 bg-white rounded">${news.length}${tranding ? " Tranding" : ""} Itmes Founds For The Category ${categoryName}</p>
    `;
}
// news container
const displayCart=(news)=>{
    let parentContainer=document.getElementById("newsContainer");
    parentContainer.innerHTML='';
    if (news.length==0) {
        parentContainer.innerHTML=`<p class='container'>No News Avilable</p>`;
    }
    console.log(news);
    news.sort((a,b)=>{
        if(a.total_view>b.total_view){
            return -1;
        }else if(a.total_view<b.total_view){
            return 1;
        }else{
            return 0;
        }
    })
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
                        <div class='row align-items-center gap-2'>
                            <div class="col-md d-flex align-items-center gap-3">
                                <div>
                                    <img src="${sNews.author.img}" class="rounded-pill" width="50px" alt="...">
                                </div>
                                <div class="d-flex flex-column justify-content-center mt-3">
                                    <p class="fw-bold mb-0">${sNews.author.name ? `${sNews.author.name}` : `Not Available`}</p>
                                    <p class="mt-1">${sNews.author.published_date ? `${sNews.author.published_date}` : `Not Available`}</p>
                                </div>
                            </div>
                            <div class="col-md d-flex justify-content-md-center align-items-center gap-2 fontSize"><i class="fa-solid fa-eye"></i> ${sNews.total_view ? `${sNews.total_view}` : `No View`}</div>
                            <div class="col-md d-flex justify-content-md-center fontSize">${ratings(sNews.rating.number)}<i class="fa-solid fa-star-half"></i></div>
                            <div class="col-md d-flex justify-content-end fontSize">
                                  <i class="fa-solid fa-arrow-right me-5 fw-bold" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="newsDetailFetch('${sNews._id}')"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `
      parentContainer.appendChild(childContainer);
    })
    loader(false);
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
// getting news details by id
const newsDetailFetch=(id)=>{
    let url=`https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayModal(data))
    .catch((err)=>{
        console.error(err);
        displayErr();
        loader(false);
    });
}
// modal display
const displayModal=(data)=>{
    const details = data.data[0];
    console.log(details);
    let title=document.getElementById("exampleModalLabel");
    title.innerHTML=`<h5 class="card-title fs-3 fw-bolder">${details.title}</h5>`;
    const parentContainer=document.getElementById("modal-content");
    parentContainer.innerHTML="";
    let childContainer=document.createElement("div");
    childContainer.innerHTML=`
        <div class="card mb-4 border-0" style="max-width: 100%;">
            <div class="row py-3 g-0">
                <div class="col-md-4 d-flex justify-content-center">
                    <img src="${details.image_url}" class="rounded-start img-fluid moodal-img"  alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body d-flex flex-column gap-3">
                        <p class="card-text">${details.details}</p>
                        <div class='row align-items-center'>
                            <div class="col d-flex align-items-center gap-3">
                                <div>
                                    <img src="${details.author.img}" class="rounded-pill" width="50px" alt="...">
                                </div>
                                <div class="d-flex flex-column justify-content-center mt-3">
                                    <p class="fw-bold mb-0">${details.author.name ? `${details.author.name}` : `Not Available`}</p>
                                    <p class="mt-1">${details.author.published_date ? `${details.author.published_date}` : `Not Available`}</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-md-center align-items-center gap-2 fontSize"><i class="fa-solid fa-eye"></i> ${details.total_view ? `${details.total_view}` : `No View`}</div>
                            <div class="col d-flex justify-content-md-center fontSize">${ratings(details.rating.number)}<i class="fa-solid fa-star-half"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `
      parentContainer.appendChild(childContainer);
}
// loader
const loader =(condition) => {
    if(condition){
        document.getElementById("loader").classList.remove("d-none");
    }else{
        document.getElementById("loader").classList.add("d-none");
    }
}
// error msg diplay
const displayErr=()=>{
    const errorContainer=document.getElementById("errContainer");
    errorContainer.classList.remove("d-none");
}
// blogPart
document.getElementById("blog-btn").addEventListener('click', function(e) {
    [...document.getElementsByClassName("nav-link")].forEach((link)=>link.parentElement.classList.remove("parpelcolor"));
    e.target.classList.add("parpelcolor");
    document.getElementById("main-display").innerHTML='';
    displayBlogPart();
})
//display blogPart 
const displayBlogPart =()=>{
    const parentElement=document.getElementById("main-display");
    const childContainer=document.createElement("div");
    childContainer.classList.add("accordion");
    childContainer.id="accordionExample";
    childContainer.innerHTML=`
    <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Difference between Var,Let & Const? 
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared. They are all hoisted to the top of their scope. But while var variables are initialized with undefined , let and const variables are not initialized</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Normal function vs Arrow function?
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <p>Regular functions created using function declarations or expressions are constructible and callable. Since regular functions are constructible, they can be called using the new keyword. However, the arrow functions are only callable and not constructible, i.e arrow functions can never be used as constructor functions</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Uses of tamplate string
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <p>template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders).</p>

      </div>
    </div>
  </div>
    `
    parentElement.appendChild(childContainer);
}
// dropdown btn
const dropdownBtn=(id,cb)=>{

    console.log([...document.getElementsByClassName("rightSidebtn")[0].children])
    document.getElementById(id).addEventListener("click",(e)=>{
        [...document.getElementsByClassName("rightSidebtn")[0].children].forEach((child)=>{
            child.classList.remove("parpelback")
        })
        document.getElementById("dropdownMenuButton1").innerText=e.target.innerText;
        cb()
    });
}
