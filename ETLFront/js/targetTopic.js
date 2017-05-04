var host = "http://127.0.0.1:5000";

(function(){

	$(".icon-cancel").on("click",function(){
		localStorage.removeItem("srcConn");
		localStorage.removeItem("topicInfo");
		location="index.html";
	});

	var topicInfo = JSON.parse(localStorage.getItem("topicInfo"));
	var srcConn = JSON.parse(localStorage.getItem("srcConn"));
	var topictype = topicInfo["topictype"];
	var topicname = topicInfo["topicname"];
	
	if(topictype == "1"){
		$("#input-port").val("1521");
		$("#input-port").attr("disabled","disabled");
	}

	$(".icon-right-outline").on("click",function(){
		$(".topic-name-error").text("");
		var address = $("#input-addr").val().trim();
		if(!address){
			$(".topic-name-error").text("address is empty");
			return;
		}
		var listen = $("#input-listen").val().trim();
		if(!listen){
			$(".topic-name-error").text("listen is empty");
			return;
		}
		var dbname = $("#input-dbname").val().trim();
		if(!dbname){
			$(".topic-name-error").text("databasename is empty");
			return;
		}
		var pwd = $("#input-pwd").val();
		if(!pwd){
			$(".topic-name-error").text("password is empty");
			return;
		}
		var port = $("#input-port").val().trim();
		if(!port){
			$(".topic-name-error").text("port is empty");
			return;
		}

		var data = {};
		data.host = address;
		data.db = listen;
		data.user = dbname;
		data.password = pwd;
		data.port = port;
		var sendMsg = {}
		sendMsg.srcdata = localStorage.getItem("srcConn");
		sendMsg.topicdata = localStorage.getItem("topicInfo");
		sendMsg.targetdata = JSON.stringify(data);


		$(".icon-right-outline").removeClass("icon-right-outline").addClass("icon-spin6 animate-spin");
		$.ajax({
			method: "post",
			// url: host+"/topicModule/addtopicname",
			url: host + "/topicModule/addtopicsetting",
			dataType: "json",
			xhrFields:{
				withCredentials: true
			},
			data: sendMsg
		}).done(function(result){
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
			if(result.status==310){
				$(".topic-name-error").text("target connection setting error");
			}else if(result.status==200){
				localStorage.removeItem("srcConn");
				localStorage.removeItem("topicInfo");
				location="topic.html"+"?topicname="+topicname;
			}else{
				$(".topic-name-error").text("connection error");
			}
		}).fail(function(result){
			$(".topic-name-error").text("connection error");
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
		});
	})


})();