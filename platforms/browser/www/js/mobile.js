var db;
var dbCreated = false;
var id;
var uuid;
var value;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {



     
     
      
		
/*		  try{
        
		var now                  = new Date().getTime(),
    _60_seconds_from_now = new Date(now + 5*1000);

window.plugin.notification.local.add({
    id:      1,
    title:   'Reminder',
    message: 'Dont forget to buy some flowers.',
    repeat:  'weekly',
    date:    _60_seconds_from_now
});
	alert('waiting...');	
		window.plugin.notification.local.add({ message: 'Great app!' }); 
		 
		  }catch(err){
			alert(err);  
		  }
        
*/

/* WORKING NOTIFICATION  */
	/*	 
	var now                  = new Date().getTime(),
    _60_seconds_from_now = new Date(now + 2*1000);
    var nId='1';
    window.plugin.notification.local.add({
    id:         nId, // is converted to a string
    title:      'Reminder',
    message:    'Dont forget to buy some flowers.',
    repeat:     'weekly',
    date:       _60_seconds_from_now,
    foreground: 'foreground',
    background: 'background'
},callback);

function foreground (id) {
   alert('I WAS RUNNING ID='+id)
   $('.lnknotifications').click();
}
function callback () {
   
   
}

window.plugin.notification.local.onclick = function (nId, state, json) {$('.lnknotifications').click();alert('one');};
*/



   db = window.openDatabase("AfricanAllianceDB", "1.0", "PhoneGap Demo", 200000);
    
	var firstrun = window.localStorage.getItem("runned");
	   // firstrun = null;
	if ( firstrun == null ) {
	
	   $('.toggle-button').hide();
	   setTimeout(function(){$('.lnklogin').click(); }, 3000);
        // populateDB();
	}
	else {
		 $('.toggle-button').show();
		GetUserDetails();
		RefreshMeetings(); 
		InvitedCompanies();
		GetProgram();
		GetSurvey();
		GetNotifications();
		GetMessages();
		GetSpeakers();
	    GetCurrentNotifications();
		setTimeout(function(){ $('.lnkhome').click(); }, 3000);
		
	}
	
    uuid=device.uuid;
	
}
function localNotificationMessage(sender,message){
	  var now                  = new Date().getTime(),
		_02_seconds_from_now = new Date(now + 2*1000);
		 var nId='1';
		 window.plugin.notification.local.add({
		id:         nId, // is converted to a string
		title:      sender,
		message:    message,
		repeat:     'weekly',
		date:       _02_seconds_from_now,
		foreground: 'foreground',
		background: 'background'
	},callbackMessage);
}
function callbackMessage () {
    $('.talk-to-us').click();
}
function localNotification(name,subject,time, message){
	
/* WORKING NOTIFICATION  */
		 
	var now                  = new Date().getTime(),
    _02_seconds_from_now = new Date(now + 2*1000);
     var nId='1';
     window.plugin.notification.local.add({
    id:         nId, // is converted to a string
    title:      subject,
    message:    message,
    repeat:     'weekly',
    date:       _02_seconds_from_now,
    foreground: 'foreground',
    background: 'background'
},callback);

function foreground (id) {
  
 //  $('.lnknotifications').click();
}
function callback () {
   // $('.lnknotifications').click();
}
 window.plugin.notification.local.onclick = function (nId, state, json) {$('.lnknotifications').click();};

function background (id) {
	//$('.lnknotifications').click();
}	

	
	
	
}


function populateDB(data){


//Create Table
db.transaction(
  function(tx) { 
   var sql = "DROP TABLE IF EXISTS meetings";
   tx.executeSql(sql);
   sql = " CREATE TABLE IF NOT EXISTS meetings ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"time_slot VARCHAR(200), " + 
		"slot_id VARCHAR(200), " +
		"corporate VARCHAR(200), " +
		"venue VARCHAR(200), " +
		"day INTEGER(20))";    
    tx.executeSql(sql);
//alert('meetings Created');
//Create Companies table
   sql = "DROP TABLE IF EXISTS aa_corporates";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_corporates ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"corporate_id, " +
		"corporate_name VARCHAR(200), " +
		"website VARCHAR(200), " +
		"industry VARCHAR(200), " +
		"status VARCHAR(200), " +
		"country VARCHAR(200) " +
		")";    
    tx.executeSql(sql);
//Create user table
//alert('companies Created');	
  sql = "DROP TABLE IF EXISTS aa_users";
   tx.executeSql(sql);
   sql = " CREATE TABLE IF NOT EXISTS aa_users ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"username VARCHAR(200), " +
		"userid VARCHAR(200), " +
		"firstname VARCHAR(200), " +
		"surname VARCHAR(200), " +
		"title VARCHAR(200), " +
		"company_name VARCHAR(200), " +
		"company_id INTEGER(20))";    
    tx.executeSql(sql);	
	
//alert('aa_user Created');
//Create user notifications
sql = "DROP TABLE IF EXISTS notifications";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS notifications ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"title VARCHAR(200), " +
		"sender VARCHAR(200), " +
		"message VARCHAR(200), " +
		"date_created VARCHAR(200) " +
		")";    
    tx.executeSql(sql);	
// alert('notifications Created');
//Create user speakers

sql = "DROP TABLE IF EXISTS speakers";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS speakers ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"name VARCHAR(200), " +
		"title VARCHAR(200), " +
		"desc VARCHAR(200)" +
		")";    
    tx.executeSql(sql);	
// alert('speakers Created');
//Create user messages

sql = "DROP TABLE IF EXISTS notifications";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS notifications ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"title VARCHAR(200), " +
		"sender VARCHAR(200), " +
		"message VARCHAR(200), " +
		"date_created VARCHAR(200)" +
		")";    
    tx.executeSql(sql);	
//alert('messages Created');
sql = "DROP TABLE IF EXISTS aa_program";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_program ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"server_id VARCHAR(200), " +
		"time_slot VARCHAR(200), " +
		"venue VARCHAR(200), " +
		"day VARCHAR(200), " +
		"event_date VARCHAR(200), " +
		"description VARCHAR(200)" +
		")";    
    tx.executeSql(sql);	
//alert('aa_program Created');


sql = "DROP TABLE IF EXISTS aa_survey_questions";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_survey_questions ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"server_id VARCHAR(200), " +
		"description VARCHAR(200), " +
		"option_a VARCHAR(200), " +
		"option_b VARCHAR(200), " +
		"option_c VARCHAR(200), " +
		"option_d VARCHAR(200), " +
		"type VARCHAR(200) " +
		
		")";    
    tx.executeSql(sql);	
	
// END QUESTIONS
sql = "DROP TABLE IF EXISTS aa_notifications";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_notifications ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"server_id VARCHAR(200), " +
		"subject VARCHAR(200), " +
		"time_sent VARCHAR(200), " +
		"username VARCHAR(200), " +
		"msg VARCHAR(500) " +
		
		")";    
    tx.executeSql(sql);	
	
// END aa_notifications
sql = "DROP TABLE IF EXISTS aa_messages";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_messages ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"name VARCHAR(200), " +
		"time VARCHAR(200), " +
		"message VARCHAR(500) " +
		
		")";    
    tx.executeSql(sql);	
	
// END aa_messages
sql = "DROP TABLE IF EXISTS aa_speakers_profile";
   tx.executeSql(sql);
   sql = "CREATE TABLE IF NOT EXISTS aa_speakers_profile ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"name VARCHAR(200), " +
		"title VARCHAR(200), " +
		"sector VARCHAR(200), " +
		"company VARCHAR(200), " +
		"photo VARCHAR(200), " +
		"description VARCHAR(5000) " +
		
		")";    
    tx.executeSql(sql);	
	
// END aa_speakers_profile

sql="delete from meetings";
tx.executeSql(sql);	

sql="delete from aa_corporates";
tx.executeSql(sql);	

sql="delete from aa_users";
tx.executeSql(sql);	

sql="delete from notifications";
tx.executeSql(sql);	

sql="delete from speakers";
tx.executeSql(sql);	


sql="delete from aa_messages";
tx.executeSql(sql);	


sql="delete from aa_survey_questions";
tx.executeSql(sql);	

sql="delete from aa_notifications";
tx.executeSql(sql);	

sql="delete from aa_program";
tx.executeSql(sql);	


sql="delete from aa_speakers_profile";
tx.executeSql(sql);	

      

		
  }, 
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );
	
  init(data);

}



function AddNotification(server_id,name,subject,time, message){
	
	var sql = "insert into aa_notifications(server_id,subject,time_sent,username,msg) values('"+server_id+"','"+subject+"','"+time+"','"+name+"','"+message+"')";  
	db.transaction(
  function(tx) { 
		tx.executeSql(sql);
		 GetNotifications();
  },
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );

}

function saveMessage(name,time, message){
	
	var sql = "insert into aa_messages(name,time,message) values('"+name+"','"+time+"','"+message+"')";  
	db.transaction(
  function(tx) { 
		tx.executeSql(sql);
		
		 GetMessages();
  },
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );

}

function init(data){
	
	
		var dArray=data.split(":::");
	
	var url=$('#rooturl').val()+'Default.aspx?option=meetings';
 /*var sql = "insert into meetings(time_slot,corporate,venue,day) values('0900hrs-1000hrs','Barclays','TBC','1')";  
 tx.executeSql(sql);
 sql = "insert into meetings(time_slot,corporate,venue,day) values('1000hrs-1100hrs','Safaricom','TBC','1')";  
    tx.executeSql(sql);
	var sql = "insert into  meetings(time_slot,corporate,venue,day) SELECT '0900hrs-1000hrs' AS time_slot,'Barclays' AS corporate,'TBC' AS venue,'1' AS day UNION SELECT '1000hrs-1100hrs','Safaricom','TBC','1'";
    tx.executeSql(sql);
	*/	
//Get Meetings
if(dArray.length>2){
	
	 
db.transaction(
  function(tx) { 
  //Delete previous data
  

  
  for (i = 0; i < dArray.length; i++) {
    tx.executeSql(dArray[i]);
  }

   // alert('databese populated'); 
    GetUserDetails(); 
	
	RefreshMeetings(); 
	InvitedCompanies();
	GetProgram();
	GetSurvey();
	GetNotifications();
	GetMessages();
	GetSpeakers();
    GetCurrentNotifications();
	window.localStorage.setItem("runned", "1");	

  
	
	  
	}, 
  function(error){console.log(error); alert('An error has occured. Please try again and check your internet connection');}
  );
 } else{ // There was an error
	 alert('Check your internet connection');
	 $('.lnklogin').click();
	 return false;
 }
 	
}

function RefreshMeetings(){
	
db.transaction(function(transaction) {
$('#meetings').html('');
	transaction.executeSql("select * from meetings where day=? order by slot_id  ", ['1'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		
		 for (var i=0; i<len; i++) {
			
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.corporate+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			$('#meetings').append(item);
		}// End for	 
	},
	function(error){});	
	
	// DAY TWO
	$('#meetings2').html('');
	transaction.executeSql("select * from meetings where day=? order by slot_id ", ['2'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		
		 for (var i=0; i<len; i++) {
			 console.log();
			var row = result.rows.item(i);
			// alert(row.id);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.corporate+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			$('#meetings2').append(item);
		}// End for	 
	},
	function(error){});	

});	



	
	
}

function GetProgram(){
	
db.transaction(function(transaction) {
	$('#dayone').html('');
	transaction.executeSql("select * from aa_program where day=? order by server_id", ['1'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		 for (var i=0; i<len; i++) {
			 console.log();
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.description+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			
			$('#dayone').append(item);
		}// End for	 
	},function(error){ });	
	
	//DAY TWO
	$('#daytwo').html('');
	transaction.executeSql("select * from aa_program where day=? order by server_id", ['2'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		 for (var i=0; i<len; i++) {
			
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.description+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			
			$('#daytwo').append(item);
		}// End for	 
	},function(error){ });	
	
	// DAY 3
	$('#daythree').html('');
	transaction.executeSql("select * from aa_program where day=? order by server_id", ['3'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		 for (var i=0; i<len; i++) {
			
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.description+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			
			$('#daythree').append(item);
		}// End for	 
	},function(error){ });	
	
	//DAY 4
	
	$('#dayfour').html('');
	transaction.executeSql("select * from aa_program where day=? order by server_id", ['4'],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		 for (var i=0; i<len; i++) {
			
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="col-sm-3 col-xs-3">';
			item+='	<div class="timediv"><span>'+row.time_slot+'</span></div></div>';
			item+='<div class="col-sm-9 col-xs-9">';
			item+='<div class="detaildiv">';
			item+='<span> <h2>'+row.description+'</h2><p>'+row.venue+'</p> </span>';
			item+='</div></div>';
		    item+='</li>';
			
			$('#dayfour').append(item);
		}// End for	 
	},function(error){ });	
	
	
	
	
	
	
	

});		
	
}


function InvitedCompanies(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_corporates", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			var item='<li class="col-sm-12 col-xs-12 even wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='<div class="innercompanylisting">';
			item+='<div class="innerdiv">';
			item+='<div class="col-sm-12 col-xs-12 sameheight">';
			item+='<div class="profilediv">';
			item+='<span>';
			item+='<h2>'+row.corporate_name+'</h2>';
			item+='<p>'+row.industry+', '+row.country+'</p>';
			item+='<p>'+row.website+'</p>';
			item+='<p>'+row.status+'</p>';
			item+='</span></div></div></div></div></li>';
		
			$('#invited-companies').append(item);
		}// End for	 
	},
	function(error){ // On error                              
		
	});	

});		
	
}





function GetSpeakers(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_speakers_profile", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;
		 $('#speakerslist').html('');		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			
			var item ='<li>';
			item+='  <a onclick="GeProfileOne('+row.id+')" href="#speaker-profile" data-transition="flip">';
			item+='	 <span class="speakerprofilepic"><img src="images/speakers/thumb-'+row.photo+'" width="65px" height="65px" class="img-circle"></span>';
			item+='	 <span class="speakerlist">';
			item+='		<h2 class="speakername">'+row.name+'</h2>';
			item+='		<p class="speakertitle">'+row.title+', '+row.company+'</p>';
			item+='	 </span>';
			item+='	 <span class="pull-right rightarrow"><i class="fa fa-angle-right"></i></span>';
			item+='  </a>';
			item+='</li>';
		
			$('#speakerslist').append(item);
		}// End for	 
	},
	function(error){ // On error                              
		});	

});		
	
}


function GeProfileOne(id){
	
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_speakers_profile where id=?", [id],
	function(tx, result) { // On Success
		 var len = result.rows.length;
		 $('#single-speaker-profile').html('');	
		  	
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			
			var item='<div class="col-sm-12 col-xs-12 maincols nopadding">';
			
			item+='	<div class="profile-picture">';
			item+='	   <img src="images/speakers/'+row.photo+'" class="center-block img-responsive"> ';
			item+='	   <div class="layer"></div>';
			item+='	   <div class="imagedetails">';
			item+='		  <h2 class="text-center center-block">'+row.name+'</h2>';
			item+='		  <p class="text-center center-block">'+row.title+', '+row.company+'</p>';
			item+='	   </div>';
			item+='	</div>';
			item+='	<div class="background-profile col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"  data-wow-delay="1200ms">';
			item+='	   <h3>Background</h3>';
			item+='	   <br />';
			item+='	   '+row.description;
			item+='	</div>';
			item+=' </div>';
		  
			$('#single-speaker-profile').append(item);
		}// End for	 
	},
	function(error){ // On error                              
		alert(error);
	});	

});		
	
}

function GetCurrentNotifications(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_notifications", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
         var ids="0";		 
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			if(i==0){
			ids+=row.server_id;
			}else{
			ids+=','+row.server_id;
			}
			
		}// End for	 
		//alert(ids);
		
   var url=$('#rooturl').val()+'Default.aspx?option=notifications&ids='+ids;
	console.log(url);
   
	$.get( url, function( data ) {
		//Begin
		
		db.transaction(
		  function(tx) { 
				tx.executeSql(data);
			
				//Add Notifications
		  },
		  	function(error){console.log(error);}
		  );
		//END
		//ADD Notifications

	db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_notifications where id not in ("+ids+")", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
        //  alert(len);			 
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			//row.username row.subject row.msg row.time_sent
			 localNotification(row.username,row.subject,row.time_sent, row.msg);
		}// End for	 
	},
	function(error){});	
	
	});	//transaction	
	
	GetNotifications();
	    
		
		
		}).fail(function(data) {
			
			
		}).always(function() {
		 
		});
		
		
		
		
		
		
		return ids;
	},
	function(error){ // On error                              
		
	});	

});		
	
} // GetUserDetails


function GetNotifications(){

$('#notifications .notificationlist').html(''); //CLEAR ALL NOTIFICATIONS BEFORE APPENDING
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_notifications order by server_id desc", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		
	    
		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			
			        var msg='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"data-wow-delay="1200ms">';
					msg+='<div class="col-sm-9 col-xs-9 notificationtextdiv">';
					msg+='<div class="detaildiv">';
					msg+='<span class="authorname">'+row.username+'</span>';
					msg+='<span> <h2>'+row.subject+'</h2>';
					msg+='<p>'+row.msg+'</p> </span>';
					msg+='</div>';
					msg+='</div>';
					msg+='<div class="col-sm-3 col-xs-3 notficationpostdate">';
					msg+='<div class="notetimediv pull-right">';
					msg+='<span class="datestamp pull-right">'+moment(row.time_sent).format('Do MMM')+'</span>';
					msg+='<span class="timestamp pull-right">'+moment(row.time_sent).format('h:mm a')+'</span>';
					msg+='</div>';
					msg+='</div> ';
					msg+='<a rel="'+row.id+'" onclick="ndelete('+row.id+')" class="deleteicon pull-right" href="#">';
					msg+='<span class="fa fa-trash"></span>';
					msg+='</a> ';
					msg+='</li>';
				 $('#notifications .notificationlist').append(msg);
		        
			
		}// End for	
		
		if(len==0){
			
			        var msg='<li class="col-sm-12 col-xs-12 wow fadeInDown" data-wow-duration="1200ms"data-wow-delay="1200ms">';
					msg+='<div class="col-sm-9 col-xs-9 notificationtextdiv">';
					msg+='<div class="detaildiv">';
					msg+='<span> <h2>No Notifications found.</h2>';
					msg+='</div>';
					msg+='</div>';
					msg+='</li>';
			       $('#notifications .notificationlist').append(msg);
		}
		
		
		 
	},
	function(error){ // On error                              
		
	});	// END  transaction

});		
	
} // END GetNotifications()





function GetMessages(){

$('#talk-to-us .direct-chat-messages').html(''); //CLEAR ALL MESSAGES
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_messages", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			
			// name,subject,time,message
			if(row.name!=$('#username').val())
			{
				 var msg='<div class="direct-chat-msg">';
				 msg+='<div class="direct-chat-info clearfix">';
				 msg+='<span class="direct-chat-name pull-left">'+row.name+'</span>';
				 msg+='<span class="direct-chat-timestamp pull-right">'+row.time+'</span>';
				 msg+='</div>';
				 msg+='<div class="direct-chat-text">'+row.message;
				 msg+='</div>';
				 msg+=' </div>';
				  $('#talk-to-us .direct-chat-messages').append(msg);
			}else
			{
				 var msg='<div class="direct-chat-msg right">';
				 msg+='<div class="direct-chat-info clearfix">';
				 msg+='<span class="direct-chat-name pull-right">'+row.name+'</span>';
				 msg+='<span class="direct-chat-timestamp pull-left">'+row.time+'</span>';
				 msg+='</div>';
				 msg+='<div class="direct-chat-text">'+row.message;
				 msg+='</div>';
				 msg+=' </div>';
				  $('#talk-to-us .direct-chat-messages').append(msg);
			}
			 
			
			       
		  
		        
			
		}// End for	
		
		if(len==0){
			
			 var msg='<div class="direct-chat-msg">';
			 msg+='<div class="direct-chat-info clearfix">';
			 msg+='<span class="direct-chat-name pull-left">No Messages Found.</span>';
			 msg+='</div>';
			 msg+=' </div>';
			  $('#talk-to-us .direct-chat-messages').append(msg);
			     
		}
		var height = 0;

		// $(".direct-chat-messages").animate({ scrollTop: $(".direct-chat-messages")[0].scrollHeight }, 100);
		$('.direct-chat-messages').scrollTop( $(".direct-chat-messages")[0].scrollHeight );
		 
	},
	function(error){ // On error                              
		
	});	// END  transaction

});		
	
} // END GetNotifications()



function ndelete(id) {
	
			//var id=$(this).attr('rel');
			var r = confirm("Delete the selected notification?.");
			if (r == true) {
				 db.transaction(
				function(transaction) {
				// Define delete query
				var executeQuery = "Delete FROM aa_notifications where id=?";
				transaction.executeSql(executeQuery, [id]
					, function(tx, result) {   // On success
						GetNotifications();
						 //alert('All business data deleted successfully.');
					},
					function(error){     // On error                              
						 alert('Error occurred while deleting notification.');
					}); // END transaction.executeSql
			});// END  transaction
			} 
	
}





function GetUserDetails(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_users", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			$('.uName').html(row.firstname+' '+row.surname);
			$('.uTitle').html(row.title+', '+row.company_name);
			$('#username').val(row.firstname+' '+row.surname);
			$('#userId,.userid').val(row.userid);
			
		}// End for	 
	},
	function(error){ // On error                              
		
	});	
	
	});	//transaction	
	
} // GetUserDetails




function GetSurvey(){
db.transaction(function(transaction) {
	transaction.executeSql("select * from aa_survey_questions order by server_id", [],
	function(tx, result) { // On Success
		 var len = result.rows.length;	
		 var sdata=	"";
		
		 for (var i=0; i<len; i++) {
			var row = result.rows.item(i);
			 //alert(row.server_id);
			//$('#surveryquizes').append('<span class="question">'+row.description+'</div>');
			if(row.type=='1'){
		    sdata+='<div class="quizcont">';	                        
			sdata+='<span class="question">'+row.description+'</span>';
			sdata+='<div class="choices col-sm-12 col-xs-12">';
			sdata+='<div class="col-sm-6 col-xs-6">';
			sdata+='<p class="centering">';
			sdata+='<span class="innercenter"><span>'+row.option_a+'</span></span>';
			sdata+='</p>';
			sdata+='<span class="borderbottom"></span>';
			sdata+='</div>';
			sdata+='<div class="col-sm-6 col-xs-6">';
			sdata+='<p class="centering">';
			sdata+='<span class="innercenter"><span>'+row.option_b+'</span></span>';
			sdata+='</p>';
			sdata+='<span class="borderbottom"></span>';
			sdata+='</div>';
			sdata+='<div class="col-sm-6 col-xs-6">';
			sdata+='<p class="centering">';
			sdata+='<span class="innercenter"><span>'+row.option_c+'</span></span>';
			sdata+='</p>';
			sdata+='<span class="borderbottom"></span>';
			sdata+='</div>';
			sdata+='<div class="col-sm-6 col-xs-6">';
			sdata+='<p class="centering">';
			sdata+='<span class="innercenter"><span>'+row.option_d+'</span></span>';
			sdata+='</p>';
			sdata+='<span class="borderbottom"></span>';
			sdata+='</div>';
			sdata+='<input name="quiz'+(i+1)+'" data-role="none" type="hidden" class="data" /> ';
			
			
			sdata+='<div class="textinputcont col-sm-12 col-xs-12">';
			sdata+='<div class="input-wrapper">';
		    sdata+='<textarea name="quiz_text'+(i+1)+'" class="txtSurveyFeedback" data-role="none" id="txtSurveyFeedback" type="text" placeholder="Tell us more"></textarea>';
			sdata+='</div>';
			sdata+='</div>';
			
			sdata+='</div>';
			sdata+='</div><!-- quizcont -->';
			}else{
		    
			sdata+='<div class="quizcont">';	                        
			sdata+='<span class="question">'+row.description+'</span>';
			sdata+='<div class="textinputcont col-sm-12 col-xs-12">';
			sdata+='<div class="input-wrapper">';
		    sdata+='<textarea name="quiz'+(i+1)+'" class="txtSurveyFeedback" data-role="none" id="txtSurveyFeedback" type="text" name="message" placeholder="Compose Feedback Here"></textarea>';
			sdata+='</div>';
			sdata+='</div>';
			sdata+='</div><!-- quizcont -->';
			}
					
			
		}// End for	
		$('#surverycont').html(sdata);
		$('#surverycont .quizcont:first-child').addClass('active');
		
		var current=1;
	
	$('.nextlink').click(function(e) {
		//$('.active').hide();
		
		$('.quizcont').hide();
         $('.quizcont.active').next().addClass('active');
		 $('.quizcont.active').prevAll().removeClass('active');
		
		 if(!$('.quizcont.active').next().attr('class')){
			$('.nextlink').hide();
			$('.lnksubmit').show(); 
			$('#survey').css('height','100%');
		 }
		 else{
			$('.lnksubmit').hide(); 
			$('.prevlink').show(); 
		 }
		  $('.quizcont.active').fadeIn();
		
    });
	$('.prevlink').click(function(e) {
		$('.nextlink').show();
	    $('#survey').css('height','auto'); 
		
		$('.quizcont').hide();
        $('.quizcont.active').prev().addClass('active');
	    $('.quizcont.active').nextAll().removeClass('active');
		if(!$('.quizcont.active').prev().attr('class')){
			$('.prevlink').hide();
			
		 }
		//$('.active').show();
		
		$('.lnksubmit').hide();
		$('.quizcont.active').fadeIn();
		current--;
    });
  $('.lnksubmit').click(function(e) {
	  
	  
	  
	   $('.nextlink').show(); 
	   $('.prevlink').hide(); 
	   $('.lnksubmit').hide(); 
	  
	   
	var url=$('#rooturl').val()+'Default.aspx?option=survey&'+$('#frmSurvey').serialize();
	console.log(url);
	
    $('.overlay').fadeIn();
	$.get( url, function( data ) {
		 $('.overlay').fadeOut();
		  
		  $('.quizcont').removeClass('active');
	      $('#surverycont .quizcont:first-child').addClass('active');
	      $('.lnkthankyou').click(); 
		  $('#survey').css('height','auto');
		}).fail(function(data) {
		  
			alert("Check your internet connection." );
			
		}).always(function() {
		  $('.overlay').fadeOut();
		});
	  
	 
  });
		 $(".choices div").click(function() {
			// var borderchange = this.(borderbottom);
			//$(this).parent().find(".borderbottom").removeClass("clickedborderbottom");
			//$(this).parent().find(".innercenter span").removeClass("whitetext");
			$(this).find(".borderbottom").toggleClass("clickedborderbottom");
			$(this).find(".innercenter span").toggleClass("whitetext");
			var choice=$(this).find(".innercenter span").html();
			
			var currentData=$(this).parent().find(".data").val();
			
			// $('.srv'+current).val(choice);
			if($(this).find(".borderbottom").hasClass('clickedborderbottom')){
				$(this).parent().find(".data").val(currentData+' '+choice);
			}else{
				$(this).parent().find(".data").val(currentData.replace(choice,''));
			}
			
		}); 
	},
	function(error){ // On error                              
		
	});	

});		
	
} // GetSurvey



function transaction_error(tx, error) {
console.log('Error Message');
console.log(error);
    alert("Database Error: " + error);
}

$(document).ready(function(e) {
$('.menu-section-list a, .memberprofile,.toggle-button fa').click(function(e) {
    $('.toggle-button').click();
}); 


 

$('a,button,input[type=text],input[type=password],textarea').attr('data-role','none'); // remove default formating
$('.toSchedule').click();	
$('.loginbutton').click(function(e) {
	var url=$('#rooturl').val()+'Default.aspx?option=validate&uname='+$('#uname').val()+'&pid='+$('#pid').val()+'';
	console.log(url);
    $('.overlay').fadeIn();
	$.get( url, function( data ) {
		
		 $('.overlay').fadeOut();
		
		 
		
		if(data.trim().toLowerCase()==='incorrect'){
			  alert("Username or Password incorrect." );
		}else{
			 $('.login-error').hide(); 
			   populateDB(data);  
			  
			   $('.lnkhome').click();
			  
		}
          
		}).fail(function(data) {
			alert("Check your internet connection" );
			$('.lnklogin').click();
			 return false;
		}).always(function() {
		  $('.overlay').fadeOut();
		});
  return false;
});	

$('#btnAskAQuiz').click(function(e) {
	
	    var sdata='<li class="col-sm-12 col-xs-12" >';
		 sdata+='<div class="col-sm-12 col-xs-12 notificationtextdiv">';
		 sdata+='	<div class="detaildiv"><p>'+$('#txtQuiz').val()+'</p></div></div>';
         sdata+='</li>';
         $('#ask-a-quiz .notificationlist').append(sdata);	
	
	var url=$('#rooturl').val()+'Default.aspx?option=quiz&'+$('#frmQuiz').serialize();
	console.log(url);
    $('.overlay').fadeIn();
	$.get( url, function( data ) {
		 $('.overlay').fadeOut();
		 $('#txtQuiz').val('');
		}).fail(function(data) {
			alert("Check your internet connection." );
			
		}).always(function() {
		  $('.overlay').fadeOut();
		});
	
});







}); // document.ready	