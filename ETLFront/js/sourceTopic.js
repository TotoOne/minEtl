var host = "http://127.0.0.1:5000";

(function(){

	$(".icon-cancel").on("click",function(){
		location="index.html";
		cookie("srcConn",null);
	});

	var topicname = window.location.search.split("&")[0].split("=")[1];
	var topictype = window.location.search.split("&")[1].split("=")[1];

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
		data.address = address;
		data.listen = listen;
		data.dbname = dbname;
		data.pwd = pwd;
		data.port = Number(port);
		console.log(data);

		// var data = "topicname=" + topicname + "&topictype=" + topictype;
		$(".icon-right-outline").removeClass("icon-right-outline").addClass("icon-spin6 animate-spin");
		$.ajax({
			method: "post",
			// url: host+"/topicModule/addtopicname",
			url: host + "/topicModule/connectionPing",
			dataType: "json",
			// xhrFields:{
		 //    	withCredentials: true
			// },
			data: data
		}).done(function(result){
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
			if(result.status==310){
				$(".topic-name-error").text("source connection setting error");
			}else if(result.status==200){
				$.cookies.set("a","hello",{expires:1,path:"/",secure:true});
				console.log($.cookies.get("a"));
				// location = "targetTopic.html?"+"topicname="+topicname+"&topictype="+topictype;
			}else{
				$(".topic-name-error").text("connection error");
			}
		}).fail(function(result){
			$(".topic-name-error").text("connection error");
			$(".icon-spin6").removeClass("icon-spin6 animate-spin").addClass("icon-right-outline");
		});
	})


})();