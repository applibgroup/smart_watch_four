import fetch from '@system.fetch';

export default {
    data: {
        weather: "sun & windy",
        // cloudy, windy, partly sunny, rainy, sleeting, sun & rain, sun & windy, sunny, thunderstorm & rain, thunderstorm
        time_h: "09",
        time_m: "30",
        date_w: "Mon",
        date_d: 0o2,
        date_m: "Feb",
        bpm: 120,
        kcal: 1002,
        time_period:"AM",
        //PM or AM
        step: "10000",
        noti: "Team Meeting 11am",
    },
    onInit() {
        this.fetchDate();
        this.fetchTime();
        this.fecthWeather();
    },
    fetchDate : function(){
        let date = new Date();
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const week = ["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]

        this.date_d = date.getDate();
        this.date_m = month[date.getMonth()];
        this.date_w = week[date.getDay()-1]
    },

    fetchTime : function(){
        let date = new Date();


        let hrs = date.getHours() + ""

        // 4 7
        if(hrs <10)
        {
            this.time_h_0 = 0 ;
            this.time_h_1 = hrs[0];
        }
        else
        {
            this.time_h_0 = hrs[0];
            this.time_h_1 = hrs[1];
        }

        let min = date.getMinutes() + ""

        if(min <10)
        {
            this.time_m_0 = 0;
            this.time_m_1 = min[0];
        }
        else
        {
            this.time_m_0 = min[0];
            this.time_m_1 = min[1];
        }

//        this.time_m_0 = 9
//        this.time_m_1 = 9

        this.time_period = date.getHours()  >= 12 ? 'PM' : 'AM';

    },

    fecthWeather : function(){
        let data;
        fetch.fetch({
            url:'https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&appid=9ca3abfc02f621a4fe7696f670f04a57',
            responseType:"json",
            method: 'GET',
            success:function(resp)
            {
                data = JSON.parse(resp);
            },
            fail:(data,code) => {
                console.log("fail data: "+ JSON.stringify(data) + " fail code: "+ code );
            },
            complete: ()=>{
                this.weather = data.weather.main ;
                console.log("Weather :"+data.weather.main)
            }
        })


    },
    onClickWeatherContainer : function() {
        console.log("Weather container");
},
    onClickDateContainer : function() {
        console.log("Date container");
},
    onClickCaloriesContainer : function() {
        console.log("Calories container");
},
    onClickBPMContainer : function() {
        console.log("BPM container");
},
    onClickStepsContainer : function() {
        console.log("Steps container ");
}

}

// Weather API  https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&appid=9ca3abfc02f621a4fe7696f670f04a57
