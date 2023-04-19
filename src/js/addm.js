let isloading
let marks = {}
let descriptions = {}

function createEvent(ico){
  ico.addEventListener('mouseover', (event) => {
    event.target.parentNode.querySelector('.description').classList.remove('hidd')
  });
  ico.addEventListener('mouseout', (event) => {
    event.target.parentNode.querySelector('.description').classList.add('hidd')
  });
return ico
}

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

//Завантаження данних
function loadDescription(){
  return fetch('https://api.jsonbin.io/v3/b/64403ed0ace6f33a220eb7ea?meta=false')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      descriptions = data;
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      alert("Нажаль трапилась якась проблема");
    });
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
    // console.log(marks);
    loadDescription().then(() => {
      // console.log(descriptions);
      for (const key in marks) {
        addStashes(x=marks[key].coordinates.x, y=marks[key].coordinates.y, img=marks[key].img, description=descriptions[key], type=marks[key].type)
      }
    });
  });
  isloading=false
}

start();



function showSelectedValue() {
  var select = document.getElementById("cars");
  var selectedValue = select.options[select.selectedIndex].value;
}