function calculate_time(){
	var start_time = document.querySelector('#start_time');
	var work_time_hours = document.querySelector('#work_time_hours');
	var work_time_minutes = document.querySelector('#work_time_minutes');
	var break_time = document.querySelector('#break_time');
	var finish_at = document.querySelector('#finish_at');
	
	var hours = parseInt(start_time.value.split(':')[0]);
    var minutes = parseInt(start_time.value.split(':')[1]);

    if(break_time.value==""){
		break_time.value = 0;
    }
    if(work_time_minutes.value==""){
		work_time_minutes.value = 0;
    }
    if(work_time_hours.value==""){
		work_time_hours.value = 0;
    }

    minutes = minutes + parseInt(break_time.value) + parseInt(work_time_minutes.value);
    hours += parseInt(work_time_hours.value);

    while(minutes>59){
    	hours = hours + 1;
        minutes -= 60;
    }

    while(hours>23){
    	hours -= 24;
    }

    var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12 || 12;

    finish_at.value = hours+":"+minutes+" "+ampm;
}

document.getElementById("calculate_time").onclick = function() {  
	calculate_time()  
};