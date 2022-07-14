let final_time = '';

function calculate_time(){
    let start_time = document.querySelector('#start_time');
    let work_time_hours = document.querySelector('#work_time_hours');
    let work_time_minutes = document.querySelector('#work_time_minutes');
    let break_time = document.querySelector('#break_time');
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
				remaining_time.value = "Time is Over"
				clearInterval(counter_interval);
			}else{
				remaining_time.value =  duration.hours() + ":" + duration.minutes()  + ":" + duration.seconds() + " and " + duration.days() + " days "
			}
		}, 1000);
	
	}
}

document.getElementById("calculate_time").onclick = function() {  
	calculate_time()  
};