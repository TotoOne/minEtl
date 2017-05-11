var host = "http://127.0.0.1:5000";

(function(){
	var local = decodeURI(window.location.href);
	var topicName = "";
	if(local.indexOf("=")>0){
		topicName = local.split("=")[1];
	}
	var transName = "";
	var transDesc = "";
	var sourceTable = "";
	var targetTable = "";
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
	$(".div-start .next-page div").on("click", function(){
		transDesc = $("#trans-describe").val().trim();
		transName = $("#trans-name").val().trim();
		console.log("transName"+transName+"ooo");
		console.log("transDesc"+transDesc+"000");
		if (transName == "") {
			tipsConfirm("tranform name can\'t be empty");
		}else{
			$(".checked").removeClass("checked");
			$("#trans-before").addClass("checked");
			$(".containner > div").hide();
			$(".div-deal-before").show();			
		}
	});
	$(".div-deal-before .next-page div").on("click", function(){
		$(".checked").removeClass("checked");
		$("#source-setting").addClass("checked");
		$(".containner > div").hide();
		$(".div-source-setting").show();
	});
	$(".div-source-setting .next-page div").on("click", function(){
		$(".checked").removeClass("checked");
		$("#target-setting").addClass("checked");
		$(".containner > div").hide();
		$(".div-target-setting").show();
	});
	$(".div-target-setting .next-page div").on("click", function(){
		$(".checked").removeClass("checked");
		$("#trans-after").addClass("checked");
		$(".containner > div").hide();
		$(".div-deal-after").show();
	});
	$(".div-deal-after .next-page div").on("click", function(){
		$(".checked").removeClass("checked");
		$("#ending").addClass("checked");
		$(".containner > div").hide();
		$(".div-ending").show();
	});

	$(".input-table-name i").on("click",function(){
		sourceTable = $(".input-table-name input").val().trim();
		console.log(sourceTable);
		$(".div-source-setting .div-columns").empty();
		if(sourceTable == ""){
			tipsConfirm("source table can\'t be empty");
		}else{
			var data = {};
			data.topicname = topicName;
			data.tablename = sourceTable;
			data.tabletype = "0";
			$.ajax({
				method: "post",
				url: host + "/transformModule/showColumns",
				dataType: "json",
				data: data
			}).done(function(result){
				if (result.status == 200) {
					columnNames = result.result;
					console.log(columnNames);
					$.each(columnNames,function(index,value){
						var column = createColumnItems(value.toLowerCase());
						$(".div-source-setting .div-columns").append(column);
					});
				}else if(result.status == 310){
					tipsConfirm("table name was wrong !")
				}else{
					tipsConfirm("Connection error !");
				}
			}).fail(function(result){
				tipsConfirm("Connection error !");
			});
		}
	});

	$("")


})();


function tipsConfirm(msg, callback){
    var $confirm = $(".tipsConfirm");
    if ($confirm.length > 0) $confirm.remove();
    $confirm = $("<div class='tipsConfirm'></div>");
    var $shadow = $("<div class='shadow'></div>");
    var $content = $("<div class='content'></div>");
    var $tipname = $("<div class='tipname'>tips</div>")
    var $msg = $("<div class='msg'>"+ msg +"</div>");
    var $btn = $('<div class="btn"> ' +
        '<div class="cancel">Cancel</div> ' +
        '<div class="ok">Ok</div> </div>');

    $btn.on("click", ".cancel", function () {
        $(this).parents(".tipsConfirm").remove();
    });
    $btn.on("click", ".ok", function () {
        $(this).parents(".tipsConfirm").remove();
        if(callback) callback();
    });
    $content.append($tipname).append($msg).append($btn);
    $confirm.append($shadow)
        .append($content)
        .appendTo($("body"));
}

function createColumnItems(data){
	return $('<div>'+data+'</div>');
}