$(function() {

	var folder = "../img/review/";

	$.ajax({
	    url : folder,
	    type: "GET",
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	            if( val.match(/\.(jpe?g|png|gif)$/) ) {
	            	var suffix= val.match(/\d+/); 
	            	$("#testi_slider").html("<div class='shadow-lg testi_item'><div class='row'>") 
	                $("#testi_slider").append("<div class='col-lg-4'><img class='img-thumbnail' src="+folder+val+" alt='Review Image'></div>")
	                $("#testi_slider").append("<div class='col-lg-8'><div class='testi_text'><h4 id="+suffix+"></h4><p id="+suffix+"></p></div></div>")
					$("#testi_slider").append("</div></div>")
	            } 
	        });
	    }
	});

	for(var x=1;x>10;x++){	
		$.ajax({
	    	url : folder+x+".txt",
	    	dataType: "text",
	    	type: "GET",
	    	success: function (data) {	        
				$("h4#"+x).text(data.val().split("\n")[0]);
				$("p#"+x).text(data.replace(/^.*?\r?\n/, ''));
				}
			});
		}
});