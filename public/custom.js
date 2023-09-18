sessionStorage.setItem("session_id", null);


function myFunction(name) 
{
		var myWindow = window.open(""); 
		//myWindow.document.write("<iframe id=iFrame src='"+name+"' width='1200' height='900' ></iframe>");
		myWindow.document.write("<iframe id=iFrame src='/File-not-found.pdf' width='1200' height='900' ></iframe>");
		myWindow.document.title = 'PDF';
}

function downloadFileAuto (file_name){

	var token = sessionStorage.getItem('session_id');
	console.log(token);
	
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8000/api/auto-file-download/?file_name="+file_name,
		cache: false,
		headers: {
			Accept: 'application/json',
            Authorization: `Bearer ${token}`
			
		},
		xhr: function () {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 2) {
					if (xhr.status == 200) {
						xhr.responseType = "blob";
					} else {
						xhr.responseType = "text";
						alert('You need to login for download the file.');
					}
				}
			};
			return xhr;
		},
		
		success: function (data){
			//Convert the Byte Data to BLOB object.
			var blob = new Blob([data], { type: "application/octetstream" });
 
			//Check the Browser type and download the File.
			var isIE = false || !!document.documentMode;
			if (isIE) {
				window.navigator.msSaveBlob(blob, fileName);
			} else {
				var url = window.URL || window.webkitURL;
				link = url.createObjectURL(blob);
				var a = $("<a />");
				a.attr("download", file_name);
				a.attr("href", link);
				$("body").append(a);
				a[0].click();
				$("body").remove(a);
			}
		}
	});
}