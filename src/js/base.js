class Marker {
  constructor(id, x = 50, y = 50, img = 'img/default.png', description = '', type = 'type1') {
    this.id = id;
    this.x = x;
    this.y = y;
    this.img = img;
    this.description = description;
    this.type = type;
  }

}

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
  

  function start(){
    const markers = [];

    Promise.all([this.loadMarks(), this.loadDescription()]).then(()=> {
      for (const key in marks) {
        const marker = new Marker(id=marks[key], x=marks[key].coordinates.x, y=marks[key].coordinates.y, img=marks[key].img, description=descriptions[key], type=marks[key].type);
        markers.push(marker);
        }
            // hiddAfterChangeLang()
    })
    return markers;
  }

  function test(){
    console.log(start())
  }
  test()