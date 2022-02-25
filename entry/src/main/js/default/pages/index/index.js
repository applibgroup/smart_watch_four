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
        this.time_h_0=this.time_h[0];
        this.time_h_1=this.time_h[1];
        this.time_m_0=this.time_m[0];
        this.time_m_1=this.time_m[1];
    }
}
