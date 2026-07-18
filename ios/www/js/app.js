// App logic.
ons.platform.select('android');
window.myApp = {};


document.addEventListener('init', function(event) {

  $(document.body).css("background-color","white !important");
  $('.page__background').css("opacity","1");

  var page = event.target;

  if(device_ready){
   
    //StatusBar.styleLightContent();
  
  }

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }  
  
});


document.addEventListener('show', function(event) {

  if(device_ready){
    StatusBar.styleDefault();
  }
  var page = event.target;

  // Each page calls its own initialization controller.
  
  if (page.id === "loginpage") {
    StatusBar.styleDefault();
    startscreen.hide();
    navigator.splashscreen.hide();
    page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }

  if(page.id === "verifyphonepage"){
    StatusBar.styleLightContent();
  }

  if (page.id === "verifypage") {
    StatusBar.styleLightContent();
    page.onDeviceBackButton = onBackButton;
    //page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }
  
  if(page.id === "mappage"){
    $('.page__background').css("opacity","0");
    //$("#ride-request").show();
    //selected_state_id = "0"; //reset inter-state booking
    //map_visibility_status = 1;    
    if(device_ready)ons.enableDeviceBackButtonHandler();      
    StatusBar.styleDefault();  

    let notif_available = 0;
    for(let key in notify_new_data_available){
      if(notify_new_data_available[key]){
        notif_available = 1;
      }
    }

    if(notif_available){
      $('#global-notify-icon').css('color','red');
    }else{
      $('#global-notify-icon').css('color','white');
    }



  }

  


  if(page.id === 'profilepage'){

    $('#user-verified-email').html(!!userprofileinfo.email ? userprofileinfo.email : "---");    

  }

  if (page.id === "verifyemailcode"){
    
    initCodeInput(function(code){
      if(code.length == 6){
          $('#save-user-email-btn').prop('disabled', false);
          $('#save-user-email-btn').off().on('click', function(){
            saveUserEmail(code);
          })
      }else{
        $('#save-user-email-btn').prop('disabled', true);
        $('#save-user-email-btn').off();
      }
    })

  }



  if (page.id === "verifyotpcode"){

    code_inp_str = '';

    if(page.data.otp_send_limit == true){
      $('#verifyotpcodemsg').html(__('Too many OTP messages sent. Try again later'));
    }

    initCodeInput(function(code){
      $('#verifyotpcodemsg').html('');
      code_inp_str = code;
      if(code.length == 6){          
          $('#verify-otp-code-btn').prop('disabled', false);          
      }else{
        $('#verify-otp-code-btn').prop('disabled', true);
      }
    })

    $('#verify-otp-code-btn').off().on('click', function(){
      if(page.data.otp_send_limit == true){
        return;
      }
      loading.show();
      if(page.data.service == 'firebase'){
        verifyOTPCodeFirebase(page.data.country_dial_code,page.data.phone_num_inp,page.data.phone_num,code_inp_str,page.data.exists,page.data.phone_num_nat);
      }else{
        verifyOTPCode(page.data.country_dial_code,page.data.phone_num_inp,page.data.phone_num,code_inp_str,page.data.exists,page.data.phone_num_nat);
      }            
    })

  }


  if(page.id === 'signuppage'){
        //configure cropit
        jQuery('#image-editor').cropit({
          /* smallImage:'stretch', */
          allowDragNDrop:false,
        /*  width:300,
          height:300, */
          exportZoom:2,
          freeMoveboolean: true,
          onImageLoaded: function(){
            //$('.cropit-preview').css('background-image','none');
            var current_image = $('.cropit-preview').css('background-image');
            $('.cropit-preview').css('background-image','none');
            $('.cropit-preview-image-container').css('visibility','visible');
            
            var imageData = jQuery('#image-editor').cropit('export', {
              type: 'image/jpeg',
              quality: .9                    
            });
            if(!imageData){

              ons.notification.toast(__("Invalid photo selected"),{
                timeout: 1000
              });

              driver_registration_data.driver_photo = '';
              $('.cropit-preview-image-container').css('visibility','hidden');
              $('.cropit-preview').css('background-image',current_image);
              $('.cropit-image-input').val('');
              return;
              
            }

            driver_registration_data.driver_photo = imageData;
                        

          }          
      });

      if(driver_registration_data.driver_photo){
        $(".cropit-preview").css('background-image', `url(${driver_registration_data.driver_photo})`);
      }

      $('.select-image-btn').off('click').on('click',function() {
          $('.cropit-image-input').click();
      });
  }


  if(page.id === 'vehicledetailsregpage'){

      
      $('#carmake').val(driver_registration_data.car_model);
      $('#lplatenum').val(driver_registration_data.car_plate_num);
      //$('#regnum').val(driver_registration_data.car_reg_num);
      if(driver_registration_data.car_color){
        $('#paintcolor').find(`option[value=${driver_registration_data.car_color}]`).prop('selected', true);
      }

      $('#select-drv-license-image-btn').off('click').on('click',function() {
          $('#driver-license-file-input').click();
      });

      $('#driver-license-file-input').off('change').on('change',function(event){

        readImgFile(event,function(result){
            if(result.error){
              $('#driver-license-image').attr('src','img/drv-license.png');
              driver_registration_data.drivers_license_photo = '';
              ons.notification.alert(result.error_msg,{title:""});
              return;
            }

            $('#driver-license-image').attr('src',result.data);
            driver_registration_data.drivers_license_photo = result.data;

          });

      });

      if(driver_registration_data.drivers_license_photo){
        $('#driver-license-image').attr('src',driver_registration_data.drivers_license_photo);
      }


      $('#select-road-worth-image-btn').off('click').on('click',function() {
          $('#road-worth-file-input').click();
      });

      $('#road-worth-file-input').off('change').on('change',function(event){
        readImgFile(event,function(result){
            if(result.error){
              $('#road-worth-image').attr('src','img/drv-license.png');
              driver_registration_data.road_worthiness_cert = '';
              ons.notification.alert(result.error_msg,{title:""});
              return;
            }

            $('#road-worth-image').attr('src',result.data);
            driver_registration_data.road_worthiness_cert = result.data;

          });
      });

      if(driver_registration_data.road_worthiness_cert){
        $('#road-worth-image').attr('src',driver_registration_data.road_worthiness_cert);
      }

  }

  if(page.id === 'softwarelicense'){
    loading.hide();
  }


  if(page.id === 'bankdetailspage'){

      $('#acc-holders-name').val(driver_registration_data.account_holders_name);
      $('#acc-number').val(driver_registration_data.account_number);
      $('#ref_code').val(driver_registration_data.referal_code);

      if(driver_registration_data.bank_code){
        var bank_on_list = $('#banklist').find(`option[value=${driver_registration_data.bank_code}]`);
        
        if(bank_on_list.length){
          bank_on_list.prop('selected', true);
        }else{
          $('#banklist').find('option[value=xxx]').prop('selected', true);
          $('#other-bank-name').show();
          $('#other-bank-code').show();

          $('#bank-name').val(driver_registration_data.bank_name);
          $('#bank-code').val(driver_registration_data.bank_code);
        }
      }

      
      $('#bank-swift').val(driver_registration_data.bank_swift_code);

      $('#banklist').off('change').on('change', function(){

          var selected_bank_code = $('#banklist').find(':selected').val();
          var selected_bank_name = $('#banklist').find(':selected').text();
          

          if(selected_bank_code === 'xxx'){
            $('#other-bank-name').fadeIn();
            $('#other-bank-code').fadeIn();
          }else{
            $('#other-bank-name').fadeOut();
            $('#other-bank-code').fadeOut();
          }


      });



      
  }



  if(page.id === 'bookingdetails'){
      $('.page__background').css("opacity","0");
      let booking_details_data = JSON.parse($('#booking-list-item-data-' + page.data.bookid).html());
      let reset_map_move_timer = 0;
      let reset_map_move_count = 0;
      if(map2){
        map2.remove(); 
        map2 = undefined; 
      } 
        map2 = plugin.google.maps.Map.getMap(document.getElementById("booking-details-map"), {
          'mapType': plugin.google.maps.MapTypeId.ROADMAP,
          'controls': {
          'compass': false,
          'indoorPicker': false,
          'myLocationButton': false,
          'myLocation': false,   // (blue dot)
          'zoom': false,          // android only
          'mapToolbar': false     // android only
          },
          'gestures': {
          'scroll': true,
          'tilt': false,
          'rotate': false,
          'zoom': true
          },
          /* 'styles': [
          {
              featureType: "all",
              stylers: [
              { saturation: -80 }
              ]
          },{
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
              { hue: "#00ffee" },
              { saturation: 50 }
              ]
          },{
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
              { visibility: "off" }
              ]
          }
          ], */
          'camera' : {
          target: {lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
          zoom: 18
          },
          'preferences': {
          'zoom': {
              'minZoom': 3,
              'maxZoom': 18
          },
          'building': true
          }
      });

      map2.one(plugin.google.maps.event.MAP_READY, function() {  

          //clear markers                 
          if(marker3){
            marker3.remove();
            marker3 = undefined;
          };

          if(marker4){
            marker4.remove();
            marker4 = undefined;
          };

                      
          if(marker5){
            marker5.remove();
            marker5 = undefined;
          };

          if(marker6){
            marker6.remove();
            marker6 = undefined;
          };

          let target_coords = [];;

          if(parseFloat(booking_details_data.p_lat) && parseFloat(booking_details_data.p_lng) && parseFloat(booking_details_data.d_lat) && parseFloat(booking_details_data.d_lng)){
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)}];
              marker3 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

              marker4 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)},
                        'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

          }else{
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)}];
              marker3 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          if(parseFloat(booking_details_data.waypoint1_lat) && parseFloat(booking_details_data.waypoint1_long)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_long)});
            marker5 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_long)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }


          if(parseFloat(booking_details_data.waypoint2_lat) && parseFloat(booking_details_data.waypoint2_long)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_long)});
            marker6 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_long)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          //create markers
          setTimeout(() => {

      
            map2.setClickable(false);
            map2.animateCamera({
                target: target_coords,
                zoom: 18,
                duration: 1000,
                padding: 40  // default = 20px
              }, function() {
                  map2.setClickable(true);
                //alert("Camera target has been changed");
              });
                        
          }, 1000);

          map2.on(plugin.google.maps.event.MAP_DRAG_START, function(){
            clearInterval(reset_map_move_timer);
          });

          map2.on(plugin.google.maps.event.MAP_DRAG_END, function(){
              
              clearInterval(reset_map_move_timer);

              reset_map_move_timer = setTimeout(function(){

                  map2.setClickable(false);
                  map2.animateCamera({
                      target: target_coords,
                      zoom: 18,
                      duration: 1000,
                      padding: 40  // default = 20px
                    }, function() {
                        map2.setClickable(true);
                      //alert("Camera target has been changed");
                    });

              },3000)

              
          });


      });
  }



  if(page.id === 'schdbookingdetails'){
     $('.page__background').css("opacity","0");
      let booking_details_data = JSON.parse($('#scheduled-booking-item-data-' + page.data.bookid).html());
      let reset_map_move_timer = 0;
      let reset_map_move_count = 0;
      if(map2){
        map2.remove(); 
        map2 = undefined; 
      }
        map2 = plugin.google.maps.Map.getMap(document.getElementById("booking-details-map"), {
          'mapType': plugin.google.maps.MapTypeId.ROADMAP,
          'controls': {
          'compass': false,
          'indoorPicker': false,
          'myLocationButton': false,
          'myLocation': false,   // (blue dot)
          'zoom': false,          // android only
          'mapToolbar': false     // android only
          },
          'gestures': {
          'scroll': true,
          'tilt': false,
          'rotate': false,
          'zoom': true
          },
          /* 'styles': [
          {
              featureType: "all",
              stylers: [
              { saturation: -80 }
              ]
          },{
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
              { hue: "#00ffee" },
              { saturation: 50 }
              ]
          },{
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
              { visibility: "off" }
              ]
          }
          ], */
          'camera' : {
          target: {lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
          zoom: 18
          },
          'preferences': {
          'zoom': {
              'minZoom': 3,
              'maxZoom': 18
          },
          'building': true
          }
      });

      map2.one(plugin.google.maps.event.MAP_READY, function() {  

          //clear markers                 
          if(marker3){
            marker3.remove();
            marker3 = undefined;
          };

          if(marker4){
            marker4.remove();
            marker4 = undefined;
          };

                      
          if(marker5){
            marker5.remove();
            marker5 = undefined;
          };

          if(marker6){
            marker6.remove();
            marker6 = undefined;
          };

          let target_coords = [];;

          if(parseFloat(booking_details_data.p_lat) && parseFloat(booking_details_data.p_lng) && parseFloat(booking_details_data.d_lat) && parseFloat(booking_details_data.d_lng)){
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)}];
              marker3 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

              marker4 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)},
                        'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

          }else{
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)}];
              marker3 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          if(parseFloat(booking_details_data.waypoint1_lat) && parseFloat(booking_details_data.waypoint1_lng)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_lng)});
            marker5 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_lng)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }


          if(parseFloat(booking_details_data.waypoint2_lat) && parseFloat(booking_details_data.waypoint2_lng)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_lng)});
            marker6 = map2.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_lng)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          //create markers
          setTimeout(() => {

      
            map2.setClickable(false);
            map2.animateCamera({
                target: target_coords,
                zoom: 18,
                duration: 1000,
                padding: 40  // default = 20px
              }, function() {
                  map2.setClickable(true);
                //alert("Camera target has been changed");
              });
                        
          }, 1000);

          map2.on(plugin.google.maps.event.MAP_DRAG_START, function(){
            clearInterval(reset_map_move_timer);
          });

          map2.on(plugin.google.maps.event.MAP_DRAG_END, function(){
              
              clearInterval(reset_map_move_timer);

              reset_map_move_timer = setTimeout(function(){

                  map2.setClickable(false);
                  map2.animateCamera({
                      target: target_coords,
                      zoom: 18,
                      duration: 1000,
                      padding: 40  // default = 20px
                    }, function() {
                        map2.setClickable(true);
                      //alert("Camera target has been changed");
                    });

              },3000)

              
          });


      });
  }



  if(page.id === 'bookingpage'){     
    

  }

  if(page.id === 'bookingpagecomplete'){     
      $('#booking-comp').html(bookings_data['completed']);
  }

  if(page.id === 'bookingpagecancel'){     
      $('#booking-canc').html(bookings_data['cancelled']);
  }





  if(page.id === 'notificationspage'){
    getnotifications();
    notify_new_data_available.notifications = 0;
    $('#notifications-refresh').on('click', function(){
      getnotifications();
    })
  }


  if(page.id === 'walletpage'){

    getwalletinfo();       
    
  }


  if(page.id === "banner"){
    let banner_id = page.data.banner_id;
    clearTimeout(banner_view_timer);
    banner_view_timer = setTimeout(updateBannerViewCount(banner_id),5000); //update the banner view count for this user when banner content has been viewed for 5 seconds
}
    
  

  $('.page__background').css("opacity","0");
  $(document.body).css("background-color","");
  
  
});













document.addEventListener('hide', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (page.id === "loginpage") {
    ons.enableDeviceBackButtonHandler();    
  }

  if(page.id === "banner"){      
    clearTimeout(banner_view_timer);      
}

  if(page.id === "mappage"){
    //map_visibility_status = 0;
    //ons.enableDeviceBackButtonHandler();
  }

  if(page.id == "chatsup"){
    clearInterval(chat_support_msg_poll_timer_handle);
  }

  if(page.id == "settings"){
    clearInterval(settings_status_timer_handle);
  }

  if(page.id == 'scheduledtrips'){
    $('#schd-trips-notify-icon').css('color','white');
    notify_new_data_available.scheduled_trips = 0;        
  }

  if(page.id === 'bookingdetails'){
    if(marker3){
        marker3.remove();
        marker3 = undefined;
      };

      if(marker4){
        marker4.remove();
        marker4 = undefined;
      };

      if(marker5){
        marker5.remove();
        marker5 = undefined;
      };

      if(marker6){
        marker6.remove();
        marker6 = undefined;
      };

      if(map2){
        map2.remove();
        map2 = undefined;
      }
  }


  if(page.id === 'schdbookingdetails'){
    if(marker3){
        marker3.remove();
        marker3 = undefined;
      };

      if(marker4){
        marker4.remove();
        marker4 = undefined;
      };

      if(marker5){
        marker5.remove();
        marker5 = undefined;
      };

      if(marker6){
        marker6.remove();
        marker6 = undefined;
      };

      if(map2){
        map2.remove();
        map2 = undefined;
      }
  } 

  if(page.id === 'profilepage'){
    refreshmap();
  }


  if(page.id == "driverref"){
    refreshmap();
  }

  
});




document.addEventListener('preshow', function(event){ 

  let page = event.target;

  if(page.id == "gpsenabedialog"){
    translateElements('gpsenabedialog');      
  }


  if(page.id == "completedtripverify"){
    translateElements('completedtripverify');      
  }


  if(page.id == "compcodeinputdlg"){
    translateElements('compcodeinputdlg');      
  }
  
  
  if(page.id == "ride-request"){
    $('#top-controls-container').hide(); 
    track_driver_on_map = 0;
    clearTimeout(reset_driver_marker_track_status_timer);
  }

  if(page.id == "chat-window"){
    chat_window_display_status = 1;
    $('#chat-new-msg-ind').hide();
  }

  if(page.id == "tripdetailsummary"){
    translateElements('tripdetailsummary');      
  }

  if(page.id == "countrylistdialog"){
        translateElements('countrylistdialog');
  }


});



document.addEventListener('prehide', function(event){ 

  let page = event.target;

  if(page.id == "ride-request"){
    $('#top-controls-container').show(); 
    track_driver_on_map = 1; 
    $('#pulse-rings-container').hide();
    map.setPadding(0,0,0,0);
    if(rider_pickup_marker){
      rider_pickup_marker.setVisible(false);
    }
    
  }
  
  
  if(page.id == "chat-window"){
    chat_window_display_status = 0;
  }


});










function getuserinfopages(){

  loading.show();  
  var post_data = {'action_get':'getuserinfopages'};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            $('#privacy-content').html(data_obj.terms); 
            $('#aboutpage-content').html(data_obj.about); 
            terms_and_privacy_content = data_obj.terms; 
            aboutpage_content = data_obj.about;   
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function gethelpdata(){

  loading.show();  
  var post_data = {'action_get':'gethelpdata'};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics = data_obj.help_cat_topics;
            help_categories = data_obj.help_cat;                         
            $('#help-cat-content').html(help_categories);
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function gethelpcontent(id){

  loading.show();  
  var post_data = {'action_get':'gethelpcontent','id':id};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics_contents[id] = data_obj.help_content;   
            $('#help-content').html(help_topics_contents[id]);
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function getUserDocs(){

  loading.show();
          
  var post_data = {'action':'getUserDocs'};

  $.ajax({
      url: ajaxurl,
      type: 'POST',
      timeout : 10000,
      crossDomain:true,
      xhrFields: {withCredentials: true},
      data: post_data,
      success: function (data, status)
      {
          loading.hide();    
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
            ons.notification.toast(__("Error communicating with server"),{
              timeout: 1000
            });
            return;
          }

          if(data_obj.hasOwnProperty('error')){    
            ons.notification.toast(data_obj.error,{
              timeout: 1000
            });                 
            return;
          }

          if(data_obj.hasOwnProperty('success')){

              userprofileinfo.user_docs = data_obj.user_docs;
              
              let user_doc_data = userprofileinfo.user_docs;

              let doc_found = 0;

              if(user_doc_data){
                for(var key in user_doc_data){
                  let doc_data = user_doc_data[key];
                  if(doc_data.doc_city == '0' || doc_data.doc_city == userprofileinfo.city_id){
                    doc_found = 1;
                    break;
                  }

                }
              }


              if(!doc_found){
                $('#documents-content').empty();
                $('#documents-content').html(`<p style='width:100%;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)'>${__('No document is required from you')}</p>`);
                return;
              }              

              
              let doc_list_items = '';
              for(var x in user_doc_data){
                let doc_item = user_doc_data[x];
                if(!(doc_item.doc_city == '0' || doc_item.doc_city == userprofileinfo.city_id))continue;
                doc_status_indicator = '';
                if(doc_item.hasOwnProperty('u_doc_status')){
                    if(doc_item.u_doc_status == null){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-exclamation-circle' size='10px' style='color:red;'></ons-icon> ${__('Required')}</span>`;
                    }else if(doc_item.u_doc_status == 0){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="" class='list-item__subtitle'><ons-icon icon='fa-clock' size='10px' style='color:#55557f;'></ons-icon> ${__('In review')}</span>`;
                    }else if(doc_item.u_doc_status == 1){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-times-circle' size='10px' style='color:red;'></ons-icon> ${__('Not approved')}</span>`;
                    }else if(doc_item.u_doc_status == 2){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-calender' size='10px' style='color:red;'></ons-icon> ${__('Expired')}</span>`;
                    }else{
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:green;" class='list-item__subtitle'><ons-icon icon='fa-check-circle' size='10px' style='color:green;'></ons-icon> ${__('Approved')}</span>`;
                    }
                }

                doc_list_items += `<ons-list-item tappable style="cursor: pointer;min-height: 70px;" onclick="showDocument(${doc_item.d_id})">
                                    <div class="left">
                                      <ons-icon icon="fa-file" size="18px" style="color: black;"></ons-icon>
                                    </div>
                                    <div class="center">
                                      <span style="font-size: 16px;font-weight: 600;">${doc_item.title}</span>                            
                                      ${doc_status_indicator}
                                    </div>
                                    <div class="right">
                                        <ons-icon icon='fa-chevron-right' size='14px' style='color:black;'></ons-icon> 
                                    </div>
                                  </ons-list-item>`;
              }


              let doc_items_list_html = `<ons-list><ons-list-item style="cursor: pointer;min-height: 70px;"><div class="center"><p>${__('Upload valid copies of the following documents to keep your account active')}</p></div></ons-list-item>${doc_list_items}</ons-list>`;
              $('#documents-content').empty();
              $('#documents-content').html(doc_items_list_html);
            
          }
          

      },
      error: function(jqXHR,textStatus, errorThrown) {  
          loading.hide();
          ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
          });
          return;
      }

  });
}



function getwalletinfo(suppress_alerts){
      loading.show();
      if(!suppress_alerts){
        ons.notification.toast(__('Updating wallet items...'), {
          timeout: 2000
        });
      }

      var post_data = {'action':'getwalletinfo'};       
      jQuery.ajax({
      url: ajaxurl,
      method: 'POST',
      timeout : 10000,
      crossDomain:true,
      xhrFields: {withCredentials: true},
      data: post_data,
      success: function (data, status)
          {
                
              //console.log(data);
              
              loading.hide(); 
              try{
                  var data_obj = JSON.parse(data);
              }catch(e){
                if(suppress_alerts != 1){
                  ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                  });
                }
                  return;
              }

  
              if(data_obj.hasOwnProperty('error')){
                if(suppress_alerts != 1){
                  ons.notification.alert(data_obj.error,{title:""});
                }
                  return;                  

              }


              
              if(data_obj.hasOwnProperty('success')){
                if(!suppress_alerts){
                  ons.notification.toast(__('Wallet items updated'), {
                    timeout: 2000
                  });
                }

                wallet_amount = data_obj.wallet_amt;                
                wallet_history_items = data_obj.wallet_history;
                wallet_debit_history = data_obj.wallet_earning;
                wallet_withdrawal_enable = data_obj.withdrawenabled;
                wallet_withdrawal_message = data_obj.withdrawmessage;

                if(data_obj.hasOwnProperty('driver_min_wallet_balance')){
                  if(parseFloat(data_obj.driver_min_wallet_balance) >=  wallet_amount){
                    ons.notification.alert(__("Your wallet balance is low. Please add money to your wallet to receive ride requests"),{title:"", cancelable:false});
                  }
                }


                if(wallet_history_items !== ""){
                  $('#wallethistoryitems').html("<ons-list>" + wallet_history_items + "</ons-list>");
                }else{
                  $('#wallethistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                if(wallet_debit_history !== ""){
                  $('#walletdhistoryitems').html("<ons-list>" + wallet_debit_history + "</ons-list>");
                }else{
                  $('#walletdhistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
                wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;
            
                $('#walletbal').html(city_curency_symbol + wallet_amount_currency_converted); //show amount

                if(wallet_withdrawal_enable == 1){
                  $("#withdrawalsection").show();
                }else{
                  $("#withdrawalsection").hide();
                }
                
                $("#withdrawmessage").html(wallet_withdrawal_message);
            
                                
                return;
              }


            
              
              
          },
          error: function() { 
            loading.hide();
            if(suppress_alerts != 1){
              ons.notification.toast(__('Error communicating with server'), {
                timeout: 2000
              });
            }
            return;
              
          }

      });



}


function getbookings(){
  loading.show();
  ons.notification.toast(__('Updating trip history...'), {
    timeout: 1500
  });
    var post_data = {'action_get':'getDriverHistory'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 20000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();     
            console.log(data);
            
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
              
                ons.notification.alert(__("Error communicating with server"),{title:""});
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              
                ons.notification.alert(data_obj.error,{title:""});
              
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
              ons.notification.toast(__('Trip history updated'), {
                timeout: 2000
              });              
              
              bookings_data['pend_onride'] = data_obj.pend_onride == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.pend_onride;
              bookings_data['completed'] = data_obj.booking_comp == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.booking_comp;
              bookings_data['cancelled'] = data_obj.booking_canc == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.booking_canc;

              
              if(data_obj.pend_onride !== ""){
                $('#booking-pend-onride').html(data_obj.pend_onride);

                //check for uncompleted booking data on locastorage and enable the resume button for only bookings available
                let pending_bookings_count = 0;
                for (var key in localStorage) {

                  let booking_key = key.substr(0,4);

                  if(booking_key == "pbk-"){
                    let booking_id = key.substr(4);
                    let booking_data = localStorage.getItem(key);
                    pending_bookings_count++;                    
                    if(booking_data.length){
                      $('#resume-bk-' + booking_id).show();                      
                    }
                  }                                    
                 
                }

                if(pending_bookings_count){
                  $('#aux-booking-count').text(pending_bookings_count);
                  $('#aux-booking-count').attr('visibility','visible');
                }else{
                    $('#aux-booking-count').attr('visibility','hidden');
                }

              }else{
                $('#booking-pend-onride').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }


              if(data_obj.booking_comp !== ""){
                $('#booking-comp').html(data_obj.booking_comp);
              }else{
                $('#booking-comp').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }

              if(data_obj.booking_canc !== ""){
                $('#booking-canc').html(data_obj.booking_canc);
              }else{
                $('#booking-canc').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }
                                            
              return;

            }


          
            
            
        },
        error: function() { 
          loading.hide();
          ons.notification.alert(__("Error communicating with server"),{title:""});
          return;
            
        }

    });



}



function getDriverOnride(){
  //  loading.show();
  ons.notification.toast('Updating jobs information...', {
    timeout: 2000
  });
    var post_data = {'action_get':'getDriverOnride'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            //loading.hide();     
            console.log(data)
            try{
                //console.log(data);
                var data_obj = JSON.parse(data);
            }catch(e){
              
                ons.notification.alert("Failed to get jobs information. Please try again.",{title:""});
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              
                ons.notification.alert(data_obj.error);
              
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
                          
            
              //update the page
              jobs_data.onride =  data_obj.booking_onride;
              jobs_data.accepted = data_obj.booking_accepted;
              jobs_data.pending = data_obj.booking_pend;
              $('#booking-onride').html(jobs_data.onride);
              $('#booking-accepted').html(jobs_data.accepted);  
              $('#booking-pending').html(jobs_data.pending);
              
              ons.notification.toast('Jobs information updated.', {
                timeout: 2000
              });
              return;
            }

      
        },
        error: function() { 
          //loading.hide();
          ons.notification.alert("Failed to get jobs information. Please try again.",{title:""});
          return;
            
        }

    });




}







function getnotifications(notify){

  $('#notification-item-list').html(notifications_data);
  if(!notify){
    ons.notification.toast(__('Updating notifications...'), {
      timeout: 2000
    });
  }
    var post_data = {'action':'getusernotifications'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();     
            console.log(data);
            
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                if(!notify){
                  ons.notification.alert(__("Error communicating with server"),{title:""});
                }
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){

              if(!notify){
                ons.notification.alert(data_obj.error,{title:""});
              }
              return;                  

            }

            if(data_obj.hasOwnProperty('nodata')){
              /* if(!notify){
                ons.notification.alert(data_obj.nodata,{title:""});
              } */
              notifications_data = "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>";
              $('#notification-item-list').html(notifications_data);
              return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
              if(!notify){
                ons.notification.toast(__('Notifications updated'), {
                  timeout: 2000
                });
              }
              notifications_data = data_obj.notifications;
              $('#notification-item-list').html(data_obj.notifications);
              if(notify){
                var stored_n_count = localStorage.getObject('n_count');
                if(parseInt(data_obj.n_count) > stored_n_count){
                  $('#notification-icon').css('color','red');
                  $('#global-notify-icon').css('color','red');
                  notify_new_data_available.notifications = 1;
                }else{

                  $('#notification-icon').css('color','white');
                }
                
              }else{
                $('#notification-icon').css('color','white');
                localStorage.setObject('n_count',data_obj.n_count);
              }                                                      
              return;

            }          
            
            
        },
        error: function() { 
          loading.hide();
          if(!notify){
            ons.notification.alert(__("Error communicating with server"),{title:""});
          }
          return;            
        }

    });


}




function getEarning(q_obj, sel_date){

  loading.show();
  ons.notification.toast(__('Getting earnings data'), {
    timeout: 2000
  });
            
  var post_data = {'action':'getEarnings','data':q_obj,'sel_date' : sel_date};       
  
  jQuery.ajax({
  url: ajaxurl,
  method: 'POST',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
        
                            
          
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
            
            ons.notification.toast(__('Error communicating with server'), {
              timeout: 2000
            });
            return
          }


          if(data_obj.hasOwnProperty('error')){
            
              ons.notification.alert(data_obj.error,{'title':""});
              return;                  

          }


          
          if(data_obj.hasOwnProperty('success')){ 

            let month_names = [
              __("January"), __("February"), __("March"),
              __("April"), __("May"), __("June"), __("July"),
              __("August"), __("September"), __("October"),
              __("November"), __("December")
            ];
                               
            earnings_data = data_obj.earnings_data;

            day_total_earnings = data_obj.all_day_earning;
            $("#day-earnings").html(earnings_data);
            
            if(day_total_earnings != ''){
              $("#day-total-earning").html(day_total_earnings);
            }else{
              $("#day-total-earning").html("0.00");
            }

            let res = getDateWeekStartEnd(sel_date);

            let dates_arr = [];
            let days_arr = [];
            let months_arr = [];
            let years_arr = [];

            let start_date_month_num_days = getNumDaysInMonth(res.start_month,res.start_year);
            let days_abbr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

            if(parseInt(res.start_date) < parseInt(res.end_date)){
              for(let x = parseInt(res.start_date); x <= parseInt(res.end_date);x++){
                let date_formatted = x < 10 ? `0${x}` : x;
                dates_arr.push(date_formatted);
                months_arr.push(res.start_month);
                years_arr.push(res.start_year);
                let cur_day = new Date(`${res.start_year}-${res.start_month}-${x}`).getDay();
                days_arr.push(days_abbr[cur_day]);
                
              }
            }else{
              for(let x = parseInt(res.start_date); x <= start_date_month_num_days;x++){
                let date_formatted = x < 10 ? `0${x}` : x;
                dates_arr.push(date_formatted);
                months_arr.push(res.start_month);
                years_arr.push(res.start_year);
                let cur_day = new Date(`${res.start_year}-${res.start_month}-${x}`).getDay();
                days_arr.push(days_abbr[cur_day]);
              }

              for(let y = 1; y <= parseInt(res.end_date);y++){
                let date_formatted = y < 10 ? `0${y}` : y;
                dates_arr.push(date_formatted);
                dates_arr.push(y);
                months_arr.push(res.end_month);
                years_arr.push(res.end_year);
                let cur_day = new Date(`${res.end_year}-${res.end_month}-${y}`).getDay();
                days_arr.push(days_abbr[cur_day]);        
              }

            }

            let sel_date_components = sel_date.split('-');

            let week_data = data_obj.week_data;

            $('.day-earn-bars').css('height', '0%');
            $('#earn-num-trips').text('0');

            for(let v = 0;v < 7;v++){
              $(`#day-earn-bar-${v} .date-earn`).html(dates_arr[v]);
              $(`#day-earn-bar-${v} .day-earn`).html(days_arr[v]);
              $(`#day-earn-bar-${v}`).data('earndate',`${years_arr[v]}-${months_arr[v]}-${dates_arr[v]}`);

              if(dates_arr[v] == sel_date_components[2] && week_data.hasOwnProperty(dates_arr[v])){
                  $(`#day-earn-bar-${v}`).css('opacity','1');
                  $('#earn-num-trips').text(week_data[dates_arr[v]].num_rides);
              }else{
                $(`#day-earn-bar-${v}`).css('opacity','0.6');
              }

              if(week_data.hasOwnProperty(dates_arr[v])){
                let bar_height = Math.ceil((week_data[dates_arr[v]].earning / week_data['max_earning']) * 100); 
                let bar_earning = week_data[dates_arr[v]].earning.toFixed(2); 
                $(`#day-earn-bar-${v}`).css('height',`${bar_height}%`);             
                $(`#day-earn-bar-${v}`).data('amtearned',`${city_curency_symbol}${bar_earning}`);
                $(`#day-earn-bar-${v}`).data('numrides',week_data[dates_arr[v]].num_rides);
                
              }else{
                $(`#day-earn-bar-${v}`).css('height',`0%`);             
                $(`#day-earn-bar-${v}`).data('amtearned',`${city_curency_symbol}0`);
                $(`#day-earn-bar-${v}`).data('numrides',0);
              }
            }

            $('#earning-day').html(month_names[parseInt(sel_date_components[1])-1] + ' ' + sel_date_components[2] + ', ' + sel_date_components[0]);

            $('.day-earn-bars').off('click').on('click', function(){
                let earndate = $(this).data('earndate');
                if(!earndate)return;
                let res = getDateWeekStartEnd(earndate);
                getEarning(res,earndate);
            })
            
            ons.notification.toast(__('Earnings data updated'), {
              timeout: 2000
            });

            return;

          }


        
          
          
      },
      error: function() {
        loading.hide();     
        ons.notification.alert(__("Error communicating with server"),{'title':""});
        return;
          
      }

  });


}





function AnimateAtStart(){
  
  app_start_animate = 1;

  app_start_animate_timer = setInterval(function(){
    app_start_animate_counter++;

    if(app_start_animate_counter == 5){
      
      $("#menubtn").css("visibility","visible");
      $("#menubtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })

    }


    if(app_start_animate_counter == 6){
      $("#mylocationbtn").css("visibility","visible");
      $("#mylocationbtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
        
        
      })

    }



    if(app_start_animate_counter == 8){
      if(Math.ceil($('#driver-stats-panel').outerHeight(true))){
          $('#banner-items-container').css('bottom', (Math.ceil($('#driver-stats-panel').outerHeight(true)) + 10) + 'px'); 
      }
      $("#banner-items-container").fadeIn();
    }

    if(app_start_animate_counter == 9){
      
      $("#emergency-call-btn").css("visibility","visible");
      $("#emergency-call-btn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })
    }  
    

    if(app_start_animate_counter == 20){
      clearInterval(app_start_animate_timer);
      app_start_animate_counter = 0;
    }

  },100);


}
