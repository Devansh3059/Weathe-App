window.onload = function () {
    //window.addEventListener("load",()=>{//load means,whenever the windows load, this function will run
    var long;
    var lat;
    var temperatureDescription = document.querySelector(".temperature-description");
    var temperatureDegree = document.querySelector(".temperature-degree");
    var locationTimezone = document.querySelector(".location-timezone");
    var temperatureSection = document.querySelector(".temperature");
    var temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {//navigator.geolocation means if this thing exixts in the browser, the do this
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/6f235003a3408b912df94dbcad141c32/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })//.then means after contacting server is over the do ..... also converting it to json
                .then(data => {
                    // console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    //Printing DOM Elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                        //Changing to celcius formula
                    var celcius = ((temperature - 32) * (5 / 9)).toFixed(1);
                        //set icons
                    setIcons(icon,document.querySelector(".icon"))//func invoked it has two args 1..icon 2. iconID

                    //switching between F and C
                    temperatureSection.addEventListener("click",function(){
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temmperatureDegree.textContent = celcius;
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
        function setIcons(icon,iconID){
            const skycons = new Skycons({color: "white"})//skycons library initiated
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();//this is done because form api we get "-" is the summary and in skycons documentation we have "_"
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        }

    }
    //});
}
//error occurs while using this on local host hence we use heroku to act as a proxy
//for icons used sycons.com
//went to gitHub and download ZIP file and copied skycons.js to the project