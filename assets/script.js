let final_time = '';
let start_time = document.querySelector('#start_time');
let work_time_hours = document.querySelector('#work_time_hours');
let work_time_minutes = document.querySelector('#work_time_minutes');
let break_time = document.querySelector('#break_time');

function calculate_time(){
    let finish_at = document.querySelector('#finish_at');

    break_time.value=="" ? break_time.value = 0 : '';
    work_time_minutes.value=="" ? work_time_minutes.value = 0 : '';
    work_time_hours.value=="" ? work_time_hours.value = 0 : '';

    final_time = moment(start_time.value,"HH:mm");
    final_time = final_time.add(Number(work_time_hours.value),'hour').add(Number(work_time_minutes.value)+Number(break_time.value),'minutes')

    finish_at.value = final_time.format('h:mm a Do MMMM YYYY');
	remaining_time_calculator()
}

function remaining_time_calculator(){
	let remaining_time = document.querySelector('#remaining_time');
	if(final_time!=''){
		let counter_interval = setInterval(() => {
			var duration = moment.duration(final_time.diff(moment()));
			if(duration.asSeconds() <= 0) {
				localStorage.removeItem("time_calculator");
				localStorage.removeItem("time_calculator_start_time");
				localStorage.removeItem("time_calculator_work_time_hours");
				localStorage.removeItem("time_calculator_work_time_minutes");
				localStorage.removeItem("time_calculator_break_time");
				remaining_time.value = "Time is Over"
				clearInterval(counter_interval);
			}else{
				remaining_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds() + " and " + duration.days() + " days "
			}
		}, 1000);
	
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	if(localStorage.getItem("time_calculator")){
		start_time.value = localStorage.getItem("time_calculator_start_time")
		work_time_hours.value = localStorage.getItem("time_calculator_work_time_hours")
		work_time_minutes.value = localStorage.getItem("time_calculator_work_time_minutes")
		break_time.value = localStorage.getItem("time_calculator_break_time")
		calculate_time()
	}
});

document.getElementById("calculate_time").onclick = function() {  
	calculate_time()
	localStorage.setItem("time_calculator",true)
	localStorage.setItem("time_calculator_start_time",start_time.value)
	localStorage.setItem("time_calculator_work_time_hours",work_time_hours.value)
	localStorage.setItem("time_calculator_work_time_minutes",work_time_minutes.value)
	localStorage.setItem("time_calculator_break_time",break_time.value)
};