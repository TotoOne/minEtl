var host = "http://127.0.0.1:5000";

(function(){

	$(".icon-cancel").on("click",function(){
		localStorage.removeItem("topicInfo");
		location="index.html"
	});


	$(".icon-right-outline").on("click",function(){
		$(".topic-name-error").text("");
		var topicname = $("#input-topic-name").val().trim();
		if(!topicname){
			$(".topic-name-error").text("topic name is empty");
			return;
		}

		var topictype = $("#link-type").val().trim();

		var topicdescribe = $("#topic-describe").val().trim();
		
		var data = {};
		data.topicname = topicname;
		data.topictype = topictype;
		data.topicdesc = topicdescribe;
		// sendMsg = JSON.stringify(data);
		// console.log(sendMsg);
		// console.log(data)
		$(".icon-right-outline").removeClass("icon-right-outline").addClass("icon-spin6 animate-spin");
		$.ajax({
			method: "post",
			url: host + "/topicModule/addtopicname",
			dataType: "json",
			// xhrFields:{
		 //    	withCredentials: true
			// },
			data: data
		}).done(function(result){
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
			if(result.status==310){
				$(".topic-name-error").text("topic name already existed");
			}else if(result.status==200){
				localStorage.removeItem("topicInfo");
				localStorage.setItem("topicInfo",JSON.stringify(data));
				location = "sourceTopic.html";
			}else{
				$(".topic-name-error").text("connection error");
			}
		}).fail(function(result){
			$(".topic-name-error").text("connection error");
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
		});
	})


})();