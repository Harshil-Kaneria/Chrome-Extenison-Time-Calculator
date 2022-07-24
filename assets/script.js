let counter_interval = '';
let counter_interval_remaining_leave_time = '';
let final_time = '';
let exit_time = '';
let total_working_time_input_duration = '';
let access_time_input_duration = '';
let start_time = document.querySelector('#start_time');
let work_time_hours = document.querySelector('#work_time_hours');
let work_time_minutes = document.querySelector('#work_time_minutes');
let break_time = document.querySelector('#break_time');
let remaining_time = document.querySelector('#remaining_time');
let total_working_time_input = document.querySelector("#total_working_time");
let total_access_time_input = document.querySelector("#total_access_time");
let leave_time = document.querySelector("#leave_time");
let finish_at = document.querySelector('#finish_at');
let remaining_leave_time = document.querySelector("#remaining_leave_time");
let notification_display = document.querySelector("#notification_display");
let show_notification = false;

function calculate_time(){

	show_notification = false;

	break_time.value=="" ? break_time.value = 0 : '';
	work_time_minutes.value=="" ? work_time_minutes.value = 0 : '';
	work_time_hours.value=="" ? work_time_hours.value = 0 : '';

	final_time = moment(start_time.value,"HH:mm");
	final_time = final_time.add(Number(work_time_hours.value),'hour').add(Number(work_time_minutes.value)+Number(break_time.value),'minutes')

	finish_at.value = final_time.format('h:mm a');
	remaining_time_calculator()
	total_working_time()
}

function total_working_time(){
	if(leave_time.value!="" && final_time!=""){
		exit_time = moment(leave_time.value,"HH:mm").add(1,'minutes').subtract(1,'minutes')
		total_working_time_input_duration = moment.duration(exit_time.diff(moment(start_time.value,"HH:mm").add(Number(break_time.value),'minutes')))

		total_working_time_input.value = total_working_time_input_duration.hours() + ":" + total_working_time_input_duration.minutes()

		calculate_access_time();
		calculate_remaining_leave_time();
	}
}

function calculate_access_time(){
	access_time_input_duration = moment.duration(exit_time.diff(final_time))
	total_access_time_input.value = access_time_input_duration.hours() + " : " + access_time_input_duration.minutes()
}

function calculate_remaining_leave_time_set(){
	var duration = moment.duration(exit_time.diff(moment()));
	if(leave_time.value!="" && show_notification==false && notification_display.checked){
		console.log(duration.asMinutes());
		show_notification = true
		generate_notification(duration.asMinutes())
	}
	if(duration.asSeconds() <= 0) {
		// localStorage.removeItem("time_calculator_leave_time");
		// remaining_leave_time.value = "Time is Over"
		// clearInterval(counter_interval_remaining_leave_time);
		remaining_leave_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds()
	}else{
		remaining_leave_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds()
	}
}

function calculate_remaining_leave_time(){
	if(leave_time.value!=""){
		calculate_remaining_leave_time_set();
		counter_interval_remaining_leave_time = setInterval(() => {
			calculate_remaining_leave_time_set()
		}, 1000);
	}
}

function remaining_time_set(){
	var duration = moment.duration(final_time.diff(moment()));
	if(leave_time.value=="" && show_notification==false && notification_display.checked){
		console.log(duration.asMinutes());
		show_notification = true
		generate_notification(duration.asMinutes())
	}
	if(duration.asSeconds() <= 0) {
		// localStorage.removeItem("time_calculator");
		// localStorage.removeItem("time_calculator_start_time");
		// localStorage.removeItem("time_calculator_work_time_hours");
		// localStorage.removeItem("time_calculator_work_time_minutes");
		// localStorage.removeItem("time_calculator_break_time");
		// remaining_time.value = "Time is Over"
		// clearInterval(counter_interval);
		remaining_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds()
	}else{
		remaining_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds()
	}
}

function remaining_time_calculator(){
	if(final_time!=''){
		remaining_time_set();
		counter_interval = setInterval(() => {
			remaining_time_set()
		}, 1000);
	}
}

function reset_time(){
	localStorage.removeItem("time_calculator");
	localStorage.removeItem("time_calculator_start_time");
	localStorage.removeItem("time_calculator_work_time_hours");
	localStorage.removeItem("time_calculator_work_time_minutes");
	localStorage.removeItem("time_calculator_break_time");
	localStorage.removeItem("time_calculator_leave_time");
	localStorage.removeItem("notification_display");
	clearInterval(counter_interval);
	clearInterval(counter_interval_remaining_leave_time);
	location.reload();
}

function generate_notification(time=0){
	// if (Notification.permission === "granted") {
	// 	notification();
	// } else if (Notification.permission !== "denied") {
	// 	Notification.requestPermission().then(permission => {
	// 		if(permission === "granted"){
	// 			notification();
	// 		}
	// 	});
	// }  
	if(time){
		chrome.runtime.sendMessage({ time });
	}
}

function notification(){
	const notification = new Notification("Time Calculator", {
		body: "Hello There Look Like You Don't See Current Time",
		icon: "../icon.png"
	})
}

document.addEventListener("DOMContentLoaded", function(event) { 
	leave_time.value = localStorage.getItem("time_calculator_leave_time")
	notification_display.checked = localStorage.getItem("notification_display")=="false" ? false : true
	if(localStorage.getItem("time_calculator")){
		start_time.value = localStorage.getItem("time_calculator_start_time")
		work_time_hours.value = localStorage.getItem("time_calculator_work_time_hours")
		work_time_minutes.value = localStorage.getItem("time_calculator_work_time_minutes")
		break_time.value = localStorage.getItem("time_calculator_break_time")
		calculate_time()
	}
});

document.getElementById("calculate_time").onclick = function(){  
	localStorage.setItem("time_calculator",true)
	localStorage.setItem("time_calculator_start_time",start_time.value)
	localStorage.setItem("time_calculator_work_time_hours",work_time_hours.value)
	localStorage.setItem("time_calculator_work_time_minutes",work_time_minutes.value)
	localStorage.setItem("time_calculator_break_time",break_time.value)
	localStorage.setItem("time_calculator_leave_time",leave_time.value)
	localStorage.setItem("notification_display",notification_display.checked)
	calculate_time()
}

document.getElementById("notification_display").onclick = function(){
	localStorage.setItem("notification_display",notification_display.checked)
}

document.getElementById("reset_time").onclick = function(){ 
	reset_time()
}