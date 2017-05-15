var host = "http://127.0.0.1:5000";
var srcselectnum = 0;
var tarselectnum = 0;
var maptype = 0;
var topicName = "";
var transName = "";
var transDesc = "";
var sourceTable = "";
var targetTable = "";

(function(){
	var local = decodeURI(window.location.href);
	if(local.indexOf("=")>0){
		topicName = local.split("=")[1];
	}
	$("#start").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#start").addClass("check-it");
		$(".containner > div").hide();
		$(".div-start").show();
	});
	$("#trans-before").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#trans-before").addClass("check-it");
		$(".containner > div").hide();
		$(".div-deal-before").show();
	});
	$("#source-setting").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#source-setting").addClass("check-it");
		$(".containner > div").hide();
		$(".div-source-setting").show();
		setSourceSelectNum(srcselectnum);
	});
	$("#target-setting").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#target-setting").addClass("check-it");
		$(".containner > div").hide();
		$(".div-target-setting").show();
		createSelectedColumn();
	});
	$("#trans-after").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#trans-after").addClass("check-it");
		$(".containner > div").hide();
		$(".div-deal-after").show();
	});
	$("#ending").on("click",function(){
		$(".check-it").removeClass("check-it");
		$("#ending").addClass("check-it");
		$(".containner > div").hide();
		$(".div-ending").show();
		refreshMapItems();
	});
	$(".div-start .next-page div").on("click", function(){
		transDesc = $("#trans-describe").val().trim();
		transName = $("#trans-name").val().trim();
		console.log("transName"+transName+"ooo");
		console.log("transDesc"+transDesc+"000");
		if (transName == "") {
			tipsConfirm("tranform name can\'t be empty!");
		}else{
			$(".check-it").removeClass("check-it");
			$("#trans-before").addClass("check-it");
			$(".containner > div").hide();
			$(".div-deal-before").show();			
		}
	});
	$(".div-deal-before .next-page div").on("click", function(){
		$(".check-it").removeClass("check-it");
		$("#source-setting").addClass("check-it");
		$(".containner > div").hide();
		$(".div-source-setting").show();
	});
	$(".div-source-setting .next-page div").on("click", function(){
		$(".check-it").removeClass("check-it");
		$("#target-setting").addClass("check-it");
		$(".containner > div").hide();
		$(".div-target-setting").show();
		createSelectedColumn();
	});
	$(".div-target-setting .next-page div").on("click", function(){
		$(".check-it").removeClass("check-it");
		$("#trans-after").addClass("check-it");
		$(".containner > div").hide();
		$(".div-deal-after").show();
	});
	$(".div-deal-after .next-page div").on("click", function(){
		$(".check-it").removeClass("check-it");
		$("#ending").addClass("check-it");
		$(".containner > div").hide();
		$(".div-ending").show();
		refreshMapItems();
	});

	$(".div-source-setting .input-table-name i").on("click",function(){
		if($(".div-source-setting .btn-select div").text().trim != "Select all")
			$(".div-source-setting .btn-select div").text("Select all");
		sourceTable = $(".div-source-setting input").val().trim();
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
					$(".div-source-setting .div-columns").empty();
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

	$(".div-target-setting .icon-link").on("click",function(){
		targetTable = $(".div-target-setting input").val().trim();
		console.log(topicName);
		$(".div-target-setting .div-columns").empty();
		if(targetTable == ""){
			tipsConfirm("target table can\'t be empty");
		}else{
			var data = {};
			data.topicname = topicName;
			data.tablename = targetTable;
			data.tabletype = "1";
			$.ajax({
				method: "post",
				url: host + "/transformModule/showColumns",
				dataType: "json",
				data: data
			}).done(function(result){
				if (result.status == 200) {
					columnNames = result.result;
					console.log(columnNames);
					$(".div-target-setting .div-columns").empty();
					$.each(columnNames,function(index,value){
						var column = createColumnItems(value.toLowerCase());
						$(".div-target-setting .div-columns").append(column);
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

})();

$(".div-source-setting .btn-select div").on("click",function(){
	$sourceDiv = $(".div-source-setting .div-columns div"); 
	srcselectnum = 0;
	if($(this).text().trim() == "Select all"){
		$sourceDiv.addClass("checked");
		$(this).text("Reverse all");
		$.each($sourceDiv,function(index,value){
			srcselectnum++;
		});
		setSourceSelectNum(srcselectnum);
	}else{
		$sourceDiv.removeClass("checked");
		$(this).text("Select all");
		setSourceSelectNum(srcselectnum);
	}
});

$(".div-target-setting .btn-select div").on("click",function(){
	$tarcol = $(".div-target-setting .div-columns div");
	var srcnum = $(".div-source-setting .checked").length;
	var tarnum = $tarcol.length < srcnum ? $tarcol.length : srcnum;
	setTargetSelectNum(tarnum);
	if($(this).text().trim() == "map in order"){
		$(".div-target-setting .checked").removeClass("checked");
		$tarcol.each(function(index,value){
			if(index < srcnum)
				$(this).addClass("checked");
		});
		maptype = 0;
	}else{
		tarnum = 0;
		$(".div-target-setting .checked").removeClass("checked");
		$srccol = $(".div-target-setting .div-selected-columns div");
		$srccol.each(function(){
			var text = $(this).text();
			$tarcol.each(function(){
				if(text == $(this).text()){
					$(this).addClass("checked");
					tarnum ++;
					return false;
				}else{
					return true;
				}
			});
		});
		setTargetSelectNum(tarnum);
		maptype = 1;
	}
	tarselectnum = tarnum;
});

$(".div-ending .btn-add-trans").on("click",function(){
	console.log("click aaaaaaaaaaa");
	transDesc = $("#trans-describe").val().trim();
	transName = $("#trans-name").val().trim();
	var srcWords = [];
	var tarWords = [];
	if(transName == ""){
		tipsConfirm("Tranform name can\'t be empty!");
		return false;
	}
	if(sourceTable == ""){
		tipsConfirm("Source table name can\'t be empty!");
		return false;
	}
	if(targetTable == ""){
		tipsConfirm("Target table name can\'t be empty!");
		return false;
	}
	$(".div-source-setting .checked").each(function(){
		srcWords.push($(this).text());
	});
	$(".div-target-setting .checked").each(function(){
		tarWords.push($(this).text());
	});
	if(srcWords.length == 0 || srcWords.length != srcselectnum){
		tipsConfirm("Please check out your source columns!");
		return false;
	}
	if(tarWords.length == 0 || tarWords.length != tarselectnum){
		tipsConfirm("Please check out your target columns!")
		return false;
	}
	var endData = {};
	endData.transname = transName;
	endData.topicname = topicName;
	endData.transdesc = transDesc;
	endData.bftranssrcdeal = $("#text-source-before").val().trim();
	endData.bftranstardeal = $("#text-target-before").val().trim();
	endData.sourcetable = sourceTable;
	endData.targettable = targetTable;
	endData.sourcewords = srcWords;
	endData.targetwords = tarWords;
	endData.aftranssrcdeal = $("#text-source-after").val().trim();
	endData.aftranstardeal = $("#text-target-after").val().trim();
	console.log(endData.sourcewords);
	var data = JSON.stringify(endData);
	$.ajax({
		method: "post",
		url: host + "/transformModule/addTransform",
		dataType: "json",
		data: endData
	}).done(function(result){
		if(result.status == 200){
			tipsConfirm("Add success");
			location.href = "topic.html?topicname="+topicName;
		}else{
			tipsConfirm("Transform add fail");
		}
	}).fail(function(result){
		tipsConfirm("Connection error");
	});
});

$(document).on("click",".div-source-setting .div-columns div",function(){
	if($(this).hasClass("checked")){
		$(this).removeClass("checked");
		srcselectnum --;
		setSourceSelectNum(srcselectnum);
	}else{
		$(this).addClass("checked");
		srcselectnum ++;
		setSourceSelectNum(srcselectnum);
	}
	maptype = 2;
});

$(document).on("click",".div-target-setting .div-columns div",function(){
	if($(this).hasClass("checked")){
		$(this).removeClass("checked");
		tarselectnum --;
		setTargetSelectNum(tarselectnum);
	}else{
		$(this).addClass("checked");
		tarselectnum ++;
		setTargetSelectNum(tarselectnum);
	}
	maptype = 2;
});

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

function createSelectedColumn(){
	$selectDiv = $(".div-target-setting .div-selected-columns");
	$selectDiv.empty();
	$selectDiv.append($('<span>Selected:</span>'));
	$.each($(".div-source-setting .div-columns .checked"),function(){
		$selectDiv.append($('<div>'+$(this).text()+'</div>'));
	});
}

function refreshMapItems(){
	$mapDiv = $(".div-ending .div-columns");
	var num = 0;
	$(".div-ending .div-column-name .select-num").text(num);
	var srcArr = [];
	var tarArr = [];
	$(".div-source-setting .checked").each(function(){
		srcArr.push($(this).text());
	});
	$(".div-target-setting .checked").each(function(){
		tarArr.push($(this).text());
	});
	num = tarArr.length > srcArr.length ? srcArr.length: tarArr.length;
	$mapDiv.empty();
	if(maptype != 1){
		for(var i = 0;i < num;i++){
			$mapDiv.append($("<div class='map-columns'> <div class='source'>"+srcArr[i]
				+"</div> <div class='target'>"+tarArr[i]+"</div>"));
		}
	}else{
		for(var i = 0;i < num;i++){
			$mapDiv.append($("<div class='map-columns'> <div class='source'>"+tarArr[i]
				+"</div> <div class='target'>"+tarArr[i]+"</div>"));
		}
	}
	srcselectnum = num;
	tarselectnum = num;
}

function setSourceSelectNum(value){
	$(".div-source-setting .select-num").text(value);
}

function setTargetSelectNum(value){
	$(".div-target-setting .select-num").text(value);
}