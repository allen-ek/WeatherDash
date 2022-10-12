var APIKey= "6cda419b1462d4e231cfcd1dac976851";
var cityNames  = JSON.parse(localStorage.getItem('lsCitynames'))||[];
var queryURL ="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var forecastURL="https:api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var inputEl= document.getElementById("inputForm");
var srchBtnEl= document.getElementById('searchBtn');
var searchdis=document.getElementById('searchBar');
var forDis=document.getElementById('displayForcast');
console.log("test");
var longit='';
var latit='';
var today = moment().format('MMM Do YY');
var day1= moment(today).add(1,'d').format('MMM Do YY');
var day2= moment(today).add(2,'d').format('MMM Do YY');
var day3= moment(today).add(3,'d').format('MMM Do YY');
var day4= moment(today).add(4,'d').format('MMM Do YY');
var day5= moment(today).add(5,'d').format('MMM Do YY');

srchBtnEl.addEventListener('click',function(event){
    
    console.log("test");
    event.preventDefault();
    
    console.log(inputEl.value);
    cityNames.push(inputEl.value);
    //put check loop for valid server response
    localStorage.setItem('lsCitynames',JSON.stringify(cityNames));
    
    if(cityNames!=null){
        for(i=0;i<5||i<cityNames.length;i++){
        console.log(cityNames[i]);
        var but=document.createElement('button');
        but.innerHTML=(cityNames[i]);
        document.body.appendChild(but);
        }
    }
    //function to append buttons 
    // inputEl.value="San Diego";
   // console.log(inputEl.value);
    //calls fetch function
    getApi();
   

});

function getApi(){
    var requestURL="https://api.openweathermap.org/data/2.5/weather?q="+inputEl.value+"&appid=6cda419b1462d4e231cfcd1dac976851";
    fetch(requestURL)
        .then(function(response){
            
            return response.json();
        })
         .then(function(data){
        console.log(data);
        
        console.log(data.coord.lat);
        console.log(data.coord.lon);
        longit=data.coord.lon;
        latit=data.coord.lat;
        
        //convert temp
        var ftemp=parseInt(data.main.temp);
        ftemp= Math.round((ftemp-273.15)*9/5+32);
        var calcTime=Date(data.dt,'DD, MMM, YYYY');
        //display current day info dynamically
        searchdis.append(today);
        searchdis.append("City:"+data.name+'\n');
        searchdis.append('temp'+ftemp+'Farenheit'+'\n');
        searchdis.append(' Wind Speed:'+data.wind.speed+'mph'+'\n');
        searchdis.append('humidity'+data.main.humidity+'%'+'\n');
        var image=document.createElement('img');
        image.setAttribute('src',"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
        
        searchdis.append(image);
        
        var forecastURL="https:api.openweathermap.org/data/2.5/forecast?lat="+latit+"&lon="+longit+"&appid=6cda419b1462d4e231cfcd1dac976851";
        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            for(i=0;i<=40;i+=8){
                var ftemp=parseInt(data.list[i].main.temp);
                ftemp= Math.round((ftemp-273.15)*9/5+32);
                forDis.append(data.list[i].dt_txt);
                forDis.append('temp'+ftemp+'Farenheit');
                forDis.append(' Wind Speed:'+data.list[i].wind.speed+'mph'+'\n');
                forDis.append('Humidity:'+data.list[i].main.humidity+'%'+'\n');
                var images=document.createElement('img');
                images.setAttribute('src',"https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
            
                searchdis.append(images);

        }
        })

    })
    
    
}
    //uses found values in the preveious json obj of longitute latitude to make another fetch response using th eapi call
   // function forecast(data){
   //     var forecastURL="https:api.openweathermap.org/data/2.5/forecast?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=6cda419b1462d4e231cfcd1dac976851";
 //       fetch(forecastURL)
   //     .then(function(response){
  //        return response.json();
   //     })
  //      .then(function(data){
 //          console.log(data);
  //          //display 5 day forecast dynamically
  //          forDis.append("hello");
    
  //      })

  //  }
    
    
    


