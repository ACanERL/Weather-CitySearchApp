const containerh=document.getElementById("dataC")
const error404 = document.querySelector('.not-found');
const dot=document.getElementById("dot");
const image = document.querySelector('.weather-box img');
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';  // API'nin URL'si
  // arama yapmak icin
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.trim();;
    
    if (searchText === '') {
         alert('Need location name');
    } else {
      const parameters = {  // Parametrelerin nesne olarak tanımlandığı örnek bir parametre listesi
        q: searchText.toString(),
        lang:'tr',
        appid: '3608b5af0bd76cfa46a22c66e213928e',
        metric:'metric'
      };
  
      // Parametreleri URL'ye ekleyerek dinamik bir URL oluştur
      const url = new URL(apiUrl);
      Object.keys(parameters).forEach(key => url.searchParams.append(key, parameters[key]));
  
      // API'ye GET isteği gönder
      fetch(url)
     .then(response => response.json())
     .then(data => {
      if (data.cod === '404') {
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        containerh.style.display='none';
        image.style.display='none';
        console.log("need real city name")
       }else{
        error404.style.display = 'none';
        containerh.style.display='block';
        image.style.display='block';
        dot.style.display='none';
       }
      // API'den dönen verileri kullan
      const  main=data.main;
      // console.log(data);
      // console.log("Descp:",data.weather[0].description)
      //°C = °K – 273.15
      var celsius=main.temp-273.15
      containerh.innerHTML=`
          <h3>Sicaklik: ${celsius.toFixed(2)} °C</h3>
          <h3>Sehir: ${data.name}</h3>
          <h3>Nem Orani: %${main.humidity}</h3>
          <h3 class="gk">Gökyüzü: ${data.weather[0].description}</h3>
      `;
      switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'clear.png';
            break;

        case 'Rain':
            image.src = 'rain.png';
            break;

        case 'Snow':
            image.src = 'snow.png';
            break;

        case 'Clouds':
            image.src = 'cloud.png';
            break;

        case 'Haze':
            image.src = 'mist.png';
            break;

        default:
            image.src = '';
    }

      searchInput.value='';
      console.log("Main Dizi Icindekiler:",main)
    })
    .catch(error => {
      // Hata durumunda hata mesajını yakala
      console.error('Hata:', error);
    });
    }
  });





