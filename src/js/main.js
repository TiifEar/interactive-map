
let isloading
let marks = {}
let descriptions = {}

function createEvent(ico){
  ico.addEventListener('mouseover', (event) => {
    event.target.parentNode.parentNode.querySelector('.description').classList.remove('hidd')
  });
  ico.addEventListener('mouseout', (event) => {
    event.target.parentNode.parentNode.querySelector('.description').classList.add('hidd')
  });
return ico
}

function createMarkersIco(type){
  let ico = document.createElement("img")
  let div = document.createElement("div")
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
  div.appendChild(ico)
  div.classList.add('position')
return div
}

function addScreanToDescription(img){
  let screan= document.createElement("img")
  screan.src=img
  return screan
}
function addTextToDescription(description){
  let textD = document.createElement("p");
  textD.appendChild(document.createTextNode(description))
  textD
  return textD
}

function createMarkersDescription(description, img){
  let div = document.createElement("div")
  div.classList.add('hidd','description')
  let p=addTextToDescription(description)
  let screan=addScreanToDescription(img)
  div.appendChild(screan)
  div.appendChild(p)
  return div
}

function addStashes(x, y, img, description, type) {
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

function filterHidd(id) {
const markElements = document.querySelectorAll("."+id);
console.log(id)

markElements.forEach(element => {
  if (element.classList.contains('hidd')) {
    element.classList.remove('hidd')
  }
  else {element.classList.add('hidd');}
});

}



async function loadDescription() {
  const lang = {
    en: "64406981ebd26539d0aea619",
    uk: "64406972c0e7653a05a7e624"
  }[document.getElementById("cars").value];

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${lang}?meta=false`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    descriptions = data;
    console.log('Data loaded successfully:', descriptions);
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    alert('Sorry, there was a problem loading the data. Please try again later.');
  }
}

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

// запуск
function start(){
  isloading=true
  loadMarks().then(() => {
    loadDescription().then(() => {
      for (const key in marks) {
        addStashes(x=marks[key].coordinates.x, y=marks[key].coordinates.y, img=marks[key].img, description=descriptions[key], type=marks[key].type)
      }
      isloading=false
    });
  });
}


start();

function moveConroll() {
  const filterControl = document.getElementById("filterControl");
  const controll = document.getElementById("controll");
  const showHidd = document.getElementById("showHidd");
  const width = filterControl.offsetWidth;
  


  if (filterControl.classList.contains('Controllhidd')) {
    filterControl.classList.remove('Controllhidd');
    showHidd.innerHTML = "&#60;";
    controll.style.left = 0;
  } else {
    filterControl.classList.add('Controllhidd');
    showHidd.innerHTML = "&#62;";
    controll.style.left = -width + "px";
  }
  }

function showSelectedValue() {
  start()
}