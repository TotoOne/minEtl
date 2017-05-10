var host = "http://127.0.0.1:5000";
var tfnum = 0;
var wrtfnum = 0;
var doingtfnum = 0;
var todotfnum = 0;
$(".transnum").text(tfnum);
$(".wrongnum").text(wrtfnum);
$(".doingnum").text(doingtfnum);
$(".todonum").text(todotfnum);
(function(){
	var local = decodeURI(window.location.href);
	var topicname = "";
	if(local.indexOf("=") > 0){
			topicname = local.split("=")[1];
			console.log(local.split("=")[1]);
			$(".topic-name").text(topicname);
		}
	
	$("#new-transform").attr("href", "addTransform.html?topicname="+topicname);
	$(".topic-name").on("click", function(){
		location.href = "index.html";
	});

	$.ajax({
		method: "post",
		url: host + "/transformModule/showTrans",
		dataType: "json",
		// xhrFields:{
	 //    	withCredentials: true
		// },
		data: {"topicname":topicname}
	}).done(function(result){
		if(result.status==200){
			tpcontrol = result.result;
			console.log(tpcontrol);
			// for row in tpcontrol{
			// 	var tr = createTopicItems(row);
			// 	$(".topic-table").append(tr);
			// }
			$.each(tpcontrol, function(index, value){
				var tr = createTopicItems(value);
				$(".topic-table").append(tr);
				tfnum ++;
				if(value[2] == 0){
					todotfnum ++;
					console.log(todotfnum);
				}else if(value[2] == 1){
					doingtfnum ++;
				}else{
					wrtfnum ++;
				}
			});
			console.log(todotfnum);
			$(".transnum").text(tfnum);
			$(".wrongnum").text(wrtfnum);
			$(".doingnum").text(doingtfnum);
			$(".todonum").text(todotfnum);
		}
	});

	console.log("hello");

})();

function createTopicItems(data){
	var tmpTd = '<a href="#">wrong</a>';
	if(data[2] == 0){
		tmpTd = '<a href="#">start</a>'
	}else if(data[2] == 1){
		tmpTd = '<i class="icon-spin2 animate-spin"></i>'
	}
	return $('<tr class = "trans-item"> ' +
			'<td class="trans-name">' + data[0] + '</td> ' +
			'<td class="trans-desc">' + data[1] + '</td> ' +
			'<td class="trans-state">' + tmpTd + '</td> ' +
			'</tr>');
}