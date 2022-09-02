const gettingCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res) => res.json())
    .then((data) =>placingCategory(data.data.news_category))
}
gettingCategory();

const placingCategory =(catagories)=>{
    const catagotryContainer=document.getElementById("catagotryContainer");
    let childContainer = document.createElement("div");
    childContainer.className='row gap-3';
    catagories.forEach(catagory => {
        let colContainer = document.createElement("div");
        colContainer.className="col py-2 text-center ";
        colContainer.innerHTML=`
        <button class="bg-transparent border-0" onclick="">${catagory.category_name}</button>
        `;
        childContainer.appendChild(colContainer);
    });
    catagotryContainer.appendChild(childContainer);
}