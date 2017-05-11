var host = "http://127.0.0.1:5000";
var tpnum = 0;
var wrtpnum = 0;
var doingtpnum = 0;
var todotpnum = 0;
$(".topicnum").text(tpnum);
$(".wrongnum").text(wrtpnum);
$(".doingnum").text(doingtpnum);
$(".todonum").text(todotpnum);
(function(){
	$.ajax({
		method: "post",
		url: host + "/topicModule/showTopics",
		dataType: "json",
		// xhrFields:{
	 //    	withCredentials: true
		// },
		data: {}
	}).done(function(result){
		if(result.status==200){
			tpcontrol = result.result;
			console.log(tpcontrol[0]);
			// for row in tpcontrol{
			// 	var tr = createTopicItems(row);
			// 	$(".topic-table").append(tr);
			// }
			$.each(tpcontrol, function(index, value){
				var tr = createTopicItems(value);
				$(".topic-table").append(tr);
				tpnum ++;
				if(value[2] == 0){
					todotpnum ++;
					console.log(todotpnum);
				}else if(value[2] == 1){
					doingtpnum ++;
				}else{
					wrtpnum ++;
				}
			});
			console.log(todotpnum);
			$(".topicnum").text(tpnum);
			$(".wrongnum").text(wrtpnum);
			$(".doingnum").text(doingtpnum);
			$(".todonum").text(todotpnum);
		}
	});

})();

$(document).on("click",".sub-topic-name", function(){
	topicname = $(this).text();
	location.href = "topic.html?topicname=" + topicname;
});

function createTopicItems(data){
	var tmpTd = '<a href="#">wrong</a>';
	if(data[2] == 0){
		tmpTd = '<a href="#">start</a>'
	}else if(data[2] == 1){
		tmpTd = '<i class="icon-spin2 animate-spin"></i>'
	}
	return $('<tr class = "topic-item"> ' +
			'<td class="sub-topic-name">' + data[0] + '</td> ' +
			'<td class="topic-describe">' + data[1] + '</td> ' +
			'<td class="topic-state">' + tmpTd + '</td> ' +
			'</tr>');
}