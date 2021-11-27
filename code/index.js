const input = document.querySelector("select");
const div = document.querySelector(".container")
const li1 = document.querySelector("li");
const li2 = document.querySelector("li");
let ul = document.querySelector(".flex");

let filterData ;
function displayUI(data){
   div.innerHTML = ""
   data.forEach((elm) => {
    let ul = document.createElement("ul")
    ul.classList.add("flex")
    let li1 = document.createElement("li")
    li1.classList.add("flex-45")
    let img = document.createElement("img")
    img.classList.add("image-width")
    img.src = elm.imageUrl;
    li1.append(img);
    let li2 = document.createElement("li")
    li2.classList.add("flex-45")
    let span = document.createElement("span")
    span.innerText = elm.newsSite
    let p = document.createElement("p")
    p.innerText = elm.title;
    let button = document.createElement("button")
    let a = document.createElement("a")
    a.innerText = "Read More"
    a.href = elm.url;
    button.append(a)
    li2.append(span,p,button)
    ul.append(li1,li2)
    div.append(ul)
   })
}



function option(arr){
  arr.forEach((elm) => {
     let option = document.createElement("option")
     option.innerText = elm;
     input.append(option)
  })
}

function handle(event){
   let filter =  filterData.filter(news => news.newsSite === event.target.value)
   displayUI(filter)
}


fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=30")
.then((res) => {
   if(!res.ok){
      throw new Error(`Error happened: ${res.status}`)
   }
   return res.json()
})
.then((data)=>{
   displayUI(data)
   let arr = Array.from(new Set((data.map((elm) => {
      return elm.newsSite
   }))))
   option(arr)
   filterData = data;
})
.catch((error) => {
   div.innerText = error
})


input.addEventListener("change" , handle)