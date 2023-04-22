const content= document.getElementsByClassName('content')
const controll =document.getElementById("controll")
const loadingIco = document.getElementById("loading")
const showHidd = document.getElementById("showHidd");
const filterControl = document.getElementById("filterControl");
const width = filterControl.offsetWidth;

let isloading
let marks = {}
let descriptions = {}

//створення міток

//створення події для відображення опису мітки
function createEvent(ico){
  ico.addEventListener('mouseover', (event) => {
    event.target.parentNode.querySelector('.description').classList.remove('hidd')
  });
  ico.addEventListener('mouseout', (event) => {
    event.target.parentNode.querySelector('.description').classList.add('hidd')
  });
return ico
}

//створення позначки для мітки
function createMarkersIco(type){
  let ico = document.createElement("img")
  switch (type) {
    case "stashStrilec":
      ico.src="https://i.ibb.co/SrQt6YV/image.webp"
      break;
    case "stash":
      ico.src="https://i.ibb.co/SrQt6YV/image.webp"
      break;
  }
  ico.classList.add('markIco')
  ico=createEvent(ico)
return ico
}

//створення скріншоту для мітки
function addScreanToDescription(img){
  let screan= document.createElement("img")
  screan.src=img
  return screan
}

//створення текстового опису для мітки
function addTextToDescription(description){
  let textD = document.createElement("p");
  textD.appendChild(document.createTextNode(description))
  textD
  return textD
}

//створення контейнеру з описом та скріншотом для мітки
function createMarkersDescription(description, img){
  let div = document.createElement("div")
  div.classList.add('hidd','description')
  let p=addTextToDescription(description)
  let screan=addScreanToDescription(img)
  div.appendChild(screan)
  div.appendChild(p)
  return div
}

//створення мітки на мапі
function addStashes(id, x, y, img, description, type) {
    const div = document.createElement("div");            //Створення контейнеру
    div.classList.add('mark', type);                      //Прив'язка класів перший відповідає за стилізацію другий за фільтрацію та тип позначки
    //Встановлення координат
    div.style.top=y+"%";
    div.style.left=x+"%";

    let ico = createMarkersIco(type);                     //Створення позначки
    let p = createMarkersDescription(description, img);   //Створення опису
    //Вставка елементів у контейнер
    div.appendChild(ico);
    div.appendChild(p)
    
    document.getElementsByClassName('container')[0].appendChild(div);
  }


//налаштування фільтрів

//приховування міток через фільтр
function filterHidd(id) {
  const markElements = document.querySelectorAll("."+id);
  const checkBFilter = document.getElementById(id)

  if (checkBFilter.checked){
    markElements.forEach(element =>{
      element.classList.remove('hidd')
    })
  }
  else{
    markElements.forEach(element =>{
      element.classList.add('hidd')
    })}
}

//приховування міток після зміни мови відповідно до обраних фільтрів
function hiddAfterChangeLang(){
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      filterHidd(checkbox.id)
    }
  });
  isloading=false
  loading(isloading)
}

//видалення існуючих міток. наявне через криво написану побудову міток та відсутність можливості змінити лише опис при зміні мови
function clearMarks(){
  const elements = document.querySelectorAll('.mark');
  elements.forEach((element) => {
    element.remove();
  });
}

//обробник зміни мови
function changeLang() {
  clearMarks()          //видалення старих міток
  start()               //повторне завантаження міток
}

//приховування блоку фільтрів
function moveConroll() {
  if (filterControl.classList.contains('Controllhidd')) {
    controll.style.left = 0;
  } else {
    controll.style.left = -width -20+ "px";
  }
  showHidd.querySelector("p").classList.toggle('flip')
  filterControl.classList.toggle('Controllhidd');
}


//завантаження данних

//завантаження текстового опису міток
async function loadDescription() {
  const lang = {
    en: "64406981ebd26539d0aea619",
    uk: "64406972c0e7653a05a7e624"
  }[document.getElementById("langs").value];
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${lang}?meta=false`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    descriptions = data;
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    alert('Sorry, there was a problem loading the data. Please try again later.');
  }
}


//завантаження міток
function loadMarks(){
  return fetch('https://api.jsonbin.io/v3/b/64400dcbebd26539d0ae6cda?meta=false')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      marks = data;
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      alert("Нажаль трапилась якась проблема");
    });
}





// Створення міток на карті
function start(isloading){
  isloading=true
  loading(isloading)
  
  Promise.all([this.loadMarks(), this.loadDescription()]).then(()=> {
    for (const key in marks) {
            addStashes(id=marks[key], x=marks[key].coordinates.x, y=marks[key].coordinates.y, img=marks[key].img, description=descriptions[key], type=marks[key].type)
          }
          hiddAfterChangeLang()
          
  })
}

function loading(isloading){
  if (isloading)
  {
    loadingIco.classList.remove('hiddLoad')
    content[0].classList.add('hidd')
  }
  else {
    loadingIco.classList.add('hiddLoad')
    content[0].classList.remove('hidd')
  }
}

start();