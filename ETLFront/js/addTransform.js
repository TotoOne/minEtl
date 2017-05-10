var host = "http://127.0.0.1:5000";

(function(){
	$("#start").on("click",function(){
		$(".checked").removeClass("checked");
		$("#start").addClass("checked");
		$(".containner > div").hide();
		$(".div-start").show();
	});
	$("#trans-before").on("click",function(){
		$(".checked").removeClass("checked");
		$("#trans-before").addClass("checked");
		$(".containner > div").hide();
		$(".div-deal-before").show();
	});
	$("#source-setting").on("click",function(){
		$(".checked").removeClass("checked");
		$("#source-setting").addClass("checked");
		$(".containner > div").hide();
		$(".div-source-setting").show();
	});
	$("#target-setting").on("click",function(){
		$(".checked").removeClass("checked");
		$("#target-setting").addClass("checked");
		$(".containner > div").hide();
		$(".div-target-setting").show();
	});
	$("#trans-after").on("click",function(){
		$(".checked").removeClass("checked");
		$("#trans-after").addClass("checked");
		$(".containner > div").hide();
		$(".div-deal-after").show();
	});
	$("#ending").on("click",function(){
		$(".checked").removeClass("checked");
		$("#ending").addClass("checked");
		$(".containner > div").hide();
		$(".div-ending").show();
	});

})();