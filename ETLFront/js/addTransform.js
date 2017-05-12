var host = "http://127.0.0.1:5000";
var srcselectnum = 0;
var tarselectnum = 0;

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
	});
	$(".div-start .next-page div").on("click", function(){
		transDesc = $("#trans-describe").val().trim();
		transName = $("#trans-name").val().trim();
		console.log("transName"+transName+"ooo");
		console.log("transDesc"+transDesc+"000");
		if (transName == "") {
			tipsConfirm("tranform name can\'t be empty");
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

	$(".div-target-setting i").on("click",function(){
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
	if($(this).text().trim() == "map in order"){
		$(".div-target-setting .checked").removeClass("checked");
		tarselectnum = 0;
		$.each($tarcol,function(index,value){
			if(index < srcselectnum){
				$(value).addClass("checked");
				tarselectnum ++;
			}else
				return false;
		});
		setTargetSelectNum(tarselectnum);
	}else{
		tarselectnum = 0;
		$(".div-target-setting .checked").removeClass("checked");
		$tarselectcol = $(".div-target-setting .div-selected-columns div")
		$tarselectcol.each(function(){
			var text = $(this).text();
			$tarcol.each(function(){
				if(text == $(this).text()){
					$(this).addClass("checked");
					tarselectnum ++;
				}else{
					return true;
				}
			});
		});
		setTargetSelectNum(tarselectnum);
	}
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
	$.each($(".div-source-setting .div-columns .checked"),function(index,value){
		var col = $('<div>'+$(value).text()+'</div>');
		console.log(col.text());
		$selectDiv.append(col);
	});
}

function setSourceSelectNum(value){
	$(".div-source-setting .select-num").text(value);
}

function setTargetSelectNum(value){
	$(".div-target-setting .select-num").text(value);
}