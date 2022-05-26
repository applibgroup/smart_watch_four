/*
* Copyright (C) 2022 Application Library Engineering Group
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import ability_featureAbility from '@ohos.ability.featureAbility';
import fetch from '@system.fetch';
import geolocation from '@system.geolocation';
import sensor from '@system.sensor'

export default {
    data: {
        weather: "sun & windy",
        time_h: "09",
        time_m: "30",
        date_w: "Mon",
        date_d: 0o2,
        date_m: "Feb",
        bpm: 120,
        kcal: 1002,
        time_period: "AM",
        step: "10000",
        noti: "",
        lat: "16.5062",
        long: "80.6480"
    },
    onInit() {
        this.fetchDate();
        this.fetchTime();
        this.fecthWeather();
        this.fecthData();
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

        this.time_period = date.getHours() >= 12 ? 'PM' : 'AM';

    },
    fecthData: function () {
        let data;
        fetch.fetch({
            url: 'https://mocki.io/v1/cb0cd987-0c49-4e7c-9475-fb533723e2fd',
            responseType: "json",
            method: 'GET',

            success: function (res) {
                data = JSON.parse(res.data);
                console.log("Data :" + data + " " + JSON.stringify(res) + " ");
            },

            fail: (data, code) => {
                console.log("Fail Data: noti " + JSON.stringify(data) + " fail code: " + code);
            },
            complete: () => {
                this.bpm = data.bpm;
                this.kcal = data.cal;
                this.noti = data.noti;
                console.log(this.bpm + " " + this.kcal + " " + this.noti);
            }
        })
    },

    fecthWeather: function () {
        let locData;
        geolocation.getLocation({
            success: function (data) {
                locData = data;
                console.log("The location fetched:" + JSON.stringify(data));
            },
            fail: function (data, code) {
                console.log('fail to get location. code:' + code + ', data:' + data);
            },
            complete: function () {
                console.log('in Complete');
            }
        })
        console.log('Location Data: ' + JSON.stringify(locData) + " lat: " + locData.latitude + " long: " + locData.longitude);

        this.lat = locData.latitude;
        this.long = locData.longitude;

        console.log("Lat : " + this.lat + " Long : " + this.long);

        let data;
        fetch.fetch({
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.long + '&appid=9ca3abfc02f621a4fe7696f670f04a57',
            responseType: "JSON",
            method: 'GET',
            success: function (resp) {
                data = JSON.parse(resp.data);
                console.log("Data :" + data + " " + resp + " ");
            },
            fail: (data, code) => {
                console.log("fail data: " + JSON.stringify(data) + " fail code: " + code);
            },
            complete: () => {
                this.weather = data.weather[0].main;
                console.log("Weather :" + this.weather + " " + this.weather[0].main);
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
    }
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


