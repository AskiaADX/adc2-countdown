function startTime() {
	 var fiveMinutes = {%= CurrentADC.PropValue("time") %},
        display = document.getElementById('adc_{%= CurrentQuestion.Id %}_digital'),
		digitalHidden = {%= (CurrentADC.PropValue("hideDigital") = "1") %},
		preventNext = {%= (CurrentADC.PropValue("preventNext") = "1") %},
		timeUp = false,
        mins, seconds;
		
	if(preventNext){
		$(':input[name=Next]:last').attr('disabled','disabled');
	}
	
	if(digitalHidden){
		$('#adc_{%= CurrentQuestion.Id %}_digital').hide();
	}
	
    setInterval(function() {
        mins = parseInt(fiveMinutes / 60)
		mins = mins < 10 ? "0" + mins : mins;
        seconds = parseInt(fiveMinutes % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = mins + ":" + seconds;
		
		if(!timeUp){
			fiveMinutes--;
		}
		
        if (fiveMinutes <= 0) {
			timeUp = true;
            //auto foward
			if(!preventNext){
				$(':input[name=Next]:last').click();
			} else {
				$(':input[name=Next]:last').removeAttr('disabled');
			}
        }
	
		function r(el, deg) {
			el.setAttribute('transform', 'rotate('+ deg +' 500 500)')
		}
		
		r(sec, -6*seconds);
		//r(min, 6*d.getMinutes())
		//r(hour, 30*(d.getHours()%12) + d.getMinutes()/2)

  
    }, 1000);
}

$(window).load(function() {
	startTime();
});