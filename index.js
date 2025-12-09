let environment;

const details=document.getElementById('details')
const box=document.getElementById('box')
const search=document.querySelector('.search-button')
const auto="url('images/default.jpg')";
document.body.style.backgroundImage=auto
const err=document.getElementById('error')




const left=document.createElement('section')
left.className="left"
const cityDetails=document.createElement('div')
cityDetails.className="city_details"
const cityName=document.createElement('h1')
cityName.id="cityn"
const state=document.createElement('h2')
state.id="state"
const time=document.createElement('h3')
time.id="time"
const leftDetails=document.createElement('section')
leftDetails.className="left-details"
const windSpeed=document.createElement('p')
windSpeed.id="wind_speed"
const humidity=document.createElement('p')
humidity.id="humidity"
const visibility=document.createElement('p')
visibility.id="visibility"

cityDetails.append(cityName,state,time)
leftDetails.append(windSpeed,humidity,visibility)
left.append(cityDetails,leftDetails)

const right=document.createElement('section')
right.className="right"
const weather=document.createElement('div')
weather.className="weather"
const icon=document.createElement('img')
icon.id="icon"
const temp=document.createElement('div')
temp.id="temp"
const feel=document.createElement('p')
feel.id="feel"
const rightDetails=document.createElement('section')
rightDetails.className="right-details"
const dewPoint=document.createElement('p')
dewPoint.id="dew-point"
const atm=document.createElement('p')
atm.id="atm"

weather.append(icon,temp)
rightDetails.append(dewPoint,atm)
right.append(weather,feel,rightDetails)


details.append(left,right)



box.addEventListener('keydown',function(event){

    if(event.key==='Enter'){
        event.preventDefault();

        const city=box.value;

        details.scrollIntoView({behavior:'smooth'});




        getinfo(city);




    
    }
});


search.addEventListener('click',function(event){


        event.preventDefault();

        const city=box.value;

        details.scrollIntoView({behavior:'smooth'});




        getinfo(city);


    

});

function getinfo(city){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key={put yout key here}=${city}&days=1&aqi=yes&alerts=yes`)

    .then(response =>response.json())
    .then(data => { ;
        if(data.error){
            console.log('errori');
            err.innerText="Oops!!! This city does not exists"
            err.style.display="block";

            cityName.innerText=''
            state.innerText=''
            time.innerText=''
            temp.innerText=''
            feel.innerText= ''
            humidity.innerText=''
            windSpeed.innerText=''
            dewPoint.innerText=''
            visibility.innerText=''
            atm.innerText=''
            icon.src=''
            environment=''
            changebackground();
        }
        else{         err.style.display='none';
            
                      console.log(data.location.name)
                      cityName.innerText=city.charAt(0).toUpperCase()+city.slice(1);
                      state.innerText=data.location.region+' , '+data.location.country;
                      time.innerText=data.location.localtime;
                      temp.innerText=Math.round(data.current.temp_c)+' C';
                      feel.innerText= "Feels like "+Math.round(data.current.feelslike_c)+ 'C'+ ". "+data.current.condition.text+" sky.";
                      humidity.innerText='Humidity: ' +data.current.humidity +'%';
                      windSpeed.innerText=data.current.wind_mph+' mph';
                      dewPoint.innerText='Dew Point : '+data.current.dewpoint_c+'C';
                      visibility.innerText='Visibility :'+data.current.vis_km+'km';
                      atm.innerText=data.current.pressure_mb+'hpa';
                      icon.src="https:" + data.current.condition.icon;
                      environment=data.current.condition.text;
                      changebackground();
        }                  
        })

    .catch(error => console.error('Error:',error));
}

function changebackground(){

    const weatherImages={
        "Sunny": "url('images/sunny.jpg')",
        "Clear": "url('images/sunny.jpg')",
        "Clouds": "url('images/cloudy.jpg')",
        "Rain": "url('images/rainy.jpg')",
        "Light rain": "url('images/rainy.jpg')",
        "Heavy rain": "url('images/rainy.jpg')",
        "Snow": "url('images/snow.jpg')",
        "Thunderstorm": "url('images/storm.jpg')",
        "Drizzle": "url('images/rainy.jpg')",
        "Mist": "url('images/mist.jpg')",
        "Smoke": "url('images/mist.jpg')",
        "Haze": "url('images/mist.jpg')",
        "Fog": "url('images/mist.jpg')"
    }

    const image=weatherImages[environment];

    document.body.style.backgroundImage=image;



}
