$(function() {

	var filecount = 0;
	$.ajax({
	    url : "../mail/testimony.php",
	    dataType: "json",
	    success: function (data) { 
	    	filecount = data.length;
            alert(filecount);
            $.each(data, function(i,filename) {
                alert(filename);
                if( filename.match(/\.(jpe?g|png|gif)$/) ) {
                	var suffix= filename.match(/\d+/); 
                	$("#testi_slider").append("<div class='shadow-lg testi_item'><div class='row'><div class='col-lg-4'><img class='img-thumbnail' src='"+ filename +"' alt='Review Image'></div><div class='col-lg-8'><div class='testi_text'><h4 id='"+suffix+"'></h4><p id='"+suffix+"'></p></div></div></div></div>")
            	}
            });
        }
	});

	for(var x=1;x<filecount;x++){	
		$.ajax({
	    	url : "../mail/text.php",
	    	type: "POST",
	    	data: {
	    	fileName: "/img/review/"+x+".txt"
	    	},
	    	success: function (data) {		        
			var par = "";
			alert(data)
			$.each(data, function(i,test) {
				$("h4#"+x).text(test);
    			if(i!=0){
    				par +=test; 
    				}        
				});
			$("p#"+x).text(par);
			}
		});
	}

});