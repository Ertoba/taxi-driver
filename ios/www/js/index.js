var APP_TITLE = "DropTaxi Driver";
var APP_DEBUG = false; //set to true for debug mode on browser. false for production
var APP_VERSION_IOS = "2.3.0";
var APP_VERSION_ANDROID = "2.3.0";
var APP_UPDATE_URL_IOS = ""; 
var APP_UPDATE_URL_ANDROID = "";
var SDL_KEY = ""; //used to track single device login 
var payment_gateway = "paystack"; //paystack, pesapal, paytr
var app_start_animate = 0;
var app_start_animate_counter = 0;
var app_start_animate_timer;
var google = undefined;
var walletbal = 0;
var Latitude = undefined;
var Longitude = undefined;
var marker = undefined;
var map = undefined;
var map2 = undefined;
var marker1 = undefined;
var driver_lat;
var driver_lng;
var driver_marker = undefined;
var rider_pickup_marker = undefined;
var rider_dropoff_marker = undefined;
var city_drivers_markers = {};
var driver_location_update_timer_id;
var driver_availability = false;
var processing_command = 0;
var marker2 = undefined;
var marker3 = undefined;
var marker4 = undefined;
var marker5 = undefined;
var marker6 = undefined;
var Latitude1 = undefined;
var Longitude2 = undefined;
var latLong1 = undefined;
var latLong2 = undefined;
var userprofileinfo = undefined;
var routetariffs = undefined;
var watchID = undefined;
var device_ready = 0;
var save_progress_counter = 0;
var session_id = "0";
var siteurl = "https://droptaxi.com.ng"; //Change the endpoints server url here
var ajaxurl = siteurl + "/ajaxdriver_2_3_0.php";
var loading = $('#loading');
var startscreen = $('#startscreen');
var animatecircle = $('#animate-circle');
var notification_dialog = $('#notif-dialog');
var ride_request_screen = $('#ride-request');
var chat_window_display_status = 0;
var city_curency_symbol = '';
var city_curency_exchange_rate = 1;
var city_curency_code = '';
var city_curency_name = '';
var booking_currency_symbol = '';
var google_map_api_key = '';
var cdate = new Date();
var call_center_num = null;
var wallet_amount = null;
var wallet_history_items = null;
var wallet_debit_history;
var bookings_data = {'pend_onride':'','completed':'','cancelled':''};
var jobs_data = {'onride':'','accepted':'','pending':''};
var notifications_data = '';
var online_payment_info = undefined;
var earnings_data = "";
var day_total_earnings;
var get_push_token_retry_count = 0;
var side_menu_state = 0;
var close_dialog_enable = 0;
var mobile_gps_enabled = 0;
var MAP_TYPE_IN_USE = 1; //sets the google map type to use. 0 = javascript, 1 = native;
var map_load_timer_handle;
var app_online = 0; //sets if app is online or offline;
var route_polyline;
var route_points;
var get_available_drivers_timer;
var platform;
var aboutpage_content = "";
var terms_and_privacy_content = '';
var help_data;
var help_categories = '';
var help_topics = [];
var help_topics_contents = [];
var driver_accept_ride_request_timer;
var driver_accept_ride_request_timer_step;
var driver_accept_time = 0;
var driver_accept_ride_request_timer_indicator = 0;
var driver_ride_tariff;
var driver_accept_ride_request_ui_states = {ui_state : 0,booking_id:0,ride_id:0,route_id:0,route_scope:0,p_addr:'',p_lat:'',p_lng:'',d_addr:'',d_lat:'',d_lng:'',rider_firstname:'',rider_image:'',rider_phone:'',rider_rating:'',completion_code:'',fare:'',payment_type:'',coupon_code:'',coupon_discount_type:0,coupon_discount_value:0,coupon_min_fare:0.00,coupon_max_discount:0.00,referral_discount_value:0.00,referral_used:0,total_ride_time:0,total_ride_distance:0.00,total_ride_time_formated:'',total_ride_distance_formated:'',paid_amount:0.00, ride_start_time:0, waypoint1_address:'',waypoint1_long:'',waypoint1_lat:'',waypoint2_address:'',waypoint2_long:'',waypoint2_lat:'',confirm_stop1:0,confirm_stop2:0,drv_start_ride_pos_lat:0.0,drv_start_ride_pos_lng:0.0,drv_last_pos_lat:0.0,drv_last_pos_lng:0.0,drv_last_pos_time:0,drv_arrived_time:0,drv_start_trip_time:0,drv_arrived_stop_time_1:0,drv_arrived_stop_time_2:0,drv_left_stop_time_1:0,drv_left_stop_time_2:0,total_wait_time : 0,total_wait_time_cost : 0.00,service_mode:0,est_distance:0.00,est_duration:0.00,hourly_rate_hours:0};
var driver_accept_ride_push_data;
var old_time_seconds = 0;
var total_ride_seconds = 0;
var old_driver_position_lat = 0.0;
var old_driver_position_lng = 0.0;
var old_driver_distance = 0;
var total_ride_distance = 0;
var driver_accept_ride_request_ui_update_timer;
var track_driver_on_map = 1;
var ride_alloc_sound, accept_ride_sound,driver_offline_sound,driver_online_sound,ride_ui_btn_sound,ride_cancel_sound,notification_sound;
var driver_registration_data = {driver_photo:'',firstname:'',lastname:'',address:'',state:'',country_2c_code:'',country_call_code:'',phone:'',email:'',password:'',referal_code:'',car_plate_num:'',car_model:'',car_year:'', car_type:0,car_reg_num:'',car_color:'',operation_city:0,drivers_license_photo:'',road_worthiness_cert:'',account_holders_name:'',account_number:'',bank_name:'',bank_code:'',bank_country:'',bank_swift_code:''};
var user_timezone;
var carrier_country_code = 'ng'; //Change default country dial code here
var user_country_dial_code = '+234';
var pubnub;
var processed_notifications = {};
var processed_notifications_time = {};
var route_polyline;
var route_points;
var ride_rating = 5;
var pubnub_reconnection_count = 0;
var push_notification_buffer;
var app_fully_started = 0;
var selected_lang = {code:'en',name:'English',dir:'ltr'};
var default_currency_data;
var app_settings = {};
var resend_code_btn_status = 1;
var resend_code_countdown_timer_handle = 0;
const RESEND_CODE_COUNTDOWN_VALUE = 60;
const USE_FIREBASE_PHONE_AUTH = 1; 
var firebase_phone_number_verified = 0;
var firebase_phone_auth_verificationid = '';
var account_activation_status = 0;
var markerds1 = undefined;
var markerds2 = undefined;
var referraldata;
var server_client_time_diff = 0;
var driver_location_watch_handle = 0;
var banner_data = '';
var chat_support_msg_poll_timer_handle;
var chat_update_ajax_handle;
var driver_icon_type = "1";
var driver_bg_lat;
var driver_bg_lng;
var driver_marker_anim_obj = {curposition: null, oldposition : null, curbearing : 0, oldbearing : 0,animate_pos:0,animation_fraction_pos:0.00,animate_rot:0,animation_fraction_rot:0.00};
var animate_drivers_markers_timer;
var img_source_obj;
var user_login_options;
var user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',rem_password:0,password:'',referral:'',fb_user_details:null,car_plate_num:'',car_model:'',car_year:'', car_type:0,car_reg_num:'',car_color:'',operation_city:0};
var reset_driver_marker_track_status_timer;
var settings_status_timer_handle
var map_visibility_status = 0;
var driver_schd_data_fetch_status = 0;
var pending_trips = [];
var pending_booking_data = {};
var notify_new_data_available = {notifications : 0,scheduled_trips:0,chat_support:0};
var map_ready = false;
var banner_view_timer = 0;
var code_inp_str = "";
var wait_timer_handle = 0;
var route_ride_tariff;



document.addEventListener('resume', function(){ //fires when app is pulled up from background

    refreshmap();
    updateDriverLocation();
    setTimeout(function(){
        animateDriversMarkers();
    },5000);
    window.plugins.insomnia.keepAwake();

}, false);


document.addEventListener('pause', function(){ //fires when app enters the background

    clearInterval(animate_drivers_markers_timer); //stop marker animation when backgrounded
    if(map)navigator.geolocation.clearWatch(driver_location_watch_handle);

    console.log('backgrounded');


}, false);





ons.disableAutoStatusBarFill();
ons.ready(function() {
    // deviceready event is fired
    startscreen.show();
    initSession();
    loadLang(initApp);      
    initActionSheets();     

});



function initApp(){
    window.plugins.insomnia.keepAwake();
    ons.fastClick.destroy();
    device_ready = 1;  

    StatusBar.styleDefault();

    if (ons.platform.isIPhoneX() || isIphoneX()) { // Utility function
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    }

    if(window.MobileAccessibility){
        MobileAccessibility.setTextZoom(90, function(){return;});
        //window.MobileAccessibility.usePreferredTextZoom(false);
    }

    //clear splashscreen after a while
    setTimeout(function(){
        navigator.splashscreen.hide();
    },5000);    
    

    var tz = jstz.determine(); // Determines the time zone of the browser client
    user_timezone = tz.name(); //read timezone value

    
    translateElements();

    checkDriverLoginStatus();        

    cordova.plugins.backgroundMode.setDefaults({
        title: __("Background mode activated"),
        text: __("Droptaxi is currently running in background mode"),
        icon: 'notification_icon', 
        color: "#7cb342",
        allowClose: false,
        closeIcon: 'power', // An icon shown for the close action
        closeTitle: 'Close', // The text for the close action
        showWhen: true
    })        
        


    
        
    if(!APP_DEBUG){

        
        /* window.plugins.sim.getSimInfo(function(res){
            carrier_country_code = res.hasOwnProperty('countryCode') ? res.countryCode : 'ng';
            console.log(res);
            carrier_country_code = carrier_country_code.toLocaleLowerCase();
        }, function(err){
            carrier_country_code = 'ng';
            user_country_dial_code = '+234';
            console.log('error getting device carier info.' + err);
        }); */

        /* window.plugins.carrier.getCarrierInfo(function(res){            
            carrier_country_code = res.hasOwnProperty('countryCode') ? res.countryCode : 'ng';
            carrier_country_code = carrier_country_code.toLocaleLowerCase();
        }, function(err){
            carrier_country_code = 'ng';
            user_country_dial_code = '+234';
            console.log('error getting device carier info.' + err);
        }); */
               
        platform = device.platform.toLowerCase();
        //platform = platform.toLowerCase();

        if( platform=="iOS")
        {
        //StatusBar.overlaysWebView(true);
        //StatusBar.hide();
        }


        var sound_url = 'sound/ride-alloc.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/ride-alloc.mp3';
        }

        ride_alloc_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );
    


        sound_url = 'sound/accept-ride.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/accept-ride.mp3';
        }

        accept_ride_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );



        sound_url = 'sound/driver-offline.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/driver-offline.mp3';
        }

        driver_offline_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );


        sound_url = 'sound/driver-online.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/driver-online.mp3';
        }

        driver_online_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );
    

        
        sound_url = 'sound/ride-ui-btn.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/ride-ui-btn.mp3';
        }

        ride_ui_btn_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );



        sound_url = 'sound/ride-ui-btn.mp3';
        if(platform === "android"){
            sound_url = 'file:///android_asset/www/sound/ride-cancel.mp3';
        }

        ride_cancel_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );


        var sound_url = 'sound/notify.mp3';
        if(device.platform.toLowerCase() === "android"){
            sound_url = 'file:///android_asset/www/sound/notify.mp3';
        }
        

        notification_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );


                
                
        
        cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
            return;
        });


        cordova.plugins.firebase.messaging.onMessage(function(payload) { //trigger push notification when app is in foreground
            process_push_message(payload);
        });





        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) { //trigger push notification when app is in background
            //ride_request_screen.hide();
            process_push_message(payload);
        });


        cordova.plugins.backgroundMode.enable();

               

        
        

        
    }


    document.addEventListener("offline", function(){
        app_online = 0;
        $('#nointernet').css('visibility','visible');
        
    }, false);


    document.addEventListener("online", function(){
        app_online = 1;
        $('#nointernet').css('visibility','hidden');
    }, false);


    ons.setDefaultDeviceBackButtonListener(onBackButton);


    BackgroundGeolocation.configure({
        locationProvider: BackgroundGeolocation.RAW_PROVIDER,
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 1,
        distanceFilter: 1,
        notificationTitle: APP_TITLE,
        notificationText: __('Location Tracking'),
        debug: APP_DEBUG,
        interval: 1000,
        fastestInterval: 1000,
        activitiesInterval: 10000,
        maxLocations: 50,
        startForeground:true
    });

    BackgroundGeolocation.on('location', function(location) {
        // handle your locations here
        //console.log(location);                    
        driver_bg_lat = location.latitude;
        driver_bg_lng = location.longitude;
        
    });

    BackgroundGeolocation.on('stationary', function(location) {
        // handle stationary locations here
        //console.log(location);
        driver_bg_lat = location.latitude;
        driver_bg_lng = location.longitude;
        

    });

    BackgroundGeolocation.checkStatus(function(status){
        if(status.authorization == BackgroundGeolocation.NOT_AUTHORIZED){
            setTimeout(function(){                
                showBgLocMsg();
            },500)
        }else{
            if(!APP_DEBUG){
                requestLocationAccuracy();                        
            }else{
                mapinitialize();
            }
        }
    })
    

    //firebase AUth

    cordova.plugins.firebase.auth.onAuthStateChanged(function(userInfo) {

        if (userInfo) {
            // user was signed in
            console.log('success sign in: ' + userInfo);
        } else {
            // user was signed out
            console.log('success sign out: ' + userInfo);
        }

    });


}


function initSession(){

    //get session id if available
    let sess_id = localStorage.getItem('sess_id');
    let sdl_key = localStorage.getItem('sdl_key'); //check single device login key
    if(sess_id){
        ajaxurl = siteurl + `/ajaxdriver_2_3_0.php?sess_id=${sess_id}`;
    }else{
        //generate a random session ID
        let rand_session_str = btoa(genRandomString(10) + Date.now());
        ajaxurl = siteurl + `/ajaxdriver_2_3_0.php?sess_id=${rand_session_str}`;
        localStorage.setItem('sess_id', rand_session_str);
    }

    if(!sdl_key){
        //generate a random key used to ensure only one device is logged in to an account at a time
        let rand_sdl_str = btoa(genRandomString(10) + Date.now());
        localStorage.setItem('sdl_key', rand_sdl_str);
        sdl_key = rand_sdl_str;
    }

    SDL_KEY = sdl_key;


}


function isIphoneX(){
    try{
        const iphoneModel = window.device.model;
        const model_num = iphoneModel.match(/iPhone(\d+),?(\d+)?/);
        const model = +model_num[1];
        if(model >= 10){
            return true;
        }
        
    }catch(e){

    }
    return false;

}


function refreshmap(){
    $('#map-canvas').height('99%');
    setTimeout(function(){
        $('#map-canvas').height('100%');
    },500);
    
}

var chat_update_ajax_handle;
function chat_update_content(booking_id){

    if (chat_update_ajax_handle) {
        chat_update_ajax_handle.abort();
    }    
        
    chat_update_ajax_handle = $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getChatContent', 'booking_id':booking_id},
        dataType: 'json',
        success: function(data){
            
            chat_update_ajax_handle = undefined;

            if(data.hasOwnProperty('error')){
                $('#chat-window-body').html(`<div class='center-screen'><p style='text-align:center;'>${data.error}</p></div>`);
            }

            if(data.hasOwnProperty('success')){
                //refresh chat content
                if(data.hasOwnProperty('chat_content')){
                    $('#chat-window-body').empty();
                    $('#chat-window-body').html(data.chat_content);
                    $('#chat-window-body').scrollTop(10000000);
                    
                }

                //new chat message?
                if(data.hasOwnProperty('chat_new_content') && data.chat_new_content == 1){
                    //notification_sound.play();
                    if(!chat_window_display_status){
                        $('#chat-new-msg-ind').show();
                    }
                }
            }
            

        },
        error: function(){
            chat_update_ajax_handle = undefined;
        } 


    });
    
}



function chat_msg_send(booking_id){

    
    let msg = $('#chat-msg-content').val();
    if(!msg)return;

    $('#chat-msg-send-btn').prop('disabled', true);
    $('#chat-msg-send-btn').css("background-color","grey");

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'chatSendMsg', 'booking_id':booking_id,'chat_msg':msg},
        dataType: 'json',
        success: function(data){

            $('#chat-msg-send-btn').prop('disabled', false);
            $('#chat-msg-send-btn').css("background-color","#0077ff");

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content               

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-msg-content').val('');
                    $('#chat-window-body').empty();
                    $('#chat-window-body').html(data.chat_content);
                    $('#chat-window-body').scrollTop(10000000);
                }

                //new chat message?
                if(data.hasOwnProperty('chat_new_content') && data.chat_new_content == 1){
                    //notification_sound.play();
                    if(!chat_window_display_status){
                        $('#chat-new-msg-ind').show();
                    }
                }

            }
            

        },
        error: function(){
            $('#chat-msg-send-btn').prop('disabled', false);
            $('#chat-msg-send-btn').css("background-color","#0077ff");
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}

function chat_support_msg_send(){
    

    let msg = $('#chat-support-msg-content').val();
    if(!msg)return;

    $('#chat-support-msg-send-btn').prop('disabled', true);
    $('#chat-support-msg-send-btn').css("background-color","grey");

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'chatSupportSendMsg','chat_msg':msg},
        dataType: 'json',
        success: function(data){

            $('#chat-support-msg-send-btn').prop('disabled', false);
            $('#chat-support-msg-send-btn').css("background-color","#0077ff");

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content               

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-support-msg-content').val('');
                    $('#chat-support-content').empty();
                    $('#chat-support-content').html(data.chat_content);
                    $('#chat-support-content').scrollTop(1000000000);
                }
                

            }
            

        },
        error: function(){
            $('#chat-support-msg-send-btn').prop('disabled', false);
            $('#chat-support-msg-send-btn').css("background-color","#0077ff");
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}



function get_chat_support_msg(){
    

    loading.show();

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getChatSupportMsg'},
        dataType: 'json',
        success: function(data){
            loading.hide();
            

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content     
                if(data.new_msg == 1){
                    $('#customer-chat-icon').css('color', 'red');
                }else{
                    $('#customer-chat-icon').css('color', 'white');
                }       

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-support-content').val('');
                    $('#chat-support-content').empty();
                    $('#chat-support-content').html(data.chat_content);
                    $('#chat-support-content').scrollTop(1000000000);
                }
                

            }
            

        },
        error: function(){
            loading.hide();
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}


function updateChatSupportMsg(){

    clearInterval(chat_support_msg_poll_timer_handle);
    chat_support_msg_poll_timer_handle = setInterval(function(){

    if (chat_update_ajax_handle) {
        chat_update_ajax_handle.abort();
    }  

     
    chat_update_ajax_handle = $.ajax({ 
                                url: ajaxurl, 
                                method: 'GET',
                                crossDomain:true,
                                timeout:20000,
                                xhrFields: {withCredentials: true},
                                data: { 'action_get' : 'getChatSupportMsg'},
                                dataType: 'json',
                                success: function(data){
                                    loading.hide();
                                    
                                        
                                    if(data.hasOwnProperty('success')){
                                        
                                        //refresh chat content               
                        
                                        if(data.hasOwnProperty('chat_content')){
                                            $('#chat-support-content').val('');
                                            $('#chat-support-content').empty();
                                            $('#chat-support-content').html(data.chat_content);
                                            
                                        }

                                        if(data.new_msg == 1){
                                            $('#chat-support-content').scrollTop(1000000000);
                                        }
                                        
                        
                                    }
                                    
                        
                                },
                                error: function(){
                                        
                                    return;
                        
                                } 
                        
                        
                            });


    },6000)
}



function call_rider(phonenum){
    if(phonenum){
        //window.plugins.CallNumber.callNumber(function(){return;}, function(){return;}, phonenum, 1);
        window.open('tel:' + phonenum,'_system');
    }
}



function sms_rider(phonenum){
    if(phonenum){
        //window.plugins.CallNumber.callNumber(function(){return;}, function(){return;}, phonenum, 1);
        window.open('sms:' + phonenum,'_system');
    }
}


function process_push_message(payload){
    //$('#ride-request').hide();
    if(!app_fully_started){
        push_notification_buffer = payload;
        return;
    }
    if("aps" in payload){
        if(payload.aps.hasOwnProperty('alert')){
            if(payload.show == 1){
                //flash message
                $('#notif-title').html(payload.aps.alert.title);
                $('#notif-content').html(payload.aps.alert.body);
                $('#notif-img').attr('src','img/notification_bg.jpg');
                $('#notif-dialog-action-btn').hide();
                notification_dialog.show();
                    
                //ons.notification.alert(payload.gcm.body,{title:payload.gcm.title});
                return;
            }
        }

        try{

            var ext_data_embed = JSON.parse(payload.show);
            if(typeof ext_data_embed == 'object'){
                if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 1){ //mode to show more detailed messages
                    $('#notif-title').html(ext_data_embed.title);
                    $('#notif-img').attr('src','img/notification_bg.jpg');
                    $('#notif-img-preload').attr('src','');
                    if(ext_data_embed.hasOwnProperty('image_url') && ext_data_embed.image_url){
                        $('#notif-img-preload').attr('src',ext_data_embed.image_url);
                    }

                    var message_html_content = ext_data_embed.message;
                    var entities_map = {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#039;': "'"
                    };
                
                    var message_dec_html = message_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});
                    message_dec_html = message_dec_html.replace(/(\\r\\n|\\n|\\r)/gm, "");
                    $('#notif-content').html(message_dec_html);

                    $('#notif-content').find('a').each(function(){
                        var el = $(this);
                        el.off('click').on('click', function(e){
                            e.preventDefault();
                            e.stopPropagation();        
                            let a_href = $(this).attr('href');
                            window.open(a_href, '_system', 'location=yes');
                        })
                    })

                    $('#notif-dialog-action-btn').hide();
                    if(ext_data_embed.hasOwnProperty('action')){
                        switch(ext_data_embed.action){
                            case 'scheduled_bk':                            
                            let top_page = document.querySelector('#myNavigator').topPage;
                            if(top_page.id != "scheduledtrips"){
                                $('#schd-trips-notify-icon').css('color','red');
                                $('#global-notify-icon').css('color','red');
                                $('#notif-title').html(__('New scheduled booking'));
                                $('#notif-img').attr('src','img/notification_bg.jpg');
                                $('#notif-content').html(__('A customer has scheduled a new booking. View the scheduled bookings page for more details'));
                                $('#notif-dialog-action-btn').text(__('Continue'));
                                $('#notif-dialog-action-btn').show();
                                notification_dialog.show();
                                $('#notif-dialog-action-btn').off().on('click', function(){
                                    scheduledtrips_show();
                                    notification_dialog.hide();
                                });
                                break;
                            }    
                            

                        }
                    }else{
                        notification_dialog.show();
                    }                   
                    
                    
                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 2){
                    //ride request
                    process_push_message(ext_data_embed.payload);
                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 3){
                    //account activation / deativation
                    ons.notification.alert(ext_data_embed.message,{title:""}); 
                    if(ext_data_embed.status == 0){
                        //account deativated
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }
                    }
                                                
                }
            }            

        }catch(e){
            console.log(e);
        }        
        //console.log("New foreground FCM message: ", payload);
    }else if("show" in payload){
        if(payload.show == 1){
            //flash message
            let msg_obj = JSON.parse(payload.msg);
            $('#notif-title').html(msg_obj.title);
            $('#notif-content').html(msg_obj.message);
            $('#notif-img').attr('src','img/notification_bg.jpg');
            $('#notif-dialog-action-btn').hide();
            notification_dialog.show(); 
            
        }

        try{

            var ext_data_embed = JSON.parse(payload.show);
            if(typeof ext_data_embed == 'object'){
                if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 1){ //mode to show more detailed messages
                    $('#notif-title').html(ext_data_embed.title);
                    $('#notif-img').attr('src','img/notification_bg.jpg');
                    $('#notif-img-preload').attr('src','');
                    if(ext_data_embed.hasOwnProperty('image_url') && ext_data_embed.image_url){
                        $('#notif-img-preload').attr('src',ext_data_embed.image_url);
                    }

                    var message_html_content = ext_data_embed.message;
                    var entities_map = {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#039;': "'"
                    };
                
                    var message_dec_html = message_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});
                    message_dec_html = message_dec_html.replace(/(\\r\\n|\\n|\\r)/gm, "");
                    $('#notif-content').html(message_dec_html);

                    $('#notif-content').find('a').each(function(){
                        var el = $(this);
                        el.off('click').on('click', function(e){
                          e.preventDefault();
                          e.stopPropagation();        
                          let a_href = $(this).attr('href');
                          window.open(a_href, '_system', 'location=yes');
                        })
                    })

                    $('#notif-dialog-action-btn').hide();
                    if(ext_data_embed.hasOwnProperty('action')){
                        switch(ext_data_embed.action){
                            case 'scheduled_bk':                            
                            let top_page = document.querySelector('#myNavigator').topPage;
                            if(top_page.id != "scheduledtrips"){
                                $('#schd-trips-notify-icon').css('color','red');
                                $('#global-notify-icon').css('color','red');
                                $('#notif-title').html(__('New scheduled booking'));
                                $('#notif-img').attr('src','img/notification_bg.jpg');
                                $('#notif-content').html(__('A customer has scheduled a new booking. View the scheduled bookings page for more details'));
                                $('#notif-dialog-action-btn').text(__('Continue'));
                                $('#notif-dialog-action-btn').show();
                                notification_dialog.show();
                                $('#notif-dialog-action-btn').off().on('click', function(){
                                    scheduledtrips_show();
                                    notification_dialog.hide();
                                });
                                break;
                            }

                        }
                    }else{
                        notification_dialog.show();
                    }
                    
                    
                    
                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 2){
                    //ride request
                    process_push_message(ext_data_embed.payload);
                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 3){
                    //account activation / deativation
                    ons.notification.alert(ext_data_embed.message,{title:""}); 
                    if(ext_data_embed.status == 0){
                        //account deativated
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }
                    }
                                               
                }
            }            

        }catch(e){
            console.log(e);
        }
    }
    if(payload.hasOwnProperty('booking_id') && payload.hasOwnProperty('action')){

        if(payload.action != "chat-message"){
            if(processed_notifications.hasOwnProperty(payload.booking_id)){
                var found = processed_notifications[payload.booking_id].find(function(el){
                    
                    return el == payload.action;
                    
                });
                if(found){
                    //console.log('processed');
                    let cur_time = Date.now() / 1000 | 0;
                    let notification_age = cur_time - processed_notifications_time[payload.booking_id];
                    if(notification_age < 3){
                        return;
                    }

                    //delete push notifications registered for this booking previously so as to allow new notifications when booking is re-allocated as a result of user retrying
                    if(payload.action == "driver-allocate"){  

                        delete processed_notifications[payload.booking_id];
                        delete processed_notifications_time[payload.booking_id];
                    }

                }else{
                    processed_notifications[payload.booking_id].push(payload.action);
                    //console.log('added');
                }
            }else{
                if(payload.action != "chat-message"){
                    processed_notifications[payload.booking_id] = [payload.action];
                    processed_notifications_time[payload.booking_id] = Date.now() / 1000 | 0;
                }
                
                //console.log('new');
                
            }
        }

        switch(payload.action){
            case "driver-allocate":
            booking_allocate_notify(payload);
            break;
            case "customer-cancelled":
            customer_cancelled_notify(payload);
            break;
            case "chat-message":
            chat_msg_notify(payload);
            break;
            case "clear-ride-request":
            clear_ride_request();
            break;
            
        }

        return;
    }
    /* if("action" in payload){
        switch(payload.action){
            case "driver-allocate":
            booking_allocate_notify(payload);
            break;
            case "customer-cancelled":
            customer_cancelled_notify(payload);
            break;
            
        }
    } */
}


function chat_msg_notify(push_data){

    notification_sound.play();
    
    if(!chat_window_display_status){
        $('#chat-new-msg-ind').show();
    }

    chat_update_content(push_data.booking_id);
}


function clear_ride_request(){

    clearInterval(driver_accept_ride_request_timer);
    ride_request_screen.hide(); 
    $('#ride-request-progress-timer').attr('value',0);
    driver_accept_time = 0;

    $('#top-controls-container').show(); 
    $('#banner-items-container').show();
    track_driver_on_map = 1; 
    $('#pulse-rings-container').hide();
    map.setPadding(0,0,0,0);

    if(rider_pickup_marker){
        rider_pickup_marker.setVisible(false);
    }

    if(rider_dropoff_marker){
        rider_dropoff_marker.setVisible(false);
    }

    if(route_polyline){
        route_polyline.setVisible(false);
    }

}



function booking_allocate_notify(push_data){

    let top_page = document.querySelector('#myNavigator').topPage;

    if(top_page.id){
        document.querySelector('#myNavigator').popPage( 
            {            
                times: 5     
            }
        );
    }

    driver_accept_ride_push_data = push_data;
    
    $('#accept-booking').data('bookid',push_data.booking_id);
    $('#ride-request-cancel').data('bookid',push_data.booking_id);
    $('#request-pickup').html(push_data.p_address);
    $('#request-dropoff').html(push_data.d_address ? push_data.d_address : __('Destination not specified'));
    $('#rider-image-preload').attr('src',push_data.rider_image);
    $('#rider-name').html(push_data.rider_name);
    $('#rider-rating').attr('src','img/rating-' + push_data.rider_rating +'.png');
    $('#ride-estimated-price').html(city_curency_symbol + push_data.fare);

    let trip_req_distance = parseFloat(push_data.est_distance);
    let trip_req_duration = parseFloat(push_data.est_duration);

    $('#booking-hourly-type').hide();

    if(push_data.service_mode == 1){
        //Quick ride
        if(parseInt(push_data.hourly_rate_hours)){
            //hourly rate enabled
            $('#booking-hourly-type').show();
            $('#booking-hourly-type').html(__('{---1} Hours',[push_data.hourly_rate_hours]));
            if(parseInt(push_data.hourly_rate_hours) == 1){
                $('#booking-hourly-type').html(__('{---1} Hour',[push_data.hourly_rate_hours]));
            }
            
            $('#booking-trip-type-desc').html(`<img src="img/td-quickride.png" style="width:28px;margin-right:10px;" /> ${__('Quick-ride')} <ons-icon icon="fa-stop" size="10px" style="color: var(--set-foreground-color);margin:0 10px;"></ons-icon> ${__('Hourly')}`);
        }else{
            $('#booking-trip-type-desc').html(`<img src="img/td-quickride.png" style="width:28px;margin-right:10px;" /> ${__('Quick-ride')}`);
        }
        
    }else if(push_data.route_scope == 1){
        //Inter state ride
        $('#booking-trip-type-desc').html(`<img src="img/td-interstate.png" style="width:28px;margin-right:10px;" /> ${__('City to city trip')}`);
    }else if(push_data.waypoint1_address || push_data.waypoint2_address){
        //Trip has Stops
        $('#booking-trip-type-desc').html(`<img src="img/td-stops.png" style="width:28px;margin-right:10px;" /> ${__('Trip includes stops')}`);
    }else{
        //intra city trip
        if(trip_req_distance > 10){
            //long distance (greater than 10km)
            $('#booking-trip-type-desc').html(`<img src="img/td-interstate.png" style="width:28px;margin-right:10px;" /> ${__('Long trip')}`);
        }else{
            //short distance (less thank 16km)
            $('#booking-trip-type-desc').html(`<img src="img/td-intracity.png" style="width:28px;margin-right:10px;" /> ${__('Short trip')}`);
        }
        
    }
    

    trip_req_duration_secs = Math.ceil(trip_req_duration * 60);
    
    let _hours = Math.floor(trip_req_duration_secs / 3600);
    let _minutes = Math.floor((trip_req_duration_secs % 3600) / 60);

    let trip_req_duration_text = '';

    if(_hours){
        trip_req_duration_text += _hours + 'Hr ';
    }

    if(_minutes){
        trip_req_duration_text += _minutes + ' min ';
    }else{
        trip_req_duration_text += '0' + ' min ';
    }

    $('#trip-req-duration').text(trip_req_duration_text); 

    if(routetariffs.result[userprofileinfo.city_id].cars[0].dist_unit == 0){ //kilometer
        $('#trip-req-distance').text(trip_req_distance.toFixed(2) + 'km');
    }else{//miles
        let trip_req_distance_meters = trip_req_distance * 1000;
        let trip_req_distance_miles = trip_req_distance_meters / 1609.344; //convert to mi
        $('#trip-req-distance').text(trip_req_distance_miles + 'mi');
    }


    

    if(push_data.payment_type == 1){
        $('#ride-payment-type').html(__("Cash Payment"));
    }else if(push_data.payment_type == 2){
        $('#ride-payment-type').html(__("Wallet Payment"));
    }else if(push_data.payment_type == 3){
        $('#ride-payment-type').html(__("Card Payment"));
    }else{
        $('#ride-payment-type').html("POS Payment");
    }

    let city_vehicles = routetariffs.result[userprofileinfo.city_id].cars;
    $('#booking-ride-type').hide();
    city_vehicles.forEach(function(val,indx){
        if(val.id == push_data.ride_id){
            $('#booking-ride-type').show();
            $('#booking-ride-type').html(val.ride_type);            
        }
    })

    var driver_accept_duration = push_data.driver_accept_duration;
    var notif_sent_time = push_data.sent_time;

    var current_timestamp = Date.now(); 
    current_timestamp += server_client_time_diff; //sync with server time
    current_timestamp = current_timestamp / 1000 | 0; //get only the seconds part

    driver_accept_time = driver_accept_duration - (current_timestamp - notif_sent_time);

    if(driver_accept_time <= 0 )return;

    driver_accept_ride_request_timer_step = (100 / driver_accept_time);


    var play_rate = 0;
    var rider_pickup_location_lat = parseFloat(push_data.p_lat);
    var rider_pickup_location_lng = parseFloat(push_data.p_lng);

    var rider_dropoff_location_lat = parseFloat(push_data.d_lat) ? parseFloat(push_data.d_lat) : 0.00;
    var rider_dropoff_location_lng = parseFloat(push_data.d_lng) ? parseFloat(push_data.d_lng) : 0.00;

    
    $('#rider-dist-time').text('---'); 
    $('#rider-dist-driver').text('---');

    driver_accept_ride_request_timer_indicator = 0;
    clearInterval(driver_accept_ride_request_timer);
    driver_accept_ride_request_timer = setInterval(function(){
        play_rate ++;
        if(play_rate > 2){
            play_rate = 0;
            ride_alloc_sound.play();
        }
        driver_accept_ride_request_timer_indicator += driver_accept_ride_request_timer_step;
        var ind_val = Math.round(driver_accept_ride_request_timer_indicator);
        $('#ride-request-progress-timer').attr('value',ind_val);
        if(driver_accept_ride_request_timer_indicator >= 100){
            clear_ride_request();
        }

        //compute driver distance and time from the rider
        if(driver_lat && driver_lng){

            let google_dir_set_status = $('#rider-dist-time').data('gset');
            if(google_dir_set_status == 1)return;

            let rider_latlng = {'lat':rider_pickup_location_lat,'lng':rider_pickup_location_lng};
            let driver_latlng = {'lat':driver_lat,'lng':driver_lng};
            let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
            let time_to_pickup_location_sec = distance / 15.555555556; //20km/hr to m/s - worst case time if driver is driving at this average speed

            let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
            
            if(time_to_pickup_location_min > 1){
                $('#rider-dist-time').text(time_to_pickup_location_min + 'mins'); 
            }else{
                $('#rider-dist-time').text(time_to_pickup_location_min + 'min');
            }

            //let driver_dist_from_rider = 0;
            if(routetariffs.result[userprofileinfo.city_id].cars[0].dist_unit == 0){ //kilometer
                distance = distance / 1000; //convert to KM
                distance = Math.floor(distance * 100) / 100; //2 decimal fixed point
                $('#rider-dist-driver').text(distance + 'km');
            }else{//miles
                distance = distance / 1609.344; //convert to mi
                distance = Math.floor(distance * 100) / 100; //2 decimal fixed point
                $('#rider-dist-driver').text(distance + 'mi');
            }
            
            
            

        }

    },1000);

    map.setPadding(0,0,320,0);

    if(rider_pickup_marker){
        rider_pickup_marker.setVisible(true);
        rider_pickup_marker.setPosition({
            lat:rider_pickup_location_lat,
            lng: rider_pickup_location_lng                                            
        });

        map.setClickable(false);
        map.moveCamera({
            target: {lat: rider_pickup_location_lat, lng: rider_pickup_location_lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });

        
    }else{
        map.setClickable(false);
        map.moveCamera({
            target: {lat: rider_pickup_location_lat, lng:rider_pickup_location_lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });

        
        rider_pickup_marker = map.addMarker({
                    'position':{lat: rider_pickup_location_lat,lng: rider_pickup_location_lng},
                    'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                    animation: plugin.google.maps.Animation.DROP
                });

    }
    

    if(push_data.service_mode != 1){
        if(rider_dropoff_marker){
            rider_dropoff_marker.setVisible(true);
            rider_dropoff_marker.setPosition({
                lat:rider_dropoff_location_lat,
                lng: rider_dropoff_location_lng                                            
            });
            
        }else{
                    
            rider_dropoff_marker = map.addMarker({
                        'position':{lat: rider_dropoff_location_lat,lng: rider_dropoff_location_lng},
                        'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    });

        }
    }



    
    ride_alloc_sound.play();
    prepare_ride_req_view();
    ride_request_screen.show();

    getDriverRiderDistanceTime(driver_lat,driver_lng,rider_pickup_location_lat,rider_pickup_location_lng,rider_dropoff_location_lat,rider_dropoff_location_lng);


}



function prepare_ride_req_view(){
    $('#top-controls-container').hide();
    $('#banner-items-container').hide();
    track_driver_on_map = 0;
    clearTimeout(reset_driver_marker_track_status_timer);
}



function getDriverRiderDistanceTime(lat1,lng1,lat2,lng2,lat3 = 0.00,lng3 =  0.00){
    
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getdirections','drv-lat':lat1,'drv-lng':lng1,'p-lat':lat2,'p-lng':lng2,'d-lat':lat3,'d-lng':lng3,'mode' : 1},
        dataType: 'json',
        success: function(data){                        
            

            if(data.hasOwnProperty('direction_details') && data.direction_details.status === 'OK'){

                $('#rider-dist-time').data('gset',1);

                let distance = parseInt(data.direction_details.routes[0].distanceMeters); //distance in meters
                let city_duration = Math.ceil(parseInt(data.direction_details.routes[0].duration) / 60);
                let city_distance = parseInt(data.direction_details.routes[0].distanceMeters) / 1000; //default value in metric

                let city_duration_text = data.direction_details.routes[0].duration;
                let city_distance_text = data.direction_details.routes[0].distanceMeters + "m";

                if(city_duration > 1){
                    $('#rider-dist-time').text(Math.floor(city_duration) + 'mins');
                }else{
                    $('#rider-dist-time').text(Math.floor(city_duration) + 'min');
                }
                
    
                //let driver_dist_from_rider = 0;
                if(routetariffs.result[userprofileinfo.city_id].cars[0].dist_unit == 0){ //kilometer
                    distance = distance / 1000; //convert to KM
                    distance = Math.floor(distance * 100) / 100; //2 decimal fixed point
                    $('#rider-dist-driver').text(distance + 'km');
                }else{//miles
                    distance = distance / 1609.344; //convert to mi
                    distance = Math.floor(distance * 100) / 100; //2 decimal fixed point
                    $('#rider-dist-driver').text(distance + 'mi');
                }
                
                //plot route

                route_points = [];
                route_points = plugin.google.maps.geometry.encoding.decodePath(data.direction_details.routes["0"].polyline.encodedPolyline);
                
                if(route_polyline != null){
                    route_polyline.setVisible(false);
                    route_polyline.setPoints(route_points);
                    route_polyline.setVisible(true);  

                    
                    map.animateCamera({
                    target: route_points,
                    duration: 1000,
                    }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);
                    });
                    
                }else{

                    route_polyline = map.addPolyline({
                        "points": route_points,
                        'color' : '#000000',
                        'width': 3,
                        'geodesic': true,
                        'clickable': true
                    });
                    
                    route_polyline.setVisible(true);
                    route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                        
                        map.animateCamera({
                            target: route_points,
                            duration: 1000,
                            }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                        });
                    });

                    map.animateCamera({
                        target: route_points,
                        duration: 1000,
                        }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                    });

                }
                
                
                return             
                
            }
    
            
    
        },
        error: function(){           
            
            return;
            
        } 
    
    
    });


}


function customer_cancelled_notify(push_data){
    ride_cancel_sound.play();
    localStorage.removeItem(`pbk-${push_data.booking_id}`);

    let pending_bookings_count = updateAuxBookings();



    if(driver_accept_ride_request_ui_states.hasOwnProperty("booking_id") && driver_accept_ride_request_ui_states.booking_id == push_data.booking_id){
        //current booking driver is on has been cancelled. Clean up UI and show message

        if(driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){ 
            //$('#ride-cancel-btn').hide();
            clearInterval(wait_timer_handle);
            $("#wait-time-info-container").hide();
            $("#wait-stop-time-info-container").hide();
            $('#status-msg-container').css('top','10px');
            $("#statusmsg").css("visibility","visible");
            $('#ride-stats').hide();
            $("#menubtn").css("z-index","100");
            $("#menubtn").css("visibility","visible");
            $("#nointernet").css("opacity","1");
            $("#driver-available-btn").css("visibility","visible");
            $('#available-status-text-container').css("visibility","visible");
            $('#driver-online-indicator').fadeIn();
            /* $("#statusmsg").removeClass("fadeOutUp animated").addClass("fadeOutUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass("fadeOutUp animated");
                $("#statusmsg").css("z-index","5");
                $("#statusmsg").css("visibility","hidden");
                
                $('#status-msg-container').css('top','-1000px');

            }); */
                
            $("#ride-control-panel").css("visibility","visible");
            $("#nav-btn-container").hide();
            $("#ride-control-panel").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass("fadeOutDown animated");
                $("#ride-control-panel").css("visibility","hidden");    

                $('#driver-stats-panel').show();
                $("#driver-stats-panel").removeClass("slideInUp animated").addClass("slideInUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $('#banner-items-container').fadeIn();
                    $(this).removeClass("slideInUp animated");
                })            
            })
            if(!pending_bookings_count){
                clearMapItemsSelectively();
                getuserlocation(); 
            }
            ons.notification.alert(__("The booking with ID: {---1} has been cancelled by the rider",[push_data.booking_id]),{title:""});
            driver_accept_ride_request_ui_states = {};
            return; 
        }else{
            if(!pending_bookings_count){
                clearMapItemsSelectively();
                getuserlocation(); 
            }
            driver_accept_ride_request_ui_states = {};
            ons.notification.alert(__("The booking with ID: {---1} has been cancelled by the rider",[push_data.booking_id]),{title:""});
            return;
        }
    }else{
        //just show message
        if(!pending_bookings_count){
            clearMapItemsSelectively();
            getuserlocation(); 
        }
        ons.notification.alert(__("The booking with ID: {---1} has been cancelled by the rider",[push_data.booking_id]),{title:""});
        return;
    }
}

function locnav(pickdrop,ongmap,long,lat){

    if(pickdrop == 1 && !parseFloat(lat) && !parseFloat(long)){
        ons.notification.alert(__("Navigation to the drop-off location is disabled because the customer did not specify a drop-off location"),{title:""});
        return;
    }

    let nav_apps_list_html = "";
    let nav_apps = [
                        {app_name: "Apple",value : `maps:?q=${lat},${long}`,img_icon_url : "img/apple-map-logo.png", title : __("Apple Maps App")},
                        {app_name: "Google",value : `geo:?q=${lat},${long}`,img_icon_url : "img/google-map-logo.png", title : __("Google Maps App")},
                        {app_name: "Waze",value : `https://waze.com/ul?ll=${lat},${long}&navigate=yes`,img_icon_url : "img/waze-map-logo.png", title : __("Waze Maps App")},
                        {app_name: "Yandex",value : `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${long}`,img_icon_url : "img/yandex-map-logo.png", title : __("Yandex Maps App")}
            
                    ];

    nav_apps.forEach(function(val,indx){
        
        nav_apps_list_html += `<ons-list-item data-value="${val.value}" class="sel-list-item">
                                  
                                  <div class="left">
                                      <img src="${val.img_icon_url}" style="width:32px;" />
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val.title}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${indx}">                                      
                                  </div>
                              </ons-list-item>`;
    })

    nav_apps_list_html = `<ons-list>${nav_apps_list_html}</ons-list>`;

    $('#customselectcontent').empty();
    $('#customselectcontent').html(nav_apps_list_html);

    if(pickdrop == 1){
        customItemSelect(0,__('Navigate with...'), function(value){

            dropoffmap(ongmap,long,lat,value);

        });
    }else{
        customItemSelect(0,__('Navigate with...'), function(value){
            
            pickupmap(ongmap,long,lat,value);
        });
    }
      
    
}

function pickupmap(ongmap,long,lat,url){       

       if(ongmap){//plot on google map
            window.cordova.InAppBrowser.open(url, '_system');          
            return;
       }


        if(track_driver_on_map){
            track_driver_on_map = 0;
        }else{
            track_driver_on_map = 1;
            if(driver_lat && driver_lng){
                map.setClickable(false);
                map.animateCamera({
                    target: {lat: driver_lat, lng: driver_lng},
                    zoom: 18,
                    duration: 1000,
                    padding: 0  // default = 20px
                }, function() {
                    map.setClickable(true);
                    //alert("Camera target has been changed");

                }); 
            }  
            return;     
        }
       
       var p_lng = parseFloat(long);
       var p_lat = parseFloat(lat);
       
       
       if(rider_pickup_marker){
        rider_pickup_marker.setVisible(true);
        rider_pickup_marker.setPosition({
            lat:p_lat,
            lng: p_lng                                            
        });

        map.setClickable(false);
        map.animateCamera({
            target: {lat: p_lat, lng: p_lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });

        
    }else{
        map.setClickable(false);
        map.animateCamera({
            target: {lat: p_lat, lng:p_lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });


        rider_pickup_marker = map.addMarker({
                    'position':{lat: p_lat,lng: p_lng},
                    'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                    animation: plugin.google.maps.Animation.DROP
                });

    }
           
       
       
   
   }



   
   function dropoffmap(ongmap,long,lat,url){
      
          if(ongmap){//plot on google map
            
                window.cordova.InAppBrowser.open(`comgooglemaps://?daddr=${lat},${long}&directionsmode=driving`, '_system');     
                return;
          }

            if(track_driver_on_map){
                track_driver_on_map = 0;
            }else{
                track_driver_on_map = 1;
                if(driver_lat && driver_lng){
                    map.setClickable(false);
                    map.animateCamera({
                        target: {lat: driver_lat, lng: driver_lng},
                        zoom: 18,
                        duration: 1000,
                        padding: 0  // default = 20px
                    }, function() {
                        map.setClickable(true);
                        //alert("Camera target has been changed");

                    }); 
                }  
                return;     
            }
          
          var d_lng = parseFloat(long);
          var d_lat = parseFloat(lat);
          
          
          if(rider_dropoff_marker){
            rider_dropoff_marker.setVisible(true);   
            rider_dropoff_marker.setPosition({
               lat:d_lat,
               lng: d_lng                                            
           });
   
           map.setClickable(false);
           map.animateCamera({
               target: {lat: d_lat, lng: d_lng},
               zoom: 18,
               duration: 1000,
               padding: 0  // default = 20px
           }, function() {
               map.setClickable(true);
               //alert("Camera target has been changed");
   
           });
   
           
       }else{
           map.setClickable(false);
           map.animateCamera({
               target: {lat: d_lat, lng:d_lng},
               zoom: 18,
               duration: 1000,
               padding: 0  // default = 20px
           }, function() {
               map.setClickable(true);
               //alert("Camera target has been changed");
   
           });
   
           rider_dropoff_marker = map.addMarker({
                       'position':{lat: d_lat,lng: d_lng},
                       'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                       animation: plugin.google.maps.Animation.DROP
                   });
       }
              
          
          
      
      }



function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        var copied = false;
        try {
            copied = true;
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            ons.notification.toast(__("Failed to copy referal code"),{
                timeout: 1000
            });
            return false;
        } finally {
            document.body.removeChild(textarea);
            if(copied){
                ons.notification.toast(__("Referal code copied"),{
                    timeout: 1000
                });
            }
        }
    }
}






$('.rate-star').on('click', function(){
    var star_level = $(this).data('level');
    switch(star_level){
        case 1:
        ride_rating = 1;
        $('.rate-star').css('color','black');
        $('#star-level-1').css('color','yellow');        
        break;

        case 2:
        ride_rating = 2;
        $('.rate-star').css('color','black');
        $('#star-level-1').css('color','yellow');
        $('#star-level-2').css('color','yellow');      
        break;

        case 3:
        ride_rating = 3;
        $('.rate-star').css('color','black');
        $('#star-level-1').css('color','yellow');
        $('#star-level-2').css('color','yellow');
        $('#star-level-3').css('color','yellow');        
        break;

        case 4:
        ride_rating = 4;
        $('.rate-star').css('color','black');
        $('#star-level-1').css('color','yellow');
        $('#star-level-2').css('color','yellow');
        $('#star-level-3').css('color','yellow');
        $('#star-level-4').css('color','yellow');        
        break;

        case 5:
        ride_rating = 5;
        $('.rate-star').css('color','black');
        $('#star-level-1').css('color','yellow');
        $('#star-level-2').css('color','yellow');
        $('#star-level-3').css('color','yellow');
        $('#star-level-4').css('color','yellow');
        $('#star-level-5').css('color','yellow');        
        break;

    }

})


function rate_ride(bookingid,comment){
    
    if(!bookingid){
        $('#rate-ride').hide({animation:"fade"}); 
        return;
    }
    
    loading.show();
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'rateride', 'rating':ride_rating,'bookingid':bookingid,'comment':comment},
        dataType: 'json',
        success: function(data){
            loading.hide();
            if(data.hasOwnProperty('error')){
                ons.notification.alert(data.error);
                return;
            }
           
           //$('#rate-ride').hide({animation:"fade"});
           document.querySelector('#myNavigator').popPage({animation: 'fade'});
           
        },
        error: function(){
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"));
            return;
        } 


    });
}





function onBackButton(){

    if(side_menu_state){
        document.querySelector('#mySplitter').left.close();
        return;
      }
      if(close_dialog_enable)return;
      close_dialog_enable = 1;
      ons.notification.confirm({
        message: __('Do you want to exit?'),
        // or messageHTML: '<div>Message in HTML</div>',
        title: __('Close App'),
        buttonLabels: [__('Yes'), __('No')],
        animation: 'default', // or 'none'
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
         
          if(!index){
            // 0-: Button index from the left
            navigator.app.exitApp();
          }else{
            close_dialog_enable = 0;
            // -1: Cancel
          }
         
        }
      });  


}





function profileupdate(){

    var old_password = $('#oldpassword').val();
    var new_password = $('#newpassword').val();
    var confirm_password = $('#confirmpassword').val();
    var user_phone = $('#phone').val();
    var user_email = $('#email').val();
    var operation_city = $('#op-city').find(':selected').val(); 
    var car_category = $('#car-cat').find(':selected').val(); 
    var country_2c_code = $('#country-flag-profile').data('country');
    var country_call_code = $('#tel-code-profile').data('dialcode');


    if(!user_email){
        ons.notification.alert(__("Email field cannot be empty"),{title:""});
        return;
    }

    if(!user_phone){
        ons.notification.alert(__("Phone number field cannot be empty"),{title:""});
        return;
    }
    
    if(old_password && new_password && confirm_password != new_password){
        ons.notification.alert(__("Passwords do not match"),{title:""});
        return;
    }

    if((old_password && !confirm_password) || (old_password && !new_password)){
        ons.notification.alert(__("Please enter a new password"),{title:""});
        return;
    }

    loading.show();

    var post_data = {'action':'updateUserProfile','country_code' : country_2c_code,'country_dial_code' : country_call_code,'op_city':operation_city,'car_category': car_category,'phone':user_phone,'email':user_email,'oldpassword':old_password,'newpassword':new_password};
    
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
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
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){

                ons.notification.alert(data_obj.success, {title:"",buttonLabels:[__('Restart App')],callback: function(){
                    //navigator.app.exitApp();
                    window.location.reload();
                    return;
                }});
                
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
        }

    });




}







function getavailablecitydrivers(city){

    clearInterval(get_available_drivers_timer);  
    get_available_drivers_timer = setInterval(function(){

        let top_page = document.querySelector('#myNavigator').topPage;
        if(top_page.id == ""){
            map_visibility_status = 1;
        }else{
            map_visibility_status = 0;
        }

        if(driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
            
            //Trip in progres. make all other driver icons invisible
            for(var key in city_drivers_markers){                
                city_drivers_markers[key].marker.setVisible(false);
            }
        }else{
            //No trip in progress
            
            //ensure all invisible drivers are visible
            for(var key in city_drivers_markers){
                if(!city_drivers_markers[key].marker.isVisible()){
                    city_drivers_markers[key].marker.setVisible(true);
                }
            }

        }
        
        $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 10000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getavailablecitydrivers','city':city,'sdl_key' : SDL_KEY},
        dataType: 'json',
        success: function(data){
            
            if(data.hasOwnProperty('error')){
                //ons.notification.alert(data.error);
                return;
            }  


            

            var avail_drivers_location_last_update_time = Date.now();
            

            if(data.hasOwnProperty('success')){

                if(data.drivers_locations.length){      
                
                    //populate map with drivers location data
                    data.drivers_locations.forEach(function(options){

                        if(city_drivers_markers.hasOwnProperty('drv' + options.driver_id)){

                            //update marker
                            let drv_distance_delta = 0;
                            city_drivers_markers['drv' + options.driver_id].last_update_time = avail_drivers_location_last_update_time;

                            if(!city_drivers_markers['drv' + options.driver_id].animate_pos){

                                //not animating, update positions

                                let drv_new_pos = options.position;
                                let drv_cur_pos = city_drivers_markers['drv' + options.driver_id].marker.getPosition();
                                city_drivers_markers['drv' + options.driver_id].curposition = options.position;
                                city_drivers_markers['drv' + options.driver_id].oldposition = drv_cur_pos;

                                
                                //check how much distance between the driver marker and the new location coord. This is to rule out spurious location data and not animate
                                drv_distance_delta = plugin.google.maps.geometry.spherical.computeDistanceBetween(drv_new_pos, drv_cur_pos);
                                
                                //let max_anim_drv_distance_delta = 22  * (AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL / 1000); //animate driver speed of 80Km/hr. values higher than this don't animate marker just set the position on map
                                let max_anim_drv_distance_delta = 500; 

                                if(isNaN(drv_distance_delta))drv_distance_delta = 0;

                                
                                //there is a change in driver position

                                if(drv_distance_delta > max_anim_drv_distance_delta){
                                    //Change is outside limits. do not animate. 
                                    city_drivers_markers['drv' + options.driver_id].marker.setPosition(options.position);
                                }else{
                                    //Change is within limits. Animate. 
                                    city_drivers_markers['drv' + options.driver_id].animate_pos = 1; //set animation enable flag
                                    city_drivers_markers['drv' + options.driver_id].animation_fraction_pos = 0.00;
                                }
                                
                                
                            }



                            if(!city_drivers_markers['drv' + options.driver_id].animate_rot && parseFloat(data.drivers_locations[0].b_angle) > 0){
                                
                                if(Math.abs(city_drivers_markers['drv' + options.driver_id].oldbearing - parseFloat(options.b_angle)) >= 180 ){

                                    city_drivers_markers['drv' + options.driver_id].marker.setRotation(parseFloat(options.b_angle));

                                }else{

                                    city_drivers_markers['drv' + options.driver_id].animate_rot = 1;
                                    city_drivers_markers['drv' + options.driver_id].animation_fraction_rot = 0.00;
                                    city_drivers_markers['drv' + options.driver_id].oldbearing = city_drivers_markers['drv' + options.driver_id].marker.getRotation();
                                    city_drivers_markers['drv' + options.driver_id].curbearing = parseFloat(options.b_angle);

                                }

                            }     
                            
                            

                        }else{ 

                            //create the driver icon marker

                            city_drivers_markers['drv' + options.driver_id] = {};

                            city_drivers_markers['drv' + options.driver_id]['marker'] = map.addMarker(options, function(marker){
                                
                                marker._isReady = true;
                                marker.setDisableAutoPan(true);
                                marker.setRotation(options.b_angle);                                        
                                marker.setIconAnchor(16,16); //32x32 marker icon size. set anchor at midpoint

                            });

                            
                            //add animation properties

                            city_drivers_markers['drv' + options.driver_id]['driver_id'] = options.driver_id;
                            city_drivers_markers['drv' + options.driver_id]['curposition'] = parseFloat(options.position);
                            city_drivers_markers['drv' + options.driver_id]['oldposition'] = null;
                            city_drivers_markers['drv' + options.driver_id]['curbearing'] = parseFloat(options.b_angle);
                            city_drivers_markers['drv' + options.driver_id]['oldbearing'] = null;
                            city_drivers_markers['drv' + options.driver_id]['animate_pos'] = 0;
                            city_drivers_markers['drv' + options.driver_id]['animation_fraction_pos'] = 0.00;
                            city_drivers_markers['drv' + options.driver_id]['animate_rot'] = 0;
                            city_drivers_markers['drv' + options.driver_id]['animation_fraction_rot'] = 0.00;
                            city_drivers_markers['drv' + options.driver_id]['last_update_time'] = avail_drivers_location_last_update_time;


                        }

                        

                        

                    });

                }


                //Initialize newly created markers. Remove markers that werent updated. This means the drivers are no longer available
                for(var key in city_drivers_markers){
                    if(city_drivers_markers[key].last_update_time == avail_drivers_location_last_update_time || city_drivers_markers[key].animate_pos == 1 || city_drivers_markers[key].animate_rot == 1)continue; //skip markers that have been updated or still being animated
                    city_drivers_markers[key].marker.remove();
                    delete city_drivers_markers[key];
                }

                if(data.hasOwnProperty('completed_trips')){
                    $('#driver-stats-completed').html(data.completed_trips);
                }

                if(data.hasOwnProperty('driver_today_earning')){
                    let today_earnings_default_cur = parseFloat(data.driver_today_earning);
                    let today_earnings_city_cur = today_earnings_default_cur * city_curency_exchange_rate;                   
                    $('#driver-stats-earning').html(city_curency_symbol + Number(today_earnings_city_cur).toMoney(2, ".", ""));
                }


                if(data.hasOwnProperty('driver_time_online')){
                    $('#driver-stats-time-online').html(data.driver_time_online);
                }




                //update trip time left
                if(driver_accept_ride_request_ui_states.ui_state == 1){ //ride accept
                    let driver_latlng = {'lat':driver_lat,'lng':driver_lng};
                    let rider_latlng = {'lat':parseFloat(driver_accept_ride_request_ui_states.p_lat),'lng':parseFloat(driver_accept_ride_request_ui_states.p_lng)};
                    let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
                    let time_to_pickup_location_sec = distance / 15.555555556; //20km/hr to m/s - worst case time if driver is driving at this average speed

                    let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
                    $('#ride-stat-time-to-location').text(time_to_pickup_location_min); 
                    if(time_to_pickup_location_min > 1){
                        $('#ride-stat-time-to-location-unit').text('Mins'); 
                    }else{
                        $('#ride-stat-time-to-location-unit').text('Min');
                    }
                }else if(driver_accept_ride_request_ui_states.ui_state == 2){
                    $('#ride-stat-time-to-location').text("0");
                    $('#ride-stat-time-to-location-unit').text('Min');
                }else if(driver_accept_ride_request_ui_states.ui_state == 3){ //rider on ride
                    if(!parseFloat(driver_accept_ride_request_ui_states.d_lat) || !parseFloat(driver_accept_ride_request_ui_states.d_lng)){
                        $('#ride-stat-time-to-location').text("--");
                        $('#ride-stat-time-to-location-unit').text('Mins');
                    }else{
                        let driver_latlng = {'lat':driver_lat,'lng':driver_lng};
                        let rider_latlng = {'lat':parseFloat(driver_accept_ride_request_ui_states.d_lat),'lng':parseFloat(driver_accept_ride_request_ui_states.d_lng)};
                        let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
                        let time_to_pickup_location_sec = distance / 15.555555556; //20km/hr to m/s - worst case time if driver is driving at this average speed

                        let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
                        $('#ride-stat-time-to-location').text(time_to_pickup_location_min); 
                        if(time_to_pickup_location_min > 1){
                            $('#ride-stat-time-to-location-unit').text('Mins'); 
                        }else{
                            $('#ride-stat-time-to-location-unit').text('Min');
                        }
                    }

                }
                    
                    

                //update banner data if available

                if(data.hasOwnProperty('bannerdata')){
                    if(data.bannerdata == 'nodata'){
                        $('#banner-items-container').css('left', '-10000px');  
                        $('#banner-items-container').empty();
                        banner_data = '';
                    }else{

                        if(data.bannerdata == banner_data){
                            return;
                        }                
                        
                        banner_data = data.bannerdata;
                        $('#banner-items-container').html(data.bannerdata);
                        if(Math.ceil($('#driver-stats-panel').outerHeight(true))){
                            $('#banner-items-container').css('left', '0px');
                            $('#banner-items-container').css('bottom', (Math.ceil($('#driver-stats-panel').outerHeight(true)) + 10) + 'px'); 
                        }
                        
                    }

                }

                if(data.hasOwnProperty('sdl_status') && data.sdl_status == 1){
                    //multiple device login. force restart
                    BackgroundGeolocation.stop();
                    clearInterval(get_available_drivers_timer);
                    let top_page = document.querySelector('#myNavigator').topPage;
                    document.querySelector('#mySplitter').left.close();
                    localStorage.removeItem("sess_id");
                    localStorage.removeItem("sdl_key");
                    initSession()
                    if(top_page.id != "loginpage"){
                        Login_show();
                    }
                }


                if(data.hasOwnProperty('dis_availability') && data.dis_availability == 1 && driver_availability == true){
                    driver_offline_sound.play();
                    driver_availability = false;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));

                    //check if driver is on an active trip
                    if(driver_accept_ride_request_ui_states.hasOwnProperty('ui_state') && driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
                        ons.notification.alert(__('Your wallet balance is low. Please add money to your wallet to receive ride requests'),{title:''});
                    }else{
                        //show the wallet page
                        walletpage_show();
                        ons.notification.alert(__('Your wallet balance is low. Please add money to your wallet to receive ride requests'),{title:''});
                    }

                }



                


            }
           
            
        },
        error: function(){
            
            //ons.notification.alert("Error communicating with server");
            return;
        } 


    });
    animateBannerItems();

    },10000)
}



var last_banner_anim_time;
var current_displayed_banner = 1;


function animateBannerItems(){

    const ANIM_INTERVAL = 10;

    let cur_time_sec = Date.now();
    cur_time_sec = cur_time_sec / 1000 | 0;
    
    if(!last_banner_anim_time){
        last_banner_anim_time = cur_time_sec;
        return;
    }

    let time_diff = cur_time_sec - last_banner_anim_time;
    if(time_diff < ANIM_INTERVAL){
        return;
    }

    last_banner_anim_time = cur_time_sec;

    if(!$('#banner-items-container').html())return;

    let num_of_banners = $('#banner-items-container [id^=banner-info-item-]').length;

    if(num_of_banners > 1){
        current_displayed_banner++;
        if(current_displayed_banner <= num_of_banners){
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });            
        }else{
            current_displayed_banner = 1;
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });
            
        } 
        
    }else{
        if(!$('#banner-items-container [id^=banner-info-item-]').eq(0).is(':visible')){
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(0).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(0).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });
        }
        current_displayed_banner = 1;         
    }


}


function showBanner(id){
    document.querySelector('#myNavigator').pushPage('html/banner.html',{animation:'fade',data:{'banner_id':id}});
}



function updatepushnotificationtoken(){
    if(APP_DEBUG)return;
    cordova.plugins.firebase.messaging.getToken().then(function(token) {
        
        if(!token){

            //alert('no_token');
            get_push_token_retry_count++
            if(get_push_token_retry_count < 3){
                setTimeout(updatepushnotificationtoken(), 20000);
                return;
            }
            get_push_token_retry_count = 0;
            return;
        }else{
            
            var post_data = {'action':'updatePushNotificationToken','token':token};

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                timeout : 20000,
                crossDomain:true,
                xhrFields: {withCredentials: true},
                data: post_data,
                tryCount : 0, 
                retryLimit : 3,
                success: function (data, status)
                {
                    return;

                },
                error: function(jqXHR,textStatus, errorThrown) {  
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }            
                    return;                    
                }

            });

        }
        
        

    });
   


}


//localstorage functions

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};


Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    try {
        return JSON.parse(value);
    }
    catch(err) {
        console.log("JSON parse failed for lookup of ", key, "\n error was: ", err);
        return null;
    }
};

Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
{
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), // If decimal is zero we must take it. It means the user does not want to show any decimal
   d = decimal_sep || '.', // If no decimal separator is passed, we use the dot as default decimal separator (we MUST use a decimal separator)

   
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, // If you don't want to use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   // Extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '',

   j = ((j = i.length) > 3) ? j % 3 : 0;
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}





function showbookingdetails(bookid){
    

    document.querySelector('#myNavigator').pushPage('html/bookingdetails.html',{animation:'fade',data:{'bookid':bookid}});

    

}





function mapinitialize(){

            getCurrentLocation();

            let init_map_lat = 9.0778;
            let init_map_lng = 8.6775;
            let init_map_zoom = 3;

            if(driver_lat && driver_lng){

                init_map_lat = driver_lat;
                init_map_lng = driver_lng;
                init_map_zoom = 12;

            }

          
            map = plugin.google.maps.Map.getMap(document.getElementById("map-canvas"), {
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
                'rotate': true,
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
                target: {
                    lat: init_map_lat,
                    lng: init_map_lng
                },
                zoom: 10
                },
                'preferences': {
                'zoom': {
                    'minZoom': 3,
                    'maxZoom': 18
                },
                'building': true
                }
            });

            map.one(plugin.google.maps.event.MAP_READY, function() {
                console.log("--> map_canvas : ready.");
                map_ready = true;
                $("#startscreen-text").html(__("Almost done..."));


                cordova.plugins.backgroundMode.on('activate', function(){
                    cordova.plugins.backgroundMode.disableWebViewOptimizations();
                });
                
                
                /* cordova.plugins.backgroundMode.isIgnoringBatteryOptimizations(function(isIgnoring) {
                    //console.log(isIgnoring);
            
                    if(isIgnoring){
                        cordova.plugins.backgroundMode.on('activate', function(){
                            cordova.plugins.backgroundMode.disableWebViewOptimizations();
                        });                                                
                    }                   
            
                }) */


                updateDriverLocation(); 


                

                
            }); 

            map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {

               return;

            });


            map.on(plugin.google.maps.event.MAP_DRAG, function() {
    
                $('#mylocationbtn').show();
                //allow panning and zooming map by temporarily disabling driver marker tracking
                clearTimeout(reset_driver_marker_track_status_timer);
                track_driver_on_map = 0;
                reset_driver_marker_track_status_timer = setTimeout(function(){
                    track_driver_on_map = 1;
                },5000);

            
        });


        


    

}


//*******************location permission handling*******************************


function onError(error) {
    console.error("The following error occurred: " + error);  
    return;     
}

function handleLocationAuthorizationStatus(status) {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:

            if(!map)mapinitialize();

            if(platform === "ios"){
                onError("Location services is already switched ON");
            }else{
                //_makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            if(!map)mapinitialize();
            if(platform === "android"){
                //ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
                onError("User denied permission to use location");
            }else{
                //_makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            if(!map)mapinitialize();
            //ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
            onError("User denied permission to use location");
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            if(!map)mapinitialize();
            // iOS only
            if(platform === "ios"){
                onError("Location services is already switched ON");
            }else{
                // _makeRequest();
            }
            break;
    }
}


function requestLocationAuthorization() {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus, onError);
}

function requestLocationAccuracy() {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus, onError);
}

function _makeRequest(){
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(function () {
                //ons.notification.alert("GPS enabled successfully.",{title:""});
                    //handleSuccess("Location accuracy request successful");
                    
                    return;  
                                 
                }, function (error) {
                    onError("Error requesting location accuracy: " + JSON.stringify(error));
                    if (error) {
                        // Android only
                        onError("error code=" + error.code + "; error message=" + error.message);
                        if (platform === "android" && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            ons.notification.confirm({
                                message: __('Please enable GPS'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                //title: 'Exit ' + APP_TITLE,
                                buttonLabels: [__('Location settings'), __('Cancel')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 1,
                                cancelable: true,
                                callback: function(index) {
                                 
                                  if(!index){
                                    // 0-: Button index from the left
                                    cordova.plugins.diagnostic.switchToLocationSettings();
                                    
                                  }else{
                                    
                                    ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
                                    // -1: Cancel
                                  }
                                 
                                }
                              });
                            
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        } else {
            // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
            // On Android, this will occur if the app doesn't have authorization to use location.
            ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
            onError("Cannot request location accuracy");
        }
    });
}



//*************************************************************************************************************

async function showUserLocationMap(){ 

    let gps_enabled = await userEnableGPSNotify();

    if(gps_enabled.hasOwnProperty('success')){
        getuserlocation();
    }   

}

function getuserlocation(){

    document.querySelector('#mySplitter').left.close();
    
    BackgroundGeolocation.getCurrentLocation(function(location){

      //console.log(location);
              
      driver_lat = location.latitude;
      driver_lng = location.longitude;

      driver_bg_lat = location.latitude;
      driver_bg_lng = location.longitude;

      $('#mylocationbtn').hide();

      if(driver_marker){
          driver_marker.setVisible(true);
          driver_marker.setPosition({
              lat:location.latitude,
              lng: location.longitude                                            
          });

          map.setClickable(false);
          map.animateCamera({
              target: {lat: location.latitude, lng: location.longitude},
              zoom: 18,
              duration: 1000,
              padding: 0  // default = 20px
          }, function() {
              map.setClickable(true);
              //alert("Camera target has been changed");

          });

          
      }else{
          map.setClickable(false);
          map.animateCamera({
              target: {lat: location.latitude, lng: location.longitude},
              zoom: 18,
              duration: 1000,
              padding: 0  // default = 20px
          }, function() {
              map.setClickable(true);
              //alert("Camera target has been changed");

          });

          driver_marker = map.addMarker({
                      'position':{lat: location.latitude,lng: location.longitude},
                      'icon' : {url:`img/city-driver-icon-${driver_icon_type}.png`,size:{width:48,height:48}},
                      animation: plugin.google.maps.Animation.DROP
                  }, function(marker){
                    marker.setIconAnchor(24,24); //24x24 marker icon size. set anchor at midpoint
                    marker._isReady = true;
                });


          

      }

        
      

  }, function(){
      //error
      ons.notification.toast(__('Unable to get your location'), {
          timeout: 2000
        });
      return;
  });
}


function distance(lat1, lon1, lat2, lon2, unit) {

    //:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles        

	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist;
}



function dialcallcenter(){

    if(call_center_num === null){
        getcallcenternum();
        ons.notification.alert("Unable to place call. please try again later.",{title:""});
        return;
    }
    window.open('tel:' + call_center_num,'_system');
    //window.plugins.CallNumber.callNumber(callOnSuccess, callOnError, call_center_num, 1);

}


function rateapp(){
    document.querySelector('#mySplitter').left.close();
    window.location = APP_UPDATE_URL_IOS;
    
}


function callOnSuccess(){
    return;
}

function callOnError(){
    return;
}








 function forgotPwd(){

    ons.notification.prompt(__('Enter your registration email. A password reset code will be sent to this email'),{title: __('Password Reset'),buttonLabels : __('Continue'),cancelable: true})
        .then(function(input) {
            if(!input)return;
            var post_data = {'action':'passwordReset','email':input};
            loading.show();
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                timeout : 20000,
                crossDomain:true,
                xhrFields: {withCredentials: true},
                data: post_data,
                success: function (data, status)
                {
                    loading.hide();    
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
                        ons.notification.prompt(__('Please enter the code sent to your email to complete your password reset'),{title: __('Password Reset'),buttonLabels : __('Continue'),cancelable: true})
                        .then(function(input) {
                            
                                if(!input)return;
                            
                                var post_data = {'action':'passwordResetVerify','code':input};
                                loading.show();
                                $.ajax({
                                    url: ajaxurl,
                                    type: 'POST',
                                    timeout : 20000,
                                    crossDomain:true,
                                    xhrFields: {withCredentials: true},
                                    data: post_data,
                                    success: function (data, status)
                                    {
                                        loading.hide();    
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
                                            ons.notification.alert(data_obj.success,{title:""});                
                                            return;
                                        }


                                    },
                                    error: function(jqXHR,textStatus, errorThrown) {  
                                        
                                        loading.hide();
                                        ons.notification.alert(__("Error communicating with server"),{title:""});
                                        return;
                                        
                                    }

                                });
                            



                        });
                    }


                },
                error: function(jqXHR,textStatus, errorThrown) {  
                    
                    loading.hide();
                    ons.notification.alert(__("Error communicating with server"),{title:""});
                    return;
                    
                }

            });
            
    });

    return;

    

}



function setavailable(){
    if(processing_command)return;

    if(account_activation_status == 0){
        ons.notification.alert(__("We are reviewing your account information. You will not be able to receive ride requests for now. Please contact support for more details"),{title:"", cancelable:false});
        return;
    }
    
    processing_command = 1;
    
    $('#driver-available-spinner').show();
    var post_data = {'action':'setAvailability','status':driver_availability};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            processing_command = 0;
            
            $('#driver-available-spinner').hide();  
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                if(data_obj.hasOwnProperty('doc_error')){
                    //Indicate to driver that he has been put offline
                    driver_offline_sound.play();
                    driver_availability = false;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));

                    ons.notification.alert(__("You have documents that are yet to be approved. Please ensure all your submitted documents are valid and approved"),{title:""});
                    return;
                }

                if(data_obj.hasOwnProperty('wallet_error')){
                    //Indicate to driver that he has been put offline
                    driver_offline_sound.play();
                    driver_availability = false;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));

                    //check if driver is on an active trip
                    if(driver_accept_ride_request_ui_states.hasOwnProperty('ui_state') && driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
                        ons.notification.alert(data_obj.error,{title:''});
                    }else{
                        //show the wallet page
                        walletpage_show();
                    }
                    return;
                }
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){                
                if(data_obj.status == 1){
                    driver_availability = true;
                    driver_online_sound.play();
                    $("#driver-available-btn").css('background-color','#2ac32d');
                    $('#driver-online-indicator').fadeIn();
                    $('#available-status-text').text(__('Online'));
                }else{
                    driver_offline_sound.play();
                    driver_availability = false;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));
                }
            }


        },
        error: function(jqXHR,textStatus, errorThrown) { 
            processing_command = 0; 
            
            $('#driver-available-spinner').hide();
            //$("#driver-available-btn").css('background-color','grey');
            ons.notification.alert(__("Error communicating with server"));
            return;
        }

    });
    
}


function currentpage_show(){
    
    
    document.querySelector('#myNavigator').pushPage('html/current.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function Login_show(){
    
    
    document.querySelector('#myNavigator').pushPage('login.html',
        {
            animation: 'fade'             
        }
    );
}



function Signup_show(){
    
    document.querySelector('#myNavigator').pushPage('signup.html',
        {
            animation: 'fade'             
        }
    );

}


function regstep1(){

    /* document.querySelector('#myNavigator').pushPage('vehicledetailsreg.html',
        {
            animation: 'fade'             
        }
    );

    return; */
    
    var new_driver_firstname = $('#firstname').val();
    var new_driver_lastname = $('#lastname').val();
    var new_driver_address = $('#address').val();
    var new_driver_state = $('#state').val();
    var new_driver_phone = $('#phone').val();
    var new_driver_email = $('#reg_email').val();
    var new_driver_pwd = $('#reg_password').val();
    var new_driver_cpwd = $('#reg_rpassword').val();

    if(driver_registration_data.driver_photo == ''){
        ons.notification.alert(__("A clear photo of you is required"),{title:""});
        return;
    }

    if(new_driver_firstname == '' || new_driver_firstname.length < 2){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(new_driver_lastname == '' || new_driver_lastname.length < 2){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    if(new_driver_address == '' || new_driver_address.length < 2){
        ons.notification.alert(__("Address required"),{title:""});
        return;
    }

    if(new_driver_state == '' || new_driver_state.length < 2){
        ons.notification.alert(__("State required"),{title:""});
        return;
    }

    if(new_driver_phone == '' || new_driver_phone.length < 5){
        ons.notification.alert(__("Phone number is invalid"),{title:""});
        return;
    }

    if(new_driver_phone.indexOf('+') != -1){
        ons.notification.alert(__("Please do not include the international dial code (+___) in the phone number field"),{title:""});
        return;
    }

    var re = /\S+@\S+\.\S+/;
    if(!re.test(new_driver_email)){
        ons.notification.alert(__("Email is invalid"),{title:""});
        return;
    }


    if(new_driver_pwd.length < 8){
        ons.notification.alert(__("Password must not be less than 8 characters"),{title:""});
        return;
    }

    if(new_driver_pwd == '' || new_driver_cpwd == '' || new_driver_pwd !== new_driver_cpwd){
        ons.notification.alert(__("Passwords do not match"),{title:""});
        return;
    }

    //validation complete. store values
    driver_registration_data.country_2c_code = $('#country-flag-reg').data('country');
    driver_registration_data.country_call_code = $('#tel-code-reg').data('dialcode');
    driver_registration_data.firstname = new_driver_firstname;
    driver_registration_data.lastname = new_driver_lastname;
    driver_registration_data.address = new_driver_address;
    driver_registration_data.state = new_driver_state;
    driver_registration_data.phone = new_driver_phone;
    driver_registration_data.email = new_driver_email;
    driver_registration_data.password = new_driver_pwd;

    console.log(driver_registration_data);

    document.querySelector('#myNavigator').pushPage('vehicledetailsreg.html',
        {
            animation:'fade'             
        }
     );
    

}


function regstep2(){


    /* document.querySelector('#myNavigator').pushPage('bankdetails.html',
        {
            animation: 'fade'             
        }
    );

    return; */
    
    var new_driver_ride_id = $('#vehicle-cat').find(':selected').data('id');
    var new_driver_vehicle_model = $('#carmake').val();
    var new_driver_license_plate_number = $('#lplatenum').val();
    var new_driver_reg_num = "";//$('#regnum').val();
    var new_driver_vehicle_paint_color = $('#paintcolor').find(':selected').val();
    var new_driver_city_route = $('#cityroute').find(':selected').val();

    if(driver_registration_data.drivers_license_photo == ''){
        ons.notification.alert(__("Upload a scanned copy of your driving license"),{title:""});
        return;
    }


    if(driver_registration_data.road_worthiness_cert == ''){
        ons.notification.alert(__("Upload a scanned copy of your road worthiness certificate"),{title:""});
        return;
    }


    if(new_driver_vehicle_model == '' || new_driver_vehicle_model.length < 3){
        ons.notification.alert(__("Enter a valid vehicle model"),{title:""});
        return;
    }


    if(new_driver_license_plate_number == '' || new_driver_license_plate_number.length < 2){
        ons.notification.alert(__("Enter a valid license plate number of your vehicle"),{title:""});
        return;
    }


    if(new_driver_reg_num == '' || new_driver_reg_num.length < 3){
        //ons.notification.alert(__("Enter your vehicle registration number"),{title:""});
        //return;
    }


    driver_registration_data.car_type = new_driver_ride_id;
    driver_registration_data.car_model = new_driver_vehicle_model;
    driver_registration_data.car_plate_num = new_driver_license_plate_number;
    driver_registration_data.car_reg_num = new_driver_reg_num;
    driver_registration_data.car_color = new_driver_vehicle_paint_color;
    driver_registration_data.operation_city = new_driver_city_route;

    document.querySelector('#myNavigator').pushPage('bankdetails.html',
        {
            animation:'fade'             
        }
     );



}

function regstep3(){

    var new_driver_acc_name = $('#acc-holders-name').val();
    var new_driver_acc_num = $('#acc-number').val();
    var new_driver_bank_code = $('#banklist').find(':selected').val();
    var new_driver_bank_name = $('#banklist').find(':selected').text();
    var new_driver_bank_swift = "";//$('#bank-swift').val();

    if(new_driver_bank_code == 'xxx'){    
        new_driver_bank_code = $('#bank-code').val();
        new_driver_bank_name = $('#bank-name').val();
    }

    
    if(new_driver_acc_name == '' || new_driver_acc_name.length < 3){
        ons.notification.alert(__("Enter your bank account name"),{title:""});
        return;      
    }

    if(new_driver_acc_num == '' || new_driver_acc_num.length < 3){
        ons.notification.alert(__("Enter your bank account number"),{title:""});
        return;      
    }

    if(new_driver_bank_name == '' || new_driver_bank_name.length < 3){
        ons.notification.alert(__("Enter the name of your bank"),{title:""});
        return;      
    }

    if(new_driver_bank_code == '' || new_driver_bank_code.length < 3){
        //ons.notification.alert("Enter your bank code.",{title:""});
        //return;      
    }


    if(new_driver_bank_swift == '' || new_driver_bank_swift.length < 3){
        //ons.notification.alert("Enter your bank SWIFT / BIC code.",{title:""});
        //return;      
    }

    
    if(!$('#terms-accept').prop('checked')){
        ons.notification.alert(__("You must accept our terms and conditions to proceed"),{title:""});
        return; 
    }

    driver_registration_data.account_holders_name = new_driver_acc_name;
    driver_registration_data.account_number = new_driver_acc_num;
    driver_registration_data.bank_name = new_driver_bank_name;
    driver_registration_data.bank_code = new_driver_bank_code;
    driver_registration_data.bank_swift_code = new_driver_bank_swift;
    let referral_code = $('#ref_code').val();
    driver_registration_data.referal_code = referral_code.length > 10 ? '' : referral_code;

    
    loading.show();

    if(USE_FIREBASE_PHONE_AUTH && !firebase_phone_number_verified){
        //using firebase phone auth but user phone has not been verified. 

        if(!resend_code_btn_status){
            ons.notification.alert(__("Cannot validate your account at this time. Please wait a while then retry"),{title:""});
            loading.hide();
            return;
        }


        var post_data = {'action':'driverRegister','driver_reg_data':driver_registration_data,'validate_only':1};       
        jQuery.ajax({
        url: ajaxurl,
        method: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
            {
                
                try{
                    //console.log(data);
                    var data_obj = JSON.parse(data);

                }catch(e){
                    loading.hide();
                    ons.notification.alert(__("Error communicating with server"),{'title':""}); 
                    return;
                }


                if(data_obj.hasOwnProperty('error')){
                    loading.hide();
                    ons.notification.alert(data_obj.error, {'title':''});  
                    return;                  

                }


                
                if(data_obj.hasOwnProperty('success')){
                    
                    //successful validation. let's send the verification SMS
                    
                           
                    //send verification SMS
                    cordova.plugins.firebase.auth.verifyPhoneNumber("+" + driver_registration_data.country_call_code + driver_registration_data.phone, 0).then(function(verificationId) {
                        // pass verificationId to signInWithVerificationId
                        firebase_phone_auth_verificationid = verificationId;
                        loading.hide();
                        verifyphone("+" + driver_registration_data.country_call_code + driver_registration_data.phone);
                        ons.notification.toast(__("Verification code sent..."),{
                            timeout: 2000
                        });
                    }).catch(function(e){
                        loading.hide();
                        ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                        console.log(e);
                        return;
                    });
                    
                }

        
            },
            error: function() { 
                loading.hide();
                ons.notification.alert(__("Error communicating with server"),{'title':""});
                return;            
            } 

        });   

        return;

    }
    
    var post_data = {'action':'driverRegister','driver_reg_data':driver_registration_data,'validate_only':0};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 60000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();     
            console.log(data);
            try{
                //console.log(data);
                var data_obj = JSON.parse(data);

            }catch(e){
            
                ons.notification.alert(__("Error communicating with server"),{'title':""});                
                return;
            }


            if(data_obj.hasOwnProperty('error')){
            
                ons.notification.alert(data_obj.error, {title:''});            
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
                
                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade',
                        times : 3,
                        callback : function(){
                            ons.notification.alert(__("Thank you for signing up. Please login"), {title:''});            
                            return; 
                        }   
                    }
                );
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




function verify(){

    document.querySelector('#myNavigator').pushPage('verify.html',
        {
            animation:'fade'             
        }
     );

}


function verifyphone(phone_num){
    
    document.querySelector('#myNavigator').pushPage('verifyphone.html',
        {
            animation:'fade',
            data: {'phone_num':phone_num}             
        }
     );

}
  


function login() {

    let country_call_code = user_login_options.country_call_code;
    let phone = user_login_options.phone;
    let phone_formatted = user_login_options.phone_formatted;
    var password = user_login_options.password;
    let otp_code = user_login_options.code;
    let fb_user_details = user_login_options.fb_user_details;
    
    let rem_pwd;
    if(user_login_options.hasOwnProperty('remember_pwd') && user_login_options.remember_pwd == 1 && password){
        rem_pwd = 1; 
    }
    
    loading.show();
    
    
    var post_data = {'action':'driverLogin', 'otp_code' : otp_code,'phone':phone,'phone_formatted':phone_formatted,'password':password,'country_dial_code':country_call_code, 'timezone':user_timezone, 'display_lang':selected_lang.code, "platform" : device.platform.toLowerCase(),'fb_user_details' : fb_user_details, 'sdl_key' : SDL_KEY};

    $.ajax({
        url: ajaxurl,
        method: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();
               
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert("Error communicating with server",{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(rem_pwd){
                //save user password locally
                localStorage.setItem('user_pwd', btoa(password));                
            }


            if(data_obj.hasOwnProperty('is_activated')){

                if(data_obj.hasOwnProperty('account_active') && data_obj.account_active == 1){
                    if(data_obj.is_activated == 0){
                        //user previously activate has now been deativated. Possibly a suspension
                        ons.notification.alert(__("Your account is currently deactivated. Please contact support"),{title:""});                            
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }
                        return;
                    }
                }

                account_activation_status = data_obj.is_activated;
                                
                
                

                if(data_obj.hasOwnProperty('uncompleted_bk') && data_obj.uncompleted_bk.length > 0){ 
                    updateAuxBookings(data_obj.uncompleted_bk);                       
                    ons.notification.alert(__("You have an uncompleted booking. You will not be able to receive ride requests until you finalize the booking"), {title:"",buttonLabels:[__('View bookings')],callback: function(){
                        //navigator.app.exitApp();
                        bookingspage_show();
                    }});                        

                }                                        

                if(data_obj.hasOwnProperty('profileinfo')){
                    userprofileinfo = data_obj.profileinfo;
                    driver_icon_type = userprofileinfo.driver_ride_icon;
                    if(driver_marker){
                        driver_marker.setIcon({url:`img/city-driver-icon-${driver_icon_type}.png`,size : {width:48,height:48}});                            
                    }
                    getavailablecitydrivers(userprofileinfo.city_id);
                    updatefcmtopics(userprofileinfo.city_id)
                    var city_cars =  routetariffs.result[userprofileinfo.city_id].cars;
                    for(var key in city_cars){
                        if(city_cars[key].id == userprofileinfo.driver_ride_id){
                            driver_ride_tariff = city_cars[key];
                        }
                    }

                    if(typeof driver_ride_tariff === 'undefined'){
                        
                        ons.notification.confirm({
                            message: __('Server returned Invalid data'),
                            // or messageHTML: '<div>Message in HTML</div>',
                            title: '',
                            buttonLabels: [__('Retry')],
                            animation: 'default', // or 'none'
                            primaryButtonIndex: 0,
                            cancelable: false,
                            callback: function(index) {
                                
                                if(index){
                                // 0-: Button index from the left
                                navigator.app.exitApp();
                                
                                }else{
                                login();
                                // -1: Cancel
                                }
                                
                            }
                            });

                        return;
                    }
                    
                    if(userprofileinfo.city_lat != ''){
                        let init_map_lat = userprofileinfo.city_lat;
                        let init_map_lng = userprofileinfo.city_lng;
                        let init_map_zoom = 3;
                        if(driver_bg_lat){
                            init_map_lat = driver_bg_lat;
                            init_map_lng = driver_bg_lng;
                            init_map_zoom = 13;
                        }
                        map.setClickable(false);
                        map.moveCamera({
                            target: {lat: init_map_lat, lng: init_map_lng },
                            zoom: 12,
                            duration: 1000,
                            padding: 0  // default = 20px
                        }, function() {
                            map.setClickable(true);
                            //alert("Camera target has been changed");
    
                        });
                    }

                    $('#driver-image-preload').attr('src',userprofileinfo.photo);

                    if(data_obj.hasOwnProperty('fb_conf')){
                        init_fb_rtdb(data_obj.fb_conf,userprofileinfo.driverid);                      
                    }

                    //preload user document images
                    let user_doc_data = userprofileinfo.user_docs;
                    let user_doc_images = '';
                    if(user_doc_data){
                        for(var key in user_doc_data){
                            let doc_data = user_doc_data[key];
                            if(doc_data.u_doc_img){
                                user_doc_images += `<img src='${doc_data.u_doc_img}' />`;
                            }

                        }
                        if(user_doc_images)$('#user-docs-image-preload').html(user_doc_images);
                    }
                                    
                }

                setTimeout(updatepushnotificationtoken(), 5000);

                clearInterval(driver_location_update_timer_id);
                setDriverLocation();
                let location_update_interval = 15000;
                if(data_obj.hasOwnProperty('app_settings') && data_obj.app_settings.hasOwnProperty('driver_location_update_interval')){
                    if(parseInt(data_obj.app_settings.driver_location_update_interval) > 5){
                        location_update_interval = parseInt(data_obj.app_settings.driver_location_update_interval) * 1000;
                    }else{
                        location_update_interval = 5000;
                    }                        
                }

                driver_location_update_timer_id = setInterval(setDriverLocation,location_update_interval);

                if(data_obj.hasOwnProperty('wallet_amt')){
                            
                    wallet_amount = data_obj.wallet_amt;
                    wallet_history_items = data_obj.wallet_history;  
                    
                    if(data_obj.hasOwnProperty('driver_min_wallet_balance')){
                        if(parseFloat(data_obj.driver_min_wallet_balance) >=  wallet_amount){
                            setTimeout(function(){
                                ons.notification.alert(__("Your wallet balance is low. Please add money to your wallet to receive ride requests"),{title:"", cancelable:false});
                            }, 3000);
                        }
                    }
                }


                if(data_obj.hasOwnProperty('scheduled_trips_count')){
                    if(parseInt(data_obj.scheduled_trips_count)){
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "scheduledtrips"){
                            //indicate that there is a schedued booking
                            $('#schd-trips-notify-icon').css('color','red');
                            $('#global-notify-icon').css('color','red');
                            notify_new_data_available.scheduled_trips = 1;
                        }else{
                            $('#schd-trips-notify-icon').css('color','white');
                            $('#global-notify-icon').css('color','white');
                        }
                    }else{
                        $('#schd-trips-notify-icon').css('color','white');
                        $('#global-notify-icon').css('color','white');
                    }
                }else{
                    $('#schd-trips-notify-icon').css('color','white');
                    $('#global-notify-icon').css('color','white');
                }


                if(data_obj.hasOwnProperty('bannerdata')){

                    if(data_obj.bannerdata == 'nodata'){
                        $('#banner-items-container').css('left', '-10000px');  
                        $('#banner-items-container').empty();
                        banner_data = '';
                    }else{

                        if(data_obj.bannerdata != banner_data){
                            banner_data = data_obj.bannerdata;
                            $('#banner-items-container').html(data_obj.bannerdata);
                            
                            if(Math.ceil($('#driver-stats-panel').outerHeight(true))){
                                $('#banner-items-container').css('left', '0px');
                                $('#banner-items-container').css('bottom', (Math.ceil($('#driver-stats-panel').outerHeight(true)) + 10) + 'px'); 
                            }
                        }
                        
                    }

                }



                if(data_obj.hasOwnProperty('default_currency')){
                            
                    default_currency_data = data_obj.default_currency;
                                    
                }


                if(data_obj.hasOwnProperty('app_settings')){
                            
                    app_settings = data_obj.app_settings;
                                    
                }


                if(data_obj.hasOwnProperty('sess_id')){                                
                    session_id = data_obj.sess_id; 
                    ajaxurl = siteurl + `/ajaxdriver_2_3_0.php?sess_id=${session_id}`;
                    localStorage.setItem('sess_id', session_id);                                   
                }



                

                if(data_obj.hasOwnProperty('currency_data')){
                    city_curency_symbol = data_obj.currency_data.cur_symbol;
                    city_curency_code = data_obj.currency_data.cur_code;
                    city_curency_exchange_rate = data_obj.currency_data.cur_exchng;
                    city_curency_name = data_obj.currency_data.cur_name;                                       
                }

                


                if(data_obj.hasOwnProperty('online_pay')){
                    online_payment_info = data_obj.online_pay;                                       
                }

                if(data_obj.hasOwnProperty('cc_num')){
                    call_center_num = data_obj.cc_num;                                       
                }

                

                /* if(data_obj.hasOwnProperty('api_key') && google_map_api_key == null){
                    google_map_api_key = data_obj.api_key;
                    loadmap(google_map_api_key); 
                } */

                if(data_obj.hasOwnProperty('availability')){
                
                    if(data_obj.availability == "1"){
                        driver_availability = true;
                        if(!APP_DEBUG)driver_online_sound.play();
                        $("#driver-available-btn").css('background-color','#2ac32d');
                        $('#driver-online-indicator').fadeIn();
                        $('#available-status-text').text(__('Online'));
                    }else{
                        driver_availability = false;
                        if(!APP_DEBUG)driver_offline_sound.play();
                        $("#driver-available-btn").css('background-color','grey');
                        $('#driver-online-indicator').fadeOut();
                        $('#available-status-text').text(__('Offline'));
                    }                                       
                }



                if(data_obj.hasOwnProperty('customer_app_update_url_ios')){                                
                    APP_UPDATE_URL_IOS = data_obj.customer_app_update_url_ios;                
                }
    
                if(data_obj.hasOwnProperty('customer_app_update_url_android')){                                
                    APP_UPDATE_URL_ANDROID = data_obj.customer_app_update_url_android;                
                }
    
    
                if(device.platform.toLowerCase() === "android"){ //running on android
    
                        if(data_obj.hasOwnProperty('app_version_android')){                                
                            
                            if(APP_VERSION_ANDROID != data_obj.app_version_android){
                                
                                                            
                                ons.notification.confirm({
                                    message: __('The version of this App is old. Please update app'),
                                    // or messageHTML: '<div>Message in HTML</div>',
                                    title: __('Update App'),
                                    buttonLabels: app_settings.force_update_driver_android == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                    animation: 'default', // or 'none'
                                    primaryButtonIndex: 0,
                                    cancelable: false,
                                    callback: function(index) {
                                    
                                    if(!index){
                                        // 0-: Button index from the left
                                        //navigator.app.exitApp();
                                        window.open(APP_UPDATE_URL_ANDROID,'_system');
                                        if(app_settings.force_update_driver_android == 1){
                                            showUpdatePrompt(APP_UPDATE_URL_ANDROID);
                                            return;
                                        }
                                        
                                    }else{
                                        
                                        // -1: Cancel
                                    }
                                    
                                    }
                                });
                            }                                      
                        }
    
                }else{ //running on IOS
    
                    if(data_obj.hasOwnProperty('app_version_ios')){                                
                            
                        if(APP_VERSION_ANDROID != data_obj.app_version_ios){
                            
                                                        
                            ons.notification.confirm({
                                message: __('The version of this App is old. Please update app'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                title: __('Update App'),
                                buttonLabels: app_settings.force_update_driver_ios == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 0,
                                cancelable: false,
                                callback: function(index) {
                                
                                if(!index){
                                    // 0-: Button index from the left
                                    //navigator.app.exitApp();
                                    window.location = APP_UPDATE_URL_IOS;
                                    if(app_settings.force_update_driver_ios == 1){
                                        showUpdatePrompt(APP_UPDATE_URL_IOS);
                                        return;
                                    }
                                    
                                }else{
                                    
                                    // -1: Cancel
                                }
                                
                                }
                            });
                        }                                      
                    }
    
                }

                

                document.querySelector('#myNavigator').popPage(
                    {
                    animation: 'fade', 
                    times:3,  
                    callback: function(){
                            circletransition();
                        }          
                    }
                );

                    

                    
                
                
           }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
    
};







function verifyCode(){
    loading.show();
    var activation_code = $("#verify_code").val();

    var post_data = {'action':'userActivateCode',"code":activation_code};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            
            loading.hide();    
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

                
                ons.notification.alert(data_obj.success, {buttonLabels:['Restart App'],title:"",callback: function(){
                    //navigator.app.exitApp();
                    window.location.reload();
                    return;
                }});

                                           
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

}






function logout(){
    loading.show();
    var post_data = {'action':'driverLogout'};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 15000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            
            if(data_obj.hasOwnProperty('loggedout')){
                
                $('#bookbutton').css('visibility','hidden');
                $('#pac-input').val('');
                $('#pac-input2').val('');



                //reset items
                wallet_amount = null;
                wallet_history_items = null;
                userprofileinfo = undefined;
                selected_city_id = "0"
                selected_city_route = undefined;
                selected_state_route = undefined;
                //routetariffs = undefined;
                notifications_data = '';
                earnings_data = '';
                bookings_data =[];
                bookings_data = {'pend_onride':'','completed':'','cancelled':''};

                if(map){
                    clearMapItemsSelectively();
                }

                
                                                
                
                document.querySelector('#mySplitter').left.close();
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    Login_show();
                }});
                return;
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

    


}




function del_acc(){

    ons.notification.prompt(__('This action will delete your account and all your records on our servers. Enter your password to continue'),{title:'',cancelable:true,buttonLabels:[__('Cancel'),__('Continue')]})
    .then(function(input) {
        if(!input)return;
        del_user_acc(input);
    });

}


function del_user_acc(input){

    loading.show();
    var post_data = {'action':'del_user_acc','pwd':input};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 15000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
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
                
                $('#bookbutton').css('visibility','hidden');
                $('#pac-input').val('');
                $('#pac-input2').val('');



                //reset items
                wallet_amount = null;
                wallet_history_items = null;
                userprofileinfo = undefined;
                selected_city_id = "0"
                selected_city_route = undefined;
                selected_state_route = undefined;
                marker1 = undefined;
                marker2 = undefined;
                routetariffs = undefined;
                notifications_data = '';
                bookings_data =[];
                bookings_data = {'pend_onride':'','completed':'','cancelled':''};

                if(map){
                    clearMapItemsSelectively();
                    if(route_polyline){
                        route_polyline.setVisible(false);
                        toggleroutepathanimation(0);                  
                    }

                    if(route_distance_duration_info_marker){
                        route_distance_duration_info_marker.setVisible(false);
                    }
                }

                $('#bookbutton').css('visibility','hidden');
                $('#pac-input').val('');
                $('#pac-input2').val('');


                                
                pick_up_data = [];
                drop_off_data = [];
                pick_up_data = {'address': '','lng':'','lat':''};
                drop_off_data = {'address': '','lng':'','lat':''};

                //reset multi destination mode
                multi_destination_mode = 0;        
                $('#location-type-icon-ds1').hide();
                $('#location-type-icon-ds2').hide();
                dest_location_type_selected = 0;
                destination_stop_inp1_shown = 0;
                destination_stop_inp2_shown = 0; 
                multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

                document.querySelector('#mySplitter').left.close();
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    Login_show();
                }});
                
                return;
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

    


}



function showsoftlicenses(){
    
    loading.show();
        
    document.querySelector('#myNavigator').pushPage('html/software-licenses.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}









function resendCode(){

    

    var post_data = {'action':'userResendCode'};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 25000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
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
                ons.notification.alert(data_obj.success,{title:""});                
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });



}


function resendOTPCodeFirebase(phone){

    if(!resend_code_btn_status){
        ons.notification.toast(__("Please wait a while before resending verification code"),{
            timeout: 2000
        });
        return;
    }

    loading.show();
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    resend_code_countdown_timer_handle = setInterval(function(){
        countdown--;
        if(countdown < 0){
            countdown = 0;
            resend_code_btn_status = 1;
            $('#resend-otp-btn').text(__('Resend Code'));
            clearInterval(resend_code_countdown_timer_handle);
            return;
        }
        $('#resend-otp-btn').text(__('Resend Code') + ' ' + countdown);
    
    },1000);

    var phone_number = $('#resend-otp-btn').data('phonenumber');
    
    //send verification SMS
    cordova.plugins.firebase.auth.verifyPhoneNumber(phone_number, 0).then(function(verificationId) {
        loading.hide();
        // pass verificationId to signInWithVerificationId
        firebase_phone_auth_verificationid = verificationId;
        ons.notification.toast(__("Verification code sent..."),{
            timeout: 2000
        });
        
    }).catch(function(e){
        loading.hide();
        ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
        console.log(e);
    });

}



function resendOTPCode(){

    if(!resend_code_btn_status){
        ons.notification.toast(__("Please wait a while before resending verification code"),{
            timeout: 2000
        });
        return;
    }

    
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    resend_code_countdown_timer_handle = setInterval(function(){
        countdown--;
        if(countdown < 0){
            countdown = 0;
            resend_code_btn_status = 1;
            $('#resend-otp-btn').text(__('Resend Code'));
            clearInterval(resend_code_countdown_timer_handle);
            return;
        }
        $('#resend-otp-btn').text(__('Resend Code') + ' ' + countdown);
    
    },1000);

    var phone_number = $('#resend-otp-btn').data('phonenumber');
    
    //send verification SMS
    var post_data = {'action':'userResendOTPCode', 'phone': phone_number};

    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
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
                ons.notification.toast(__("Verification code sent..."),{
                    timeout: 2000
                });               
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });

}


function mapLoadSuccess(){

    let res = new Promise(function(resolve,reject){
        //wait for map to initialize completely before continuing
        let old_current_time = Date.now() / 1000 | 0;
        let map_load_check_timer = setInterval(function(){
            if(map_ready){
                clearInterval(map_load_check_timer);
                resolve(true);
            }
            let elapsed_time = (Date.now() / 1000 | 0) - old_current_time;
            /* if(elapsed_time > 5){
                clearInterval(map_load_check_timer);
                resolve(true);
            } */
        }, 100);

       
    })

    return res;
}



function checkDriverLoginStatus(){

    
    
    var post_data = {'action':'checkDriverLoginStatus','timezone':user_timezone, 'display_lang':selected_lang.code, "platform" : device.platform.toLowerCase(), 'sdl_key' : SDL_KEY};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: async function (data, status)
        {          

            sync_with_servertime(); //get time difference between local time and server time in order to sync the two


            console.log(data);
            try{
                if(!data)throw "Server returned invalid data";
                var data_obj = JSON.parse(data);
            }catch(e){

                navigator.splashscreen.hide();

                ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Exit'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                    
                    if(!index){
                    // 0-: Button index from the left
                    navigator.app.exitApp();
                    
                    }else{
                        checkDriverLoginStatus();
                    // -1: Cancel
                    }
                    
                }
                });
                return;
            }


            //wait for map init success
            await mapLoadSuccess(); 
            document.querySelector('#bglocscreen').hide();


            if(data_obj.hasOwnProperty('error')){                                
                Login_show();
                setTimeout(function(){
                    navigator.splashscreen.hide();
                    startscreen.hide();
                }, 500); 
                return;               
            }            
            

            if(data_obj.hasOwnProperty('app_settings')){
                                
                app_settings = data_obj.app_settings;
                             
            }



            if(data_obj.hasOwnProperty('driver_app_update_url_ios')){                                
                APP_UPDATE_URL_IOS = data_obj.driver_app_update_url_ios;                
            }

            if(data_obj.hasOwnProperty('driver_app_update_url_android')){                                
                APP_UPDATE_URL_ANDROID = data_obj.driver_app_update_url_android;                
            }


            if(device.platform.toLowerCase() === "android"){ //running on android

                    if(data_obj.hasOwnProperty('app_version_android')){                                
                        
                        if(APP_VERSION_ANDROID != data_obj.app_version_android){
                            
                                                        
                            ons.notification.confirm({
                                message: __('The version of this App is old. Please update app'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                title: __('Update App'),
                                buttonLabels: app_settings.force_update_driver_android == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 0,
                                cancelable: false,
                                callback: function(index) {
                                
                                if(!index){
                                    // 0-: Button index from the left
                                    //navigator.app.exitApp();
                                    window.open(APP_UPDATE_URL_ANDROID,'_system');
                                    if(app_settings.force_update_driver_android == 1){
                                        showUpdatePrompt(APP_UPDATE_URL_ANDROID);
                                        return;
                                    }
                                    
                                }else{
                                    
                                    // -1: Cancel
                                }
                                
                                }
                            });
                        }                                      
                    }

            }else{ //running on IOS

                if(data_obj.hasOwnProperty('app_version_ios')){                                
                        
                    if(APP_VERSION_ANDROID != data_obj.app_version_ios){
                        
                                                    
                        ons.notification.confirm({
                            message: __('The version of this App is old. Please update app'),
                            // or messageHTML: '<div>Message in HTML</div>',
                            title: __('Update App'),
                            buttonLabels: app_settings.force_update_driver_ios == 1 ? [__('Update')] : [__('Update'), __('Later')],
                            animation: 'default', // or 'none'
                            primaryButtonIndex: 0,
                            cancelable: false,
                            callback: function(index) {
                            
                            if(!index){
                                // 0-: Button index from the left
                                //navigator.app.exitApp();
                                window.location = APP_UPDATE_URL_IOS;
                                if(app_settings.force_update_driver_ios == 1){
                                    showUpdatePrompt(APP_UPDATE_URL_IOS);
                                    return;
                                }
                                
                            }else{
                                
                                // -1: Cancel
                            }
                            
                            }
                        });
                    }                                      
                }

            }     
            
           


           if(data_obj.hasOwnProperty('cc_num')){                                
                call_center_num = data_obj.cc_num;                
            }

            

            if(data_obj.hasOwnProperty('tariff_data')){
                routetariffs = data_obj.tariff_data;
                $('#rides-img-preload').html(data_obj.tariff_data.result.preloadrides);                          
            }


            if(data_obj.hasOwnProperty('referral_data')){
                referraldata = data_obj.referral_data;     
                                                   
            }


                        
            
            if(data_obj.hasOwnProperty('loggedin')){
                if(!data_obj.loggedin){
                    Login_show();
                    setTimeout(function(){
                        navigator.splashscreen.hide();
                        startscreen.hide();
                    }, 500);
                    return;
                }else{

                    if(data_obj.hasOwnProperty('is_activated')){

                        if(data_obj.hasOwnProperty('account_active') && data_obj.account_active == 1){
                            if(data_obj.is_activated == 0){
                                //user previously activate has now been deativated. Possibly a suspension
                                ons.notification.alert(__("Your account is currently deactivated. Please contact support"),{title:""});                            
                                let top_page = document.querySelector('#myNavigator').topPage;
                                if(top_page.id != "loginpage"){
                                    Login_show();
                                }
                                navigator.splashscreen.hide();
                                startscreen.hide();
                                return;
                            }
                        }
                        account_activation_status = data_obj.is_activated;
                                             
                        
                   }



                   if(data_obj.hasOwnProperty('uncompleted_bk') && data_obj.uncompleted_bk.length > 0){ 
                        updateAuxBookings(data_obj.uncompleted_bk);                       
                        ons.notification.alert(__("You have an uncompleted booking. You will not be able to receive ride requests until you finalize the booking"), {title:"",buttonLabels:[__('View bookings')],callback: function(){
                            //navigator.app.exitApp();
                            bookingspage_show();
                        }});
                    }

                    
                    if(data_obj.hasOwnProperty('profileinfo')){
                        userprofileinfo = data_obj.profileinfo;
                        driver_icon_type = userprofileinfo.driver_ride_icon;
                        if(driver_marker){
                            driver_marker.setIcon({url:`img/city-driver-icon-${driver_icon_type}.png`,size : {width:48,height:48}});                                                       
                        }
                        getavailablecitydrivers(userprofileinfo.city_id);
                        updatefcmtopics(userprofileinfo.city_id);
                        var city_cars =  routetariffs.result[userprofileinfo.city_id].cars;
                        
                        for(var key in city_cars){
                            if(city_cars[key].id == userprofileinfo.driver_ride_id){
                                driver_ride_tariff = city_cars[key];
                            }
                        }

                        if(typeof driver_ride_tariff === 'undefined'){
                            
                            ons.notification.confirm({
                                message: __('Server returned Invalid data'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                title: '',
                                buttonLabels: [__('Retry')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 0,
                                cancelable: false,
                                callback: function(index) {
                                 
                                  if(index){
                                    // 0-: Button index from the left
                                    navigator.app.exitApp();
                                    
                                  }else{
                                    checkDriverLoginStatus();
                                    // -1: Cancel
                                  }
                                 
                                }
                              });

                            return;
                        }

                                                
                        if(userprofileinfo.city_lat != ''){
                            let init_map_lat = userprofileinfo.city_lat;
                            let init_map_lng = userprofileinfo.city_lng;
                            let init_map_zoom = 3;
                            if(driver_bg_lat){
                                init_map_lat = driver_bg_lat;
                                init_map_lng = driver_bg_lng;
                                init_map_zoom = 13;
                            }
                            map.setClickable(false);
                            map.moveCamera({
                                target: {lat: init_map_lat, lng: init_map_lng },
                                zoom: 12,
                                duration: 1000,
                                padding: 0  // default = 20px
                            }, function() {
                                map.setClickable(true);
                                //alert("Camera target has been changed");
        
                            });
                        }

                        $('#driver-image-preload').attr('src',userprofileinfo.photo);

                        
                        if(data_obj.hasOwnProperty('fb_conf')){
                            init_fb_rtdb(data_obj.fb_conf,userprofileinfo.driverid);                      
                        }

                        //preload user document images
                        let user_doc_data = userprofileinfo.user_docs;
                        let user_doc_images = '';
                        if(user_doc_data){
                            for(var key in user_doc_data){
                                let doc_data = user_doc_data[key];
                                if(doc_data.u_doc_img){
                                    user_doc_images += `<img src='${doc_data.u_doc_img}' />`;
                                }

                            }
                            if(user_doc_images)$('#user-docs-image-preload').html(user_doc_images);
                        }
                                       
                    }

                    navigator.splashscreen.hide();
                    startscreen.hide();
                    circletransition();

                    if(data_obj.hasOwnProperty('scheduled_trips_count')){
                        if(parseInt(data_obj.scheduled_trips_count)){
                            let top_page = document.querySelector('#myNavigator').topPage;
                            if(top_page.id != "scheduledtrips"){
                                //indicate that there is a schedued booking
                                $('#schd-trips-notify-icon').css('color','red');
                                $('#global-notify-icon').css('color','red');
                                notify_new_data_available.scheduled_trips = 1;
                            }else{
                                $('#schd-trips-notify-icon').css('color','white');
                                $('#global-notify-icon').css('color','white');
                            }
                        }else{
                            $('#schd-trips-notify-icon').css('color','white');
                            $('#global-notify-icon').css('color','white');
                        }
                    }else{
                        $('#schd-trips-notify-icon').css('color','white');
                        $('#global-notify-icon').css('color','white');
                    }

                    if(data_obj.hasOwnProperty('bannerdata')){
                        if(data_obj.bannerdata == 'nodata'){
                            $('#banner-items-container').css('left', '-10000px');  
                            $('#banner-items-container').empty();
                            banner_data = '';
                        }else{

                            if(data_obj.bannerdata != banner_data){
                                banner_data = data_obj.bannerdata;
                                $('#banner-items-container').html(data_obj.bannerdata);
                                if(Math.ceil($('#driver-stats-panel').outerHeight(true))){
                                    $('#banner-items-container').css('left', '0px');
                                    $('#banner-items-container').css('bottom', (Math.ceil($('#driver-stats-panel').outerHeight(true)) + 10) + 'px'); 
                                }
                            } 
                            
                        }

                    }

                    setTimeout(updatepushnotificationtoken(), 5000);

                    setDriverLocation();
                    let location_update_interval = 15000;
                    if(data_obj.hasOwnProperty('app_settings') && data_obj.app_settings.hasOwnProperty('driver_location_update_interval')){
                        if(parseInt(data_obj.app_settings.driver_location_update_interval) > 5){
                            location_update_interval = parseInt(data_obj.app_settings.driver_location_update_interval) * 1000;
                        }else{
                            location_update_interval = 5000; 
                        }                        
                    }
                    driver_location_update_timer_id = setInterval(setDriverLocation,location_update_interval);

                    if(data_obj.hasOwnProperty('wallet_amt')){
                        
                                
                        wallet_amount = data_obj.wallet_amt;
                        wallet_history_items = data_obj.wallet_history;   
                        
                        if(data_obj.hasOwnProperty('driver_min_wallet_balance')){
                            if(parseFloat(data_obj.driver_min_wallet_balance) >=  wallet_amount){
                                setTimeout(function(){
                                    ons.notification.alert(__("Your wallet balance is low. Please add money to your wallet to receive ride requests."),{title:"", cancelable:false});
                                }, 3000);
                            }
                        }
                    }

                    if(data_obj.hasOwnProperty('sess_id')){                                
                        session_id = data_obj.sess_id; 
                        ajaxurl = siteurl + `/ajaxdriver_2_3_0.php?sess_id=${session_id}`;
                        localStorage.setItem('sess_id', session_id);                                   
                    }

                    if(data_obj.hasOwnProperty('default_currency')){
                                
                        default_currency_data = data_obj.default_currency;
                                     
                    }


                    if(data_obj.hasOwnProperty('driver_time_online')){
                        $('#driver-stats-time-online').html(data_obj.driver_time_online);
                    }

                    if(data_obj.hasOwnProperty('completed_trips')){
                        $('#driver-stats-completed').html(data_obj.completed_trips);
                    }

                    if(data_obj.hasOwnProperty('driver_today_earning')){
                        let today_earnings_default_cur = parseFloat(data_obj.driver_today_earning);
                        let today_earnings_city_cur = today_earnings_default_cur * city_curency_exchange_rate;
                        $('#driver-stats-earning').html(city_curency_symbol + Number(today_earnings_city_cur).toMoney(2, ".", ""));
                    }

                    
                    


                    if(data_obj.hasOwnProperty('currency_data')){
                        city_curency_symbol = data_obj.currency_data.cur_symbol;
                        city_curency_code = data_obj.currency_data.cur_code;
                        city_curency_exchange_rate = data_obj.currency_data.cur_exchng;
                        city_curency_name = data_obj.currency_data.cur_name;                                       
                    }

                    
                    if(data_obj.hasOwnProperty('online_pay')){
                        online_payment_info = data_obj.online_pay;                                       
                    }

                    if(data_obj.hasOwnProperty('cc_num')){
                        call_center_num = data_obj.cc_num;                                       
                    } 
                    
                    
                    if(data_obj.hasOwnProperty('availability')){
                                
                        if(data_obj.availability == "1"){
                            driver_availability = true;
                            if(!APP_DEBUG)driver_online_sound.play();
                            $("#driver-available-btn").css('background-color','#2ac32d');
                            $('#driver-online-indicator').fadeIn();
                            $('#available-status-text').text(__('Online'));
                        }else{
                            driver_availability = false;
                            if(!APP_DEBUG)driver_offline_sound.play();
                            $("#driver-available-btn").css('background-color','grey');
                            $('#driver-online-indicator').fadeOut();
                            $('#available-status-text').text(__('Offline'));
                        }                                       
                    }

                                       

                    
                }
                
            }

            


        },
        error: function(jqXHR,textStatus, errorThrown) { 

            //startscreen.hide();
            navigator.splashscreen.hide();     
            
            
            ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [/* __('Exit'),  */__('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                 
                  if(index){
                    // 0-: Button index from the left
                    navigator.app.exitApp();
                    
                  }else{
                    checkDriverLoginStatus();
                    // -1: Cancel
                  }
                 
                }
              });
            return;
            
        }
        
    });

    


}


//function handles subscribing and unsubscribing to topics for pushnotifications for city routes
function updatefcmtopics(id = 0){

    if(APP_DEBUG)return;
    
    var topics_city_subs_data = localStorage.getItem('fcm_subscribed_city');
    if(topics_city_subs_data){
        //subscribed topic data found

       
           if(topics_city_subs_data != id){ //is the new city id topic already subscribed to ?
               //unsubscribe from this topic
               cordova.plugins.firebase.messaging.unsubscribe("driver-route-" + topics_city_subs_data); //unsubscribe from the old route id topic 

           }
           
           cordova.plugins.firebase.messaging.subscribe("driver-route-" + id); //subscribe to this topic again just incase fcm device token has changed
           localStorage.setItem('fcm_subscribed_city',id);

    }else{
        //no subscribed topic data found. create new         
        localStorage.setItem('fcm_subscribed_city',id);
        cordova.plugins.firebase.messaging.subscribe("driver-route-" + id); //subscribe to this topic
    }
}




function promotions_show(){
    document.querySelector('#myNavigator').pushPage('html/promo.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();
}


function promocheck(){
    
            
    var post_data = {'action_get':'promocheck'};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
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
                
                $('#promo-content').html(data_obj.promodata);

            }

            
        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
}




function updateDriverLocation(){
    

    navigator.geolocation.clearWatch(driver_location_watch_handle);

    driver_location_watch_handle = navigator.geolocation.watchPosition(
        updateOnDriverLocationSuccess, updateOnDriverLocationError, {
            enableHighAccuracy: true, timeout: 5000
        }
    );


}

var processing_out_of_bounds = 0;

function updateOnDriverLocationSuccess(position) {
    
    
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    driver_lat = position.coords.latitude;
    driver_lng = position.coords.longitude;

    let driver_marker_bearing = 0;
    

    if(track_driver_on_map){
        
        if(driver_marker){

           
            if(driver_marker_anim_obj.curposition == null && driver_marker_anim_obj.oldposition == null){
                //first time
                
                driver_marker_anim_obj.curposition = {lat:position.coords.latitude,lng:position.coords.longitude};
                driver_marker_anim_obj.oldposition = driver_marker.getPosition();
                driver_marker_anim_obj.curbearing = getBearing(driver_marker_anim_obj.oldposition.lat,driver_marker_anim_obj.oldposition.lng,driver_marker_anim_obj.curposition.lat,driver_marker_anim_obj.curposition.lng);
                driver_marker_anim_obj.oldbearing = driver_marker.getRotation();
                driver_marker_anim_obj.animate_pos = 0;
                driver_marker_anim_obj.animate_rot = 0;
                driver_marker_anim_obj.animation_fraction_pos = 0.00;
                driver_marker_anim_obj.animation_fraction_rot = 0.00;
                                
            }else{ 

                
                if(!driver_marker_anim_obj.animate_pos){

                    //not animating, update position

                    let drv_new_pos = {lat:position.coords.latitude,lng:position.coords.longitude};
                    let drv_cur_pos = driver_marker.getPosition();
                    driver_marker_anim_obj.curposition = drv_new_pos;
                    driver_marker_anim_obj.oldposition = drv_cur_pos;
                    driver_marker_bearing = getBearing(drv_cur_pos.lat,drv_cur_pos.lng,position.coords.latitude,position.coords.longitude);

                    
                                        
                    //check how much distance between the driver marker and the new location coord. This is to rule out spurious location data and not animate
                    let drv_distance_delta = plugin.google.maps.geometry.spherical.computeDistanceBetween(drv_new_pos, drv_cur_pos);
                    
                    //let max_anim_drv_distance_delta = 22  * (AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL / 1000); //animate driver speed of 80Km/hr. values higher than this don't animate marker just set the position on map
                    let max_anim_drv_distance_delta = 500; 

                    if(isNaN(drv_distance_delta))drv_distance_delta = 0;

                    
                    //there is a change in driver position

                    if(drv_distance_delta > max_anim_drv_distance_delta){
                        //Change is outside limits. do not animate. 
                        driver_marker.setPosition({lat:position.coords.latitude,lng:position.coords.longitude});
                        driver_marker.setRotation(driver_marker_bearing);

                    }else{
                        

                        if(!driver_marker_anim_obj.animate_rot && driver_marker_bearing > 0){
                    
                            if(Math.abs(driver_marker.getRotation() - driver_marker_bearing) >= 180 ){
        
                                driver_marker.setRotation(driver_marker_bearing);
        
                            }else{
        
                                
                                driver_marker_anim_obj.oldbearing = driver_marker.getRotation();
                                driver_marker_anim_obj.curbearing = driver_marker_bearing;                            
                                driver_marker_anim_obj.animation_fraction_rot = 0.00;
                                driver_marker_anim_obj.animate_rot = 1;
                            }
        
                        }

                        //Change is within limits. Animate. 
                        driver_marker_anim_obj.animate_pos = 1; //set animation enable flag
                        driver_marker_anim_obj.animation_fraction_pos = 0.00;
                    }



                    


                    
                    
                    
                }


                /* if(!driver_marker_anim_obj.animate_rot && driver_marker_bearing > 0){
                    
                    if(Math.abs(driver_marker_anim_obj.oldbearing - driver_marker_bearing) >= 180 ){

                        driver_marker.setRotation(driver_marker_bearing);

                    }else{

                        
                        driver_marker_anim_obj.oldbearing = driver_marker.getRotation();
                        driver_marker_anim_obj.curbearing = driver_marker_bearing;                            
                        driver_marker_anim_obj.animation_fraction_rot = 0.00;
                        driver_marker_anim_obj.animate_rot = 1;
                    }

                } */

                

            }

            

            map.fromLatLngToPoint({"lat":driver_lat,"lng":driver_lng}, function(driver_marker_pixel_coord){
                    if(driver_marker_pixel_coord[0] < 50 || driver_marker_pixel_coord[0] > (screen.width - 50) || driver_marker_pixel_coord[1] < 150 || driver_marker_pixel_coord[1] > (screen.height - 150)){
                        if(!processing_out_of_bounds){
                            processing_out_of_bounds = 1;
                            map.setClickable(false);
                            map.animateCamera({
                            target: {lat: driver_lat, lng: driver_lng},
                            duration: 1000,
                            }, function() {
                                //alert("Camera target has been changed");
                                map.setClickable(true);
                                processing_out_of_bounds = 0;
                            });
                        }
                    }
            });

            

            /* map.setClickable(false);
            map.moveCamera({
                target: {lat: driver_lat, lng: driver_lng},
                zoom: 18,
                padding: 0  // default = 20px
            }, function() {
                map.setClickable(true);
                
            }); */

            
        }else{
            /* map.setClickable(false);
            map.moveCamera({
                target: {lat: driver_lat, lng: driver_lng},
                zoom: 18,
                padding: 0  // default = 20px
            }, function() {
                map.setClickable(true);
                
            }); */

            driver_marker = map.addMarker({
                        'position':{lat: driver_lat,lng: driver_lng},
                        'icon' : {url:`img/city-driver-icon-${driver_icon_type}.png`,size:{width:48,height:48}},
                        animation: plugin.google.maps.Animation.DROP
                    }, function(marker){
                        marker.setIconAnchor(24,24); //24x24 marker icon size. set anchor at midpoint
                        marker._isReady = true;
                    });



            
        }

    }

    
    
}




function updateOnDriverLocationError(error) {
    return;
}



//Save driver coordinates on db with last seen time.
var updating_location = 0;
async function setDriverLocation(){

    let current_location_coords = await getCurrentLocationbg();

    driver_bg_lat = current_location_coords.lat;
    driver_bg_lng = current_location_coords.lng;

    if(!driver_bg_lat  || !driver_bg_lng){
        return;
    }

    if(updating_location){
        return;
    }
    updating_location = 1;
    
    var post_data = {'action_get':'setDriverLocation','lat':driver_bg_lat,'long':driver_bg_lng};  
    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout : 15000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            updating_location = 0;
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }           

            

            if(data_obj.hasOwnProperty('driver_time_online')){
                $('#driver-stats-time-online').html(data_obj.driver_time_online);
            }

            if(data_obj.hasOwnProperty('feedback')){
                
                return;
                ons.notification.toast(data_obj.feedback, {
                    timeout: 2000
                  });
                return;
            }

        },
        error: function(jqXHR,textStatus, errorThrown) {
            updating_location = 0;
            return;  
            
        }

    });
}


async function sync_with_servertime(){

    let time_diffs = [];
        
    for(var x = 0;x < 3;x++){
        try{
         let server_time = await getservertime(); 

         let time_diff = Date.now() - server_time;
         time_diffs.push(time_diff);         
        
        }catch(e){
            continue;
        }    
    }

    if(time_diffs.length){
        let sum = 0;
        time_diffs.forEach(function(val,indx){
            sum += val;
        })
        server_client_time_diff = Math.floor(sum / time_diffs.length); //in milliecs
    }

    
}


async function getservertime(){

    let res = new Promise(function(resolve,reject){
        let sync_time_before = Date.now();
        var post_data = {'action_get':'syncservertime'};       
        jQuery.ajax({
        url: ajaxurl,
        method: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
            {
                
                        
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    reject('error');
                    return;
                }


                

                
                if(data_obj.hasOwnProperty('server_time')){
                    let sync_time_arrived = Date.now();
                    let server_time = parseInt(data_obj.server_time);
                    let req_elapsed = server_time - sync_time_before;
                    let res_elapsed = sync_time_arrived - server_time;
                    let server_actual_time = sync_time_arrived + res_elapsed;
                    resolve(server_actual_time);
                    return;                   
                }


                
                
                
            },
            error: function() {
                reject('error');
                return;
                
            }

        });
    })

    return res;

}





function circletransition(){

    getnotifications(1);
    get_chat_support_msg();
    animatecircle.show();
    $('ons-modal').addClass('modal-transparent');
    $('#circle-transition').animate({
        width:2000,
        height:2000

    },1500,function(){
                        animatecircle.hide();
                        $('ons-modal').removeClass('modal-transparent');
                        finalize_init();        
    
                    });

}


function backgroundGeoloacationStart(){

    if(!app_fully_started)return;

    if(typeof backgroundGeoloacationStart.processing == 'undefined'){
        backgroundGeoloacationStart.processing = false; //declare a static variiable
    }

    if(backgroundGeoloacationStart.processing){
        console.log("Background geolocation running status check in progress");
        return;
    }

    backgroundGeoloacationStart.processing = true;
    
    BackgroundGeolocation.checkStatus(
    function(status){
        if(status.isRunning){
            console.log("background geolocation already started");
            backgroundGeoloacationStart.processing = false;
            return;   
        }     
        BackgroundGeolocation.start();
        backgroundGeoloacationStart.processing = false;
        console.log("background geolocation started");

    },
    function(){
        console.log("failed to get background geolocation running status");
        backgroundGeoloacationStart.processing = false;
    });
    
}


async function finalize_init(){

    let gps_enabled = await userEnableGPSNotify();

    if(gps_enabled.hasOwnProperty('error')){
        setTimeout(function(){            
            finalize_init(); //loop until we get valid coordinates
        },500);

        return;
    }

    if(!app_start_animate)AnimateAtStart();

    getuserlocation();

    app_fully_started = 1;
    backgroundGeoloacationStart();

    setTimeout(function(){
        if(account_activation_status == 0){
            ons.notification.alert(__("We are reviewing your account information. You will not be able to receive ride requests for now. Please contact support for more details"),{title:"", cancelable:false});
        }
    },2000)
    if(push_notification_buffer){
        process_push_message(push_notification_buffer);
        push_notification_buffer = null;        
    }


    //notify user of required documents
    let user_doc_data = userprofileinfo.user_docs;
    if(user_doc_data){
        for(var key in user_doc_data){
            let doc_data = user_doc_data[key];
            if(doc_data.doc_city == '0' || doc_data.doc_city == userprofileinfo.city_id){
                if(!doc_data.hasOwnProperty('u_doc_status') || doc_data.u_doc_status == null){
                  setTimeout(function(){
                    ons.notification.alert(__("You need to provide some important documents to keep your account active. Check your profile page for more details"),{title:""});
                  },3000);
                  break;
                }
                
            }

        }
    }

    animateDriversMarkers();
}


function userEnableGPSNotify(){

    let res = new Promise(function(resolve,reject){
        
        cordova.plugins.diagnostic.isLocationAuthorized(function(enabled){            
            if(enabled){
                resolve({'success':1});
            }else{
                document.querySelector('#gpsenabedialog').show();
                let gps_enable_check_processing = 0;
                let gps_status_polling_timer_handle;
                $('#gps-turnon-btn').off().on('click', function(){
                    
                    _makeRequest();
                    let counter = 0;
                    clearInterval(gps_status_polling_timer_handle);
                    gps_status_polling_timer_handle = setInterval(function(){
                        counter++;
                        if(gps_enable_check_processing)return;
                        gps_enable_check_processing = 1;
                        cordova.plugins.diagnostic.isLocationAuthorized(function(active){
                            if(active){

                                clearInterval(gps_status_polling_timer_handle);
                                document.querySelector('#gpsenabedialog').hide();
                                resolve({'success':1}); 
                                return;                                
                            }
                            gps_enable_check_processing = 0;
                        },function(){
                            resolve({'error':1});
                        });
                    },500);


                })

                                
            }
        }, function(error){
            console.error("The following error occurred: "+error);
            resolve({'error':1});
        })
    })
    return res;
}

      
function profilepage_show(){
    document.querySelector('#myNavigator').pushPage('html/profile.html',
        {
        animation: 'fade'             
        }
    );

    document.querySelector('#mySplitter').left.close();

}

function bookingspage_show(){
    
    
    document.querySelector('#myNavigator').pushPage('html/bookings.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function scheduledtrips_show(){
    document.querySelector('#myNavigator').pushPage('html/scheduled-trips.html',
        {
        animation: 'fade'             
        }
    );

    document.querySelector('#mySplitter').left.close();
}



function notifydelete(n_id){
    loading.show();
    var post_data = {'action':'deletenotification','n_id':n_id};       
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
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
              $('#notification-list-item-' + n_id).fadeOut('slow');                             
              
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });



}





function shownotifications(){

    document.querySelector('#myNavigator').pushPage('html/notifications.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();   


}



function showchatsupport(){
    document.querySelector('#myNavigator').pushPage('html/chatsupport.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();
}




function process_route_between_locations(p_lat,p_lng,d_lat,d_lng){

    loading.show();
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getdirections','p-lat':p_lat,'p-lng':p_lng,'d-lat':d_lat,'d-lng':d_lng,'mode':1},
        dataType: 'json',
        success: function(data){
                        
            loading.hide();

            if(data.hasOwnProperty('direction_details') && data.direction_details.status === 'OK'){

                map.setClickable(false);

                intra_city_duration = Math.ceil(parseInt(data.direction_details.routes[0].duration) / 60);
                intra_city_distance = parseInt(data.direction_details.routes[0].distanceMeters) / 1000; //default value in metric

                intra_city_duration_text = data.direction_details.routes[0].duration;
                intra_city_distance_text = data.direction_details.routes[0].distanceMeters + "m";

                route_points = [];
                route_points = plugin.google.maps.geometry.encoding.decodePath(data.direction_details.routes["0"].polyline.encodedPolyline);

                //plot route
                if(route_polyline != null){
                    route_polyline.setVisible(false);
                    route_polyline.setPoints(route_points);
                    route_polyline.setVisible(true);  

                    
                    map.animateCamera({
                    target: route_points,
                    duration: 1000,
                    }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);
                    });
                    
                }else{

                    route_polyline = map.addPolyline({
                        "points": route_points,
                        'color' : '#000000',
                        'width': 3,
                        'geodesic': true,
                        'clickable': true
                    });
                    
                    route_polyline.setVisible(true);
                    route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                        
                        map.animateCamera({
                            target: route_points,
                            duration: 1000,
                            }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                        });
                    });

                    map.animateCamera({
                        target: route_points,
                        duration: 1000,
                        }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                    });

                }           
                                  
                
                
                return             
                
            }



            return;
    
        },
        error: function(){
            
            loading.hide();
            return;
            
        } 
    
    
    });


}







function infopage_show(){
    
        
    document.querySelector('#myNavigator').pushPage('html/info.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}


function share_message(title_str,text_str,url_str){
    
    navigator.share({
        title: title_str,
        text: text_str,
        url: url_str
    }).then(() => {
        console.log("Location was shared successfully");
    }).catch((err) => {
        console.error("Location share failed:", err.message);
    });
    
}


function referralspage_show(){
    document.querySelector('#myNavigator').pushPage('html/referrals.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();
}



function showaboutapp(){

         
    document.querySelector('#myNavigator').pushPage('html/aboutapp.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}


function earningspage_show(){

    document.querySelector('#myNavigator').pushPage('html/earnings.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function showterms(){
    
        
    document.querySelector('#myNavigator').pushPage('html/termsandprivacy.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}





function showhelpguide(){
    
        
    document.querySelector('#myNavigator').pushPage('html/help-cats.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}




function showhelpcattopics(topics_id){

    if(typeof help_topics === 'object' && help_topics.hasOwnProperty(topics_id)){

        var title = $('#cat-title-' + topics_id).html();

        document.querySelector('#myNavigator').pushPage('html/help-topics.html',
                {
                animation: 'fade',
                data:{'topics_list':help_topics[topics_id],'page_title':title}             
                }
        );

        document.querySelector('#mySplitter').left.close();  
        return;
    }

    ons.notification.alert(__("Help topics for this category are currently unavailable"),{title:""});    
        
    

}



function showhelptopic(help_content_id){
    var title = $('#topic-title-' + help_content_id).html();

    document.querySelector('#myNavigator').pushPage('html/help-content.html',
                {
                animation: 'fade',
                data:{'help_content_id':help_content_id,'help_content_title':title}             
                }
        );

        document.querySelector('#mySplitter').left.close();      
        
    

}


function walletpage_show(){   
      
    
    
    document.querySelector('#myNavigator').pushPage('html/wallet.html',
            {
            animation: 'fade'             
            }
           
    );

    document.querySelector('#mySplitter').left.close();
  
}



function walletwithdraw(){
    if(isNaN(parseInt($('#withdrawAmount').val())) || parseInt($('#withdrawAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount to withdraw'),{title:""})  ;
        return;
    }

    var withdraw_amount = $('#withdrawAmount').val();

    loading.show();
    var post_data = {'action':'walletwithdraw','amount':withdraw_amount};       
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
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }

            if(data_obj.hasOwnProperty('success')){
                ons.notification.alert(__("Your withdrawal request has been acknowleged. Your request will be processed soon. You will not be able to make any other request until your current request has been processed"),{title:""});
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





function showPaymentGateways(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    if(parseInt($('#fundAmount').val()) < walletLowTopupAmount()){
        $('#fundAmount').val(walletLowTopupAmount());
    }

    if(app_settings.default_payment_gateway instanceof Array){
        let payment_gateways = app_settings.default_payment_gateway;
        if(!payment_gateways.length){
            return;
        }else if(payment_gateways.length == 1){
            Vpay(payment_gateways[0]);
            return;
        }
    }else{
        return;
    }

    document.querySelector('#myNavigator').pushPage('html/pgateways.html',
    {
        animation:'fade'             
    }
    );

    document.querySelector('#mySplitter').left.close();
}



function walletLowTopupAmount(){
    let lowest_amount_preset = 0;
    let wallet_topup_preset_string = app_settings.wallet_topup_presets;
    let wallet_topup_preset_array = wallet_topup_preset_string.split('|');
    if(typeof wallet_topup_preset_array == 'object'){        
    
        wallet_topup_preset_array.forEach(function(val,indx){

            if(indx == 0){
                lowest_amount_preset = val;

            }else{
                if(val < lowest_amount_preset){
                    lowest_amount_preset = val;
                }

            }         
                    
            
        })
        
    }

    return lowest_amount_preset;
}





function Vpay(payment_gateway) {

    let top_page = document.querySelector('#myNavigator').topPage;
    if(top_page.id == "pgateways"){
        document.querySelector('#myNavigator').popPage({animation: 'none'});
    }

    switch(payment_gateway){

        case "paystack":
        paystackGateway();
        break; 
        
        case "voguepay":
        voguepayGateway();
        break;

        case "pesapal":
        pesapalGateway();
        break;

        case "paytr":
        paytrGateway();
        break;

        case "paytm":
        paytmGateway();
        break;

        case "phonepe":
        phonepeGateway();
        break;

        case "stripe":
        stripeGateway();
        break;

        case "flutterwave":
        flutterwaveGateway();
        break;

        case "payku":
        paykuGateway();
        break;

        case "paymob":
        paymobGateway();
        break;

        case "midtrans":
        midtransGateway();
        break;

        case "paypal":
        paypalGateway();
        break;

        case "custom":
        customGateway();
        break;

        default:
        ons.notification.alert(__('Payment Gateway not available'),{title:""});
        
    } 
      
    
    
}



function customGateway(){
    //add your custom gateway code here  
    //If you are using AJAX set 'action':'customInit' in the data payload. This will call the server file in /drop-files/lib/pgateways/paystack/custom-transaction-init.php. 
    //You can write your payment initialization code in this file.
}


function stripeGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by stripe
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:__('Driver App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'stripeInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Stripe"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.stripe_url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.stripe_url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function paytmGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.driverid,
        amount: payment_amount,
        cur_symbol:city_curency_symbol,
        cur_code:city_curency_code,
        cur_exchng:city_curency_exchange_rate,
        user_type:1,
        memo:'Driver App Wallet Funding'
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: payment_amount,
        currency:default_currency_data.iso_code,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'paytmInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['PayTM']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}


function paykuGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by payku
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:__('Driver App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'paykuInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Payku"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function midtransGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by midtrans
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:__('Driver App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'midtransInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Midtrans"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function paypalGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by paypal
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:'Driver App Wallet Funding'
             
        }
      };

      loading.show();   

      var post_data = {'action':'paypalInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["PayPal"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function paymobGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by midtrans
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        firstname: userprofileinfo.firstname,
        lastname: userprofileinfo.lastname,
        phone: userprofileinfo.country_dial_code + userprofileinfo.phone,
        currency: default_currency_data.iso_code,
        payment_mode: $('#kiosk-mode').prop('checked') == true ? 'kiosk' : 'card',
        metadata: {           
                  
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:__('Driver App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'paymobInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){

                    if(data_obj.hasOwnProperty('bill_ref')){
                        ons.notification.alert(__("Kiosk payment initialized successfully. Here is your bill reference number: {---1}",[data_obj.bill_ref]),{title:""});
                        return;
                    }
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Paymob"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}


function paytrGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.driverid,
        amount: payment_amount,
        cur_symbol:city_curency_symbol,
        cur_code:city_curency_code,
        cur_exchng:city_curency_exchange_rate,
        user_type:1,
        memo:__('Driver App Wallet Funding')
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'paytrInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['PayTR']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.paytr_data, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}


function phonepeGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.driverid,
        amount: payment_amount,
        cur_symbol:city_curency_symbol,
        cur_code:city_curency_code,
        cur_exchng:city_curency_exchange_rate,
        user_type:1,
        memo:__('Driver App Wallet Funding')
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'phonepeInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['PhonePe']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}




function pesapalGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseFloat($('#fundAmount').val());

    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);

    var metadata = {

        user_id:userprofileinfo.driverid,
        amount: payment_amount,
        cur_symbol:city_curency_symbol,
        cur_code:city_curency_code,
        cur_exchng:city_curency_exchange_rate,
        user_type:1,
        memo:__('Driver App Wallet Funding')
    };

    var metadata_json = JSON.stringify(metadata);
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: payment_amount,
        currency:default_currency_data.iso_code,
        metadata: metadata_json
      };

      loading.show();   

      var post_data = {'action':'pesapalInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['PesaPal']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.pesapal_data, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.pesapal_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });


}


function paystackGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'))  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by paystack
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {
           custom_fields: [
              {
                  
                    user_id:userprofileinfo.driverid,
                    amount: payment_amount,
                    cur_symbol:city_curency_symbol,
                    cur_code:city_curency_code,
                    cur_exchng:city_curency_exchange_rate,
                    user_type:1,
                    memo:__('Driver App Wallet Funding')
              }
           ]
        }
      };

      loading.show();   

      var post_data = {'action':'paystackInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['Paystack']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.paystack_data.data.authorization_url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.paystack_data.data.authorization_url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}


function flutterwaveGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'))  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);
    payment_amount = payment_amount / 100; //convert back to initial value for use with flutterwave 

    //convert amount to local currency supported by flutterwave
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate * 100);
    local_currency_payment_amount = local_currency_payment_amount / 100;


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        payment_options: "card",
        customer : {
            email: userprofileinfo.email,
            phonenumber : userprofileinfo.phone,
            name: userprofileinfo.firstname + " " + userprofileinfo.lastname
        },
        meta: {
                             
            user_id:userprofileinfo.driverid,
            amount: payment_amount,
            cur_symbol:city_curency_symbol,
            cur_code:city_curency_code,
            cur_exchng:city_curency_exchange_rate,
            user_type:1,
            memo:__('Driver App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'flutterwaveInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited", ['FlutterWave']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}


function voguepayGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'));
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to Nigerian Naira supported by paystack
    var local_currency_payment_amount = parseInt(payment_amount / city_curency_exchange_rate);


    var handler = PaystackPop.setup({
        key: online_payment_info.merchantid,
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: "NGN",
        metadata: {
           custom_fields: [
              {
                  
                  user_id:userprofileinfo.driverid,
                  amount: payment_amount,
                  cur_symbol:city_curency_symbol,
                  cur_code:city_curency_code,
                  cur_exchng:city_curency_exchange_rate,
                  user_type:1,
                  memo:__('Driver App Wallet Funding')
              }
           ]
        },
        callback: Vpaysuccess,
        onClose:Vpayclosed 
      });
      handler.openIframe();
}





Vpayclosed=function() {
    //alert('window closed');
}

Vpaysuccess=function(transaction_id) {
    $('#fundAmount').val('');
    getwalletinfo();
    /* document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade'             
        }
    ); */
    ons.notification.alert('Transaction was successful',{title:""});
}


Vpayfailed=function(transaction_id) {
    //getwalletinfo();
    /* document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade'             
        }
    ); */
     ons.notification.alert('Transaction was not successful',{title:""});
}









// Get geo coordinates

function getMapLocation() {
   /*  ons.notification.toast('Getting your location...', {
        timeout: 2000
      }); */
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { timeout: 30000,enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}













// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { timeout:30000,enableHighAccuracy: true });
}



function driverarrived(b_id){

    loading.show();
    
      var post_data = {'action_get':'driverarrived','bookingid':b_id,'driver_lat' : driver_lat, 'driver_lng' : driver_lng};       
      jQuery.ajax({
      url: ajaxurl,
      method: 'GET',
      timeout : 45000,
      crossDomain:true,
      xhrFields: {withCredentials: true},
      data: post_data,
      success: function (data, status)
          {
              loading.hide();     
              console.log(data)
              try{
                  //console.log(data);
                  var data_obj = JSON.parse(data);
              }catch(e){
                
                  ons.notification.alert(__("Error communicating with server"),{'title':""});                
                  return;
              }
  
  
              if(data_obj.hasOwnProperty('error')){
                
                  ons.notification.alert(data_obj.error,{title:""});
                
                  return;                  
  
              }
  
  
              
              if(data_obj.hasOwnProperty('success')){
                ride_ui_btn_sound.play();
                ons.notification.alert(__('The rider has been notified of your arrival'),{'title':""});
                driver_accept_ride_request_ui_states.ui_state = 2 //next state - pick up
                driver_accept_ride_request_ui_states.drv_arrived_time = parseInt(data_obj.driver_arrived_time); //save time driver arrived
                localStorage.setObject(`pbk-${b_id}`,driver_accept_ride_request_ui_states);
                processuistates();                                                        
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


/* function driverstartride(booking_id){
    
    ons.notification.confirm({
        message: 'Do you want to start this Ride?',
        title: 'Start Ride',
        buttonLabels: ['Yes', 'No'],
        animation: 'default', // or 'none'
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
         
          if(!index){
            // 0-: Button index from the left
            startride(booking_id);
          }else{
            return;
            // -1: Cancel
          }
         
        }
      });

}




function driveracceptride(booking_id){
    
    ons.notification.confirm({
        message: 'Accept to pickup the passenger?',
        title: 'Accept Ride',
        buttonLabels: ['Yes', 'No'],
        animation: 'default', // or 'none'
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
         
          if(!index){
            // 0-: Button index from the left
            acceptride(booking_id);
          }else{
            return;
            // -1: Cancel
          }
         
        }
      });
  
} */




function  drivercompleted(booking_id,code){
    
    loading.show();
    var post_data = {'action_get':'drivercompleted','bookingid':booking_id,'complete_code':code,'ride_distance':driver_accept_ride_request_ui_states.total_ride_distance,'ride_duration_secs':driver_accept_ride_request_ui_states.total_ride_time,'ride_duration_secs_formated':driver_accept_ride_request_ui_states.total_ride_time_formated,'ride_fare':driver_accept_ride_request_ui_states.fare,'city_currency_symbol':city_curency_symbol,'city_currency_exchng':city_curency_exchange_rate,'city_currency_code':city_curency_code,'amount_paid_by_rider':driver_accept_ride_request_ui_states.paid_amount,'coupon_code':driver_accept_ride_request_ui_states.coupon_code,'coupon_discount_type':driver_accept_ride_request_ui_states.coupon_discount_type,'coupon_discount_value':driver_accept_ride_request_ui_states.coupon_discount_value,'referral_used':driver_accept_ride_request_ui_states.referral_used,'referral_discount_value':driver_accept_ride_request_ui_states.referral_discount_value,'driver_lat' : driver_lat, 'driver_lng' : driver_lng,"total_wait_time" : driver_accept_ride_request_ui_states.total_wait_time,"total_wait_time_cost" : driver_accept_ride_request_ui_states.total_wait_time_cost};
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 120000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.confirm({
                    message: __('Error communicating with server'),
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: [__('Cancel'), __('Retry')],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                     
                      if(!index){
                        // 0-: Button index from the left
                        return;
                        
                      }else{
                        drivercompleted(booking_id,code);
                        // -1: Cancel
                      }
                     
                    }
                  });
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                
                ons.notification.confirm({
                    message: data_obj.error,
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: [__('Cancel'), __('Retry')],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                     
                      if(!index){
                        // 0-: Button index from the left
                        return;
                        
                      }else{
                        drivercompleted(booking_id,code);
                        // -1: Cancel
                      }
                     
                    }
                  });
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
                ride_ui_btn_sound.play();
                driver_accept_ride_request_ui_states.ui_state = 4 //next state - finished. clear ui and show rating view
                //localStorage.setObject(`pbk-${booking_id}`,driver_accept_ride_request_ui_states);
                localStorage.removeItem(`pbk-${booking_id}`);
                updateAuxBookings();
                processuistates();
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Cancel'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                 
                  if(!index){
                    // 0-: Button index from the left
                    return;
                    
                  }else{
                    drivercompleted(booking_id,code);
                    // -1: Cancel
                  }
                 
                }
              });
            return;
            
        }

    });

}



function acceptride(booking_id){

    clear_ride_request();
    loading.show();
    var post_data = {'action_get':'acceptride','bookingid':booking_id,'driver_lat' : driver_lat, 'driver_lng' : driver_lng};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 45000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();       
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                ons.notification.confirm({
                    message: __('Error communicating with server'),
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: [__('Cancel'), __('Retry')],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                     
                      if(!index){
                        // 0-: Button index from the left
                        return;
                        
                      }else{
                        acceptride(booking_id);
                        // -1: Cancel
                      }
                     
                    }
                  });
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                if(data_obj.hasOwnProperty('wallet_error')){ //low fund in wallet

                    //Indicate to driver that he has been put offline
                    driver_offline_sound.play();
                    driver_availability = false;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));

                    //check if driver is on an active trip
                    if(driver_accept_ride_request_ui_states.hasOwnProperty('ui_state') && driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
                        ons.notification.alert(data_obj.error,{title:''});
                    }else{
                        //show the wallet page
                        walletpage_show();
                        ons.notification.alert(data_obj.error,{title:''});
                    }
                    return;
                }

                ons.notification.alert(data_obj.error,{title:''});
                return;
                

            }

            if(data_obj.hasOwnProperty('success')){
                accept_ride_sound.play();
                
                if(driver_accept_ride_request_ui_states.hasOwnProperty('ui_state') && driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){//check if driver is currently servicing a trip then add new trip request as an auxilliary request
                    let aux_booking_details = {};
                    aux_booking_details = {ui_state : 0,booking_id:0,ride_id:0,route_id:0,route_scope:0,p_addr:'',p_lat:'',p_lng:'',d_addr:'',d_lat:'',d_lng:'',rider_firstname:'',rider_image:'',rider_phone:'',rider_rating:'',completion_code:'',fare:'',payment_type:'',coupon_code:'',coupon_discount_type:0,coupon_discount_value:0,coupon_min_fare:0.00,coupon_max_discount:0.00,referral_discount_value:0.00,referral_used:0,total_ride_time:0,total_ride_distance:0.00,total_ride_time_formated:'',total_ride_distance_formated:'',paid_amount:0.00, ride_start_time:0, waypoint1_address:'',waypoint1_long:'',waypoint1_lat:'',waypoint2_address:'',waypoint2_long:'',waypoint2_lat:'',confirm_stop1:0,confirm_stop2:0,drv_start_ride_pos_lat:0.0,drv_start_ride_pos_lng:0.0,drv_last_pos_lat:0.0,drv_last_pos_lng:0.0,drv_last_pos_time:0,drv_arrived_time:0,drv_start_trip_time:0,drv_arrived_stop_time_1:0,drv_arrived_stop_time_2:0,drv_left_stop_time_1:0,drv_left_stop_time_2:0,total_wait_time : 0,total_wait_time_cost : 0.00,service_mode:0,est_distance:0.00,est_duration:0.00,hourly_rate_hours:0};
                    aux_booking_details.ui_state = 1;
                    aux_booking_details.booking_id = driver_accept_ride_push_data.booking_id;
                    aux_booking_details.ride_id = driver_accept_ride_push_data.ride_id;
                    aux_booking_details.route_id = driver_accept_ride_push_data.route_id;
                    aux_booking_details.route_scope = driver_accept_ride_push_data.route_scope;
                    aux_booking_details.p_addr = driver_accept_ride_push_data.p_address;
                    aux_booking_details.p_lat = driver_accept_ride_push_data.p_lat;
                    aux_booking_details.p_lng = driver_accept_ride_push_data.p_lng;
                    aux_booking_details.d_addr = driver_accept_ride_push_data.d_address;
                    aux_booking_details.d_lat = driver_accept_ride_push_data.d_lat;
                    aux_booking_details.d_lng = driver_accept_ride_push_data.d_lng;
                    aux_booking_details.rider_firstname = driver_accept_ride_push_data.rider_name;
                    aux_booking_details.rider_image = driver_accept_ride_push_data.rider_image;
                    aux_booking_details.rider_phone = driver_accept_ride_push_data.rider_phone;
                    aux_booking_details.rider_rating = driver_accept_ride_push_data.rider_rating;
                    aux_booking_details.completion_code = driver_accept_ride_push_data.completion_code;
                    aux_booking_details.fare = parseFloat(driver_accept_ride_push_data.fare);
                    aux_booking_details.payment_type = driver_accept_ride_push_data.payment_type;
                    aux_booking_details.coupon_code = driver_accept_ride_push_data.coupon_code;
                    aux_booking_details.coupon_discount_type = driver_accept_ride_push_data.coupon_discount_type;
                    aux_booking_details.coupon_discount_value = parseFloat(driver_accept_ride_push_data.coupon_discount_value);
                    aux_booking_details.referral_used = driver_accept_ride_push_data.referral_used;
                    aux_booking_details.referral_discount_value = parseFloat(driver_accept_ride_push_data.referral_discount_value);
                    aux_booking_details.paid_amount = parseFloat(driver_accept_ride_push_data.fare);

                    aux_booking_details.coupon_min_fare = parseFloat(driver_accept_ride_push_data.coupon_min_fare);
                    aux_booking_details.coupon_max_discount = parseFloat(driver_accept_ride_push_data.coupon_max_discount);

                    aux_booking_details.waypoint1_address = driver_accept_ride_push_data.waypoint1_address;
                    aux_booking_details.waypoint1_lat = driver_accept_ride_push_data.waypoint1_lat;
                    aux_booking_details.waypoint1_long = driver_accept_ride_push_data.waypoint1_long;
                    aux_booking_details.waypoint2_address = driver_accept_ride_push_data.waypoint2_address;
                    aux_booking_details.waypoint2_lat = driver_accept_ride_push_data.waypoint2_lat;
                    aux_booking_details.waypoint2_long = driver_accept_ride_push_data.waypoint2_long;

                    aux_booking_details.service_mode = parseInt(driver_accept_ride_push_data.service_mode);
                    aux_booking_details.hourly_rate_hours = parseInt(driver_accept_ride_push_data.hourly_rate_hours);
                    aux_booking_details.est_distance = parseFloat(driver_accept_ride_push_data.est_distance);
                    aux_booking_details.est_duration = parseFloat(driver_accept_ride_push_data.est_duration);

                    aux_booking_details.ride_start_time = Date.now() / 1000 | 0;

                    localStorage.setObject(`pbk-${aux_booking_details.booking_id}`,aux_booking_details);
                    data_obj.aux_booking.push(aux_booking_details.booking_id);
                    updateAuxBookings(data_obj.aux_booking);                    

                    return;
                    
                }
                
                
                //prepare UI for active ride
                driver_accept_ride_request_ui_states = [];
                driver_accept_ride_request_ui_states = {ui_state : 0,booking_id:0,ride_id:0,route_id:0,route_scope:0,p_addr:'',p_lat:'',p_lng:'',d_addr:'',d_lat:'',d_lng:'',rider_firstname:'',rider_image:'',rider_phone:'',rider_rating:'',completion_code:'',fare:'',payment_type:'',coupon_code:'',coupon_discount_type:0,coupon_discount_value:0,coupon_min_fare:0.00,coupon_max_discount:0.00,referral_discount_value:0.00,referral_used:0,total_ride_time:0,total_ride_distance:0.00,total_ride_time_formated:'',total_ride_distance_formated:'',paid_amount:0.00, ride_start_time:0, waypoint1_address:'',waypoint1_long:'',waypoint1_lat:'',waypoint2_address:'',waypoint2_long:'',waypoint2_lat:'',confirm_stop1:0,confirm_stop2:0,drv_start_ride_pos_lat:0.0,drv_start_ride_pos_lng:0.0,drv_last_pos_lat:0.0,drv_last_pos_lng:0.0,drv_last_pos_time:0,drv_arrived_time:0,drv_start_trip_time:0,drv_arrived_stop_time_1:0,drv_arrived_stop_time_2:0,drv_left_stop_time_1:0,drv_left_stop_time_2:0,total_wait_time : 0,total_wait_time_cost : 0.00,service_mode:0,est_distance:0.00,est_duration:0.00,hourly_rate_hours:0};
                driver_accept_ride_request_ui_states.ui_state = 1;
                driver_accept_ride_request_ui_states.booking_id = driver_accept_ride_push_data.booking_id;
                driver_accept_ride_request_ui_states.ride_id = driver_accept_ride_push_data.ride_id;
                driver_accept_ride_request_ui_states.route_id = driver_accept_ride_push_data.route_id;
                driver_accept_ride_request_ui_states.route_scope = driver_accept_ride_push_data.route_scope;
                driver_accept_ride_request_ui_states.p_addr = driver_accept_ride_push_data.p_address;
                driver_accept_ride_request_ui_states.p_lat = driver_accept_ride_push_data.p_lat;
                driver_accept_ride_request_ui_states.p_lng = driver_accept_ride_push_data.p_lng;
                driver_accept_ride_request_ui_states.d_addr = driver_accept_ride_push_data.d_address;
                driver_accept_ride_request_ui_states.d_lat = driver_accept_ride_push_data.d_lat;
                driver_accept_ride_request_ui_states.d_lng = driver_accept_ride_push_data.d_lng;
                driver_accept_ride_request_ui_states.rider_firstname = driver_accept_ride_push_data.rider_name;
                driver_accept_ride_request_ui_states.rider_image = driver_accept_ride_push_data.rider_image;
                driver_accept_ride_request_ui_states.rider_phone = driver_accept_ride_push_data.rider_phone;
                driver_accept_ride_request_ui_states.rider_rating = driver_accept_ride_push_data.rider_rating;
                driver_accept_ride_request_ui_states.completion_code = driver_accept_ride_push_data.completion_code;
                driver_accept_ride_request_ui_states.fare = parseFloat(driver_accept_ride_push_data.fare);
                driver_accept_ride_request_ui_states.payment_type = driver_accept_ride_push_data.payment_type;
                driver_accept_ride_request_ui_states.coupon_code = driver_accept_ride_push_data.coupon_code;
                driver_accept_ride_request_ui_states.coupon_discount_type = driver_accept_ride_push_data.coupon_discount_type;
                driver_accept_ride_request_ui_states.coupon_discount_value = parseFloat(driver_accept_ride_push_data.coupon_discount_value);
                driver_accept_ride_request_ui_states.referral_used = driver_accept_ride_push_data.referral_used;
                driver_accept_ride_request_ui_states.referral_discount_value = parseFloat(driver_accept_ride_push_data.referral_discount_value);
                driver_accept_ride_request_ui_states.paid_amount = parseFloat(driver_accept_ride_push_data.fare);

                driver_accept_ride_request_ui_states.coupon_min_fare = parseFloat(driver_accept_ride_push_data.coupon_min_fare);
                driver_accept_ride_request_ui_states.coupon_max_discount = parseFloat(driver_accept_ride_push_data.coupon_max_discount);

                driver_accept_ride_request_ui_states.waypoint1_address = driver_accept_ride_push_data.waypoint1_address;
                driver_accept_ride_request_ui_states.waypoint1_lat = driver_accept_ride_push_data.waypoint1_lat;
                driver_accept_ride_request_ui_states.waypoint1_long = driver_accept_ride_push_data.waypoint1_long;
                driver_accept_ride_request_ui_states.waypoint2_address = driver_accept_ride_push_data.waypoint2_address;
                driver_accept_ride_request_ui_states.waypoint2_lat = driver_accept_ride_push_data.waypoint2_lat;
                driver_accept_ride_request_ui_states.waypoint2_long = driver_accept_ride_push_data.waypoint2_long;

                driver_accept_ride_request_ui_states.service_mode = parseInt(driver_accept_ride_push_data.service_mode);
                driver_accept_ride_request_ui_states.hourly_rate_hours = parseInt(driver_accept_ride_push_data.hourly_rate_hours);
                driver_accept_ride_request_ui_states.est_distance = parseFloat(driver_accept_ride_push_data.est_distance);
                driver_accept_ride_request_ui_states.est_duration = parseFloat(driver_accept_ride_push_data.est_duration);

                driver_accept_ride_request_ui_states.ride_start_time = Date.now() / 1000 | 0;

                if(rider_pickup_marker){
                    rider_pickup_marker.setVisible(true);
                    rider_pickup_marker.setPosition({lat: parseFloat(driver_accept_ride_push_data.p_lat),lng: parseFloat(driver_accept_ride_push_data.p_lng)});
                }else{
                    rider_pickup_marker = map.addMarker({
                        'position':{lat: parseFloat(driver_accept_ride_push_data.p_lat),lng: parseFloat(driver_accept_ride_push_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    });
                }
                    



                if(data_obj.directions.hasOwnProperty('status') && data_obj.directions.status == 'OK'){
                    map.setClickable(false);
                    route_points = [];
                    route_points = plugin.google.maps.geometry.encoding.decodePath(data_obj.directions.routes["0"].polyline.encodedPolyline);

                    //plot route
                    if(route_polyline != null){
                        route_polyline.setVisible(false);
                        route_polyline.setPoints(route_points);
                        route_polyline.setVisible(true);  

                        
                        map.animateCamera({
                        target: route_points,
                        duration: 1000,
                        }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                            
                        });
                        
                    }else{

                        route_polyline = map.addPolyline({
                            "points": route_points,
                            'color' : '#000000',
                            'width': 3,
                            'geodesic': true,
                            'clickable': true
                        });
                        
                        route_polyline.setVisible(true);

                        
                        
                        route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                            
                            map.animateCamera({
                                target: route_points,
                                duration: 1000,
                                }, function() {
                                //alert("Camera target has been changed");
                                map.setClickable(true);
                            });
                        });

                        map.animateCamera({
                            target: route_points,
                            duration: 1000,
                            }, function() {
                                //alert("Camera target has been changed");
                                map.setClickable(true);
                        });

                    }
                    
                }



                localStorage.setObject(`pbk-${booking_id}`,driver_accept_ride_request_ui_states);
                updateAuxBookings();
                processuistates();

                

            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Cancel'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                 
                  if(!index){
                    // 0-: Button index from the left
                    return;
                    
                  }else{
                    acceptride(booking_id);
                    // -1: Cancel
                  }
                 
                }
              });
            return;
            
        }

    });


}

function startride(booking_id){

    loading.show();
    var post_data = {'action_get':'startride','bookingid':booking_id, 'driver_lat' : driver_lat, 'driver_lng' : driver_lng};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 45000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: async function (data, status)
        {          
            loading.hide();       
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{'title':""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
                ride_ui_btn_sound.play();
                driver_accept_ride_request_ui_states.ui_state = 3 //next state - drop off
                if(rider_pickup_marker){
                    rider_pickup_marker.setVisible(false);
                }
                
                if(parseFloat(driver_accept_ride_request_ui_states.d_lat) && parseFloat(driver_accept_ride_request_ui_states.d_lng)){

                    if(rider_dropoff_marker){
                        rider_dropoff_marker.setVisible(true);
                        rider_dropoff_marker.setPosition({lat: parseFloat(driver_accept_ride_request_ui_states.d_lat),lng: parseFloat(driver_accept_ride_request_ui_states.d_lng)});
                    }else{
                        rider_dropoff_marker = map.addMarker({
                            'position':{lat: parseFloat(driver_accept_ride_request_ui_states.d_lat),lng: parseFloat(driver_accept_ride_request_ui_states.d_lng)},
                            'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        });

                    }

                    if(data_obj.directions.hasOwnProperty('status') && data_obj.directions.status == 'OK'){
                        map.setClickable(false);
                        route_points = [];
                        route_points = plugin.google.maps.geometry.encoding.decodePath(data_obj.directions.routes["0"].polyline.encodedPolyline);

                        //plot route
                        if(route_polyline){
                            route_polyline.setVisible(false);
                            route_polyline.setPoints(route_points);
                            route_polyline.setVisible(true);  

                            
                            map.animateCamera({
                            target: route_points,
                            duration: 1000,
                            }, function() {
                                //alert("Camera target has been changed");
                                map.setClickable(true);
                                
                            });
                            
                        }else{

                            route_polyline = map.addPolyline({
                                "points": route_points,
                                'color' : '#000000',
                                'width': 3,
                                'geodesic': true,
                                'clickable': true
                            });
                            
                            route_polyline.setVisible(true);

                            
                            
                            route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                                
                                map.animateCamera({
                                    target: route_points,
                                    duration: 1000,
                                    }, function() {
                                    //alert("Camera target has been changed");
                                    map.setClickable(true);
                                });
                            });

                            map.animateCamera({
                                target: route_points,
                                duration: 1000,
                                }, function() {
                                    //alert("Camera target has been changed");
                                    map.setClickable(true);
                            });

                        }
                        
                    }

                }else{
                    if(route_polyline){
                            route_polyline.setVisible(false);
                    }
                }



                driver_accept_ride_request_ui_states.drv_start_trip_time = Date.now() / 1000 | 0;
                driver_accept_ride_request_ui_states.ride_start_time = Date.now() / 1000 | 0;
                driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0;

                let current_location_coords = await getCurrentLocationbg();

                console.log(current_location_coords);

                driver_bg_lat = current_location_coords.lat;
                driver_bg_lng = current_location_coords.lng;


                if(!(driver_bg_lat && driver_bg_lng)){
                    driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_accept_ride_request_ui_states.p_lat;
                    driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_accept_ride_request_ui_states.p_lng;
                    driver_accept_ride_request_ui_states.drv_start_ride_pos_lat = driver_accept_ride_request_ui_states.p_lat;
                    driver_accept_ride_request_ui_states.drv_start_ride_pos_lng = driver_accept_ride_request_ui_states.p_lng;
                }else{
                    driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                    driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
                    driver_accept_ride_request_ui_states.drv_start_ride_pos_lat = driver_bg_lat;
                    driver_accept_ride_request_ui_states.drv_start_ride_pos_lng = driver_bg_lng;
                }

                localStorage.setObject(`pbk-${booking_id}`,driver_accept_ride_request_ui_states);
                processuistates();
              //$('#booking-list-item-' + booking_id).fadeOut('slow');                             
              
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{'title':""});
            return;
            
        }

    });


}

function drivercancel(booking_id){

    if(booking_id){
        if(app_settings.hasOwnProperty('trip_cancel_reasons') && app_settings.trip_cancel_reasons.length){
            showCancelReasons(function(reason){
                drivercancelbooking(booking_id,reason);
            });
        }else{

            ons.notification.prompt(__('Why are you cancelling this ride?'),{title:'',cancelable:true,buttonLabels:[__('Cancel'),__('Continue')]})
            .then(function(input) {
                if(!input)return;
                drivercancelbooking(booking_id,input);
            });
        }
        
    }

}



function drivercancelbooking(b_id,comment = ''){
    /* if(!comment){
        ons.notification.alert("Ride cancellation aborted as you didn't explain why you are cancelling ride.",{'title':""});
        return;
    }; */    
    loading.show();
    var post_data = {'action_get':'bookingcancel','bookingid':b_id,'comment':comment};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 45000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{'title':""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }
    
            if(data_obj.hasOwnProperty('success')){

                localStorage.removeItem(`pbk-${b_id}`);

                let pending_bookings_count = updateAuxBookings();

                $('#booking-list-item-' + b_id).fadeOut('slow');                             
              
                if(driver_accept_ride_request_ui_states.hasOwnProperty("booking_id") && driver_accept_ride_request_ui_states.booking_id == b_id){

                                                
                    
                    clearInterval(driver_accept_ride_request_ui_update_timer);

                    old_time_seconds = 0;
                    total_ride_seconds = 0;
                    old_driver_position_lat = 0.0;
                    old_driver_position_lng = 0.0;
                    total_ride_distance = 0;

                    clearMapItemsSelectively();
                    getuserlocation(); 

                    //$('#ride-cancel-btn').hide();
                    clearInterval(wait_timer_handle);
                    $("#wait-time-info-container").hide();
                    $("#wait-stop-time-info-container").hide();
                    $('#ride-stats').hide();
                    $("#menubtn").css("z-index","100");
                    $("#menubtn").css("visibility","visible");
                    $("#nointernet").css("opacity","1");
                    $("#driver-available-btn").css("visibility","visible");
                    $('#available-status-text-container').css("visibility","visible");
                    $('#driver-online-indicator').fadeIn();
                    /* $("#statusmsg").css("visibility","visible");
                        $("#statusmsg").removeClass("fadeOutUp animated").addClass("fadeOutUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass("fadeOutUp animated");
                            $("#statusmsg").css("z-index","5");
                            $("#statusmsg").css("visibility","hidden");
                        
                            $('#status-msg-container').css('top','-1000px');

                    }) */
                
                        
                    $("#ride-control-panel").css("visibility","visible");
                    $("#nav-btn-container").hide();
                    $("#ride-control-panel").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass("fadeOutDown animated");
                        $("#ride-control-panel").css("visibility","hidden");

                        $('#driver-stats-panel').show();
                        $("#driver-stats-panel").removeClass("slideInUp animated").addClass("slideInUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $('#banner-items-container').fadeIn();
                            $(this).removeClass("slideInUp animated");
                        })
                        
                    })
                    
                    driver_accept_ride_request_ui_states = {};

                } 
            } 
            
            if(data_obj.hasOwnProperty('driver_ban') && data_obj.driver_ban == 1){
                setTimeout(function(){

                    driver_offline_sound.play();
                    driver_availability = false;
                    let ban_duration = data_obj.driver_ban_duration;
                    $("#driver-available-btn").css('background-color','grey');
                    $('#driver-online-indicator').fadeOut();
                    $('#available-status-text').text(__('Offline'));

                    ons.notification.alert(__("You have been temporarily suspended for abuse of the service. Please try again later after {---1} minutes",[ban_duration]),{'title':""});
                    return;

                },2000);

                
            }
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{'title':""});
            return;
            
        }

    });



}




function driverallocatecancel(booking_id){

    driverallocatecancelbooking(booking_id);

    return;

    ons.notification.confirm({
        message: 'This booking will be cancelled. It may attract a penalty fee. Do you want to continue?',
        // or messageHTML: '<div>Message in HTML</div>',
        title: 'Cancel Booking',
        buttonLabels: ['Yes', 'No'],
        animation: 'default', // or 'none'
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
         
          if(!index){
            // 0-: Button index from the left
            driverallocatecancelbooking(booking_id);
          }else{
            return;
            // -1: Cancel
          }
         
        }
      });

}

function driverallocatecancelbooking(b_id){
    loading.show();
    var post_data = {'action':'bookingallocatecancel','bookingid':b_id};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 20000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {   
            clear_ride_request();       
            loading.hide();    
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                //ons.notification.alert("Failed to cancel booking.");
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                //ons.notification.alert(data_obj.error);
                return;
                

            }

            if(data_obj.hasOwnProperty('success')){
                //$('#booking-list-item-' + b_id).fadeOut('slow');                             
                
            }          
            
            
        },
        error: function() {
            loading.hide();        
            //ons.notification.alert("Failed to cancel booking.");
            //return;
            
        }

    });



}



function resumeBooking(booking_id){

    let top_page = document.querySelector('#myNavigator').topPage;
    if(top_page.id == "bookingpage"){
        document.querySelector('#myNavigator').popPage({animation: 'fade'});
    }

    if(driver_accept_ride_request_ui_states.hasOwnProperty('booking_id')){
        if(booking_id == driver_accept_ride_request_ui_states.booking_id && driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
            return;
        }
    }


    
    for (var key in localStorage) {

        let booking_key = key.substr(0,4);

        if(booking_key == "pbk-"){

            let item_booking_id = key.substr(4);
            let item_booking = localStorage.getObject(key); 
            if(item_booking_id < booking_id && item_booking.ui_state > 0 && item_booking.ui_state < 4){
                /* ons.notification.alert(__("Please complete your first trip before switching to this trip",[]),{title:""});
                return;  */ 
            }       
            
        }
                          
       
    }


    //retrieve data from localstorage   
    driver_accept_ride_request_ui_states = localStorage.getObject("pbk-" + booking_id);


    clearInterval(driver_accept_ride_request_ui_update_timer);


    if(driver_accept_ride_request_ui_states.ui_state == 1 || driver_accept_ride_request_ui_states.ui_state == 2){

        accept_ride_sound.play();
        if(rider_pickup_marker){
            if(rider_dropoff_marker){
                rider_dropoff_marker.setVisible(false);
            }
            rider_pickup_marker.setVisible(true);
            rider_pickup_marker.setPosition({lat: parseFloat(driver_accept_ride_request_ui_states.p_lat),lng: parseFloat(driver_accept_ride_request_ui_states.p_lng)});
        }else{
            rider_pickup_marker = map.addMarker({
                'position':{lat: parseFloat(driver_accept_ride_request_ui_states.p_lat),lng: parseFloat(driver_accept_ride_request_ui_states.p_lng)},
                'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                animation: plugin.google.maps.Animation.DROP
            });
        }
        

        process_route_between_locations(driver_lat,driver_lng,driver_accept_ride_request_ui_states.p_lat,driver_accept_ride_request_ui_states.p_lng);


        map.setClickable(false);
        map.animateCamera({
            target: {lat: parseFloat(driver_accept_ride_request_ui_states.p_lat),lng: parseFloat(driver_accept_ride_request_ui_states.p_lng)},
            duration: 1000,
            }, function() {
                //alert("Camera target has been changed");
                map.setClickable(true);
                
        });

        processuistates();
        
        return;
    }else if(driver_accept_ride_request_ui_states.ui_state == 3){
        ride_ui_btn_sound.play();

        if(parseFloat(driver_accept_ride_request_ui_states.d_lat) && parseFloat(driver_accept_ride_request_ui_states.d_lng)){
            if(rider_dropoff_marker){
                if(rider_pickup_marker){
                    rider_pickup_marker.setVisible(false);
                }
                rider_dropoff_marker.setVisible(true);
                rider_dropoff_marker.setPosition({lat: parseFloat(driver_accept_ride_request_ui_states.d_lat),lng: parseFloat(driver_accept_ride_request_ui_states.d_lng)});
            }else{
                rider_dropoff_marker = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.d_lat),lng: parseFloat(driver_accept_ride_request_ui_states.d_lng)},
                    'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                    animation: plugin.google.maps.Animation.DROP
                });
            }
            
            process_route_between_locations(driver_lat,driver_lng,driver_accept_ride_request_ui_states.d_lat,driver_accept_ride_request_ui_states.d_lng);


            map.setClickable(false);
            map.animateCamera({
                target: {lat: parseFloat(driver_accept_ride_request_ui_states.d_lat),lng: parseFloat(driver_accept_ride_request_ui_states.d_lng)},
                duration: 1000,
                }, function() {
                    //alert("Camera target has been changed");
                    map.setClickable(true);
                    
            });
        }

        processuistates();


        old_time_seconds = 0;
        total_ride_seconds = (Date.now() / 1000 | 0) - driver_accept_ride_request_ui_states.ride_start_time;
        old_driver_position_lat = 0.0;
        old_driver_position_lng = 0.0;
        total_ride_distance = driver_accept_ride_request_ui_states.total_ride_distance * 1000;
        

        driver_accept_ride_request_ui_update_timer = setInterval(function(){
            save_progress_counter++;

            //process stop wait times if available

            let route_id = driver_accept_ride_request_ui_states.route_id;
            let route_cars = routetariffs.result[route_id].cars;
            let wait_time = 0;
            let wait_time_cost = 0.00;
            for(var key in route_cars){
                if(route_cars[key].id == driver_accept_ride_request_ui_states.ride_id){
                    wait_time = parseInt(route_cars[key].wait_time);
                    wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
                }
            }

            
            if(wait_time && driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 && driver_accept_ride_request_ui_states.drv_left_stop_time_1 == 0){
                $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                $("#wait-stop-time-info").html(__('Free waiting time') + " <b>--:--</b>");       

                    
                let current_local_timestamp = Date.now() / 1000 | 0;    
                let elapsed_time = current_local_timestamp - driver_accept_ride_request_ui_states.drv_arrived_stop_time_1;
                if(elapsed_time < 0){
                    elapsed_time = 0;
                }


                let wait_time_left = (wait_time * 60) - elapsed_time;

                let display_time = Math.abs(wait_time_left);            

                //convert to minute and seconds
                let seconds_time = display_time % 60;
                let minute_time = Math.floor(display_time / 60);

                let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
                let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

                if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                    $("#wait-stop-time-info-container").css('background-color','black');
                    $("#wait-stop-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }else{
                    $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                    $("#wait-stop-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }

                let ride_panel_height = Math.ceil($('#ride-control-panel').outerHeight(true)) - 18;

                $("#wait-stop-time-info-container").css('bottom', `${ride_panel_height}px`);           

            }else if(wait_time && driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 && driver_accept_ride_request_ui_states.drv_left_stop_time_2 == 0){
                $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                $("#wait-stop-time-info").html(__('Free waiting time') + " <b>--:--</b>");       

                    
                let current_local_timestamp = Date.now() / 1000 | 0;    
                let elapsed_time = current_local_timestamp - driver_accept_ride_request_ui_states.drv_arrived_stop_time_2;
                if(elapsed_time < 0){
                    elapsed_time = 0;
                }


                let wait_time_left = (wait_time * 60) - elapsed_time;

                let display_time = Math.abs(wait_time_left);            

                //convert to minute and seconds
                let seconds_time = display_time % 60;
                let minute_time = Math.floor(display_time / 60);

                let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
                let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

                if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                    $("#wait-stop-time-info-container").css('background-color','black');
                    $("#wait-stop-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }else{
                    $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                    $("#wait-stop-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }

                let ride_panel_height = Math.ceil($('#ride-control-panel').outerHeight(true)) - 18;

                $("#wait-stop-time-info-container").css('bottom', `${ride_panel_height}px`);

            }

            //compute elapsed time since ride started
            if(old_time_seconds == 0){
                old_time_seconds = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP
            }else{
                var current_time = Date.now() / 1000 | 0;
                var seconds_elapsed = current_time - old_time_seconds;
                total_ride_seconds += seconds_elapsed;
                old_time_seconds = current_time; 

                var _hours = Math.floor(total_ride_seconds / 3600);
                var _minutes = Math.floor((total_ride_seconds % 3600) / 60);
                var _seconds = (total_ride_seconds % 3600) % 60;

                var ride_duration = '';
                if(_hours){
                    ride_duration += _hours + 'Hr ';
                }

                if(_minutes){
                    ride_duration += _minutes + 'Min ';
                }

                
                ride_duration += _seconds + 'Secs';
                
                driver_accept_ride_request_ui_states.total_ride_time = total_ride_seconds;
                driver_accept_ride_request_ui_states.total_ride_time_formated = ride_duration;
                $('#ride-stats-time').html(ride_duration);

            }



            //compute distance travelled
        
            if(driver_accept_ride_request_ui_states.drv_last_pos_time == 0){
                driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP
                driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
            }else{

                var current_drv_pos_time = Date.now() / 1000 | 0;
                var drv_pos_time_elapsed = current_drv_pos_time - driver_accept_ride_request_ui_states.drv_last_pos_time;
                

                if(driver_accept_ride_request_ui_states.drv_last_pos_lat == 0 || driver_accept_ride_request_ui_states.drv_last_pos_lng == 0){
                    driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                    driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
                    driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP

                }else{                    



                    let old_driver_pos = {'lat':driver_accept_ride_request_ui_states.drv_last_pos_lat,'lng':driver_accept_ride_request_ui_states.drv_last_pos_lng};
                    let current_pos = {'lat':driver_bg_lat,'lng':driver_bg_lng};

                    let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(old_driver_pos, current_pos); //distance in meters

                    if(isNaN(distance)){
                        distance = 0;
                    }


                    if(distance != 0){

                        //check the distance traveled this time is within realistic limits. Assuming a maximum average travel speed of 100Km/h = 27.77m/s
                        let velocity = distance / drv_pos_time_elapsed;
                        const MAX_VELOCITY = 41.667;
    
                        if(velocity < MAX_VELOCITY){
    
                            total_ride_distance += distance;
                            driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                            driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
                            driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //update last driver distance position update time 
    
                            //update other auxilliary trips distance.
    
                            for(var key in pending_booking_data){
                                pending_booking_data[key]['distance'] += distance;
                            }
    
                        }else{
                            distance = 0;
                        }



                    }

                    
                    var total_ride_distance_km = total_ride_distance / 1000;
                    total_ride_distance_km = Math.round(total_ride_distance_km * 100) / 100;
                    driver_accept_ride_request_ui_states.total_ride_distance = total_ride_distance_km;
                    driver_accept_ride_request_ui_states.total_ride_distance_formated = total_ride_distance_km + 'KM'

                    if(routetariffs.result[userprofileinfo.city_id].cars[0].dist_unit == 0){ //kilometer
                        $('#ride-stats-dist').html(total_ride_distance_km + 'km');
                    }else{//miles  
                        let total_ride_dist_mi = total_ride_distance / 1609.344;  
                        total_ride_dist_mi = Math.round(total_ride_dist_mi * 100) / 100;        
                        $('#ride-stats-dist').html(total_ride_dist_mi + 'mi');
                    }
                }

            }
            

            if(save_progress_counter > 5){
                save_progress_counter = 0;
                localStorage.setObject(`pbk-${driver_accept_ride_request_ui_states.booking_id}`,driver_accept_ride_request_ui_states);

                //update distance traveled value of other auxilliary bookings

                for (var key in localStorage) {

                    let booking_key = key.substr(0,4);
            
                    if(booking_key == "pbk-"){
                        let booking_id = key.substr(4);
                        if(booking_id == driver_accept_ride_request_ui_states.booking_id)continue; //skip the active booking
                        let aux_booking_item = localStorage.getObject(key);
                        if(aux_booking_item.ui_state != 3)continue; //skip if the trip hasn't been started yet for this aux booking
                        let pend_book_dist = 0;
                        if(pending_booking_data.hasOwnProperty(key)){
                            pend_book_dist = pending_booking_data[key]['distance'];
                        }
                        let distance_km = Math.round((pend_book_dist / 1000) * 100) / 100;
                        aux_booking_item.total_ride_distance += distance_km;
                        aux_booking_item.total_ride_distance_formated = aux_booking_item.total_ride_distance + 'KM';
                        localStorage.setObject(`pbk-${aux_booking_item.booking_id}`,aux_booking_item);                            

                    }
                    
                }

            }



        },1000)

        
    }else{
        processuistates();
    }



}

  
function processuistates(){
    if(driver_accept_ride_request_ui_states.ui_state == 0){
        return;
    }else if(driver_accept_ride_request_ui_states.ui_state == 1){
        //first state of the driver UI for just accepted ride request

        $('#status-msg-rider-photo').attr('src',driver_accept_ride_request_ui_states.rider_image);
        $('#status-msg-rider-firstname').html(driver_accept_ride_request_ui_states.rider_firstname);
        $('#status-msg-rider-rating').attr('src','img/rating-'+ driver_accept_ride_request_ui_states.rider_rating +'.png')
        $('#status-msg-pickup-ind').show();
        $('#status-msg-dropoff-ind').hide();
        $('#status-msg-stop-ind').hide();
        $('#status-msg-address').html(driver_accept_ride_request_ui_states.p_addr);
        $('#status-msg-call-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-sms-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-locate-rider').data('plat',driver_accept_ride_request_ui_states.p_lat);
        $('#status-msg-locate-rider').data('plng',driver_accept_ride_request_ui_states.p_lng);
        $('#status-msg-locate-rider').data('pickdrop',0); //sets to 0 for pickup and 1 for dropoff 
        $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.p_lat);
        $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.p_lng);
        $('#status-msg-nav-rider').data('pickdrop',0); //sets to 0 for pickup and 1 for dropoff 
        $('#ride-stats').hide();
        $('#driver-stats-panel').hide();
        $('#banner-items-container').hide();
        //$('#ride-action-btn').css('width','65%');
        $('#ride-action-btn').css('background-color','#2979ff');
        $('#ride-action-btn').html(__("I've Arrived"));
        $('#ride-action-btn').data('state',1); //state for "i've arrived" action
        $('#ride-cancel-btn').data('bookid',driver_accept_ride_request_ui_states.booking_id);
        $('#status-msg-chat-rider').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#chat-msg-send-btn').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#ride-cancel-btn').show();        
        $("#wait-stop-time-info-container").hide();  
        $("#wait-time-info-container").hide();  

        //render waypoint markers
        /* if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != ''){
            if(markerds1){
                
                markerds1.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint1_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint1_long
                                                                
                });
            }else{
                markerds1 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint1_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint1_long)},
                    'icon' : 'img/waypoint.png',
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds1._isReady = true;    
                
            }
        }else{
            if(markerds1){
                markerds1.remove(); 
                markerds1 = null;
            }
        }



        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(markerds2){
                markerds2.setDisableAutoPan(true);
                markerds2.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint2_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint2_long
                                                                
                });
            }else{
                markerds2 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint2_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint2_long)},
                    'icon' : 'img/waypoint.png',
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds2._isReady = true;   
               
            }
        }else{
            if(markerds2){
                markerds2.remove(); 
                markerds2 = null;
            }
        } */
        
        $("#menubtn").css("visibility","hidden");
        $("#menubtn").css("z-index","10");
        $("#nointernet").css("opacity","0");
        $("#driver-available-btn").css("visibility","hidden");
        $('#available-status-text-container').css("visibility","hidden");

        $('#driver-online-indicator').fadeOut();

        //$('#status-msg-container').css('top','10px');
        /* $('#status-msg-container').removeClass('status-container-hide status-container-show').addClass('status-container-show');
        $("#statusmsg").css("visibility","visible");
        $("#statusmsg").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("bounceIn animated");
            $("#statusmsg").css("z-index","50");
        }) */
    
            
        $("#ride-control-panel").css("visibility","visible");
        $("#nav-btn-container").show();
        $("#ride-control-panel").removeClass("zoomInLeft animated").addClass("zoomInLeft animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("zoomInLeft animated");
            
        })
        
    
        

    }else if(driver_accept_ride_request_ui_states.ui_state == 2){
        //second state of the driver UI for Pickup

        //process wait time
        let route_id = driver_accept_ride_request_ui_states.route_id;
        let route_cars = routetariffs.result[route_id].cars;
        let wait_time = 0;
        let wait_time_cost = 0.00;
        for(var key in route_cars){
            if(route_cars[key].id == driver_accept_ride_request_ui_states.ride_id){
                wait_time = parseInt(route_cars[key].wait_time);
                wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
            }
        }

        clearInterval(wait_timer_handle);

        if(wait_time && driver_accept_ride_request_ui_states.drv_start_trip_time == 0){
            $("#wait-time-info-container").css('background-color','#4CAF50');
            $("#wait-time-info").html(__('Free waiting time') + " <b>--:--</b>");
            
            wait_timer_handle = setInterval(function(){

                
                let current_local_timestamp = Date.now();
                current_local_timestamp += server_client_time_diff; //sync with server time
                current_local_timestamp = current_local_timestamp / 1000 | 0;       
                let elapsed_time = current_local_timestamp - driver_accept_ride_request_ui_states.drv_arrived_time;
                if(elapsed_time < 0){
                    elapsed_time = 0;
                }


                let wait_time_left = (wait_time * 60) - elapsed_time;

                let display_time = Math.abs(wait_time_left);

                

                //convert to minute and seconds
                let seconds_time = display_time % 60;
                let minute_time = Math.floor(display_time / 60);

                let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
                let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

                if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                    $("#wait-time-info-container").css('background-color','black');
                    $("#wait-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }else{
                    $("#wait-time-info-container").css('background-color','#4CAF50');
                    $("#wait-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
                }

                let ride_panel_height = Math.ceil($('#ride-control-panel').outerHeight(true)) - 18;

                $("#wait-time-info-container").css('bottom', `${ride_panel_height}px`);

                
            },1000);

        }else{
            $("#wait-time-info-container").hide();
        }

        if(wait_time && driver_accept_ride_request_ui_states.drv_start_trip_time == 0){
            $("#wait-time-info-container").show();
        }

        $('#status-msg-rider-photo').attr('src',driver_accept_ride_request_ui_states.rider_image);
        $('#status-msg-rider-firstname').html(driver_accept_ride_request_ui_states.rider_firstname);
        $('#status-msg-rider-rating').attr('src','img/rating-'+ driver_accept_ride_request_ui_states.rider_rating +'.png')
        $('#status-msg-pickup-ind').show();
        $('#status-msg-dropoff-ind').hide();
        $('#status-msg-stop-ind').hide();
        $('#status-msg-address').html(driver_accept_ride_request_ui_states.p_addr);
        $('#status-msg-call-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-sms-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-locate-rider').data('plat',driver_accept_ride_request_ui_states.p_lat);
        $('#status-msg-locate-rider').data('plng',driver_accept_ride_request_ui_states.p_lng);
        $('#status-msg-locate-rider').data('pickdrop',0); //sets to 0 for pickup and 1 for dropoff 
        $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.p_lat);
        $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.p_lng);
        $('#status-msg-chat-rider').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#chat-msg-send-btn').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#status-msg-nav-rider').data('pickdrop',0); //sets to 0 for pickup and 1 for dropoff 
        //$('#ride-stats').fadeIn();
        $('#ride-stats').hide();
        $('#driver-stats-panel').hide();
        $('#banner-items-container').hide();
        //$('#ride-action-btn').css('width','65%');
        $('#ride-action-btn').css('background-color','#2ac32d');
        $('#ride-action-btn').html(__("Pick Up"));
        $('#ride-action-btn').data('state',2); //state for "pick up / start ride" action
        $('#ride-cancel-btn').data('bookid',driver_accept_ride_request_ui_states.booking_id);
        $('#ride-cancel-btn').show();
        
        //render waypoint markers
        /* if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != ''){
            if(markerds1){
                
                markerds1.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint1_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint1_long
                                                                
                });
            }else{
                markerds1 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint1_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint1_long)},
                    'icon' : 'img/waypoint.png',
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds1._isReady = true;    
                
            }
        }else{
            if(markerds1){
                markerds1.remove(); 
                markerds1 = null;
            }
        }



        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(markerds2){
                markerds2.setDisableAutoPan(true);
                markerds2.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint2_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint2_long
                                                                
                });
            }else{
                markerds2 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint2_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint2_long)},
                    'icon' : 'img/waypoint.png',
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds2._isReady = true;   
               
            }
        }else{
            if(markerds2){
                markerds2.remove(); 
                markerds2 = null;
            }
        } */

        
        $("#menubtn").css("visibility","hidden");
        $("#menubtn").css("z-index","10");
        $("#nointernet").css("opacity","0");

        $("#driver-available-btn").css("visibility","hidden");
        $('#available-status-text-container').css("visibility","hidden");

        $('#driver-online-indicator').fadeOut();

        //$('#status-msg-container').css('top','10px');
        /* $('#status-msg-container').removeClass('status-container-hide status-container-show').addClass('status-container-show');
        $("#statusmsg").css("visibility","visible"); */
        /* $("#statusmsg").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("bounceIn animated");
            $("#statusmsg").css("z-index","50");
        }) */
    
            
        $("#ride-control-panel").css("visibility","visible");
        $("#nav-btn-container").show();
        /* $("#ride-control-panel").removeClass("zoomInLeft animated").addClass("zoomInLeft animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("zoomInLeft animated");
            
        }) */        
    
        

    }else if(driver_accept_ride_request_ui_states.ui_state == 3){

        //third state of the driver UI for drop-off
        clearInterval(wait_timer_handle);
        $("#wait-time-info-container").hide();
        $('#status-msg-rider-photo').attr('src',driver_accept_ride_request_ui_states.rider_image);
        $('#status-msg-rider-firstname').html(driver_accept_ride_request_ui_states.rider_firstname);
        $('#status-msg-rider-rating').attr('src','img/rating-'+ driver_accept_ride_request_ui_states.rider_rating +'.png')
        $('#status-msg-pickup-ind').hide();
        $('#status-msg-dropoff-ind').show();
        $('#status-msg-stop-ind').hide();
        $('#status-msg-address').html(driver_accept_ride_request_ui_states.d_addr ? driver_accept_ride_request_ui_states.d_addr : __('Destination not specified'));
        $('#status-msg-call-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-sms-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-locate-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
        $('#status-msg-locate-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
        $('#status-msg-locate-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 
        $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
        $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
        $('#status-msg-chat-rider').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#chat-msg-send-btn').data('bookingid', driver_accept_ride_request_ui_states.booking_id);
        $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 
        $('#ride-stats').show();
        $('#driver-stats-panel').hide();
        $('#banner-items-container').hide();
        $('#ride-cancel-btn').data('bookid',driver_accept_ride_request_ui_states.booking_id);
        //$('#ride-cancel-btn').show();
        $('#ride-action-btn').css('width','100%');
        $('#ride-action-btn').css('background-color','#ff9800');
        $('#ride-action-btn').html(__("Drop Off"));
        $('#ride-action-btn').data('state',3); //state for "pick up / start ride" action
        $("#wait-stop-time-info-container").hide();

        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != '' && driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(!driver_accept_ride_request_ui_states.confirm_stop1 && !driver_accept_ride_request_ui_states.confirm_stop2){
                $('#ride-action-btn').css('background-color','#6200EA');
                $('#ride-action-btn').html(__("Confirm Stop 1"));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.waypoint1_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.waypoint1_long);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 

                $('#status-msg-dropoff-ind').hide();
                $('#status-msg-stop-ind').show();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.waypoint1_address);
                $("#wait-stop-time-info-container").hide();

                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_1){
                    //driver has indicated that he has arrived stop 1
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Go to next stop"));
                    $("#wait-stop-time-info-container").show();
                }

            }else if(driver_accept_ride_request_ui_states.confirm_stop1 && !driver_accept_ride_request_ui_states.confirm_stop2){
                $('#ride-action-btn').css('background-color','#6200EA');
                $('#ride-action-btn').html(__("Confirm Stop 2"));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.waypoint2_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.waypoint2_long);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff

                $('#status-msg-dropoff-ind').hide();
                $('#status-msg-stop-ind').show();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.waypoint2_address);


                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_2){
                    //driver has indicated that he has arrived stop 2
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                }
            }
            //two stops
        }else if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != ''){
            if(!driver_accept_ride_request_ui_states.confirm_stop1){
                //waypoint1 stop
                $('#ride-action-btn').css('background-color','#6200EA');
                $('#ride-action-btn').html(__("Confirm Stop"));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.waypoint1_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.waypoint1_long);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff

                $('#status-msg-dropoff-ind').hide();
                $('#status-msg-stop-ind').show();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.waypoint1_address);


                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_1){
                    //driver has indicated that he has arrived stop 1
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                }
            }
        }else if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(!driver_accept_ride_request_ui_states.confirm_stop2){
                $('#ride-action-btn').css('background-color','#6200EA');
                $('#ride-action-btn').html(__("Confirm Stop"));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.waypoint2_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.waypoint2_long);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff

                $('#status-msg-dropoff-ind').hide();
                $('#status-msg-stop-ind').show();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.waypoint2_address);
                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_2){
                    //driver has indicated that he has arrived stop 2
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                }
            }
        }
        
        //render waypoint markers
        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != ''){
            if(markerds1){
                markerds1.setVisible(true);                
                markerds1.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint1_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint1_long
                                                                
                });
            }else{
                markerds1 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint1_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint1_long)},
                    'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds1._isReady = true;    
                
            }
        }else{
            if(markerds1){
                markerds1.setVisible(false); 
            }
        }



        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(markerds2){
                markerds2.setVisible(true);
                markerds2.setDisableAutoPan(true);
                markerds2.setPosition({
                    lat:driver_accept_ride_request_ui_states.waypoint2_lat,
                    lng: driver_accept_ride_request_ui_states.waypoint2_long
                                                                
                });
            }else{
                markerds2 = map.addMarker({
                    'position':{lat: parseFloat(driver_accept_ride_request_ui_states.waypoint2_lat),lng: parseFloat(driver_accept_ride_request_ui_states.waypoint2_long)},
                    'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                    animation: plugin.google.maps.Animation.DROP
                });
    
                markerds2._isReady = true;   
               
            }
        }else{
            if(markerds2){
                markerds2.setVisible(false);
            }
        }




        
        $("#menubtn").css("visibility","hidden");
        $("#menubtn").css("z-index","10");
        $("#nointernet").css("opacity","0");
        $("#driver-available-btn").css("visibility","hidden");
        $('#available-status-text-container').css("visibility","hidden");
        $('#driver-online-indicator').fadeOut();

        //$('#status-msg-container').css('top','10px');
        /* $('#status-msg-container').removeClass('status-container-hide status-container-show').addClass('status-container-show');
        $("#statusmsg").css("visibility","visible");
        $("#statusmsg").removeClass("bounce animated").addClass("bounce animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("bounce animated");
            $("#statusmsg").css("z-index","50");
        }) */
    
            
        $("#ride-control-panel").css("visibility","visible");
        $("#nav-btn-container").show();
        /* $("#ride-control-panel").removeClass("zoomInLeft animated").addClass("zoomInLeft animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("zoomInLeft animated");
            
        }) */        
    
        

    }else if(driver_accept_ride_request_ui_states.ui_state == 4){
        //fourth state of the driver UI. clean up and display the rating view
        /* $('#status-msg-rider-photo').attr('src',driver_accept_ride_request_ui_states.rider_image);
        $('#status-msg-rider-firstname').html(driver_accept_ride_request_ui_states.rider_firstname);
        $('#status-msg-rider-rating').attr('src','img/rating-'+ driver_accept_ride_request_ui_states.rider_rating +'.png')
        $('#status-msg-pickup-ind').show();
        $('#status-msg-dropoff-ind').hide();
        $('#status-msg-stop-ind').hide();
        $('#status-msg-address').html(driver_accept_ride_request_ui_states.d_addr);
        $('#status-msg-call-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-sms-rider').data('number',driver_accept_ride_request_ui_states.rider_phone);
        $('#status-msg-locate-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
        $('#status-msg-locate-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
        $('#status-msg-locate-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 
        $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
        $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
        $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 
        $('#ride-stats').show();
        $('#ride-cancel-btn').hide();
        $('#ride-action-btn').css('width','100%');
        $('#ride-action-btn').css('background-color','#ff9800');
        $('#ride-action-btn').html("Drop Off");
        $('#ride-action-btn').data('state',3); //state for "pick up / start ride" action */
        
        
       
        //$('#ride-cancel-btn').hide();
        //$('#status-msg-container').css('top','10px');
        /* $('#status-msg-container').removeClass('status-container-hide status-container-show').addClass('status-container-show');
        $("#statusmsg").css("visibility","visible");
        $("#statusmsg").removeClass("fadeOutUp animated").addClass("fadeOutUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("fadeOutUp animated");
            $("#statusmsg").css("z-index","5");
            $("#statusmsg").css("visibility","hidden");
            $("#menubtn").css("z-index","100");
            $("#menubtn").css("visibility","visible");
            $("#nointernet").css("opacity","1");
            $("#driver-available-btn").css("visibility","visible");
            $('#driver-online-indicator').fadeIn();
            //$('#status-msg-container').css('top','-1000px');
            $('#status-msg-container').removeClass('status-container-hide status-container-show').addClass('status-container-hide');

        }) */    
            
        clearInterval(wait_timer_handle);
        $("#wait-time-info-container").hide();  
        $("#wait-stop-time-info-container").hide();  
        $("#ride-control-panel").css("visibility","visible");
        $("#nav-btn-container").hide();
        $('#ride-stats').hide();
        clearMapItemsSelectively();
        getuserlocation();

        $("#ride-control-panel").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("fadeOutDown animated");
            $("#ride-control-panel").css("visibility","hidden");
            $("#menubtn").css("z-index","100");
            $("#menubtn").css("visibility","visible");
            $("#nointernet").css("opacity","1");
            $("#driver-available-btn").css("visibility","visible");
            $('#available-status-text-container').css("visibility","visible");
            $('#driver-online-indicator').fadeIn();
            document.querySelector('#myNavigator').pushPage('html/ride-complete.html',{animation:'fade',data:{'comp_data':driver_accept_ride_request_ui_states}});
            $('#driver-stats-panel').show();
            $("#driver-stats-panel").removeClass("slideInUp animated").addClass("slideInUp animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#banner-items-container').fadeIn();
                $(this).removeClass("slideInUp animated");
            })
        })         
    
        

    }



}



async function processactionbtn(){
    
    var btn_state = $('#ride-action-btn').data('state'); 

    if(btn_state == 1){ //process "i've arrived" action button function
        driverarrived(driver_accept_ride_request_ui_states.booking_id);
        
    }else if(btn_state == 2){ //process "pick up / start ride" action button function

        if(app_settings.ride_otp == 1){
            showCompCodeInput(function(comp_code){
                if(comp_code != driver_accept_ride_request_ui_states.completion_code){
                    ons.notification.alert(__("Invalid OTP code"),{'title':""});
                    return;
                }
                driver_before_startride();
            })
            return;
        } 

        driver_before_startride();      
        
    }else if(btn_state == 3){ //process "drop off / end ride" action button function
        if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != '' && driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(!driver_accept_ride_request_ui_states.confirm_stop1 && !driver_accept_ride_request_ui_states.confirm_stop2){
                
                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 == 0){
                    //driver has indicated that he has arrived stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"arrived_stop_1"); //arrived stop 1
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 = Date.now() / 1000 | 0;
                    $("#wait-stop-time-info-container").show();
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Go to next stop"));
                    ride_ui_btn_sound.play();
                    return;
                }else if(driver_accept_ride_request_ui_states.drv_left_stop_time_1 == 0){
                    //driver has indicated that he has left stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"left_stop_1"); //left stop 1
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_left_stop_time_1 = Date.now() / 1000 | 0;                    
                    
                }

                driver_accept_ride_request_ui_states.confirm_stop1 = 1;
                ride_ui_btn_sound.play();
                $('#status-msg-dropoff-ind').hide();
                $('#status-msg-stop-ind').show();
                $("#wait-stop-time-info-container").hide();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.waypoint2_address);
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.waypoint2_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.waypoint2_long);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff 


                $('#ride-action-btn').css('background-color','#6200EA');
                $('#ride-action-btn').html(__("Confirm Stop 2"));
                return;

            }else if(driver_accept_ride_request_ui_states.confirm_stop1 && !driver_accept_ride_request_ui_states.confirm_stop2){


                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 == 0){
                    //driver has indicated that he has arrived stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"arrived_stop_2"); //arrived stop 2
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 = Date.now() / 1000 | 0;
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                    ride_ui_btn_sound.play();
                    return;
                }else if(driver_accept_ride_request_ui_states.drv_left_stop_time_2 == 0){
                    //driver has indicated that he has left stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"left_stop_2"); //left stop 2
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_left_stop_time_2 = Date.now() / 1000 | 0;
                    
                }

                ride_ui_btn_sound.play();

                $("#wait-stop-time-info-container").hide();
                $('#ride-action-btn').css('background-color','#ff9800');
                $('#ride-action-btn').html(__("Drop Off"));
                $('#status-msg-dropoff-ind').show();
                $('#status-msg-stop-ind').hide();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.d_addr ? driver_accept_ride_request_ui_states.d_addr : __('Destination not specified'));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff
                driver_accept_ride_request_ui_states.confirm_stop2 = 1;
                return;
            }
            //two stops
        }else if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint1_address') && driver_accept_ride_request_ui_states.waypoint1_address != ''){
            //waypoint1 stop
            if(!driver_accept_ride_request_ui_states.confirm_stop1){

                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 == 0){
                    //driver has indicated that he has arrived stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"arrived_stop_1"); //arrived stop 1
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 = Date.now() / 1000 | 0;
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                    ride_ui_btn_sound.play();
                    return;
                }else if(driver_accept_ride_request_ui_states.drv_left_stop_time_1 == 0){
                    //driver has indicated that he has left stop 1
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"left_stop_1"); //left stop 1
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_left_stop_time_1 = Date.now() / 1000 | 0;
                    //notify_customer_ontrip_continue();
                }
                
                ride_ui_btn_sound.play();
                $("#wait-stop-time-info-container").hide();
                $('#ride-action-btn').css('background-color','#ff9800');
                $('#ride-action-btn').html(__("Drop Off"));
                $('#status-msg-dropoff-ind').show();
                $('#status-msg-stop-ind').hide();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.d_addr ? driver_accept_ride_request_ui_states.d_addr : __('Destination not specified'));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff
                driver_accept_ride_request_ui_states.confirm_stop1 = 1;
                return;
            }
            
        }else if(driver_accept_ride_request_ui_states.hasOwnProperty('waypoint2_address') && driver_accept_ride_request_ui_states.waypoint2_address != ''){
            if(!driver_accept_ride_request_ui_states.confirm_stop2){ 

                if(driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 == 0){
                    //driver has indicated that he has arrived stop 2
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"arrived_stop_2"); //arrived stop 2
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 = Date.now() / 1000 | 0;
                    $('#ride-action-btn').css('background-color','#2ac32d');
                    $('#ride-action-btn').html(__("Continue the trip"));
                    $("#wait-stop-time-info-container").show();
                    ride_ui_btn_sound.play();
                    return;
                }else if(driver_accept_ride_request_ui_states.drv_left_stop_time_2 == 0){
                    //driver has indicated that he has left stop 2
                    let resp = await notifyCustomerStopStatus(driver_accept_ride_request_ui_states.booking_id,"left_stop_2"); //left stop 1
                    if(resp.hasOwnProperty('error')){
                        ons.notification.alert(resp.message,{title:""});
                        return;
                    }
                    driver_accept_ride_request_ui_states.drv_left_stop_time_2 = Date.now() / 1000 | 0;
                    
                }  

                ride_ui_btn_sound.play();
                $("#wait-stop-time-info-container").hide();
                $('#status-msg-dropoff-ind').show();
                $('#status-msg-stop-ind').hide();
                $('#status-msg-address').html(driver_accept_ride_request_ui_states.d_addr ? driver_accept_ride_request_ui_states.d_addr : __('Destination not specified'));
                $('#ride-action-btn').css('background-color','#ff9800');
                $('#ride-action-btn').html(__("Drop Off"));
                //set the navigation button to point to waypoint 1 destination
                $('#status-msg-nav-rider').data('plat',driver_accept_ride_request_ui_states.d_lat);
                $('#status-msg-nav-rider').data('plng',driver_accept_ride_request_ui_states.d_lng);
                $('#status-msg-nav-rider').data('pickdrop',1); //sets to 0 for pickup and 1 for dropoff
                driver_accept_ride_request_ui_states.confirm_stop2 = 1;
                return;
            }
        }
        
        showCompletedTripVerify(function(){
            if(app_settings.ride_otp == 2){ //if otp request enabled on server
                showCompCodeInput(function(comp_code){
                    if(comp_code != driver_accept_ride_request_ui_states.completion_code){
                        ons.notification.alert(__("Invalid OTP code"),{'title':""});
                        return;
                    }
                    driver_before_completed();
                })
                return;
            }

            driver_before_completed();
            
        });      
        
        
        

    }


}


function showCompletedTripVerify(callback){
    document.querySelector('#completedtripverify').show();

    $('#completedtripverify-yes').off('click').on('click', function(){
        document.querySelector('#completedtripverify').hide();
        callback();     
    });

    $('#completedtripverify-no').off('click').on('click', function(){
        document.querySelector('#completedtripverify').hide();
    });

}


function showCompCodeInput(callback){
    let code_inp_str = "";
    document.querySelector('#compcodeinputdlg').show();
    initCompCodeInput(function(code){
        code_inp_str = code;
        if(code.length == 4){          
            $('#compcodeinputdlg-continue').prop('disabled', false);          
        }else{
          $('#compcodeinputdlg-continue').prop('disabled', true);
        }
    })

    $('#compcodeinputdlg-continue').off('click').on('click', function(){
        callback(code_inp_str);
        document.querySelector('#compcodeinputdlg').hide();
    })
}


function driver_before_startride(){

    clearInterval(driver_accept_ride_request_ui_update_timer);

    old_time_seconds = 0;    
    total_ride_seconds = 0;
    old_driver_position_lat = 0.0;
    old_driver_position_lng = 0.0;
    total_ride_distance = 0;   
    
    
    driver_accept_ride_request_ui_update_timer = setInterval(function(){
        save_progress_counter++;

        //process stop wait times if available

        let route_id = driver_accept_ride_request_ui_states.route_id;
        let route_cars = routetariffs.result[route_id].cars;
        let wait_time = 0;
        let wait_time_cost = 0.00;
        for(var key in route_cars){
            if(route_cars[key].id == driver_accept_ride_request_ui_states.ride_id){
                wait_time = parseInt(route_cars[key].wait_time);
                wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
            }
        }

        
        if(wait_time && driver_accept_ride_request_ui_states.drv_arrived_stop_time_1 && driver_accept_ride_request_ui_states.drv_left_stop_time_1 == 0){
            $("#wait-stop-time-info-container").css('background-color','#4CAF50');
            $("#wait-stop-time-info").html(__('Free waiting time') + " <b>--:--</b>");       

                
            let current_local_timestamp = Date.now() / 1000 | 0;    
            let elapsed_time = current_local_timestamp - driver_accept_ride_request_ui_states.drv_arrived_stop_time_1;
            if(elapsed_time < 0){
                elapsed_time = 0;
            }


            let wait_time_left = (wait_time * 60) - elapsed_time;

            let display_time = Math.abs(wait_time_left);            

            //convert to minute and seconds
            let seconds_time = display_time % 60;
            let minute_time = Math.floor(display_time / 60);

            let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
            let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

            if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                $("#wait-stop-time-info-container").css('background-color','black');
                $("#wait-stop-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }else{
                $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                $("#wait-stop-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }

            let ride_panel_height = Math.ceil($('#ride-control-panel').outerHeight(true)) - 18;

            $("#wait-stop-time-info-container").css('bottom', `${ride_panel_height}px`);           

        }else if(wait_time && driver_accept_ride_request_ui_states.drv_arrived_stop_time_2 && driver_accept_ride_request_ui_states.drv_left_stop_time_2 == 0){
            $("#wait-stop-time-info-container").css('background-color','#4CAF50');
            $("#wait-stop-time-info").html(__('Free waiting time') + " <b>--:--</b>");       

                
            let current_local_timestamp = Date.now() / 1000 | 0;    
            let elapsed_time = current_local_timestamp - driver_accept_ride_request_ui_states.drv_arrived_stop_time_2;
            if(elapsed_time < 0){
                elapsed_time = 0;
            }


            let wait_time_left = (wait_time * 60) - elapsed_time;

            let display_time = Math.abs(wait_time_left);            

            //convert to minute and seconds
            let seconds_time = display_time % 60;
            let minute_time = Math.floor(display_time / 60);

            let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
            let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

            if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                $("#wait-stop-time-info-container").css('background-color','black');
                $("#wait-stop-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }else{
                $("#wait-stop-time-info-container").css('background-color','#4CAF50');
                $("#wait-stop-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }

            let ride_panel_height = Math.ceil($('#ride-control-panel').outerHeight(true)) - 18;

            $("#wait-stop-time-info-container").css('bottom', `${ride_panel_height}px`);

        }



        //compute elapsed time since ride started
        if(old_time_seconds == 0){
            old_time_seconds = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP
        }else{
            var current_time = Date.now() / 1000 | 0;
            var seconds_elapsed = current_time - old_time_seconds;
            total_ride_seconds += seconds_elapsed;
            old_time_seconds = current_time;

            var _hours = Math.floor(total_ride_seconds / 3600);
            var _minutes = Math.floor((total_ride_seconds % 3600) / 60);
            var _seconds = (total_ride_seconds % 3600) % 60;

            var ride_duration = '';
            if(_hours){
                ride_duration += _hours + 'Hr ';
            }

            if(_minutes){
                ride_duration += _minutes + 'Min ';
            }

            
            ride_duration += _seconds + 'Secs';
            
            driver_accept_ride_request_ui_states.total_ride_time = total_ride_seconds;
            driver_accept_ride_request_ui_states.total_ride_time_formated = ride_duration;
            $('#ride-stats-time').html(ride_duration);

        }



        //compute distance travelled
        
        if(driver_accept_ride_request_ui_states.drv_last_pos_time == 0){
            driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP
            driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
            driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
        }else{

            var current_drv_pos_time = Date.now() / 1000 | 0;
            var drv_pos_time_elapsed = current_drv_pos_time - driver_accept_ride_request_ui_states.drv_last_pos_time;
            

            if(driver_accept_ride_request_ui_states.drv_last_pos_lat == 0 || driver_accept_ride_request_ui_states.drv_last_pos_lng == 0){
                driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
                driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //get the number of seconds TIMESTAMP
            }else{

                



                let old_driver_pos = {'lat':driver_accept_ride_request_ui_states.drv_last_pos_lat,'lng':driver_accept_ride_request_ui_states.drv_last_pos_lng};
                let current_pos = {'lat':driver_bg_lat,'lng':driver_bg_lng};

                let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(old_driver_pos, current_pos); //distance in meters

                if(isNaN(distance)){
                    distance = 0;
                }



                if(distance != 0){

                    //check the distance traveled this time is within realistic limits. Assuming a maximum average travel speed of 150Km/h = 41.667m/s
                    let velocity = distance / drv_pos_time_elapsed;
                    const MAX_VELOCITY = 41.667;

                    if(velocity < MAX_VELOCITY){

                        total_ride_distance += distance;
                        driver_accept_ride_request_ui_states.drv_last_pos_lat = driver_bg_lat;
                        driver_accept_ride_request_ui_states.drv_last_pos_lng = driver_bg_lng;
                        driver_accept_ride_request_ui_states.drv_last_pos_time = Date.now() / 1000 | 0; //update last driver distance position update time 

                        //update other auxilliary trips distance.

                        for(var key in pending_booking_data){
                            pending_booking_data[key]['distance'] += distance;
                        }

                    }else{
                        distance = 0;
                    }



                } 

                
                var total_ride_distance_km = total_ride_distance / 1000;
                total_ride_distance_km = Math.round(total_ride_distance_km * 100) / 100;
                driver_accept_ride_request_ui_states.total_ride_distance = total_ride_distance_km;
                driver_accept_ride_request_ui_states.total_ride_distance_formated = total_ride_distance_km + 'KM'

                if(routetariffs.result[userprofileinfo.city_id].cars[0].dist_unit == 0){ //kilometer
                    $('#ride-stats-dist').html(total_ride_distance_km + 'km');
                }else{//miles  
                    let total_ride_dist_mi = total_ride_distance / 1609.344;  
                    total_ride_dist_mi = Math.round(total_ride_dist_mi * 100) / 100;        
                    $('#ride-stats-dist').html(total_ride_dist_mi + 'mi');
                }
            }

        }
        

        if(save_progress_counter > 5){
            save_progress_counter = 0;
            localStorage.setObject(`pbk-${driver_accept_ride_request_ui_states.booking_id}`,driver_accept_ride_request_ui_states);

            //update distance traveled value of other auxilliary bookings

            for (var key in localStorage) {

                let booking_key = key.substr(0,4);
        
                if(booking_key == "pbk-"){
                    let booking_id = key.substr(4);
                    if(booking_id == driver_accept_ride_request_ui_states.booking_id)continue; //skip the active booking
                    let aux_booking_item = localStorage.getObject(key);
                    if(aux_booking_item.ui_state != 3)continue; //skip if the trip hasn't been started yet for this aux booking
                    let pend_book_dist = 0;
                    if(pending_booking_data.hasOwnProperty(key)){
                        pend_book_dist = pending_booking_data[key]['distance'];
                    }
                    let distance_km = Math.round((pend_book_dist / 1000) * 100) / 100;
                    aux_booking_item.total_ride_distance += distance_km;
                    aux_booking_item.total_ride_distance_formated = aux_booking_item.total_ride_distance + 'KM';
                    localStorage.setObject(`pbk-${aux_booking_item.booking_id}`,aux_booking_item);                            

                }
                
            }

        }


    },1000)

    startride(driver_accept_ride_request_ui_states.booking_id)
}


async function driver_before_completed(){

    clearInterval(driver_accept_ride_request_ui_update_timer);
    old_time_seconds = 0;
    total_ride_seconds = 0;
    old_driver_position_lat = 0.0;
    old_driver_position_lng = 0.0;
    total_ride_distance = 0;

    let current_location_coords = await getCurrentLocationbg();
    

    driver_bg_lat = current_location_coords.lat;
    driver_bg_lng = current_location_coords.lng;

    //fix total ride distance

    let driver_trip_start_pos = {'lat':driver_accept_ride_request_ui_states.drv_start_ride_pos_lat,'lng': driver_accept_ride_request_ui_states.drv_start_ride_pos_lng};
    let driver_current_pos = {'lat':driver_bg_lat,'lng':driver_bg_lng};  
    
    //get a haversine distance from initial driver trip start location and the driver current position
    let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(driver_trip_start_pos, driver_current_pos); //distance in meters


    /* if(parseFloat(driver_accept_ride_request_ui_states.total_ride_distance) > 100.0){
        driver_accept_ride_request_ui_states.total_ride_distance = 100.0; //cap at 100km
    } */

    // check if the haversine distance is greater than the trip meter calculated distance.

    if(driver_accept_ride_request_ui_states.drv_start_ride_pos_lat != 0 && driver_accept_ride_request_ui_states.drv_start_ride_pos_lng != 0 && !driver_accept_ride_request_ui_states.waypoint1_address && !driver_accept_ride_request_ui_states.waypoint2_address){

        if(distance > parseFloat(driver_accept_ride_request_ui_states.total_ride_distance) * 1000){
            //use the haversine computed distance
            
            var distance_km = distance / 1000;

            distance_km = Math.round(distance_km * 100) / 100;
            driver_accept_ride_request_ui_states.total_ride_distance = distance_km; //in km        
        }

    }



    //compute ride fare 
    
    
    if((driver_ride_tariff.cfare_enabled == 1 || driver_accept_ride_request_ui_states.service_mode == 1)  && driver_accept_ride_request_ui_states.route_scope == 0){ //if computed fare is enabled, only allow it for intercity trips. Ignore for interstate trips

        var matched_zones_fare = matchZoneFare(driver_accept_ride_request_ui_states.route_id);                
        
        var current_dt = new Date(driver_accept_ride_request_ui_states.ride_start_time * 1000);
        var c_year = current_dt.getFullYear();
        var c_month = current_dt.getMonth() + 1;
        var c_day = current_dt.getDate();
        var c_day_week = current_dt.getDay();
        var c_hours = current_dt.getHours();
        var c_min = current_dt.getMinutes();

        var ride_fare_cost;
        let route_id = driver_accept_ride_request_ui_states.route_id;
        let route_cars = routetariffs.result[route_id].cars;
        
        for(var key in route_cars){
            if(route_cars[key].id == driver_accept_ride_request_ui_states.ride_id){
                route_ride_tariff = route_cars[key];
            }
        } 

        //compute base ride fare based on night or day
        if(c_hours >= userprofileinfo.night_start || c_hours <= userprofileinfo.night_end){

            //Night time
            ride_fare_cost = parseFloat(route_ride_tariff.npickup_cost) + parseFloat(route_ride_tariff.ndrop_off_cost) + (parseFloat(route_ride_tariff.ncost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60)) + (parseFloat(route_ride_tariff.ncost_per_km) * parseFloat(driver_accept_ride_request_ui_states.total_ride_distance));           

            if(parseFloat(route_ride_tariff.init_distance_n)){

                if(parseFloat(route_ride_tariff.init_distance_n) >= driver_accept_ride_request_ui_states.total_ride_distance){
                    //ride_fare_cost = parseFloat(route_ride_tariff.npickup_cost) + parseFloat(route_ride_tariff.ndrop_off_cost) + (parseFloat(route_ride_tariff.ncost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60));           
                    ride_fare_cost = parseFloat(route_ride_tariff.npickup_cost) + parseFloat(route_ride_tariff.ndrop_off_cost);           
                }else{
                    ride_fare_cost = parseFloat(route_ride_tariff.npickup_cost) + parseFloat(route_ride_tariff.ndrop_off_cost);
                    ride_fare_cost += (parseFloat(route_ride_tariff.ncost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60)) + (parseFloat(route_ride_tariff.ncost_per_km) * (parseFloat(driver_accept_ride_request_ui_states.total_ride_distance) - parseFloat(route_ride_tariff.init_distance_n)));           
                }
                
            }

            //quick ride mode
            if(driver_accept_ride_request_ui_states.service_mode == 1){
                if(parseInt(driver_accept_ride_request_ui_states.hourly_rate_hours)){
                    ride_fare_cost = parseFloat(route_ride_tariff.nhr_cph);
                }                 
            }

        }else{

            ride_fare_cost = parseFloat(route_ride_tariff.pickup_cost) + parseFloat(route_ride_tariff.drop_off_cost) + (parseFloat(route_ride_tariff.cost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60)) + (parseFloat(route_ride_tariff.cost_per_km) * parseFloat(driver_accept_ride_request_ui_states.total_ride_distance));           
            if(parseFloat(route_ride_tariff.init_distance)){

                if(parseFloat(route_ride_tariff.init_distance) >= driver_accept_ride_request_ui_states.total_ride_distance){
                    //ride_fare_cost = parseFloat(route_ride_tariff.pickup_cost) + parseFloat(route_ride_tariff.drop_off_cost) + (parseFloat(route_ride_tariff.cost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60));           
                    ride_fare_cost = parseFloat(route_ride_tariff.pickup_cost) + parseFloat(route_ride_tariff.drop_off_cost);           
                }else{
                    ride_fare_cost = parseFloat(route_ride_tariff.pickup_cost) + parseFloat(route_ride_tariff.drop_off_cost);
                    ride_fare_cost += (parseFloat(route_ride_tariff.cost_per_minute) * parseFloat(driver_accept_ride_request_ui_states.total_ride_time / 60)) + (parseFloat(route_ride_tariff.cost_per_km) * (parseFloat(driver_accept_ride_request_ui_states.total_ride_distance) - parseFloat(route_ride_tariff.init_distance)));           
                }
                
            }

            if(driver_accept_ride_request_ui_states.service_mode == 1){
                if(parseInt(driver_accept_ride_request_ui_states.hourly_rate_hours)){
                    ride_fare_cost = parseFloat(route_ride_tariff.hr_cph);
                }                 
            }

        }



        //compute fare as a result of zone surge price

        if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1')){

            if(matched_zones_fare.fare_type1 == 1){
                ride_fare_cost *= parseFloat(matched_zones_fare.fare_value1);
            }else if(matched_zones_fare.fare_type1 == 2){
                ride_fare_cost += parseFloat(matched_zones_fare.fare_value1);
            }

            if(matched_zones_fare.fare_type2 == 1){
                ride_fare_cost *= parseFloat(matched_zones_fare.fare_value2);
            }else if(matched_zones_fare.fare_type2 == 2){
                ride_fare_cost += parseFloat(matched_zones_fare.fare_value2);
            }
            
        }        

        


        //compute peak period
        if(route_ride_tariff.pp_enabled == 1){ //check if peak period charge is enabled for this car
            var ride_peak_period_days;
            try{
                ride_peak_period_days = JSON.parse(route_ride_tariff.pp_active_days);
            }catch(e){
                console.log('json parse error.');
            }
                

            if(typeof ride_peak_period_days == 'object'){
            for(var i = 0;i < ride_peak_period_days.length;i++){

                if(ride_peak_period_days[i] == c_day_week || ride_peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                    //day of the week is part of peak period days
                    
                    if(c_hours >= route_ride_tariff.pp_start && c_hours <= route_ride_tariff.pp_end){
                    //peak period, compute booking cost
                    //peak_period = 1;
                    if(route_ride_tariff.pp_charge_type == 1){
                        ride_fare_cost = ride_fare_cost * parseFloat(route_ride_tariff.pp_charge_value);
                    }else{
                        ride_fare_cost = ride_fare_cost + parseFloat(route_ride_tariff.pp_charge_value);
                    }                     
                    
                    }
                    break;
                }


            }
            } 
        }

        ride_fare_cost = Math.round(ride_fare_cost * 100) / 100;
        ride_fare_cost = ride_fare_cost.toFixed(2);

        var ride_estimated_fare = parseFloat(driver_accept_ride_request_ui_states.fare);
        var ride_estimated_fare_threshold = ride_estimated_fare - (50 * ride_estimated_fare / 100);

        ride_fare_cost = roundFare(Math.round(ride_fare_cost * 100) / 100);

        driver_accept_ride_request_ui_states.fare = ride_fare_cost;
        driver_accept_ride_request_ui_states.paid_amount = ride_fare_cost;        

    }else{
        driver_accept_ride_request_ui_states.fare = roundFare(Math.round(driver_accept_ride_request_ui_states.fare * 100) / 100);
        driver_accept_ride_request_ui_states.paid_amount = roundFare(Math.round(driver_accept_ride_request_ui_states.paid_amount * 100) / 100);  
    }

    //compute wait time and costs

    let route_id = driver_accept_ride_request_ui_states.route_id;
    let route_cars = routetariffs.result[route_id].cars;
    let wait_time = 0;
    let wait_time_cost = 0.00;
    
    for(var key in route_cars){
        if(route_cars[key].id == driver_accept_ride_request_ui_states.ride_id){
            wait_time = parseInt(route_cars[key].wait_time);
            wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
        }
    }


    if(wait_time){ //wait time is enabled. compute wait times
        
        //calculate wait time cost between when driver arrived pickup location and when the trip started

        let driver_arrived_wait_time_elapsed = (parseInt(driver_accept_ride_request_ui_states.drv_start_trip_time) - parseInt(driver_accept_ride_request_ui_states.drv_arrived_time))/60;
        let driver_arrived_billed_wait_time = (driver_arrived_wait_time_elapsed - wait_time) < 0 ? 0 : driver_arrived_wait_time_elapsed - wait_time;
        let driver_arrived_wait_time_cost = driver_arrived_billed_wait_time * wait_time_cost;


        //calculate wait time at stops
        let driver_arrived_stop1_wait_time_elapsed = 0;
        let driver_arrived_stop1_billed_wait_time = 0;
        let driver_arrived_stop1_wait_time_cost = 0;

        if(driver_accept_ride_request_ui_states.waypoint1_address){
            driver_arrived_stop1_wait_time_elapsed = (parseInt(driver_accept_ride_request_ui_states.drv_left_stop_time_1) - parseInt(driver_accept_ride_request_ui_states.drv_arrived_stop_time_1))/60;
            driver_arrived_stop1_billed_wait_time = (driver_arrived_stop1_wait_time_elapsed - wait_time) < 0 ? 0 : driver_arrived_stop1_wait_time_elapsed - wait_time;
            driver_arrived_stop1_wait_time_cost = driver_arrived_stop1_billed_wait_time * wait_time_cost;
        }

        let driver_arrived_stop2_wait_time_elapsed = 0;
        let driver_arrived_stop2_billed_wait_time = 0;
        let driver_arrived_stop2_wait_time_cost = 0;


        if(driver_accept_ride_request_ui_states.waypoint2_address){
            driver_arrived_stop2_wait_time_elapsed = (parseInt(driver_accept_ride_request_ui_states.drv_left_stop_time_2) - parseInt(driver_accept_ride_request_ui_states.drv_arrived_stop_time_2))/60;
            driver_arrived_stop2_billed_wait_time = (driver_arrived_stop2_wait_time_elapsed - wait_time) < 0 ? 0 : driver_arrived_stop2_wait_time_elapsed - wait_time;
            driver_arrived_stop2_wait_time_cost = driver_arrived_stop2_billed_wait_time * wait_time_cost;
        }


        let total_billed_wait_time = driver_arrived_billed_wait_time + driver_arrived_stop1_billed_wait_time + driver_arrived_stop2_billed_wait_time;
        let total_billed_wait_time_cost = driver_arrived_wait_time_cost + driver_arrived_stop1_wait_time_cost + driver_arrived_stop2_wait_time_cost;

        driver_accept_ride_request_ui_states.total_wait_time = total_billed_wait_time * 60; //convert to seconds
        driver_accept_ride_request_ui_states.total_wait_time_cost = total_billed_wait_time_cost;


        //add wait time cost to fare

        driver_accept_ride_request_ui_states.fare += total_billed_wait_time_cost;
        driver_accept_ride_request_ui_states.paid_amount += total_billed_wait_time_cost;

        driver_accept_ride_request_ui_states.fare = roundFare(driver_accept_ride_request_ui_states.fare);
        driver_accept_ride_request_ui_states.paid_amount = roundFare(driver_accept_ride_request_ui_states.paid_amount);

            
    }



    //compute referal discount if enabled for this booking
    if(driver_accept_ride_request_ui_states.referral_used == 1){
        let referral_discount_amount = driver_accept_ride_request_ui_states.fare * (driver_accept_ride_request_ui_states.referral_discount_value / 100);
        driver_accept_ride_request_ui_states.paid_amount = driver_accept_ride_request_ui_states.fare - referral_discount_amount;
        
    }

    //compute coupon discount
    if(driver_accept_ride_request_ui_states.coupon_code && parseFloat(driver_accept_ride_request_ui_states.paid_amount) >= parseFloat(driver_accept_ride_request_ui_states.coupon_min_fare)){
        if(driver_accept_ride_request_ui_states.coupon_discount_type == 1){ //fixed coupon discount
            let coupon_discount_amount = (driver_accept_ride_request_ui_states.paid_amount - driver_accept_ride_request_ui_states.coupon_discount_value) < 0 ? 0 : driver_accept_ride_request_ui_states.paid_amount - driver_accept_ride_request_ui_states.coupon_discount_value;
            driver_accept_ride_request_ui_states.paid_amount = coupon_discount_amount;
        }else{//percentage coupon discount
            let coupon_discount_amount = driver_accept_ride_request_ui_states.paid_amount * (driver_accept_ride_request_ui_states.coupon_discount_value / 100);
            if(driver_accept_ride_request_ui_states.coupon_max_discount && coupon_discount_amount > driver_accept_ride_request_ui_states.coupon_max_discount)coupon_discount_amount = driver_accept_ride_request_ui_states.coupon_max_discount;
            driver_accept_ride_request_ui_states.paid_amount = driver_accept_ride_request_ui_states.paid_amount - coupon_discount_amount;
            
        }
    }else{
        //do not use discount if conditions are not met
        driver_accept_ride_request_ui_states.coupon_code = "";
        driver_accept_ride_request_ui_states.coupon_discount_value = 0;

    }     

    
    //quick ride mode - Hourly rates: After computing the first 1 hour fare with matched zone, 
    // peak periods, and wait time additions to get the base first hour fare. 
    // Get the number of hours selected by the customer compare with actual trip time. If greater then, compute extra fare.

    if(driver_accept_ride_request_ui_states.service_mode == 1){
        if(parseInt(driver_accept_ride_request_ui_states.hourly_rate_hours)){

            let num_hours_requested = parseInt(driver_accept_ride_request_ui_states.hourly_rate_hours);
            let num_secs_requested = num_hours_requested * 3600; //convert the requested number of hours to seconds
            let hourly_rate_cost_per_seconds = 0;
            let extra_time = 0;
            let extra_cost = 0.00;

            if(c_hours >= userprofileinfo.night_start || c_hours <= userprofileinfo.night_end){ 
                //night
                hourly_rate_cost_per_seconds = parseFloat(route_ride_tariff.nhr_cph) / 3600;
            }else{
                //day
                hourly_rate_cost_per_seconds = parseFloat(route_ride_tariff.hr_cph) / 3600;
            }

            
            if(driver_accept_ride_request_ui_states.total_ride_time > num_secs_requested){

                extra_time = driver_accept_ride_request_ui_states.total_ride_time - num_secs_requested;
                extra_cost = hourly_rate_cost_per_seconds * extra_time;

                let hourly_cps_req_time_minus_base = num_secs_requested - 3600;
                let hourly_cps_req_time_minus_base_cost = hourly_cps_req_time_minus_base * hourly_rate_cost_per_seconds;
                extra_cost = extra_cost + hourly_cps_req_time_minus_base_cost;

            }else{
                let hourly_cps_req_time_minus_base = num_secs_requested - 3600;
                let hourly_cps_req_time_minus_base_cost = hourly_cps_req_time_minus_base * hourly_rate_cost_per_seconds;
                extra_cost = extra_cost + hourly_cps_req_time_minus_base_cost;   
            }

            driver_accept_ride_request_ui_states.fare = num_secs_requested * hourly_rate_cost_per_seconds;            
            driver_accept_ride_request_ui_states.paid_amount = roundFare(driver_accept_ride_request_ui_states.paid_amount + extra_cost);

        }

    }

    driver_accept_ride_request_ui_states.paid_amount = roundFare(Math.round(driver_accept_ride_request_ui_states.paid_amount * 100) / 100);
    
    drivercompleted(driver_accept_ride_request_ui_states.booking_id,driver_accept_ride_request_ui_states.completion_code);

}


function readImgFile(input, callback) {
    if (input.target.files && input.target.files[0]) {
        var imgPath = input.target.files[0].name;
        var imgSize = input.target.files[0].size;
        
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        var result = {data:'',error:1,error_msg:''};
        if(imgSize > 10485760){
            //filesize greater than 10MB
            result.error_msg = 'File size must not be greater than 10MB';
            callback(result);
            return;
        }
        loading.show();

        if (extn == "jpg" || extn == "jpeg") {
           if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();			
                reader.onload = function (e) {
                    /* jQuery('#passport')
                        .attr('src', e.target.result)
                        .width(150)
                        .height('auto'); */
                    
                    //resize image to fixed width
                    var img = document.createElement("img");
                    img.onload = function(event) {
                        var MAX_WIDTH = 800;
                        var MAX_HEIGHT = 1600;

                        var width = img.width;
                        var height = img.height;
                        
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height = height * (MAX_WIDTH / width);
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width = width * (MAX_HEIGHT / height);
                                height = MAX_HEIGHT;
                            }
                        }

                        var canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        result.data = canvas.toDataURL("image/jpeg");
                        //console.log(result.data);
                        result.error = 0;
                        loading.hide();
                        callback(result);
                    }
                    img.src = e.target.result;     
                    
                                
                        
                };

                reader.readAsDataURL(input.target.files[0]);
            }

        }else{
            loading.hide();
            result.error_msg = __('Invalid file type. Only JPG files are allowed');
            callback(result);
        }
    }
}



// Get geo coordinates

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position){
        driver_lat = position.coords.latitude;
        driver_lng = position.coords.longitude;
    },function(){
        return;
    },{ maximumAge: 10000, timeout: 10000, enableHighAccuracy: false });
}


function getCurrentLocationbg() {
    let res = new Promise(function(resolve,reject){

                        BackgroundGeolocation.getCurrentLocation(function(location){
                            
                            //console.log(location);                                    
                            driver_lat = location.latitude;
                            driver_lng = location.longitude;

                            let result = {'success' : 1, lat: location.latitude, lng: location.longitude};

                            resolve(result);
                            
                            

                            }, function(){
                                //error
                                let result = {'error' : 1, lat: driver_lat, lng: driver_lng};
                                resolve(result); 
                                
                        }, {});

                    });
    return res;
        
        
}



function loadLang(callback){

    let lang = localStorage.getObject('lang');
        
    if(lang){
        selected_lang = lang;
    }

    let el = document.createElement('script');
    el.onload = function(){callback()};
    el.src = `js/lang/${selected_lang.code}.js`;
    document.head.appendChild(el);

}


function translateElements(suffix = ""){

    //Translate page html elements inner text
    let elements_to_traslate = document.querySelectorAll(`[data-i18n${suffix}]`);
    elements_to_traslate.forEach(function(el,indx){
        if(selected_lang.dir == 'rtl'){    
            el.setAttribute('dir','rtl');
        }else{
            el.setAttribute('dir','ltr');
        }
        let word_phrase = el.dataset['i18n' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase)){
            let trans_phrase = lang_phrases[word_phrase];
            el.innerText = trans_phrase;            
        }
    })

    //Translate page html elements placeholder text
    let elements_to_traslate_p = document.querySelectorAll(`[data-i18nn${suffix}]`);
    elements_to_traslate_p.forEach(function(el_p,indx){
        if(selected_lang.dir == 'rtl'){    
            el_p.setAttribute('dir','rtl');
            if(el_p.querySelector('span')){
                el_p.querySelector('span').style.left = 'auto';
                el_p.querySelector('span').style.right = '0';
            }
        }else{
            el_p.setAttribute('dir','ltr');
        }
        let word_phrase_p = el_p.dataset['i18nn' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase_p)){
            let trans_phrase_p = lang_phrases[word_phrase_p];
            el_p.setAttribute('placeholder',trans_phrase_p);            
        }
    })

    //Translate page Tab elements label text
    let elements_to_traslate_t = document.querySelectorAll(`[data-i18nt${suffix}]`);
    elements_to_traslate_t.forEach(function(el_t,indx){
        if(selected_lang.dir == 'rtl'){    
            el_t.setAttribute('dir','rtl');
        }else{
            el_t.setAttribute('dir','ltr');
        }
        let word_phrase_t = el_t.dataset['i18nt' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase_t)){
            let trans_phrase_t = lang_phrases[word_phrase_t];
            el_t.setAttribute('label',trans_phrase_t);            
        }
    })
}


function __(phrase,variables = []){

    if(lang_phrases.hasOwnProperty(phrase)){
        let translation = lang_phrases[phrase];
        if(translation.length){
            let regx = /\{\-\-\-[0-9]\}/g;
            let matches = translation.match(regx);
            if(variables.length && matches && matches.length == variables.length){                
                matches.forEach(function(val,indx){
                    var_indx = val.substr(4,1);
                    translation = translation.replace(val,variables[var_indx - 1]);
                })
            }
            return translation;
        }else{
            return phrase;
        }
    }else{
        return phrase;
    }
    
}




function countryListSelect(callback){
    
    document.querySelector('#countrylistdialog').show();
    $('#countrylistdialog').attr('title',__('Select your country')); 

        
    $('#countrylistdialog .default-country-items').off().on('click', function(){
        document.querySelector('#countrylistdialog').hide();
        let country = $(this).data('country');
        let country_code = $(this).data('countrycode');
        let country_dial_code = $(this).data('countrydialcode');
        callback({country:country,dial_code:country_dial_code,country_code:country_code});        
    })

    
}


function showCountryTel(){   

    if(app_settings.allowed_countries_list != ""){

        let allowed_countries_list_string = app_settings.allowed_countries_list;
        let allowed_countries_array = allowed_countries_list_string.split('|');
        if(typeof allowed_countries_array == 'object'){
            $('#countrylistdialog .default-country-items').hide();

            allowed_countries_array.forEach(function(val,indx){
                let country_code = val.trim();
                $(`#countrylistdialog .default-country-items[data-countrycode='${country_code}']`).show();           
            })
        }
        

    }

    countryListSelect(function(res){
        $('#country-flag').attr('class', 'iti__flag iti__' + res.country_code);
        $('#country-flag').data('country', res.country_code);
        $('#tel-code').html(' +' + res.dial_code);
        $('#tel-code').data('dialcode', res.dial_code);
        $('#tel-code').data('country', res.country_code);
    });
    
}



function init_fb_rtdb(config,user_id){


    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
    

    const db = firebase.database();

    
    const message_ref = db.ref(`Drivers/drvr-${user_id}/notf`);
    message_ref.on('value', (snapshot) => {

        
        const data = snapshot.val();
        if(data == null)return;
        if(!(data.hasOwnProperty('msg') && data.hasOwnProperty('msg_t')))return;

        let last_msg_time_id = localStorage.getItem('fb_last_recvd');

        
        if(data.msg_t == last_msg_time_id)return;

        localStorage.setItem('fb_last_recvd',data.msg_t);      
        
        let current_local_timestamp = Date.now();
        current_local_timestamp += server_client_time_diff; //sync with server time
        current_local_timestamp = current_local_timestamp / 1000 | 0; //get only the seconds part

        if((current_local_timestamp - 5) > data.msg_t)return; //skip old messages

        //console.log(data);
        //console.log(Date.now() / 1000 | 0);
        
        var message = data.msg;
        
        if(message.hasOwnProperty('booking_id') && message.hasOwnProperty('action')){

            if(!message.hasOwnProperty('repeatable') && message.action != "chat-message"){
                if(processed_notifications.hasOwnProperty(message.booking_id)){
                    var found = processed_notifications[message.booking_id].find(function(el){
                        
                        return el == message.action;
                        
                    });
                    if(found){

                        //console.log('processed');
                        let cur_time = Date.now() / 1000 | 0;
                        let notification_age = cur_time - processed_notifications_time[message.booking_id];
                        if(notification_age < 3){
                            return;
                        } 

                        //delete push notifications registered for this booking previously so as to allow new notifications when booking is re-allocated as a result of user retrying
                        if(message.action == "driver-allocate"){  

                            delete processed_notifications[message.booking_id];
                            delete processed_notifications_time[message.booking_id];
                        }

                    }else{
                        processed_notifications[message.booking_id].push(message.action);
                        //console.log('added');
                    }

                }else{
                    
                        processed_notifications[message.booking_id] = [message.action];
                        processed_notifications_time[message.booking_id] = Date.now() / 1000 | 0;
                    
                    
                    
                }
            }

            switch(message.action){
                case "driver-allocate":
                booking_allocate_notify(message);
                break;
                case "customer-cancelled":
                customer_cancelled_notify(message);
                break;
                case "chat-message":
                chat_msg_notify(message);
                break;
                
            }
        }



    });

}





  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    
}

function showmoreuserinfo(){

    booking_id = driver_accept_ride_request_ui_states.booking_id;    
    
    loading.show();  
    var post_data = {'action_get':'getpersoninfo', 'booking_id':booking_id};       
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
                ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                    });          
                    return;                
            }


            
            if(data_obj.hasOwnProperty('success')){
                $('#user-info-image-preload').attr('src', data_obj.photo);
                $('#user-info-rating').attr('src', "img/rating-" + data_obj.userdata.user_rating + ".png");
                $('#user-info-name').text(data_obj.userdata.firstname + " " + data_obj.userdata.lastname);
                $('#user-info-joined').text(data_obj.userdata.account_create_date);
                $('#user-info-completed').text(data_obj.userdata.completed_rides);
                $('#user-info-cancelled').text(data_obj.userdata.cancelled_rides);
                $('#user-info-comments').html(data_obj.comments);
                userInfoShow();
                //console.log(data_obj.person_data);
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


function getreferralsdata(){
    booking_id = driver_accept_ride_request_ui_states.booking_id;    
    
    loading.show();  
    var post_data = {'action_get':'getreferralsdata'};       
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
                ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                    });          
                    return;
                
            }


            
            if(data_obj.hasOwnProperty('success')){
                $('#referrals-content').html(data_obj.referrals_data);
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
function forgotPwdPhoneShow(){

    document.querySelector('#myNavigator').pushPage('pwdresetphone.html',
            {
            animation: 'fade'             
            }
    );
    

}



function forgotPwdPhone(){ 


    var country_call_code = $('#tel-code-pwd').data('dialcode');
    var country_2c = $('#country-flag-pwd').data('country');
    var phone_number = $('#pwd-rst-phone').val();
    
    if(phone_number == '' || phone_number.length < 5){
        ons.notification.alert(__("Phone number is invalid"),{title:""});
        return;
    }
    var post_data = {'action':'passwordResetPhone','phone_number':phone_number,'country_code':country_call_code};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
                
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                loading.hide();
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                loading.hide();
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){

                
                //send verification SMS
                cordova.plugins.firebase.auth.verifyPhoneNumber("+" + country_call_code + phone_number, 0).then(function(verificationId) {
                    
                    // pass verificationId to signInWithVerificationId
                    firebase_phone_auth_verificationid = verificationId;
                    loading.hide();
                    verifyphonepwd(country_2c,country_call_code,phone_number, data_obj.pwd); 
                    ons.notification.toast(__("Verification code sent..."),{
                        timeout: 2000
                    });
                }).catch(function(e){
                    loading.hide();
                    ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                    console.log(e);
                    return;
                });
                

            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });

    

    

}






function verifyOTPCodeFirebase(country_dial_code,phone_num_inp,phone_num,code,redirect,phone_formatted){    
    $('#verifyotpcodemsg').html('');
    loading.show();
    setTimeout(function(){
        cordova.plugins.firebase.auth.signInWithVerificationId(firebase_phone_auth_verificationid, code).then(function(){
            cordova.plugins.firebase.auth.getCurrentUser().then(function(userdetails){
                loading.hide();
                firebase_phone_number_verified = 1;
                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade', 
                        callback: function(){
                            user_login_options = {country_call_code: country_dial_code, phone : phone_num_inp, phone_formatted : phone_formatted, password : null, code : code, fb_user_details : userdetails};
                            if(redirect == 1){                                
                                login();
                            }else{

                                user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',rem_password:0,password:'',referral:'',fb_user_details:null,car_plate_num:'',car_model:'',car_year:'', car_type:0,car_reg_num:'',car_color:'',operation_city:0};
                                user_reg_data.country_dial_code = country_dial_code;
                                user_reg_data.phone = phone_num_inp;
                                user_reg_data.otp_code = code;
                                user_reg_data.fb_user_details = userdetails;

                                initUserSignUp();
                            }
                            
                        }   
                    }
                );
            }).catch(function(e){
                loading.hide();
                firebase_phone_number_verified = 0;
                $('#verifyotpcodemsg').html(__("Error verifying your phone number. Ensure your phone number and verification code sent to you are valid"));
                return;
            })
            
    
        }).catch(function(e){
            loading.hide();
            firebase_phone_number_verified = 0;
            $('#verifyotpcodemsg').html(__("Error verifying your phone number. Ensure your phone number and verification code sent to you are valid"));
            return;
            
        });
    },1000);    
    
}



function verifyOTPCode(country_dial_code,phone_num_inp,phone_num,code,redirect,phone_formatted){    
    //using server verfication with email
    var post_data = {'action':'verifyOTPCode','code':code,'phone':phone_num};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
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
                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade', 
                        callback: function(){
                            loading.hide();
                            user_login_options = {country_call_code: country_dial_code, phone : phone_num_inp, phone_formatted : phone_formatted, password : null, code : code, fb_user_details : null};
                            if(redirect == 1){                                
                                login();
                            }else{

                                user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',rem_password:0,password:'',referral:'',fb_user_details:null,car_plate_num:'',car_model:'',car_year:'', car_type:0,car_reg_num:'',car_color:'',operation_city:0};
                                user_reg_data.country_dial_code = country_dial_code;
                                user_reg_data.phone = phone_num_inp;
                                user_reg_data.otp_code = code;
                                user_reg_data.fb_user_details = null;

                                initUserSignUp();
                            }
                            
                        }   
                    }
                );
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
    

}



function initUserSignUp(){
    document.querySelector('#myNavigator').pushPage('signuppage1.html',
        {
            animation: 'fade'             
        }
    );
}



function roundFare(fare){

    if(!app_settings.hasOwnProperty('round_trip_fares')){
        return fare;
    }

    fare_conv = parseFloat(fare);

    if(fare_conv == 0)return 0;
    
    switch(app_settings.round_trip_fares){

        case 1: //no rounding;
        return fare_conv.toFixed(2);
        break;

        case 2: //nearest whole number
        return Math.round(fare_conv);
        break;

        case 3: //nearest 10
        let x = fare_conv % 10;
        if(x){
            fare_conv += 10 - x;
        }
        return Math.round(fare_conv);
        break;

        case 4: //nearest 50
        let y = fare_conv % 50;
        if(y){
            fare_conv += 50 - y;
        }
        return Math.round(fare_conv);
        break;


        case 5: //nearest 100
        let z = fare_conv % 100;
        if(z){
            fare_conv += 100 - z;
        }
        return Math.round(fare_conv);
        break;

        case 6: //nearest 250
        let a = fare_conv % 250;
        if(a){
            fare_conv += 250 - a;
        }
        return Math.round(fare_conv);
        break;

        default:
        return fare_conv.toFixed(2);    


        
    }


}




function animateDriversMarkers(){
    
    clearInterval(animate_drivers_markers_timer);

    animate_drivers_markers_timer = setInterval(function(){

        if(!map_visibility_status)return; //do not animate if map is hidden from view
        
        if(driver_marker_anim_obj.animate_pos){

            driver_marker_anim_obj.animation_fraction_pos += 0.01;

            let anim_marker_interpolate_pos_lat = (driver_marker_anim_obj.animation_fraction_pos * driver_marker_anim_obj.curposition.lat) + ((1 - driver_marker_anim_obj.animation_fraction_pos) * driver_marker_anim_obj.oldposition.lat);
            let anim_marker_interpolate_pos_lng = (driver_marker_anim_obj.animation_fraction_pos * driver_marker_anim_obj.curposition.lng) + ((1 - driver_marker_anim_obj.animation_fraction_pos) * driver_marker_anim_obj.oldposition.lng);
            
            driver_marker.setPosition({lat : anim_marker_interpolate_pos_lat, lng : anim_marker_interpolate_pos_lng});

            if(driver_marker_anim_obj.animation_fraction_pos >= 1){ //animation complete
                //disable position animation for this marker until new position data arrives
                driver_marker_anim_obj.animation_fraction_pos = 0;
                driver_marker_anim_obj.animate_pos = 0;
            }

        }


        if(driver_marker_anim_obj.animate_rot){

            driver_marker_anim_obj.animation_fraction_rot += 0.04;

            let anim_marker_interpolate_rot = (driver_marker_anim_obj.animation_fraction_rot * driver_marker_anim_obj.curbearing) + ((1 - driver_marker_anim_obj.animation_fraction_rot) * driver_marker_anim_obj.oldbearing);
            
            
            driver_marker.setRotation(anim_marker_interpolate_rot);

            if(driver_marker_anim_obj.animation_fraction_rot >= 1){ //animation complete
                //disable rotation animation for this marker until new bearing data arrives
                driver_marker_anim_obj.animation_fraction_rot = 0;
                driver_marker_anim_obj.animate_rot = 0;
            }

        }

        for(var key in city_drivers_markers){
            if(!city_drivers_markers[key].animate_pos && !city_drivers_markers[key].animate_rot)continue; //skip markers that havent been enabled for animation.
            
            //animate marker position
            if(city_drivers_markers[key].animate_pos){

                city_drivers_markers[key].animation_fraction_pos += 0.01;

                anim_marker_interpolate_pos_lat = (city_drivers_markers[key].animation_fraction_pos * city_drivers_markers[key].curposition.lat) + ((1 - city_drivers_markers[key].animation_fraction_pos) * city_drivers_markers[key].oldposition.lat);
                anim_marker_interpolate_pos_lng = (city_drivers_markers[key].animation_fraction_pos * city_drivers_markers[key].curposition.lng) + ((1 - city_drivers_markers[key].animation_fraction_pos) * city_drivers_markers[key].oldposition.lng);
                
                city_drivers_markers[key].marker.setPosition({lat : anim_marker_interpolate_pos_lat, lng : anim_marker_interpolate_pos_lng});

                if(city_drivers_markers[key].animation_fraction_pos >= 1){ //animation complete
                    //disable position animation for this marker until new position data arrives
                    city_drivers_markers[key].animation_fraction_pos = 0;
                    city_drivers_markers[key].animate_pos = 0;
                }


            }


            //animate marker rotation
            if(city_drivers_markers[key].animate_rot){

                city_drivers_markers[key].animation_fraction_rot += 0.04;

                anim_marker_interpolate_rot = (city_drivers_markers[key].animation_fraction_rot * city_drivers_markers[key].curbearing) + ((1 - city_drivers_markers[key].animation_fraction_rot) * city_drivers_markers[key].oldbearing);
                
                
                city_drivers_markers[key].marker.setRotation(anim_marker_interpolate_rot);

                if(city_drivers_markers[key].animation_fraction_rot >= 1){ //animation complete
                    //disable rotation animation for this marker until new bearing data arrives
                    city_drivers_markers[key].animation_fraction_rot = 0;
                    city_drivers_markers[key].animate_rot = 0;
                }


            }

        }

    },40);


}



function matchZoneFare(route_id){

    let matched_zone_data = {};
    let pickup_matched = {};
    let dropoff_matched = {};

    if(!(routetariffs.result.zones && routetariffs.result.zones[route_id]))return false;
    
    let city_zones = routetariffs.result.zones[route_id];
    

    for(var x = 0;x < city_zones.length;x++){

        let zone_data = routetariffs.result.zones[route_id][x];

        let zone_location_boundary_coords_json = zone_data.zone_bound_coords;       
               

        try{

            let zone_location_boundary_coords = JSON.parse(zone_location_boundary_coords_json.replace(/&quot;/g,'"'));            

            let pickup_location_in_zone_boundary = parseFloat(driver_accept_ride_request_ui_states.p_lat) && parseFloat(driver_accept_ride_request_ui_states.p_lng) ? plugin.google.maps.geometry.poly.containsLocation({lat:driver_accept_ride_request_ui_states.p_lat,lng:driver_accept_ride_request_ui_states.p_lng},zone_location_boundary_coords) : false;
            let dropoff_location_in_zone_boundary = parseFloat(driver_accept_ride_request_ui_states.d_lat) && parseFloat(driver_accept_ride_request_ui_states.d_lng) ? plugin.google.maps.geometry.poly.containsLocation({lat:driver_accept_ride_request_ui_states.d_lat,lng:driver_accept_ride_request_ui_states.d_lng},zone_location_boundary_coords) : false;

            if(pickup_location_in_zone_boundary && dropoff_location_in_zone_boundary){ //pickup and dropoff locations fall in the same zone
                console.log('match same');
                matched_zone_data = {'fare_type1' : zone_data.zone_fare_type, 'fare_value1' : zone_data.zone_fare_value,'fare_type2' : 0, 'fare_value2' : 0};
                console.log(matched_zone_data);
                return matched_zone_data;
            }

            if(pickup_location_in_zone_boundary && !pickup_matched.hasOwnProperty('found')){ //pickup location matched zone
                pickup_matched = {found:1,fare_type:zone_data.zone_fare_type,fare_value:zone_data.zone_fare_value};
            }


            if(dropoff_location_in_zone_boundary && !dropoff_matched.hasOwnProperty('found')){ //pickup location matched zone
                dropoff_matched = {found:1,fare_type:zone_data.zone_fare_type,fare_value:zone_data.zone_fare_value};
            }


        }catch(e){
            console.log('invalid boundary coords json');
        }

        
    }


    if(pickup_matched.hasOwnProperty('found') && dropoff_matched.hasOwnProperty('found')){
        //pickup and dropoff locations fall within different zones
        console.log('matched p, matched d');
        matched_zone_data = {'fare_type1' : pickup_matched.fare_type, 'fare_value1' : pickup_matched.fare_value,'fare_type2' : dropoff_matched.fare_type, 'fare_value2' : dropoff_matched.fare_value};
        console.log(matched_zone_data);
        return matched_zone_data;

    }else if(pickup_matched.hasOwnProperty('found')){

        console.log('matched p');
        matched_zone_data = {'fare_type1' : pickup_matched.fare_type, 'fare_value1' : pickup_matched.fare_value,'fare_type2' : 0, 'fare_value2' : 0};
        console.log(matched_zone_data);
        return matched_zone_data;

    }else if(dropoff_matched.hasOwnProperty('found')){

        console.log('matched d');
        matched_zone_data = {'fare_type1' : dropoff_matched.fare_type, 'fare_value1' : dropoff_matched.fare_value,'fare_type2' : 0, 'fare_value2' : 0};
        console.log(matched_zone_data);
        return matched_zone_data;

    }

    return false;
}



function clearMapItemsSelectively(type = 0){


          
    if(rider_dropoff_marker && rider_dropoff_marker.hasOwnProperty('hashCode')){
        rider_dropoff_marker.setVisible(false);
    }

    if(rider_pickup_marker && rider_pickup_marker.hasOwnProperty('hashCode')){
        rider_pickup_marker.setVisible(false);
    }


    if(markerds1 && markerds1.hasOwnProperty('hashCode')){
        markerds1.setVisible(false);
    }

    if(markerds2 && markerds2.hasOwnProperty('hashCode')){
        markerds2.setVisible(false);
    }


    if(route_polyline && route_polyline.hasOwnProperty('hashCode')){
        route_polyline.setVisible(false);
    }

    if(rider_pickup_marker && rider_pickup_marker.hasOwnProperty('hashCode')){
        rider_pickup_marker.setVisible(false);
    }

    if(rider_dropoff_marker && rider_dropoff_marker.hasOwnProperty('hashCode')){
        rider_dropoff_marker.setVisible(false);
    }



}



function getBearing(lat1,lng1,lat2,lng2){
    let pi;
    let dlon;
    let y;
    let x;
    let brng;

    pi = Math.PI;
    lat1 = lat1 * pi / 180;
    lng1 = lng1 * pi / 180;
    lat2 = lat2 * pi / 180;
    lng2 = lng2 * pi / 180;

    dlon = (lng2 - lng1);
    y = Math.sin(dlon) * Math.cos(lat2);
    x = Math.cos(lat1) * (Math.sin(lat2) - Math.sin(lat1)) * Math.cos(lat2) * Math.cos(dlon);
    brng = Math.atan2(y,x);
    brng = brng * 180 / pi; //radians to degrees
    brng = (brng + 360) % 360; //flip

    return brng;


}



function showEditProfile(){

    document.querySelector('#myNavigator').pushPage('html/editprofile.html',
            {
            animation: 'fade'             
            }
    );

}


async function resizeImg(img_data,res){ //resize image function. takes base64 image data and resizes it

    let img_resized = new Promise(function(resolve,reject){
        var img = document.createElement("img");
        img.onload = function(event) {
            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 1600;

            var width = img.width;
            var height = img.height;

            var dx = 0;
            var dy = 0;

            if(res){

                MAX_WIDTH = res.width;
                MAX_HEIGHT = res.height;

                if(width > height){
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }else{                    
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                    if(height > res.height){ //center image on y-axis
                        let diff = height - res.height;
                        diff = parseInt(diff / 2);
                        dy = diff * -1;
                    }
                }


                

            }else{

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = width * (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }

            }
            
            

            var canvas = document.createElement("canvas");
            if(res){
                canvas.width = res.width;
                canvas.height = res.height;
            }else{
                canvas.width = width;
                canvas.height = height;
            }
            
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, dx, dy, width, height);

            var res_img_data = canvas.toDataURL("image/jpeg");
            //console.log(result.data);
            
            resolve(res_img_data);

        }

        img.src = img_data;
    });

    return img_resized;
    
    
}



function saveProfile(){

    var user_firstname = $('#editfirstname').val();
    var user_lastname = $('#editlastname').val();

    if(!user_firstname){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(!user_lastname){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    loading.show();

    var post_data = {'action':'updateProfile','firstname' : user_firstname,'lastname' : user_lastname};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
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
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){

                userprofileinfo.firstname = user_firstname;
                userprofileinfo.lastname = user_lastname;

                $('#firstname').html(userprofileinfo.firstname);
                $('#lastname').html(userprofileinfo.lastname);

                ons.notification.alert(data_obj.success, {title:"",});
                
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
        }

    });




}


function initActionSheets(){
      
    ons.createElement('gpsenabedialog.html', { append: true });
    ons.createElement('customselectdlg.html', { append: true });    
    ons.createElement('activeridemenu.html', { append: true });
    ons.createElement('userinfodialog.html', { append: true });
    ons.createElement('chatwindowdialog.html', { append: true });
    ons.createElement('canceltripreasonsdlg.html', { append: true });
    ons.createElement('tripdetailsummary.html', { append: true });
    ons.createElement('completedtripverify.html', { append: true });
    ons.createElement('compcodeinputdlg.html', { append: true });
    ons.createElement('helptip.html', { append: true });
    ons.createElement('countrylistdialog.html', { append: true }).then(function(sheet){

        let country_dialcode_data_html = "";
        for(var key in country_dial_code_data){
        let country = country_dial_code_data[key].country;
        let country_dial_code = country_dial_code_data[key].dial_code;
        let country_code = country_dial_code_data[key].country_code;
        if(country_code){          
                
                country_dialcode_data_html += `<ons-list-item data-country="${country}" data-countrysearch="${country.toLowerCase()}" data-countrycode="${country_code}" data-countrydialcode="${country_dial_code}" tappable class="default-country-items" style="cursor: pointer;min-height: 70px;" >
                                                    <div class="left">
                                                        <div class="iti__flag iti__${country_code}" style="background-color: white;transform:scale(1.5)"></div>
                                                    </div>
                                                    <div class="center">
                                                        <span style="font-size: 16px;font-weight: 500;">${country}</span>
                                                    </div>
                                                    <div class="right">
                                                        <p style="font-size: 16px;">${"+" + country_dial_code}</p>
                                                    </div>
                                                </ons-list-item>`;
        }
        
        };

        country_dialcode_data_html = `<ons-list>${country_dialcode_data_html}</ons-list>`;
        $('#countrylistcontent').html(country_dialcode_data_html);

    });
    ons.createElement('imagepickrdlg.html', { append: true });
}


function imagePicker(callback,resolution = null){

    
    document.querySelector('#imagepickrdlg').show();
    $('#imagepickrdlg').attr('title',__('Select Image'));


    $('#cameraimgpick').off().on('click', function(){

        document.querySelector('#imagepickrdlg').hide();

        img_source_obj = { quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        navigator.camera.getPicture(function(imageData){ //success

            try {
                window.atob(imageData);
            } catch(e) {
                callback({'error' : 1,'img_data' :null});
                return;
            }

            (async () => {
                let res_img_data = await resizeImg("data:image/jpeg;base64," + imageData, resolution);
                callback({'success' : 1,'img_data' :res_img_data});
            })();
                
            
    
        }, function(message){ //failed
    
            
            callback({'error' : 1,'img_data' :null});
    
        }, img_source_obj)

    })


    $('#galleryimgpick').off().on('click', function(){

        document.querySelector('#imagepickrdlg').hide();

        img_source_obj = { quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        navigator.camera.getPicture(function(imageData){ //success

            try {
                window.atob(imageData);
            } catch(e) {
                callback({'error' : 1,'img_data' :null});
                return;
            }
                
            (async () => {
                let res_img_data = await resizeImg("data:image/jpeg;base64," + imageData, resolution);
                callback({'success' : 1,'img_data' :res_img_data});
            })();
    
        }, function(message){ //failed
    
            
            callback({'error' : 1,'img_data' :null});
    
        }, img_source_obj)

    })

    /* document.querySelector('#imagepickrdlg').addEventListener('prehide', function() {
        callback(image_data);
    }) */
    $('#imagepickrdlg').off().on('prehide',function() {
        callback({'closed' : 1,'img_data' :null});
    })

    
}


function showPwdLogin(){
    document.querySelector('#myNavigator').pushPage('html/loginpwd.html',
            {
                animation: 'fade'            
            }
    );
}



function customItemSelect(default_selected,title,callback){
    
    document.querySelector('#customselectdlg').show();
    $('#customselectdlg').attr('title',title); 


    if(default_selected){
        $('#customselectdlg .sel-list-item div[id^=list-item-sel-]').html('');
        $(`#customselectdlg .sel-list-item #list-item-sel-${default_selected}`).html("<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>");
    }
    
    $('#customselectdlg .sel-list-item').off().on('click', function(){
        document.querySelector('#customselectdlg').hide();
        let item_val = $(this).data('value');
        callback(item_val);
        
    })

    
}


async function updateUserPhoto(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;
        

        var current_image = $('#user-edit-photo-img-preview').attr('src');

        $('#user-edit-photo-img-preview').attr('src', image_data.img_data);

        loading.show();
          
          var post_data = {'action':'updateUserPhoto','photo':image_data.img_data};

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
                      
                      ons.notification.alert(data_obj.error,{title:""});
                  }

                  if(data_obj.hasOwnProperty('success')){

                    userprofileinfo.photo = data_obj.photo_url;
                    $('#driver-photo').attr('src',userprofileinfo.photo);
                      
                    ons.notification.toast(__("Profile photo updated"),{
                      timeout: 1000
                    });
                  }
                  

              },
              error: function(jqXHR,textStatus, errorThrown) {  
                  loading.hide();
                  ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                  });
              }

          });

    },{width:300,height:300});
}


function updateUserEmail(){
    
    var email = $("#editemailinput").val();

    var re = /\S+@\S+\.\S+/;

    if(!re.test(email)){
        $('#editemailvalidationmsg').show();
        $('#editemailvalidationmsg').html(__("Email is invalid"));
        return;
    }

    $('#editemail').off().on('change', function(){
        $('#editemailvalidationmsg').hide();
    })

    loading.show();
          
    var post_data = {'action':'verifyUserEmail','email':email};

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
                
                $('#editemailvalidationmsg').show();
                $('#editemailvalidationmsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                document.querySelector('#myNavigator').pushPage('html/verifyemail.html',{animation:'fade',data:{'email':email}});               
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });

}


function showEditEmail(){
    document.querySelector('#myNavigator').pushPage('html/editemail.html',
            {
            animation: 'fade'             
            }
    );
}



function initCodeInput(callback){

    let current_sel = 0;
    $('.code-input [id^=v-code-digit-]').each(function(index){

        $(this).attr('maxlength', 2);

        $(this).off('mousedown').on('mousedown', function(e){

            e.preventDefault();
            let character_entered = $(this).val();

            let elem_id = $(this).attr('id');
            let indx = elem_id.substring(elem_id.length - 1)
            current_sel = indx;
            $(`#v-code-digit-${current_sel} input`).focus();
            

            let re = /([^0-9])/g;

            if(re.test(character_entered)){ //charater thats not a number was entered
                $(this).val('');
                return;
            }
            

            if(character_entered.length > 1){
                let char1 = character_entered.charAt(0);
                let char2 = character_entered.charAt(1);
                $(this).val(char2);
                
            }

            $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);
            
            
        })

        $(this).off('keyup').on('keyup', function(e) {
            

            if ($(this).val() == '') {
                
                current_sel--;
                if(current_sel < 0)current_sel = 0;
                $(`#v-code-digit-${current_sel} input`).focus();
                $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);
                callback('');
                
            }else{

                let character_entered = $(this).val();

                let re = /([^0-9])/g;


                if(re.test(character_entered)){ //charater thats not a number was entered
                    $(this).val('');
                    return;
                }


                                
                current_sel++;
                if(current_sel > 5)current_sel = 5;
                $(`#v-code-digit-${current_sel} input`).focus();

                if(character_entered.length > 1){
                    let char1 = character_entered.charAt(0);
                    let char2 = character_entered.charAt(1);
                    $(this).val(char2);
                    
                }

                $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);

                
                code_complete = 1;
                code_entered = '';
                $('.code-input input').each(function(index){
                    let entered_num = $(this).val();                        
                    if(entered_num == '')code_complete = 0;
                    code_entered = code_entered + "" + entered_num;

                });

                callback(code_entered);
                

                
            }
        })
    });

    $(`#v-code-digit-0 input`).focus();

}


function initCompCodeInput(callback){

    let current_sel = 0;
    $('.comp-code-input [id^=c-code-digit-]').each(function(index){

        $(this).attr('maxlength', 2);

        $(this).val('');

        $(this).off('mousedown').on('mousedown', function(e){

            e.preventDefault();
            let character_entered = $(this).val();

            let elem_id = $(this).attr('id');
            let indx = elem_id.substring(elem_id.length - 1)
            current_sel = indx;
            $(`#c-code-digit-${current_sel} input`).focus();
            

            let re = /([^0-9])/g;

            if(re.test(character_entered)){ //charater thats not a number was entered
                $(this).val('');
                return;
            }
            

            if(character_entered.length > 1){
                let char1 = character_entered.charAt(0);
                let char2 = character_entered.charAt(1);
                $(this).val(char2);
                
            }

            $(`#c-code-digit-${current_sel} input`).prop('selectionEnd',1);
            
            
        })

        $(this).off('keyup').on('keyup', function(e) {
            

            if ($(this).val() == '') {
                
                current_sel--;
                if(current_sel < 0)current_sel = 0;
                $(`#c-code-digit-${current_sel} input`).focus();
                $(`#c-code-digit-${current_sel} input`).prop('selectionEnd',1);
                callback('');
                
            }else{

                let character_entered = $(this).val();

                let re = /([^0-9])/g;


                if(re.test(character_entered)){ //charater thats not a number was entered
                    $(this).val('');
                    return;
                }


                                
                current_sel++;
                if(current_sel > 3)current_sel = 3;
                $(`#c-code-digit-${current_sel} input`).focus();

                if(character_entered.length > 1){
                    let char1 = character_entered.charAt(0);
                    let char2 = character_entered.charAt(1);
                    $(this).val(char2);
                    
                }

                $(`#c-code-digit-${current_sel} input`).prop('selectionEnd',1);

                
                code_complete = 1;
                code_entered = '';
                $('.comp-code-input input').each(function(index){
                    let entered_num = $(this).val();                        
                    if(entered_num == '')code_complete = 0;
                    code_entered = code_entered + "" + entered_num;

                });

                callback(code_entered);
                

                
            }
        })
    });

    $(`#c-code-digit-0 input`).focus();

}


function saveUserEmail(code = ''){
    if(code.length != 6)return;

    loading.show();
          
    var post_data = {'action':'saveUserEmail','code':code};

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
                
                $('#verifyemailcodemsg').show();
                $('#verifyemailcodemsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                userprofileinfo.email = data_obj.email;
                document.querySelector('#myNavigator').popPage({times:2,animation: 'fade', callback : function(){
                    ons.notification.toast(__("Your email has been updated"),{
                        timeout: 1000
                    });
                }});
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });


}


function showEditPassword(){
    document.querySelector('#myNavigator').pushPage('html/editpwd.html',
            {
            animation: 'fade'             
            }
    );
} 



function updateUserPWD(){

    let pwd_inp_1 = $('#editpwdnew').val();
    let pwd_inp_2 = $('#editpwdconfirm').val();

    if(pwd_inp_1 == '' || pwd_inp_2 == '' || pwd_inp_1 !== pwd_inp_2){
        ons.notification.alert(__("Passwords do not match"),{title:""});
        return;
    }

    let rem_pwd = 0;

    if($('#remember-user-pwd').prop('checked')){
        rem_pwd = 1;        
    }
    

    loading.show();
          
    var post_data = {'action':'saveUserPwd','password':pwd_inp_1,'remember_pwd':rem_pwd};

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
                
                $('#pwderrormsg').show();
                $('#pwderrormsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                if(rem_pwd){
                    //store password locally.
                    localStorage.setItem('user_pwd', btoa(pwd_inp_1));
                }else{
                    localStorage.removeItem('user_pwd');
                }
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    ons.notification.toast(__("Your password has been updated"),{
                        timeout: 1000
                    });
                }});
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}


function edituserDocuments(){
    document.querySelector('#myNavigator').pushPage('html/editdocs.html',
            {
            animation: 'fade'             
            }
    );
}


function showDocument(doc_id){

    document.querySelector('#myNavigator').pushPage('html/savedoc.html',
            {
            animation: 'fade',
            data:{'doc_id':doc_id}             
            }
    );

}


function SelectUserDocImage(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;        

        var current_image = $('#user-doc-img-preview').attr('src');

        $('#user-doc-img-preview').attr('src', image_data.img_data);
        $('#user-doc-img-preview').data('selectimgdata', image_data.img_data);

        
    });
}


function userPhoneNumberValidate(){

    $('#loginerrormsg').html('');
    
    var phone = $("#login-phone").val();
    var country_call_code = $('#tel-code').data('dialcode');
    var country_code = $('#tel-code').data('country');

    if(phone == '' || phone.length < 5){
        $('#loginerrormsg').html(__("Phone number is invalid"));
        return;
    }

    if(phone.indexOf('+') != -1){
        $('#loginerrormsg').html(__("Please do not include the international dial code (+___) in the phone number field"));
        return;
    }


    let password = '';

    if(localStorage.getItem('user_pwd')){
        //store password locally.
        password = atob(localStorage.getItem('user_pwd'));
    }
    
    
    loading.show();
    

    var post_data = {'action':'userPhoneNumberValidate','phone':phone, 'country_code': country_code,'country_dial_code' : country_call_code, 'user_pwd' : password,"lang" : selected_lang.code};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 30000,
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

                $('#loginerrormsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){

                $('#loginerrormsg').html('');

                if(password){
                    if(data_obj.pwd_valid == 1){
                        //login directly
                        user_login_options = {country_call_code: country_call_code, phone : phone, phone_formatted : data_obj.phone_num_nat, password : password, code : null,fb_user_details:null};
                        login();
                        return;
                    }else{
                        //invalid password, remove stored password if it exists
                        localStorage.removeItem('user_pwd');
                    }
                }
                
                if(data_obj.service == "firebase"){                    

                    loading.show();
                    //show otp code verification page
                    cordova.plugins.firebase.auth.verifyPhoneNumber("+" + country_call_code + phone, 0).then(function(verificationId) {
                        // pass verificationId to signInWithVerificationId
                        firebase_phone_auth_verificationid = verificationId;
                        loading.hide();
                        document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                            {
                                animation:'fade',
                                data: data_obj             
                            }
                        );
                        
                        ons.notification.toast(__("Verification code sent..."),{
                            timeout: 2000
                        });
                    }).catch(function(e){
                        loading.hide();
                        ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                        console.log(e);
                        document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                            {
                                animation:'fade',
                                data: data_obj             
                            }
                        );

                        return;
                    });

                    return;
                }


                document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                    {
                        animation:'fade',
                        data: data_obj             
                    }
                );


            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}



function showLanguage(){

    document.querySelector('#myNavigator').pushPage('html/selectlang.html',
            {
            animation: 'fade'            
            }
    );

}

function showEditCity(){
    document.querySelector('#myNavigator').pushPage('html/editcity.html',
            {
            animation: 'fade'            
            }
    );
}

function updateDriverCity(city_id){

    loading.show();
          
    var post_data = {'action':'updateDriverCity', 'city_id' : city_id};

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

                //restart App
                window.location.reload();
                return;
                
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


function showEditVehicle(){
    document.querySelector('#myNavigator').pushPage('html/editcar.html',
            {
            animation: 'fade'            
            }
    );
}


function updateDriverCar(){

    let vehicle_category = $('#editcarcat').data('carcat');
    let vehicle_model = $('#editcarmodel').val();
    let vehicle_model_year = $('#editcaryear').data('caryear');
    let vehicle_license_num = $('#editcarplatenum').val();
    let vehicle_paint_color = $('#editcarcolor').data('carcolor');

    if(!vehicle_model){
        $('#editcarerrormsg').show();
        $('#editcarerrormsg').html(__('Enter a valid vehicle model'));
        return;
    }

    if(!vehicle_license_num){ 
        $('#editcarerrormsg').show();
        $('#editcarerrormsg').html(__('Enter a valid license plate number of your vehicle'));
        return;
    }

    if(!vehicle_model_year){
        $('#editcarerrormsg').show();
        $('#editcarerrormsg').html(__('Select the model year of your vehicle'));
        return;
    }


    if(!vehicle_paint_color){
        $('#editcarerrormsg').show();
        $('#editcarerrormsg').html(__('Select the color of your vehicle'));
        return;
    }

    $('#editcarerrormsg').hide();
    loading.show();
          
    var post_data = {'action':'updateDriverCar', 'v_cat' : vehicle_category,'v_model': vehicle_model, 'v_model_year' : vehicle_model_year,'v_license': vehicle_license_num,'v_paint_color' : vehicle_paint_color};

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
                $('#editcarerrormsg').show();
                $('#editcarerrormsg').html(data_obj.error);               
                return;
            }

            if(data_obj.hasOwnProperty('success')){

                //restart App
                window.location.reload();
                return;
                
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


function editBankDetails(){
    document.querySelector('#myNavigator').pushPage('html/editbank.html',
            {
            animation: 'fade'
            }
    );
}


function updateBankDetails(){
    
    let driver_acc_name = $('#bankaccountname').val();
    let driver_acc_num = $('#bankaccountnum').val();
    let driver_bank_code = $('#selbankname').data('bankcode');
    let driver_bank_name = $('#selbankname').val();
    let driver_bank_swift = "";

    if(driver_bank_code == 'xxx'){    
        driver_bank_code = $('#otherbankcode').val();
        driver_bank_name = $('#otherbankname').val();
    }

    
    if(!driver_acc_name || driver_acc_name.length < 3){
        $('#editbankerrormsg').show();
        $('#editbankerrormsg').html(__("Enter your bank account name"));
        return;      
    }

    if(!driver_acc_num || driver_acc_num.length < 3){
        $('#editbankerrormsg').show();
        $('#editbankerrormsg').html(__("Enter your bank account number"));
        return;      
    }

    if(!driver_bank_name || driver_bank_name.length < 3){
        $('#editbankerrormsg').show();
        $('#editbankerrormsg').html(__("Enter the name of your bank"));
        return;      
    }

    if(!driver_bank_code || driver_bank_code.length < 3){
        //ons.notification.alert("Enter your bank code.",{title:""});
        //return;      
    }


    if(!driver_bank_swift || driver_bank_swift.length < 3){
        //ons.notification.alert("Enter your bank SWIFT / BIC code.",{title:""});
        //return;      
    }

    $('#editbankerrormsg').hide();


    loading.show();
          
    var post_data = {'action':'updateBankDetails', 'acc_name' : driver_acc_name, 'acc_num' : driver_acc_num,'bank_name' : driver_bank_name, 'bank_code' : driver_bank_code};

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
                $('#editbankerrormsg').show();
                $('#editbankerrormsg').html(data_obj.error);               
                return;
            }

            if(data_obj.hasOwnProperty('success')){

                $('#bank-required-notif').hide();
                userprofileinfo.bank_code = driver_bank_code;
                userprofileinfo.bank_name = driver_bank_name;
                userprofileinfo.bank_acc_holder_name = driver_acc_name;
                userprofileinfo.bank_acc_num = driver_acc_num;

                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    ons.notification.toast(__("Your bank account information has been updated"),{
                        timeout: 1000
                    });
                }});
                
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

function genRandomString(length){

    var smallalpha="abcdefghijklmnopqrstuvwxyz";
    var capalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numeric="123456789";
    var symbols="!@#_&+-";
    var p_chars='';
    var temp = '';
    var smallalpha_len = Math.floor(length/2);
    var capsalpha_len = 1;
    var symbols_len = 0;//1;
    var numeric_len = length - smallalpha_len - capsalpha_len - symbols_len;
   

    for (i=0;i<capsalpha_len;i++)
        temp+=capalpha.charAt(Math.floor(Math.random()*capalpha.length));

    for (i=0;i<smallalpha_len;i++)
        temp+=smallalpha.charAt(Math.floor(Math.random()*smallalpha.length));

    /* for (i=0;i<symbols_len;i++)
        temp+=symbols.charAt(Math.floor(Math.random()*symbols.length)); */

    for (i=0;i<numeric_len;i++)
        temp+=numeric.charAt(Math.floor(Math.random()*numeric.length));    

        temp=temp.split('').sort(function(){return 0.5-Math.random()}).join('');

    return temp;
}


async function regUserPhoto(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;
        

        var current_image = $('#reg-user-photo-img-preview').attr('src');

        $('#reg-user-photo-img-preview').attr('src', image_data.img_data);

        user_reg_data.profile_photo = image_data.img_data;

        $('#signup-pg1-next-btn').prop('disabled', false);

    },{width:300,height:300});
}



function showSignUpPg2(){
    if(!user_reg_data.profile_photo){
        $('#regpage1errormsg').html(__('A clear photo of you is required'));
        setTimeout(function(){
            $('#regpage1errormsg').html('');
        },2000);
        return;
    }

    document.querySelector('#myNavigator').pushPage('signuppage2.html',
        {
            animation: 'fade'             
        }
    );


}


function showSignUpPg3(){

    let user_firstname = $('#regfirstname').val();
    let user_lastname = $('#reglastname').val();

    if(!user_firstname){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(!user_lastname){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    user_reg_data.firstname = user_firstname;
    user_reg_data.lastname = user_lastname;

    document.querySelector('#myNavigator').pushPage('signuppage3.html',
        {
            animation: 'fade'             
        }
    );

}


function showSignUpPg4(){

    let driver_service_city = $('#regcity').data('cityid');
    let driver_car_category = $('#regcarcat').data('carcat');
    let driver_car_model = $('#regcarmodel').val();
    let driver_car_year = $('#regcaryear').data('caryear');
    let driver_car_platenum = $('#regcarplatenum').val();
    let driver_car_color = $('#regcarcolor').data('carcolor');

    if(!driver_service_city){
        ons.notification.alert(__('Select the city you will drive in'),{title:''});
        return;
    }

    if(!driver_car_category){
        ons.notification.alert(__('Select the vehicle category that matches your vehicle'),{title:''});
        return;
    }

    if(!driver_car_model){
        ons.notification.alert(__('Enter a valid vehicle model'),{title:''});
        return;
    }

    if(!driver_car_year){
        ons.notification.alert(__('Select the model year of your vehicle'),{title:''});
        return;
    }

    if(!driver_car_platenum){
        ons.notification.alert(__('Enter a valid license plate number of your vehicle'),{title:''});
        return;
    }

    if(!driver_car_color){
        ons.notification.alert(__('Select the color of your vehicle'),{title:''});
        return;
    }

    user_reg_data.operation_city = driver_service_city;
    user_reg_data.car_type = driver_car_category;
    user_reg_data.car_model = driver_car_model;
    user_reg_data.car_year = driver_car_year;
    user_reg_data.car_plate_num = driver_car_platenum;
    user_reg_data.car_color = driver_car_color;


    document.querySelector('#myNavigator').pushPage('signuppage4.html',
        {
            animation: 'fade'             
        }
    );
}



function showSignUpPg5(){

    let pwd_inp_1 = $('#regpwdnew').val();
    let pwd_inp_2 = $('#regpwdconfirm').val();

    if(pwd_inp_1 == '' || pwd_inp_2 == '' || pwd_inp_1 !== pwd_inp_2){
        $('#regpwderrormsg').html(__("Passwords do not match"));
        return;
    }

    if(pwd_inp_1.length < 8 || pwd_inp_2.length < 8){
        $('#regpwderrormsg').html(__("Password must not be less than 8 characters"));
        return;
    }
    

    if($('#reg-remember-user-pwd').prop('checked')){
        user_reg_data.rem_password = 1;        
    }else{
        user_reg_data.rem_password = 0;        
    }

    user_reg_data.password = pwd_inp_1;
    
    document.querySelector('#myNavigator').pushPage('signuppage5.html',
        {
            animation: 'fade'             
        }
    );
}


function registerUser(){
    
    user_reg_data.referral = $('#reguserrefcode').val();

    loading.show();
          
    var post_data = {'action':'registerUser','reg_data':user_reg_data};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 60000,
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
                
                user_login_options.password = user_reg_data.password;
                user_login_options.code = null;
                user_login_options.fb_user_details = null;
                if(user_reg_data.rem_password == 1){
                    //store password locally.
                    localStorage.setItem('user_pwd', btoa(user_reg_data.password));  
                    user_login_options.remember_pwd = 1;                  
                }

                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade',
                        times: 5,   
                        callback: function(){
                            login();
                                
                            }          
                    }
                );

                
                return;

            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}


function showActiveRideOption(){    
    document.querySelector('#activeridemenu').show();

    $('.active-ride-menu-item').off('click').on('click', function(){
        document.querySelector('#activeridemenu').hide();
    });
}


function userInfoShow(){    
    document.querySelector('#userinfodialog').show();
}


function chatWindowShow(){
    document.querySelector('#chat-window').show();
}

async function chat_img_send(booking_id){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;        

        $('#chat-img-send-btn').prop('disabled', true);
        $('#chat-img-send-btn').css("background-color","grey");
          
          var post_data = { 'action' : 'chatSendImg', 'booking_id':booking_id,'chat_img':image_data.img_data};

          $.ajax({
              url: ajaxurl,
              type: 'POST',
              timeout : 10000,
              crossDomain:true,
              xhrFields: {withCredentials: true},
              data: post_data,
              success: function (data, status)
              {

                    $('#chat-img-send-btn').prop('disabled', false);
                    $('#chat-img-send-btn').css("background-color","#ffbf00");
                      
                    try{
                        var data_obj = JSON.parse(data);
                    }catch(e){
                        ons.notification.toast(__("Error communicating with server"),{
                        timeout: 1000
                        });
                        return;
                    }

                    if(data_obj.hasOwnProperty('error')){
                        
                        ons.notification.toast(__("Error communicating with server"),{
                            timeout: 1000
                        });
                        return;
                    }
                    
                    if(data_obj.hasOwnProperty('success')){
                        
                        //refresh chat content               

                        if(data_obj.hasOwnProperty('chat_content')){
                            $('#chat-msg-content').val('');
                            $('#chat-window-body').empty();
                            $('#chat-window-body').html(data_obj.chat_content);
                            $('#chat-window-body').scrollTop(10000000);
                        }

                        //new chat message?
                        if(data_obj.hasOwnProperty('chat_new_content') && data_obj.chat_new_content == 1){
                            //notification_sound.play();
                            if(!chat_window_display_status){
                                $('#new_chat_msg_ind').show();
                            }
                        }

                    }
                  

              },
              error: function(jqXHR,textStatus, errorThrown) {  
                $('#chat-img-send-btn').prop('disabled', false);
                $('#chat-img-send-btn').css("background-color","#ffbf00");
                  ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                  });
              }

          });

    });

}



function showSettings(){
    document.querySelector('#myNavigator').pushPage('html/settings.html',
            {
                animation: 'fade'            
            }
    );
}


function setBackgroundMode(){
    cordova.plugins.backgroundMode.isIgnoringBatteryOptimizations(function(isIgnoring) {
        console.log(isIgnoring);

        if(!isIgnoring){

            ons.notification.confirm({
                message: __('For background mode operation to work satisfactorily, please disable all battery optimizations on this App in your phone settings'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: "",
                buttonLabels: [__('Continue'), __('Cancel')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function(index) {
                
                  if(!index){
                    // 0-: Button index from the left
                    cordova.plugins.backgroundMode.on('activate', function() {
                        cordova.plugins.backgroundMode.disableWebViewOptimizations();
                    });
                    cordova.plugins.backgroundMode.openBatteryOptimizationsSettings();
                  }else{
                    close_dialog_enable = 0;
                    // -1: Cancel
                  }
                
                }
            }); 

        }else{
            cordova.plugins.backgroundMode.on('activate', function(){
                cordova.plugins.backgroundMode.disableWebViewOptimizations();
            });
        }

        

    })
}


function setAlwaysOnTop(){
    cordova.plugins.backgroundMode.requestForegroundPermission();
}


function showReferralInfo(){
    document.querySelector('#myNavigator').pushPage('html/driverreferral.html',
            {
                animation: 'fade'            
            }
    );
}


function shareReferralCode(){
    share_message('',userprofileinfo.ref_code_copy_msg,userprofileinfo.ref_url);
}


function getDateWeekStartEnd(date = new Date()){
    
    let wDate = new Date(date);
    let dDay = wDate.getDay() > 0 ? wDate.getDay() : 7;
    let first = wDate.getDate() - dDay + 1;
    let firstDayWeek = new Date(wDate.setDate(first));
    let lastDayWeek = new Date(wDate.setDate(firstDayWeek.getDate()+6));

    let days_abbr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    let start_year = firstDayWeek.getFullYear();
    let start_month = (firstDayWeek.getMonth() + 1) < 10 ? '0' + (firstDayWeek.getMonth() + 1) : (firstDayWeek.getMonth() + 1);
    let start_date = firstDayWeek.getDate() < 10 ? '0' + firstDayWeek.getDate() : firstDayWeek.getDate();
    let start_day = days_abbr[firstDayWeek.getDay()];

    let end_year = lastDayWeek.getFullYear();
    let end_month = (lastDayWeek.getMonth() + 1) < 10 ? '0' + (lastDayWeek.getMonth() + 1) : (lastDayWeek.getMonth() + 1);
    let end_date = lastDayWeek.getDate() < 10 ? '0' + lastDayWeek.getDate() : lastDayWeek.getDate();
    let end_day = days_abbr[lastDayWeek.getDay()];
    
    
    let data = {'week':0,'start_year':start_year,'start_month':start_month,'start_date':start_date,'start_day' : start_day,'end_year':end_year,'end_month':end_month,'end_date':end_date,'end_day' : end_day}
    return data;

}

function getNumDaysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function showBgLocMsg(){
    document.querySelector('#bglocscreen').show();
    startscreen.hide();
    navigator.splashscreen.hide();
    translateElements('bgloc');



      $('#bg-loc-continue-btn').off('click').on('click', function(){

        $(this).prop('disabed', true);
        $('#bg-loc-text').css('visibility','hidden');
        $('#bg-loc-text').css('opacity','0');
        $('#bg-loc-text').css('height','0px');
        $(this).fadeOut();

        
        /* document.querySelector('#myNavigator').popPage(
          {
          animation: 'fade'             
          }
        ); */
        setTimeout(function(){
            $('#loading-progressbar').css('visibility', 'visible');
          if(!APP_DEBUG){
            requestLocationAccuracy();                        
          }else{
              mapinitialize();
          }
        },1000);
          
      })
}



function showCancelReasons(callback){
    let cancel_reasons = app_settings.trip_cancel_reasons;
    let cancel_reasons_html = '';
    cancel_reasons.forEach(function(val,indx){
        cancel_reasons_html += `<ons-list-item data-value="${val}" data-text="${val}" class="cancel-reason-list-item">
                                  
                                            <div class="left">
                                                <ons-icon icon='fa-user-times' size='24px' style='color:#777;'></ons-icon>
                                            </div>
                                            <div class="center">
                                                <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val}</span>
                                            </div>
                                        </ons-list-item>`;
    })

    cancel_reasons_html += `<ons-list-item data-value="Other" data-text="${__('Other reason')}" class="cancel-reason-list-item">
                                  
                                            <div class="left">
                                                <ons-icon icon='fa-pencil' size='24px' style='color:#777;'></ons-icon>
                                            </div>
                                            <div class="center">
                                                <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${__('Other reason')}</span>
                                            </div>
                                        </ons-list-item>`;

    cancel_reasons_html = `<ons-list>${cancel_reasons_html}</ons-list>`;

    $('#canceltripreasonscontent').empty();
    $('#canceltripreasonscontent').html(cancel_reasons_html);
    $('#canceltripreasonsdlg').attr('title',__('Cancel Booking'));
    document.querySelector('#canceltripreasonsdlg').show();

    

    $('#canceltripreasonscontent .cancel-reason-list-item').off().on('click', function(){
        document.querySelector('#canceltripreasonsdlg').hide();
        let item_val = $(this).data('value');
        let item_text = $(this).data('text');
        if(item_val == "Other"){

            ons.notification.prompt(__('Why are you cancelling this ride?'),{title:'',cancelable:true,buttonLabels:[__('Cancel'),__('Continue')]})
            .then(function(input) {
                if(!input)return;
                callback(input);
            });

            return;
        }
        callback(item_text);
        
    })
}


function acceptScheduledBooking(booking_id){
    if(!booking_id)return;
    
    loading.show();

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'acceptScheduledBooking', 'booking_id' : booking_id},
        dataType: 'json',
        success: function(data){
            loading.hide();
            

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(data.error,{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                 
                if(data.status == 1){ //successfully accepted
                    //$(`#driver-schd-btn-status-${booking_id}`).html('');  
                    $(`#driver-schd-btn-status-${booking_id}`).html(`<ons-button disabled style="width:100%;margin: 10px 0 5px 0;background-color:#ccc" >${__('Accept')}</ons-button>`);  
                    ons.notification.alert(__('You have accepted the scheduled booking. You will be notified 15 minutes before the pickup time'),{title:""});
                }else if(data.status == 2){ //failed to accept - already accepted by someone else
                    $(`#driver-schd-trip-item-${booking_id}`).remove();
                    ons.notification.alert(__('The booking has already been accepted by another driver'),{title:""});
                }else{ //booking not available any more
                    ons.notification.alert(__('The booking is no longer available'),{title:""});
                    $(`#driver-schd-trip-item-${booking_id}`).remove();
                } 
                

            }
            

        },
        error: function(){
            loading.hide();
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });
}


function getScheduledTrips(){

    if(driver_schd_data_fetch_status)return;

    driver_schd_data_fetch_status = 1;

    ons.notification.toast('Getting scheduled trips...', {
      timeout: 2000
    });
      
    var post_data = {'action_get':'getScheduledBookings'};       
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
            driver_schd_data_fetch_status = 0;  
            console.log(data)
            try{
                //console.log(data);
                var data_obj = JSON.parse(data);
            }catch(e){            
                
                ons.notification.toast(__("Error communicating with server"), {
                    timeout: 2000
                });
            
                return;
            }


            if(data_obj.hasOwnProperty('error')){
            
                ons.notification.alert(data_obj.error);
            
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){

                if(data_obj.scheduled_trips_data){
                    
                    let schd_ride_template_html = '';
                    let update_timestamp = Date.now();
                    let driver_schd_bookings_data = data_obj.scheduled_trips_data;

                    //loop through the bookings and generate a view

                    for(let x = 0;x < driver_schd_bookings_data.length;x++){

                        let schd_booking = driver_schd_bookings_data[x]; 
                        let schd_booking_data_json = JSON.stringify(schd_booking);
                        
                        let el_present = $(`#driver-schd-trip-item-${schd_booking.bk_id}`);
                        let vehicle_img_url = $(`#uniq-car-type-id-${schd_booking.ride_id}`).attr('src');
                        let city_vehicles = routetariffs.result[userprofileinfo.city_id].cars;
                        let vehicle_category = "";
                        city_vehicles.forEach(function(val,indx){
                            if(val.id == schd_booking.ride_id){
                                vehicle_category = val.ride_type;
                            }
                        })
                        
                        let waypoint1 = schd_booking.waypoint1 != "" ? `<p style="margin: 10px 0 0 0;position: relative;padding-left: 15px;text-align: left;padding-bottom: 20px;border-left: 2px dashed #ccc;">
                                                                    <ons-icon icon="fa-circle" size="18px" style="color: #ffa000;position: absolute;font-size: 17px;left: -9px;top: -3px;background-color: white;"></ons-icon>
                                                                    <span id="request-pickup" style="font-size: 16px;width: 100%;display: inline-block;text-overflow: ellipsis;color: #424242;overflow: hidden;line-height: 1.2em;max-height: 2em;" >${schd_booking.waypoint1}</span>                                
                                                                </p>` : "";
                        let waypoint2 = schd_booking.waypoint2 != "" ? `<p style="margin: 10px 0 0 0;position: relative;padding-left: 15px;text-align: left;padding-bottom: 20px;border-left: 2px dashed #ccc;">
                                                                <ons-icon icon="fa-circle" size="18px" style="color: #ffa000;position: absolute;font-size: 17px;left: -9px;top: -3px;background-color: white;"></ons-icon>
                                                                <span id="request-pickup" style="font-size: 16px;width: 100%;display: inline-block;text-overflow: ellipsis;color: #424242;overflow: hidden;line-height: 1.2em;max-height: 2em;" >${schd_booking.waypoint2}</span>                                
                                                            </p>` : "";

                        
                        let accept_status = `<ons-button style="width:100%;margin: 10px 0 5px 0;background-color:#4caf50" onclick="acceptScheduledBooking(${schd_booking.bk_id});" >${__('Accept')}</ons-button>`;
                        let view_scheduled_booking_btn = `<ons-button style="width:100%;margin: 10px 0 5px 0;background-color:var(--set-foreground-color)" onclick="viewScheduledBooking(${schd_booking.bk_id});" >${__('View')}</ons-button>`;
                        let scheduled_rider_contact = `<div id="scheduled-driver-contact-${schd_booking.bk_id}" style="display: flex;flex-wrap:nowrap;margin: 20px 0;">
                                                            <ons-button style='border: thin solid #ccc;color: #ccc;margin-right: 5px;' modifier='outline'><ons-icon icon='fa-phone' ></ons-icon></ons-button>
                                                            <ons-button id="sms-driver-btn" style='border: thin solid #ccc;color: #ccc;' modifier='outline'><ons-icon icon='fa-envelope' ></ons-icon></ons-button>
                                                        </div>`;
                        if(schd_booking.driver_id == userprofileinfo.driverid){
                            //accept_status = `<ons-button style="width:100%;margin:5px 0;background-color:black" >${__('Accepted')}</ons-button>`;
                            accept_status = `<ons-button disabled style="width:100%;margin: 10px 0 5px 0;background-color:#ccc" >${__('Accept')}</ons-button>`;
                            scheduled_rider_contact = `<div id="scheduled-driver-contact-${schd_booking.bk_id}" style="display: flex;flex-wrap:nowrap;margin: 20px 0;">
                                                            <ons-button data-number="${schd_booking.phone}" style='border: thin solid;color: black;margin-right: 5px;' modifier='outline' onclick="call_rider($(this).data('number'))"><ons-icon icon='fa-phone' ></ons-icon></ons-button>
                                                            <ons-button id="sms-driver-btn" data-number="${schd_booking.phone}" style='border: thin solid;color: black;' modifier='outline' onclick="sms_rider($(this).data('number'))"><ons-icon icon='fa-envelope' ></ons-icon></ons-button>
                                                        </div>`; 
                        }

                        $('#driver-schd-nodata').remove();

                        if(el_present.length){
                            //update element
                            el_present.data('updtime', update_timestamp);
                            $(`#driver-schd-btn-status-${schd_booking.bk_id}`).html(accept_status);
                            $(`#scheduled-driver-contact-${schd_booking.bk_id}`).html(scheduled_rider_contact);
                        }else{
                            //add element
                            schd_ride_template_html = `<div data-updtime="${update_timestamp}" style="margin:10px 10px 20px 10px;background-color: white;border: thin solid #ccc;border-radius: 10px;" id="driver-schd-trip-item-${schd_booking.bk_id}">
                                                            
                                                            <div style='width:100%;box-sizing: border-box;'>
                                                                <div style="padding: 10px 10px;border-bottom: thin solid #ccc;text-align: center;">
                                                                    <p style="font-size:14px;font-weight:bold;margin: 0;" >${schd_booking.pickup_time}</p>
                                                                </div>
                                                                <div style="padding: 10px;border-bottom: thin solid #ccc;display: flex;align-items: center;justify-content: space-between;">
                                                                    <div style="position:relative;width: 50%;display: flex;flex-wrap: nowrap;gap: 10px;">
                                                                        <div>
                                                                            <img id="driver-schd-img-${schd_booking.bk_id}" src="img/dummy-user.png" style="width: 48px;height: 48px;display: block;border-radius: 50%;"/>  
                                                                            <div style='display:none;clear:both;'><img id="driver-schd-preload-img-${schd_booking.bk_id}" onload="$('#driver-schd-img-${schd_booking.bk_id}').attr('src',$('#driver-schd-preload-img-${schd_booking.bk_id}').attr('src'))" src="${schd_booking.photo}"></div>
                                                                        </div>
                                                                        <div>
                                                                            <p style="text-align:center;font-size:16px;margin: 5px 0;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;color:black;font-weight: bold;">${schd_booking.firstname}</p>
                                                                            <img style="width: 48px;background-color: white;" src="img/rating-${schd_booking.user_rating}.png"/>                                                                            
                                                                        </div>
                                                                    </div>
                                                                    ${scheduled_rider_contact}
                                                                </div>

                                                                <div style="display: flex;flex-wrap: nowrap;align-items: center;justify-content: space-between;padding:10px;border-bottom: thin solid #ccc;">
                                                                    <div style="position:relative;width: 50%;">
                                                                        <img src="${vehicle_img_url}" style="width:50%;" />                                                                     
                                                                    </div>
                                                                    
                                                                    <div style="width: 50%;display: flex;flex-wrap: nowrap;align-items: end;flex-direction: column;">                                                                        
                                                                        <div style="margin: 5px 0;text-align: right;font-size: 30px;font-weight: bold;" >${city_curency_symbol + schd_booking.fare}</div>                                                                        
                                                                        <p style="margin:0;font-weight:bold;">${vehicle_category}</p>   
                                                                    </div>

                                                                </div>
                                                                
                                                                <div style="padding:10px 20px;">
                                                                    <p style="margin: 10px 0 0 0;position: relative;padding-left: 15px;text-align: left;padding-bottom: 20px;border-left: 2px dashed #ccc;">
                                                                        <ons-icon icon="fa-dot-circle" size="18px" style="color: #8bc34a;position: absolute;left: -9px;top: -3px;background-color: white;"></ons-icon>
                                                                        <span id="request-pickup" style="font-size: 16px;width: 100%;display: inline-block;text-overflow: ellipsis;color: #424242;overflow: hidden;line-height: 1.2em;max-height: 2em;" >${schd_booking.p_loc}</span>                                
                                                                    </p>
                                                                    ${waypoint1}
                                                                    ${waypoint2}
                                                                    <p style="margin:0;position: relative;padding-left: 15px;">
                                                                        <ons-icon icon="fa-square" size="18px" style="color: #fa4b4b;position: absolute;left: -8px;top: 0;border-bottom: 3px solid white;background-color: white;"></ons-icon>
                                                                        <span id="request-dropoff" style="font-size: 16px;width: 100%;display: inline-block;text-overflow: ellipsis;color: #424242;overflow: hidden;line-height: 1.2em;max-height: 2em;" >${schd_booking.d_loc}</span>
                                                                                                    
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div style="display:flex;flex-wrap:nowrap;justify-content:space-between;padding:10px;"> 
                                                                <div style="margin-right:10px;width:50%;" id="driver-schd-btn-status-${schd_booking.bk_id}">${accept_status}</div><div style="width:50%;">${view_scheduled_booking_btn}</div>
                                                            </div>
                                                            <span id="scheduled-booking-item-data-${schd_booking.bk_id}" style="display:none">${schd_booking_data_json}</span>
                                                        </div>`;
                            $('#scheduledtrips-content').append(schd_ride_template_html);

                        }                         
                        

                    }


                    //remove items that are not present in the returned data
                    $(`#scheduledtrips-content [id^=driver-schd-trip-item-]`).each(function(){
                        let upd_time = $(this).data('updtime');
                        if(upd_time != update_timestamp)$(this).remove();
                    });


                    if(!$(`#scheduledtrips-content [id^=driver-schd-trip-item-]`).length){
                        $('#scheduledtrips-content').html("<div id='driver-schd-nodata' class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                    }   

                }else{
                    $('#scheduledtrips-content').html("<div id='driver-schd-nodata' class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                
                return;

            }

    
        },
        error: function() { 
        //loading.hide();
        driver_schd_data_fetch_status = 0;
        ons.notification.toast(__("Error communicating with server"), {
            timeout: 2000
        });
        return;
            
        }

    });
  
  
  
  
}



function setAltCars(){

    if(account_activation_status == 0){
        return;
    }
        
    loading.show();

    var post_data = {'action':'setAltCars','status':userprofileinfo.allow_alt_cars};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
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
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){                
                if(data_obj.status == 1){
                    userprofileinfo.allow_alt_cars = 1;
                    $('#alt-cars-status-ind').html("<ons-icon icon='fa-check-circle' size='20px' style='color:green;'></ons-icon>");
                }else{
                    userprofileinfo.allow_alt_cars = 0;
                    $('#alt-cars-status-ind').html("<ons-icon icon='fa-times' size='20px' style='color:red;'></ons-icon>");
                }
            }


        },
        error: function(jqXHR,textStatus, errorThrown) { 
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"));
            return;
        }

    });
    
}



function updateAuxBookings(current_booking_ids = []){

    if(typeof updateAuxBookings.pending_bookings_count_old == 'undefined'){
        updateAuxBookings.pending_bookings_count_old = 0; //declare a static variiable to keep track of changes to active booking count
    }
    
    let pending_bookings_count = 0;

    for (var key in localStorage) {

        let booking_key = key.substr(0,4);

        if(booking_key == "pbk-"){
            let booking_id = key.substr(4);
            if(current_booking_ids.length){
                if(current_booking_ids.find(function(val){return val == booking_id}) == undefined){
                    localStorage.removeItem(`pbk-${booking_id}`);
                    if(pending_booking_data.hasOwnProperty(key)){
                        delete pending_booking_data.key;
                    }
                    continue;
                }
            }
            
            
            if(!pending_booking_data.hasOwnProperty(key)){
                pending_booking_data[key] = {distance : 0};
            }
            
            pending_bookings_count++;
            
        }
                          
       
    }


    //display the auxilliary bookings button 

    if(pending_bookings_count){
        $('#aux-booking-count').text(pending_bookings_count);
        $('#aux-booking-btn').show();
        if(pending_bookings_count != updateAuxBookings.pending_bookings_count_old){
            //animate the booking swithing button
            $("#aux-booking-btn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $("#aux-booking-btn").removeClass("bounceIn animated");
            })
        }
    }else{
        $('#aux-booking-btn').hide();
    }

    updateAuxBookings.pending_bookings_count_old = pending_bookings_count;
    return pending_bookings_count;


}


function showauxbookings(){

    if(ride_request_screen.visible)return;
    let pending_bookings_count = 0;
    let pend_book_list = '';

    //build current pending booking list

    for (var key in localStorage) {

        let booking_key = key.substr(0,4);

        if(booking_key == "pbk-"){
            let booking_id = key.substr(4);
            let pending_booking_item = localStorage.getObject(key);
            let rider_name = pending_booking_item.rider_firstname;
            let rider_image = pending_booking_item.rider_image;
            pending_bookings_count++;

            pend_book_list += `<ons-list-item data-value="${booking_id}" class="sel-list-item"> 
        
                                <div class="left">
                                    <img id="pend-bk-rider-img-${booking_id}" src="img/dummy-user.png" style="width:64px;border-radius: 50%;" />
                                    <div style='display:none;clear:both;'><img id="pend-bk-preload-img-${booking_id}" onload="$('#pend-bk-rider-img-${booking_id}').attr('src',$('#pend-bk-preload-img-${booking_id}').attr('src'))" src="${rider_image}"></div>
                                </div>
                        
                                <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${rider_name}</span>
                                </div>
                                <div class="right" id="list-item-sel-${booking_id}">
                                    
                                </div>

                            </ons-list-item>`;

            
        }                         
       
    }

    if(!pending_bookings_count)return;
    pend_book_list = `<ons-list>${pend_book_list}</ons-list>`;
    $('#customselectcontent').empty();
    $('#customselectcontent').html(pend_book_list);

    let current_booking_serviced = 0;
    if(driver_accept_ride_request_ui_states.ui_state > 0 && driver_accept_ride_request_ui_states.ui_state < 4){
        current_booking_serviced = driver_accept_ride_request_ui_states.booking_id;
    }

    customItemSelect(current_booking_serviced,__('Active trips'), resumeBooking);


}


function tripDetailSummaryShow(){    

    $('#tripdetailsummary').attr('title',__('Trip Summary'));
    $('#trip-summary-rider-image').attr('src',driver_accept_ride_request_ui_states.rider_image);
    $('#trip-summary-rider-name').html(driver_accept_ride_request_ui_states.rider_firstname);
    $('#trip-summary-rider-rating').attr('src',`img/rating-${driver_accept_ride_request_ui_states.rider_rating}.png`);
    $('#trip-summary-pickup').html(driver_accept_ride_request_ui_states.p_addr);
    $('#trip-summary-dropoff').html(driver_accept_ride_request_ui_states.d_addr ? driver_accept_ride_request_ui_states.d_addr : __('Destination not specified'));

    if(driver_accept_ride_request_ui_states.waypoint1_address){        
        $('#trip-summary-stop-1-addr').html(driver_accept_ride_request_ui_states.waypoint1_address);
        $('#trip-summary-stop-1').show();
    }else{
        $('#trip-summary-stop-1').hide();
    }

    if(driver_accept_ride_request_ui_states.waypoint2_address){        
        $('#trip-summary-stop-2-addr').html(driver_accept_ride_request_ui_states.waypoint2_address);
        $('#trip-summary-stop-2').show();
    }else{
        $('#trip-summary-stop-2').hide();
    }


    let discount_cost = 0.00;
    let discount_cost_text = '';
    let booking_fare = city_curency_symbol + driver_accept_ride_request_ui_states.fare;
    if(driver_accept_ride_request_ui_states.coupon_code != "" && parseFloat(driver_accept_ride_request_ui_states.fare) >= parseFloat(driver_accept_ride_request_ui_states.coupon_min_fare)){
        if(driver_accept_ride_request_ui_states.coupon_discount_type == 1){ //fixed coupon discount
            let coupon_discount_amount = (driver_accept_ride_request_ui_states.paid_amount - driver_accept_ride_request_ui_states.coupon_discount_value) < 0 ? 0 : driver_accept_ride_request_ui_states.fare - driver_accept_ride_request_ui_states.coupon_discount_value;
            discount_cost = coupon_discount_amount;
        }else{//percentage coupon discount
            let coupon_discount_amount = driver_accept_ride_request_ui_states.fare * (driver_accept_ride_request_ui_states.coupon_discount_value / 100);
            if(driver_accept_ride_request_ui_states.coupon_max_discount && coupon_discount_amount > driver_accept_ride_request_ui_states.coupon_max_discount)coupon_discount_amount = driver_accept_ride_request_ui_states.coupon_max_discount;
            discount_cost = driver_accept_ride_request_ui_states.fare - coupon_discount_amount;
            
        }
        if(driver_accept_ride_request_ui_states.fare > discount_cost){
            booking_fare = city_curency_symbol + roundFare(discount_cost) + ` | <span style='color:red;text-decoration: line-through;'>${city_curency_symbol}${driver_accept_ride_request_ui_states.fare}</span>`;
        }else{
            booking_fare = city_curency_symbol + driver_accept_ride_request_ui_states.fare + ` | <span style='color:red;text-decoration: line-through;'>${city_curency_symbol}${roundFare(discount_cost)}</span>`;
        }
        
    }
    $('#trip-summary-amount').html(booking_fare);
    document.querySelector('#tripdetailsummary').show();

}


function updateBannerViewCount(banner_id = 0){
    
    if(!banner_id)return;
          
    var post_data = {'action_get':'updateBannerViewCount','id' : banner_id};

    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            

            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                return;
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            return;
        }

    });
}


function showUpdatePrompt(url){

    startscreen.show();

    ons.notification.alert(__('Update App'), {title:"",buttonLabels:[__('Update')],callback: function(){
                                
                                window.location = url;
                                
                                setTimeout(function(){
                                    showUpdatePrompt(url);
                                },1000);
                                
                                
                            }});

}


function SendCodeViaWhatsApp(wts_phone_num, message, auth_code){

    if(typeof SendCodeViaWhatsApp.whatsapp_auth_check_timer == 'undefined'){
        SendCodeViaWhatsApp.whatsapp_auth_check_timer = 0; //declare a static variiable
    }

    if(typeof SendCodeViaWhatsApp.processing == 'undefined'){
        SendCodeViaWhatsApp.processing = 0; //declare a static variiable
    }

    if(!wts_phone_num)return;

    let whatsapp_deep_link = `https://wa.me/${wts_phone_num}/?text=${message}`;
    let time_check_start = Date.now() / 1000 | 0;
    clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
    SendCodeViaWhatsApp.whatsapp_auth_check_timer = setInterval(function(){
        let cur_time = Date.now() / 1000 | 0;
        if(cur_time - time_check_start > 120){
            clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
            return;
        }

        if(SendCodeViaWhatsApp.processing)return;
        SendCodeViaWhatsApp.processing = 1;
        $.ajax({ 
            url: ajaxurl, 
            method: 'GET',
            crossDomain:true,
            timeout : 10000,
            xhrFields: {withCredentials: true},
            data: { 'action_get' : 'whatsappAuthCheck', 'code':auth_code},
            dataType: 'json',
            success: function(data){
                
                SendCodeViaWhatsApp.processing = 0;

                if(data.hasOwnProperty('error')){
                    return;
                }
            
                if(data.hasOwnProperty('success')){
                    clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
                    //automatically inout OTP code
                    let otp_code = data.otp_code;
                    code_inp_str = otp_code;

                    for(let v = 0;v < 6;v++){
                        $(`#v-code-digit-${v}`).val(otp_code[v]);
                    }

                    $('#verify-otp-code-btn').prop('disabled', false); 

                    setTimeout(function(){
                        $('#verify-otp-code-btn').click();
                    },1000);

                }
            },
            error: function(){
                SendCodeViaWhatsApp.processing = 0;
                return;
            } 


        });


    }, 5000);
    
    window.open(whatsapp_deep_link, '_system');

}


function notifyCustomerStopStatus(booking_id,status){
    let res = new Promise(function(resolve, reject){

        loading.show();
    
        var post_data = {'action_get':'notifyCustomerStopStatus','booking_id' : booking_id,'status':status};       
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
                console.log(data)
                try{
                    //console.log(data);
                    var data_obj = JSON.parse(data);
                }catch(e){

                    let resp = {'error' : 1, 'message' : __("Error communicating with server")}
                    resolve(resp);
                    return;
                    
                }
    
    
                if(data_obj.hasOwnProperty('error')){

                    let resp = {'error' : 1, 'message' : data_obj.error}
                    resolve(resp);
                    return;               
    
                }
    
    
                
                if(data_obj.hasOwnProperty('success')){
                    let resp = {'success' : 1}
                    resolve(resp);
                    return;
                }
    
            
            },
            error: function() { 
                loading.hide();
                let resp = {'error' : 1, 'message' : __("Error communicating with server")}
                resolve(resp);
                return;
                
            }
    
        });
    });

    return res;
}


function SearchCountryList(){
    var search_str = $("#search-countries").val();
    if(!search_str){
        $('#countrylistcontent .default-country-items').show(); 
        return;         
    }

    search_str = search_str.toLowerCase();

    if(!$(`#countrylistcontent .default-country-items[data-countrysearch*=${search_str}]`).length)return;

    $('#countrylistcontent .default-country-items').hide();

    $(`#countrylistcontent .default-country-items[data-countrysearch*=${search_str}]`).show(); 
}


function viewScheduledBooking(bookid){
    document.querySelector('#myNavigator').pushPage('html/schdbookingdetails.html',{animation:'fade',data:{'bookid':bookid}});
}


async function ShowQuickStartHelpTip(){

    if(platform !== "android")return;

    let help_tip_content = `
                            <p>${__('Hi, thank you for joining our service. Please read this information to understand how to effectively use our app')}</p>
                            <p>${__('This driver app allows you receive and service trip requests from our customers. When you receive a trip request it will appear as a notification on your phone and also on the app. You must ensure the app is always running at all times and your GPS is turned on to be able to receive trip requests. Open your phone settings app, goto app settings and disable all battery optimizations for this app. Also turn-off battery saver settings for this app. This ensures the app always runs in the backround when you are using another app. Use the buttons below to open the battery optimization page and app settings page on your phone.')}</p>
                            <div style="width:100%;display:flex;flex-wrap: nowrap;align-items:center;margin-bottom:15px;" onclick="setBackgroundMode()"><ons-icon icon="fa-external-link" size="20px" style="color:var(--set-foreground-color);margin-right:5px;"></ons-icon> <p style="color:var(--set-foreground-color);font-weight:500;">${__('Battery Optimization settings')}</p></div>
                            <div style="width:100%;display:flex;flex-wrap: nowrap;align-items:center;margin-bottom:15px;" onclick="cordova.plugins.diagnostic.switchToSettings(function(){}, function(){});"><ons-icon icon="fa-external-link" size="20px" style="color:var(--set-foreground-color);margin-right:5px;"></ons-icon> <p style="color:var(--set-foreground-color);font-weight:500;">${__('App settings page')}</p></div>                            
                            <p>${__('Set notifications so you dont miss any notification sent to the app. In the app settings, tap on Notifications and turn on all notifications options. In the notification categories section, tap on each category and ensure all options are turned on.')}</p>
                            <p>${__('In some cases you may not be able to receive trip requests. This might be because you have not submitted a required document, your submitted document is under review or there is insufficient funds in your app wallet.')}</p>
                            <p>${__('Tap the menu button on the top left of the screen, tap your profile picture, tap documents and ensure you submit any required document. Submitted documents will be reviewed and approved before you can go online and start receiving trips.')}</p>
                            <p>${__('To add funds to your app wallet, tap the menu button on the top left of the screen, tap wallet. Go to the fund wallet section and enter the amount of money you want to add and then tap the Pay button. Follow the instructions on the screen to add funds to your wallet.')}</p>
                            <p>${__('For more help topics, go to the support section of the app. You can also contact us directly.')}</p>
                            <p>${__('Thank you and drive safely.')}</p>
                            
                        `;
    let options = {
            name : "quickstart", //name of the help tip
            title : __("Quick Start Guide"), //Title displayed on the Help tip dialog
            image : "img/quickstartguide.png", //image url of the help tip dialog. leave blank to use a default image
            content : help_tip_content, //Array of string content that make up the body text of the help tip
            button_text : __('OK') //text displayed on the OK button of the help tip dialog
        }

    

    
    
    let response = await showHelptTip(options);

    if(response.hasOwnProperty('error'))return;

}



function helpTipStatus(help_tip_name, mode = 0){

    let shown_help_tips = localStorage.getObject('shownhelptips');
    let help_tip_found = false;

    if(mode){

        //add help tip to shown list

        if(shown_help_tips){

            shown_help_tips.forEach(function(val,indx){
                if(val == help_tip_name){
                    help_tip_found = true; //already added.
                }
            })

            if(help_tip_found)return true;

            let shown_help_tips_list = shown_help_tips.push(help_tip_name);
            localStorage.setObject('shownhelptips', shown_help_tips_list);

        }else{
            let shown_help_tips_list = [help_tip_name];
            localStorage.setObject('shownhelptips', shown_help_tips_list);
        }

        return true;

    }

    

    if(shown_help_tips){
        shown_help_tips.forEach(function(val,indx){
            if(val == help_tip_name){
                help_tip_found = true;
            }
        })

        if(help_tip_found)return true;
    }

    return false;
}


function showHelptTip(options){
    
    let res = new Promise(function(resolve,reject){
        
        if(typeof showHelptTip.timer == 'undefined'){
            showHelptTip.timer = 0; //declare a static variiable
        }

        if(typeof showHelptTip.counter == 'undefined'){
            showHelptTip.counter = 0; //declare a static variiable
        }

        const COUNTDOWN_LIMIT = 1;

        clearInterval(showHelptTip.timer);
        showHelptTip.counter = 0;

        if(helpTipStatus(options.name)){
            //Only handle callback if Help tip has already been shown
            resolve({success : 1});
            return;
        }
        
        $('#helptipdlg').attr('title',options.title);
        $('#help-tip-img').attr('src',options.image ? options.image : "img/help-tip-img.png");

        
        $('#help-tip-content').html(options.content);

        $('#help-tip-btn').text(options.button_text + " " + `(${COUNTDOWN_LIMIT})`);
        $('#help-tip-btn').prop("disabled", true);

        
        document.querySelector('#helptipdlg').show();
        $('#help-tip-content').scrollTop(0);

        $('#help-tip-btn').off().on('click', function(){
            document.querySelector('#helptipdlg').hide();
            if($('#hide-help-tip').prop('checked'))helpTipStatus(options.name,1);
            resolve({success : 1});
        });

        $('#help-tip-close-btn').off().on('click', function(){
            document.querySelector('#helptipdlg').hide();
            resolve({error : 1});
        });

        showHelptTip.timer = setInterval(function(){
            showHelptTip.counter++;        
            let countdown_val = COUNTDOWN_LIMIT - showHelptTip.counter;
            $('#help-tip-btn').text(options.button_text + " " + `(${countdown_val})`);

            if(showHelptTip.counter >=COUNTDOWN_LIMIT ){
                $('#help-tip-btn').prop("disabled", false);
                $('#help-tip-btn').text(options.button_text);
                clearInterval(showHelptTip.timer);
            }

        },1000);
    });

    return res;
    
        
}