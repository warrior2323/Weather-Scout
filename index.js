let environment;
import { API_KEY } from './config.js';

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

const about=document.getElementById("about")
const aboutDetails=document.getElementById('about-details')
const aboutText=document.createElement("p")
aboutText.id="about-text"
const logo=document.createElement('img')
logo.src="./weather.png.png"
logo.id="logo-img"

aboutDetails.append(aboutText,logo)
aboutText.innerText="This Weather Application allows you to get the info of the weather of any place around the world. It is built in HTML , CSS and Javascript. "


const footer=document.getElementById("footer")
const social=document.getElementById("social")
const github=document.createElement("a")
github.innerText="Github"
github.href="https://github.com/warrior2323"
const instagram=document.createElement("a")
instagram.innerText="Instagram"
instagram.href="https://www.instagram.com/"
const linkedin=document.createElement("a")
linkedin.innerText="LinkedIn"
linkedin.href="https://www.linkedin.com/in/aditya-tyagi-84907a369/"
social.append(github,instagram,linkedin)


const condition=document.createElement("a")
condition.innerText="Terms and Conditions"
const privacy =document.createElement("a")
privacy.innerText="Privacy Policy"
const copyRight=document.createElement("a")
copyRight.innerText="Copyright Information"
const terms=document.getElementById("terms")
terms.append(condition,privacy,copyRight)
const rights=document.createElement('p')
rights.innerText="© 2025 WeatherScout. All rights reserved."
rights.id="rights"
footer.append(rights)

const loginBtn=document.getElementById("login-button")
const loginBox=document.getElementById("login-box")
const loginForm=document.getElementById("login-form")
const logoutBtn=document.getElementById("logout-button")
const greeting=document.getElementById("greeting")
const logoutBox=document.getElementById("not-login")
const signupBtn=document.getElementById("sign-up")
const userNameForm=document.getElementById("username-input")
const closeBtn=document.querySelector(".close-btn")
const list=document.querySelector(".history-list");

closeBtn.addEventListener("click",(e)=>{
    loginBox.style.display="none";
})

loginBtn.addEventListener('click',function(event){
    loginBox.style.display="flex";
})

logoutBtn.addEventListener('click',(e)=>{
    localStorage.removeItem("currentUser");
    logoutBox.style.display="None";
    loginBtn.style.display="block";
    userNameForm.style.display="none";
    list.style.display="none";

})

signupBtn.addEventListener("click",(e)=>{
    userNameForm.style.display="block"
})

loginForm.addEventListener('submit',(e)=>{
    event.preventDefault();

    const email=document.getElementById("email-input").value;
    const password=document.getElementById("password-input").value;
    const userName=userNameForm.value;

    if(email==="" || password===""){
        alert("INVALID EMAIL OR PASSWORD!")    
        return;
        
    }

    if(userName!="" && userNameForm.style.display==="block"){
        
        const userData={
        username:userName,
        password:password,
        history:[]
        }

        localStorage.setItem(email,JSON.stringify(userData));
        localStorage.setItem("currentUser",email);
        updateUI(userName);
        loginBox.style.display="none";
        showhistory();
        document.getElementById("email-input").value=""
        document.getElementById("password-input").value=""
        document.getElementById("username-input").value=""
    }

    else{
        if(userNameForm.style.display==="none"){
        const userData=localStorage.getItem(email);
        if(userData===null){
            alert("INVALID EMAIL OR PASSWORD")
        }
        else{
        const storedData=JSON.parse(userData);
        const storedPassword=storedData.password;
        const storedUserName=storedData.username;
        if(password===storedPassword){
            localStorage.setItem("currentUser",email)
            updateUI(storedUserName);
            loginBox.style.display="none";
            showhistory();
        document.getElementById("email-input").value=""
        document.getElementById("password-input").value=""
        document.getElementById("username-input").value=""
        }
        else{
            alert("Invalid Email or password!");
        }
    }
    }
    else{
        alert("INVALID USERNAME")
    }
    }


})

window.onload=()=>{
    const savedEmail=localStorage.getItem("currentUser");


    if(savedEmail){    
        const userData=localStorage.getItem(savedEmail);
        const storedData=JSON.parse(userData);
        const userName=storedData.username;           
        updateUI(userName);
    }
}


function updateUI(userName){
    loginBtn.style.display="none";
    logoutBox.style.display="block";
    greeting.innerText=`Hello, ${userName}`;

}

function sethistory(city){

    const email=localStorage.getItem("currentUser");
    if(!email) return 
    const storedData=JSON.parse(localStorage.getItem(email));
    const history=storedData.history;
    
    if(!history.includes(city)){
        history.push(city);
        storedData.history=history;
        localStorage.setItem(email, JSON.stringify(storedData));
    }
}

function showhistory(){
    const email=localStorage.getItem("currentUser");
    if(!email) return ;
//the item which is stored in browser's local storage is stored in the form of string so parse is used to convert the string back into an object.

    const storedData=JSON.parse(localStorage.getItem(email));
    if(!storedData) return;


    const history=storedData.history;

    list.innerHTML=""
    list.style.display="block";
    let count=0;
    
    history.forEach((city)=>{
        count++;
        if(count===6){
            return;
        }
        const tag=document.createElement("button");
        tag.className='list-button'
        tag.innerText=city;
        const cross=document.createElement("i");
        cross.className="fa-solid fa-xmark";
        cross.style.cursor="pointer";

        cross.onclick=(e)=>{
            e.stopPropagation();//this will prvent the getinfo function to execute as when i click the tag the button is also automatically clicked.
            tag.remove();
            deletehistory(city);
           
        }

        tag.onclick=()=>{
            getinfo(city);
            box.value=city;
        };
        list.appendChild(tag);
        tag.appendChild(cross);

        
    })
}
function deletehistory(cityToDelete){
    const email=localStorage.getItem("currentUser");
    const storedData=JSON.parse(localStorage.getItem(email));
    
    storedData.history=storedData.history.filter(city => city!=cityToDelete);

    localStorage.setItem(email,JSON.stringify(storedData));

}

box.addEventListener('keydown',function(event){

    if(event.key==='Enter'){
        event.preventDefault();//will prevent the page from reloading
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
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=yes`)

    .then(response =>response.json())
    .then(data => { ;
        if(data.error){
            console.log('errori');
            err.innerText="City not found. Please check the spelling and try again"
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
        else{         
                      err.style.display='none';
                      sethistory(city);       
                      showhistory();      
                      console.log(data.location.name)
                      cityName.innerText=city.charAt(0).toUpperCase()+city.slice(1);
                      state.innerText=data.location.region+' , '+data.location.country;
                      time.innerText=data.location.localtime;
                      temp.innerHTML=Math.round(data.current.temp_c)+`25\u00B0C`
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
