import geolocation from '@system.geolocation';
import fetch from '@system.fetch';
import ability_featureAbility from '@ohos.ability.featureAbility'
import sensor from '@system.sensor'
//import geolocation from '@ohos.geolocation';

export default {
    data: {
        btnText: "",
        mySteps: '',
        sensorPermission: false,
        url: "https://mocki.io/v1/db8d4996-d7b9-418c-9115-82e2349cf405",
        //url: "https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&appid=9ca3abfc02f621a4fe7696f670f04a57",

        weather: "sun & windy",
        // cloudy, windy, partly sunny, rainy, sleeting, sun & rain, sun & windy, sunny, thunderstorm & rain, thunderstorm

        time_h: "09",
        time_m: "30",
        date_w: "Mon",
        date_d: 0o2,
        date_m: "Feb",
        bpm: 120,
        kcal: 1002,
        time_period: "AM",
        //PM or AM

        step: "10000",
        noti: "Team Meeting 11am",
    },
    onInit() {
        this.fetchDate();
        this.fetchTime();
        this.fecthData();

    },

    async startCounting() {
        if (!this.sensorPermission) {
            this.sensorPermission = await verifyPermissions()
        } else {
            subscribePedometerSensor(this)
        }
    },
    async fetchLocation() {

        geolocation.isLocationEnabled((err, data) => {
            console.log('isLocationEnabled: ' + err + " data: " + data);
        });

        var requestInfo = {
            'priority': 0x203, 'scenario': 0x300, 'maxAccuracy': 0
        };
        geolocation.getCurrentLocation(requestInfo).then((result) => {
            console.log('current location: ' + JSON.stringify(result.data));
        });
    },
    fetchDate: function () {
        let date = new Date();
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        this.date_d = date.getDate();
        this.date_m = month[date.getMonth()];
        this.date_w = week[date.getDay()-1]
    },

    fetchTime: function () {
        let date = new Date();


        let hrs = date.getHours() + ""

        // 4 7
        if (hrs < 10) {
            this.time_h_0 = 0;
            this.time_h_1 = hrs[0];
        }
        else {
            this.time_h_0 = hrs[0];
            this.time_h_1 = hrs[1];
        }

        let min = date.getMinutes() + ""

        if (min < 10) {
            this.time_m_0 = 0;
            this.time_m_1 = min[0];
        }
        else {
            this.time_m_0 = min[0];
            this.time_m_1 = min[1];
        }

        //        this.time_m_0 = 9
        //        this.time_m_1 = 9

        this.time_period = date.getHours() >= 12 ? 'PM' : 'AM';

    },
    fecthData: function () {

        //        let location = fetchLocation();

        let data;
        fetch.fetch({
            url:'https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&appid=9ca3abfc02f621a4fe7696f670f04a57',
            responseType:"JSON",
            method: 'GET',

            success:function(res)
            {
                data = JSON.parse(res.data);
                console.log("Data :" +data + " "+ res + " ");
            },

            fail:(data,code) => {
                console.log("fail data: "+ JSON.stringify(data) + " fail code: "+ code );
            },
            complete: ()=>{
                this.weather = data.weather[0].main ;
                console.log("Weather :"+this.weather+ " "+ this.weather[0].main);

//                this.bpm = data.bpm ;
//                this.kcal = data.cal;
            }
        })


        fetch.fetch({
            url: 'https://mocki.io/v1/db8d4996-d7b9-418c-9115-82e2349cf405',
            responseType: "JSON",
            method: 'GET',

            success: function (res) {
                data = JSON.parse(res.data);
                console.log("Data :" + data + " " + res + " ");
            },

            fail: (data, code) => {
                console.log("fail data: " + JSON.stringify(data) + " fail code: " + code);
            },
            complete: () => {
                this.bpm = data.bpm;
                this.kcal = data.cal;
            }
        })


    },
    onClickWeatherContainer: function () {
        console.log("Weather container");
    },
    onClickDateContainer: function () {
        console.log("Date container");
    },
    onClickCaloriesContainer: function () {
        console.log("Calories container");
    },
    onClickBPMContainer: function () {
        console.log("BPM container");
    },
    onClickStepsContainer: function () {
        console.log("Steps container ");
    },
}

function subscribePedometerSensor(context) {
    sensor.subscribeStepCounter({
        success: function (ret) {
            context.step = ret.steps.toString()
        },
        fail: function (data, code) {
            console.log('Subscription failed. Code: ' + code + '; Data: ' + data)
        }
    })
}

function verifyPermissions() {
    var context = ability_featureAbility.getContext()
    let permission = "ohos.permission.ACTIVITY_MOTION"
    var result = new Promise((resolve, reject) => {
        context.verifyPermission(permission)
            .then((data) => {
                resolve(true)
            }).catch((error) => {
            reject(false)
        })
    })
    return result
}

// Weather API  https://api.openweathermap.org/data/2.5/weather?lat=16.5062&lon=80.6480&appid=9ca3abfc02f621a4fe7696f670f04a57
