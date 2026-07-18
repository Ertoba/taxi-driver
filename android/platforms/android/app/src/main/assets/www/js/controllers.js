/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

window.myApp = {};



myApp.controllers = {

  //////////////////////////
  //Page Controller: Runs code for each page pushed to the navigator  //
  //////////////////////////
  

  mappage: function(page) {

    
     
               
    
    // Set button functionality to open/close the menu.
    page.querySelector('#menubtn').onclick = function() {

      
      $('#user-menu-photo').attr('src',userprofileinfo.photo);
      
      document.querySelector('#mySplitter').left.toggle();
      document.querySelector('#users-name').innerHTML = userprofileinfo.firstname + " " + userprofileinfo.lastname;
      var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
      wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;      
      document.querySelector('#users-wallet').innerHTML = __("Wallet Balance") + ": " + city_curency_symbol + wallet_amount_currency_converted;      
      
    };


    

    



    document.querySelector('#mySplitter').addEventListener('preopen', function(event) {
      side_menu_state = 1;
    });


    document.querySelector('#mySplitter').addEventListener('preclose', function(event) {
      side_menu_state = 0;
    })
    
    

    

    
    
  },


  notificationspage: function(page){
    translateElements('notifpg');
    $('#notification-item-list').html(notifications_data);

  },

  chatsup: function(page){
    translateElements('chatsup');

    get_chat_support_msg();

    updateChatSupportMsg();

  },

  earnings: function(page){

    translateElements('earngs');


    if(earnings_data){
      //$("#day-earnings").html(earnings_data);
    }    
    
    
    if(day_total_earnings != ''){
      $("#day-total-earning").html(day_total_earnings);
    }


    
    var current_dt = new Date();
                
    var c_year = current_dt.getFullYear();
    var c_month = current_dt.getMonth() + 1;
    var c_day = current_dt.getDate();
    
        
    
    if(c_day < 10){
      c_day = '0' + c_day;
    }

    if(c_month < 10){
      c_month = '0' + c_month;
    }

    //$('#earning-day').html(month_names[c_month-1] + ' ' + c_day + ', ' + c_year);

    let res = getDateWeekStartEnd(c_year + '-' + c_month + '-' + c_day);

    //$('#earning-day').html(`${res.start_day} ${res.start_date} - ${res.end_day} ${res.end_date}`);

    let dates_arr = [];
    let days_arr = [];
    let months_arr = [];
    let years_arr = [];

    let start_date_month_num_days = getNumDaysInMonth(res.start_month,res.start_year);
    let days_abbr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    if(parseInt(res.start_date) < parseInt(res.end_date)){
      for(let x = parseInt(res.start_date); x <= parseInt(res.end_date);x++){
        dates_arr.push(x);
        months_arr.push(res.start_month);
        years_arr.push(res.start_year);
        let cur_day = new Date(`${res.start_year}-${res.start_month}-${x}`).getDay();
        days_arr.push(days_abbr[cur_day]);
        
      }
    }else{
      for(let x = parseInt(res.start_date); x <= start_date_month_num_days;x++){
        dates_arr.push(x);
        months_arr.push(res.start_month);
        years_arr.push(res.start_year);
        let cur_day = new Date(`${res.start_year}-${res.start_month}-${x}`).getDay();
        days_arr.push(days_abbr[cur_day]);
      }

      for(let y = 1; y <= parseInt(res.end_date);y++){
        dates_arr.push(y);
        months_arr.push(res.end_month);
        years_arr.push(res.end_year);
        let cur_day = new Date(`${res.end_year}-${res.end_month}-${y}`).getDay();
        days_arr.push(days_abbr[cur_day]);        
      }

    }

    $('.day-earn-bars').css('height', '0%');

    for(let v = 0;v < 7;v++){
      $(`#day-earn-bar-${v} .date-earn`).html(dates_arr[v]);
      $(`#day-earn-bar-${v} .day-earn`).html(days_arr[v]);
    }

    

    getEarning(res,c_year + '-' + c_month + '-' + c_day);

    //getEarning('2019-01-21');

    $('#sel-earning-day').off("click").on('click', function(){
      if(device_ready){
          cordova.plugins.DateTimePicker.show({
            mode : "date",
            date : cdate,
            allowOldDates : true,
            allowFutureDates : false,
            minuteInterval : 10,
            local : "EN",
            okText : __("OK"),
            cancelText : __("Cancel"),
            android : {
                        theme : 0,
                        calender : true,
                        is24HourView : false
            },
            success : function(newDate){
                    cdate = newDate;
                    current_dt = [];
                    current_dt = new Date(newDate);
                    var c_year = current_dt.getFullYear();
                    var c_month = current_dt.getMonth() + 1;
                    var c_day = current_dt.getDate();
                    var c_day_week = current_dt.getDay();
                    var c_hours = current_dt.getHours();
                    var c_min = current_dt.getMinutes();

                    if(c_hours < 10){
                      c_hours = '0' + c_hours;
                    }

                    if(c_min < 10){
                      c_min = '0' + c_min;
                    }


                    if(c_day < 10){
                      c_day = '0' + c_day;
                    }

                    if(c_month < 10){
                      c_month = '0' + c_month;
                    }

                    let res = getDateWeekStartEnd(c_year + '-' + c_month + '-' + c_day);

                    
                    //$('#earning-day').html(`${res.start_day} ${res.start_date} - ${res.end_day} ${res.end_date}`);

                    getEarning(res,c_year + '-' + c_month + '-' + c_day);
                    
                    
            },
            cancel : function(){
                return;
            },
            error: function(){
                return;
            }
        })
      }

    });

  },

  loginpage: function(page){
    /* alert("loaded"); */
    translateElements('login');

    $('#current-default-language').html(selected_lang.name);

    if(carrier_country_code){
      var dial_code = country_dial_code_data[carrier_country_code].dial_code;
      if(dial_code){          
          user_country_dial_code = dial_code;
          $('#country-flag').attr('class', 'iti__flag iti__' + carrier_country_code);
          $('#country-flag').data('country', carrier_country_code)
          $('#tel-code').html(' +' + dial_code);
          $('#tel-code').data('dialcode', dial_code);
          $('#tel-code').data('country', carrier_country_code);

      }
    }

    $('#login-phone').off('keyup').on('keyup', function(){
      $('#loginerrormsg').html('');
    })
  },


  signuppage: function(page){
    /* alert("loaded"); */
    translateElements('signup');

    $('#firstname').val(driver_registration_data.firstname);
    $('#lastname').val(driver_registration_data.lastname);
    $('#address').val(driver_registration_data.address);
    $('#phone').val(driver_registration_data.phone);
    $('#reg_email').val(driver_registration_data.email);
    $('#reg_password').val(driver_registration_data.password);
    $('#reg_rpassword').val(driver_registration_data.password);
    

    if(driver_registration_data.country_2c_code){
      $('#country-flag-reg').attr('class', 'iti__flag iti__' + driver_registration_data.country_2c_code);
      $('#tel-code-reg').html(' +' + driver_registration_data.country_call_code);
    }else{
      if(carrier_country_code){
        var dial_code = $("li[data-country-code='" + carrier_country_code + "']").data('dial-code');
        if(dial_code){          
            user_country_dial_code = dial_code;
            $('#country-flag-reg').attr('class', 'iti__flag iti__' + carrier_country_code);
            $('#country-flag-reg').data('country', carrier_country_code)
            $('#tel-code-reg').html(' +' + dial_code);
            $('#tel-code-reg').data('dialcode', dial_code);
  
        }
      }
    }
  },

  
  aboutapp : function(page){
    translateElements('aboutapp');
    if(!aboutpage_content == ''){
      $('#aboutpage-content').html(aboutpage_content);
      return;
    }
    
    getuserinfopages();
    
  },

  walletpage : function(page){
    translateElements('walletpg'); 
  },


  walletbalance: function(page){
    translateElements('walletbl'); 
    var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
    wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;

    $('#walletbal').html(city_curency_symbol + wallet_amount_currency_converted); //show amount    

    if(app_settings.default_payment_gateway == 'paymob'){
        $('#kiosk-mode-option').show();
    }else{
      $('#kiosk-mode-option').hide();
    }
    
    let topup_buttons_html = '';
    if(app_settings.wallet_topup_presets == ''){
        $('#wallet-preset-buttons').hide();
    }else{
      let wallet_topup_preset_string = app_settings.wallet_topup_presets;
      let wallet_topup_preset_array = wallet_topup_preset_string.split('|');
      if(typeof wallet_topup_preset_array == 'object'){
        
        wallet_topup_preset_array.forEach(function(val,indx){
          let topup_amount = val.trim();
          if(indx < 4){
            topup_buttons_html += `<ons-button style="border: thin solid #ccc;margin-right:20px;color: #777;font-weight: bold;" onclick="$('#fundAmount').val('${topup_amount}');showPaymentGateways();" modifier="outline">${topup_amount}</ons-button>`;
          }
          
        })
        $('#wallet-preset-buttons').html(topup_buttons_html);
      }else{
        $('#wallet-preset-buttons').hide();
      }
    }
    
  },

  termsandprivacy: function(page){
    translateElements('termsp'); 
      if(!terms_and_privacy_content == ''){
        $('#privacy-content').html(terms_and_privacy_content);
        return;
      }
      
      getuserinfopages();
  },

 

  helpcategories: function(page){
      translateElements('helpcat'); 
      if(!help_categories == ''){
        $('#help-cat-content').html(help_categories);
        return;
      }
      
      gethelpdata();
  },

  softwarelicense: function(){
    translateElements('softlice');
  },

  infopage  : function(){
    translateElements('infopg'); 
  },

  helptopics: function(page){
    $('#help-topics-title').html(page.data.page_title);
    $('#help-topics-content').html(page.data.topics_list);
    return;
  }
  ,

  helpcontent: function(page){
    $('#help-content-title').html(page.data.help_content_title);
    if(typeof help_topics_contents === 'object' && help_topics_contents.hasOwnProperty(page.data.help_content_id)){
      $('#help-content').html(help_topics_contents[page.data.help_content_id]);
      return;
    }

    gethelpcontent(page.data.help_content_id);
      
  },


  profilepage:function(page){

    translateElements('profilepg'); 

    let user_doc_data = userprofileinfo.user_docs;
    let user_doc_required = 0;

    let bank_names_and_codes_string = app_settings.default_banks_and_codes;
    if(bank_names_and_codes_string.trim() == ""){
      $('#profile-bank-acc-details').hide();
    }else{
      $('#profile-bank-acc-details').show();
    }
    
    $('#doc-required-notif').hide();
    $('#doc-required-notif').html('');

    if(userprofileinfo.bank_acc_num){      
      $('#bank-required-notif').hide();
    }else{
      $('#bank-required-notif').html(`<ons-icon icon='fa-exclamation-circle' size='10px' style='color:red;'></ons-icon> ${__('Required')}`);
      $('#bank-required-notif').show();
    }

    let city_name = routetariffs.result[userprofileinfo.city_id].cars[0].r_title;
    $('#driver-op-city').html(city_name);
    
    if(user_doc_data){
      for(var key in user_doc_data){
        let doc_data = user_doc_data[key];
        if(doc_data.doc_city == '0' || doc_data.doc_city == userprofileinfo.city_id){
          if(!doc_data.hasOwnProperty('u_doc_status') || doc_data.u_doc_status == null || doc_data.u_doc_status == 0 ||doc_data.u_doc_status == 1 || doc_data.u_doc_status == 2){
            user_doc_required = 1;
            $('#doc-required-notif').show();
            $('#doc-required-notif').html(`<ons-icon icon='fa-exclamation-circle' size='10px' style='color:red;'></ons-icon> ${__('Required')}`);     
            break;
          }
          
        }

      }
    }

    $('#user-default-lang').html(selected_lang.name);   

    if(typeof userprofileinfo === 'object'){        
      
      $('#firstname').html(userprofileinfo.firstname);
      $('#lastname').html(userprofileinfo.lastname);
      /* $('#email').val(userprofileinfo.email);
      $('#address').html(userprofileinfo.address);
      $('#phone').val(userprofileinfo.phone);
      $('#carcat').val(userprofileinfo.carcat);
      $('#city').val(userprofileinfo.city);
      $('#refcode_info').html(userprofileinfo.ref_code); */
      $('#driver-rating').attr("src","img/rating-" + userprofileinfo.driver_rating + ".png");
      $('#driver-photo').attr('src',userprofileinfo.photo);

      $('#driver-trips-completed').html(userprofileinfo.completed_rides);
      $('#driver-trips-cancelled').html(userprofileinfo.cancelled_rides);
      $('#driver-rejected-count').html(userprofileinfo.rejected_rides);

            
      return;
    }

  },  
  editprofile: function(){
    translateElements('editprofile');
    $('#user-edit-photo-img-preview').attr('src',userprofileinfo.photo);
    $('#editfirstname').val(userprofileinfo.firstname);
    $('#editlastname').val(userprofileinfo.lastname);
    $('#editphone').val(userprofileinfo.country_dial_code + userprofileinfo.phone);
  },

  editemail: function(){
    translateElements('editemail');
    $('#editemailinput').val(userprofileinfo.email);
  },
  verifyemailcode: function(page){
    translateElements('verifyemail');
    $('#verifyemailpagetitle').html(__('Enter the code sent to you at {---1}',[page.data.email]));
  },

  editpwd: function(){
    translateElements('editpwd');
    
    $('.pwd-user-input').off().on('keyup', function(){
        $('#pwderrormsg').hide();
        let pwd_inp_1 = $('#editpwdnew').val();
        let pwd_inp_2 = $('#editpwdconfirm').val();

        if(pwd_inp_1.length < 8 || pwd_inp_2.length < 8){
          $('#edit-pwd-btn').prop('disabled', true);
          return;
        }

        $('#edit-pwd-btn').prop('disabled', false);
      
    });
  },
  editdocs: function(){
    translateElements('editdocs');
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
      $('#documents-content').html(`<p style='width:100%;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)'>${__('No document is required from you')}</p>`);
      return;
    }

    

    
    let doc_list_items = '';
    for(var x in user_doc_data){
      let doc_item = user_doc_data[x];
      doc_status_indicator = '';
      if(!(doc_item.doc_city == '0' || doc_item.doc_city == userprofileinfo.city_id))continue;
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
    $('#documents-content').html(doc_items_list_html);

    getUserDocs();

  },

  savedoc: function(page){
    translateElements('savedoc');

    let user_doc_data = userprofileinfo.user_docs;
    let doc_item = user_doc_data[page.data.doc_id];

    let doc_status_indicator =  "";

    if(doc_item.hasOwnProperty('u_doc_status')){
      if(doc_item.u_doc_status == null){
        $('#user-doc-status').html(`<ons-icon icon='fa-exclamation-circle' size='14px'></ons-icon> ${__('Required')}`);
        $('#user-doc-status').css('background-color', 'red');        
      }else if(doc_item.u_doc_status == 0){
        $('#user-doc-status').html(`<ons-icon icon='fa-clock' size='14px'></ons-icon> ${__('In review')}`);
        $('#user-doc-status').css('background-color', '#55557f');
      }else if(doc_item.u_doc_status == 1){
        $('#user-doc-status').html(`<ons-icon icon='fa-times-circle' size='14px'></ons-icon> ${__('Not approved')}`);
        $('#user-doc-status').css('background-color', 'red');
      }else if(doc_item.u_doc_status == 2){
        $('#user-doc-status').html(`<ons-icon icon='fa-calender' size='14px'></ons-icon> ${__('Expired')}`);
        $('#user-doc-status').css('background-color', 'red');
      }else{
        $('#user-doc-status').html(`<ons-icon icon='fa-check-circle' size='14px'></ons-icon> ${__('Approved')}`);
        $('#user-doc-status').css('background-color', 'green');
      }
  }

    if(doc_item.u_doc_img == null){
      if(doc_item.doc_type == 0){
        $('#user-doc-img-preview').attr('src','img/personal-doc-sample.png');
      }else{
        $('#user-doc-img-preview').attr('src','img/vehicle-doc-sample.png');
      }      
    }else{
      $('#user-doc-img-preview').attr('src', doc_item.u_doc_img);
    }

    $('#save-doc-title').html(doc_item.title);
    $('#save-doc-desc').html(doc_item.doc_desc);

    if(doc_item.doc_expiry == 1){

      $('#user-doc-expiry-container').show();
      if(doc_item.u_doc_expiry_date)$('#save-doc-expiry-date').val(doc_item.u_doc_expiry_date);

      $('#save-doc-expiry-date').off("click").on('click', function(){
        
        if(device_ready){
            cordova.plugins.DateTimePicker.show({
              mode : "date",
              date : new Date,
              allowOldDates : false,
              allowFutureDates : true,
              minuteInterval : 10,
              local : "EN",
              okText : __("OK"),
              cancelText : __("Cancel"),
              android : {
                          theme : 0,
                          calender : true,
                          is24HourView : false
              },
              success : function(newDate){
                      
                      current_dt = new Date(newDate);

                      let c_year = current_dt.getFullYear();
                      let c_month = current_dt.getMonth() + 1;
                      let c_day = current_dt.getDate();
                     

                      
                      let c_day_str;
                      let c_month_str;

                      

                      if(c_day < 10){
                        c_day_str = '0' + c_day;
                      }else{
                        c_day_str = c_day;
                      }

                      if(c_month < 10){
                        c_month_str = '0' + c_month;
                      }else{
                        c_month_str = c_month;
                      }

                      let user_set_date = c_year + '-' + c_month_str + '-' + c_day_str;
                      $('#save-doc-expiry-date').val(user_set_date);

                      
                      
              },
              cancel : function(){
                  return;
              },
              error: function(){
                  return;
              }
          })
        }

      });
    }

    if(doc_item.doc_id_num == 1){
      $('#save-doc-input-title').html(doc_item.doc_id_num_title);
      $('#save-doc-input-desc').html(doc_item.doc_id_num_desc);
      $('#user-doc-id-input-container').show();
      if(doc_item.u_doc_id_num)$('#save-doc-id-input').val(doc_item.u_doc_id_num);
    }


    $('#save-user-doc-btn').off('click').on('click', function(){

        $('#savedocvalidationmsg').html('');

        if(doc_item.u_can_edit == 0){
          $('#savedocvalidationmsg').html(__('You are not allowed to make changes to this document at this time'));
          return;
        }

        let doc_img_data = $('#user-doc-img-preview').data('selectimgdata');
        let doc_expiry_date = $('#save-doc-expiry-date').val();
        let doc_id_input = $('#save-doc-id-input').val();

        if(!doc_img_data && doc_item.u_doc_img == null){
          $('#savedocvalidationmsg').html(__('Document image is required'));
          return;
        }

        if(doc_item.doc_expiry == 1){
          if(!doc_expiry_date){
            $('#savedocvalidationmsg').html(__('Document expiry date is required'));
            return;
          }
        }


        if(doc_item.doc_id_num == 1){
          if(!doc_id_input){
            $('#savedocvalidationmsg').html(__('Required information missing'));
            return;
          }
        }



        loading.show();
          
        var post_data = {'action':'saveUserDoc','doc_id' : page.data.doc_id,'doc_img': doc_img_data, 'doc_expiry' : doc_expiry_date, 'doc_id_input' : doc_id_input};

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
                  $('#savedocvalidationmsg').html(data_obj.error);                  
                  return;
                }

                if(data_obj.hasOwnProperty('success')){

                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_img'] = data_obj.doc_img_url;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_expiry_date'] = doc_expiry_date;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_id_num'] = doc_id_input;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_status'] = 0;


                  $(`#doc-status-ind-${page.data.doc_id}`).css('color','black');
                  $(`#doc-status-ind-${page.data.doc_id}`).html(`<ons-icon icon='fa-clock' size='10px' style='color:#55557f;'></ons-icon> ${__('In review')}`); //update doc status indicator

                  document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){

                    ons.notification.toast(__("Document information has been saved"),{
                        timeout: 1000
                    });

                    getUserDocs();
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
    })

  },
  selectlang: function(page){

    translateElements('selectlang');

    let lang_list_items = "";
    available_langs.forEach(function(val,indx){
      let opt_sel = '';
      if(val.code == selected_lang.code){
        opt_sel = "<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>";
      }
      
      lang_list_items += `<ons-list-item data-langname="${val.name.toLowerCase()}" data-langindx="${indx}" data-langcode="${val.code}" tappable class="default-language-items" style="cursor: pointer;min-height: 70px;" >
                          <div class="left">
                            <div class="iti__flag iti__${val.country}" style="background-color: white;transform:scale(1.5)"></div>
                          </div>
                          <div class="center">
                            <span style="font-size: 16px;font-weight: 500;">${val.name}</span>
                          </div>
                          <div class="right">
                              ${opt_sel}
                          </div>
                        </ons-list-item>`;
    
    })

    let lang_items_list_html = `<ons-list>${lang_list_items}</ons-list>`;
    $('#language-list-items').html(lang_items_list_html);

    $('#search-lang').off().on('keyup', function(){
        let content = $(this).val();
        if(!content){
          $('.default-language-items ').show(); 
          return;         
        }

        content = content.toLowerCase();

        if(!$(`.default-language-items[data-langname*=${content}]`).length)return;

        $('.default-language-items').hide();

        $(`.default-language-items[data-langname*=${content}]`).show(); 
        
    })

    $('.default-language-items').off().on('click', function(e){
      e.preventDefault();
      let sel_lang_indx = $(this).data('langindx');
      let sel_lang_code = $(this).data('langcode');

      if(selected_lang.code == sel_lang_code)return;

      selected_lang = available_langs[sel_lang_indx];

      localStorage.setObject('lang',selected_lang);
      
      //restart App

      window.location.reload();
      return;
    })

  },
  editcity: function(){

      translateElements('editcity');
            
      let city_ids = routetariffs.result.city_id;
      let city_names = routetariffs.result.city_name;
      let city_list_items = "";
      

      city_ids.forEach(function(val,indx){
        let opt_sel = '';
        if(val == userprofileinfo.city_id){
          opt_sel = "<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>";
        }
        
        city_list_items += `<ons-list-item data-cityname="${city_names[indx].toLowerCase()}" data-cityid="${val}" tappable class="default-city-items" style="cursor: pointer;min-height: 70px;" >
                            <div class="left">
                              <ons-icon icon='fa-map-marker' size='18px' style='color:black;'></ons-icon>
                            </div>
                            <div class="center">
                              <span style="font-size: 16px;font-weight: 500;">${city_names[indx]}</span>
                            </div>
                            <div class="right">
                                ${opt_sel}
                            </div>
                          </ons-list-item>`;
      
      })

      let city_items_list_html = `<ons-list>${city_list_items}</ons-list>`;
      $('#city-list-items').html(city_items_list_html);

      
      $('#search-city').off().on('keyup', function(){
        let content = $(this).val();
        if(!content){
          $('.default-city-items ').show(); 
          return;         
        }

        content = content.toLowerCase();

        $('.default-city-items').hide();

        $(`.default-city-items[data-cityname*=${content}]`).show(); 
        
      })

      $('.default-city-items').off().on('click', function(e){

        e.preventDefault();
        let sel_city_id = $(this).data('cityid');

        if(userprofileinfo.city_id == sel_city_id)return;

        //check if driver vehicle category is in the city he want to switch to

        let city_cars =  routetariffs.result[sel_city_id].cars;

        let driver_car_cat_found = 0;

        for(var key in city_cars){

          if(city_cars[key].ride_id == userprofileinfo.driver_ride_id){
            driver_car_cat_found = 1;
            break;
          }
            
        }

        if(!driver_car_cat_found){
          ons.notification.alert(__("Your vehicle category is not available in this city"), {title:"",buttonLabels:['OK'],});
          return;
        }else{
          updateDriverCity(sel_city_id);
        }
        
        
        
      })
            
      

  },
  editcar: function(page){

      let driver_city_cars = routetariffs.result[userprofileinfo.city_id].cars;
      let driver_car_details;
      let city_vehicle_list = '';

      translateElements('editcar');

      driver_city_cars.forEach(function(val,indx){
        if(val.ride_id == userprofileinfo.driver_ride_id){
          driver_car_details = val;
        }
        city_vehicle_list += `<ons-list-item data-value="${indx}" data-text="${val.ride_type}" class="sel-list-item">
                                  
                                  <div class="left">
                                      <img src="${$(`#uniq-car-type-id-${val.ride_id}`).attr('src')}" style="width:60px;" />
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val.ride_type}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${val.ride_id}">
                                      
                                  </div>
                              </ons-list-item>`;
        
      });

      if(!driver_car_details)return;

      city_vehicle_list = `<ons-list>${city_vehicle_list}</ons-list>`;

      $('#editcarimg').attr('src', $(`#uniq-car-type-id-${driver_car_details.ride_id}`).attr('src'));
      $('#editcardesc').html(driver_car_details.ride_desc);

      let cur_date = new Date();
      let c_hours = cur_date.getHours();
      let set_shour = parseInt(routetariffs.result.nighttime.start_hour);
      let set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

      if(c_hours >= set_shour || c_hours <= set_ehour){
        //Night time range
        $('#vehicle-detail-min-fare').html("" + driver_car_details.symbol + (parseFloat(driver_car_details.npickup_cost) + parseFloat(driver_car_details.ndrop_off_cost)));
        $('#vehicle-detail-cpk').html(driver_car_details.symbol + driver_car_details.ncost_per_km);
        $('#vehicle-detail-cpm').html(driver_car_details.symbol + driver_car_details.ncost_per_minute);

      }else{
        //day time
        $('#vehicle-detail-min-fare').html("" + driver_car_details.symbol + (parseFloat(driver_car_details.pickup_cost) + parseFloat(driver_car_details.drop_off_cost)));
        $('#vehicle-detail-cpk').html(driver_car_details.symbol + driver_car_details.cost_per_km);
        $('#vehicle-detail-cpm').html(driver_car_details.symbol + driver_car_details.cost_per_minute);
      }

      $('#vehicle-detail-num-seats').html(driver_car_details.num_seats);

      $('#editcarcat').val(driver_car_details.ride_type);
      $('#editcarcat').data('carcat',driver_car_details.ride_id); 

      $('#editcaryear').val(userprofileinfo.car_year);
      $('#editcaryear').data('caryear',userprofileinfo.car_year);

      $('#editcarmodel').val(userprofileinfo.car_model);
      $('#editcarplatenum').val(userprofileinfo.car_plate_num);

      $('#editcarcolor').val(userprofileinfo.car_color);
      $('#editcarcolor').data('carcolor',userprofileinfo.car_color);

      



      $('#editcarcat').off().on('click', function(){
          let cur_ride_id = $(this).data('carcat');
          $('#customselectcontent').empty();
          $('#customselectcontent').html(city_vehicle_list);
          
          customItemSelect(cur_ride_id,__('Vehicle category'), function(value){
              $('#editcarcat').val(driver_city_cars[value].ride_type);
              $('#editcarcat').data('carcat',driver_city_cars[value].ride_id);

              $('#editcarimg').attr('src', $(`#uniq-car-type-id-${driver_city_cars[value].ride_id}`).attr('src'));
              $('#editcardesc').html(driver_city_cars[value].ride_desc);

              if(c_hours >= set_shour || c_hours <= set_ehour){
                //Night time range
                $('#vehicle-detail-min-fare').html("" + driver_city_cars[value].symbol + (parseFloat(driver_city_cars[value].npickup_cost) + parseFloat(driver_city_cars[value].ndrop_off_cost)));
                $('#vehicle-detail-cpk').html(driver_city_cars[value].symbol + driver_city_cars[value].ncost_per_km);
                $('#vehicle-detail-cpm').html(driver_city_cars[value].symbol + driver_city_cars[value].ncost_per_minute);
        
              }else{
                //day time
                $('#vehicle-detail-min-fare').html("" + driver_city_cars[value].symbol + (parseFloat(driver_city_cars[value].pickup_cost) + parseFloat(driver_city_cars[value].drop_off_cost)));
                $('#vehicle-detail-cpk').html(driver_city_cars[value].symbol + driver_city_cars[value].cost_per_km);
                $('#vehicle-detail-cpm').html(driver_city_cars[value].symbol + driver_city_cars[value].cost_per_minute);
              } 

              $('#vehicle-detail-num-seats').html(driver_city_cars[value].num_seats);

          });
      })

      //generate years data
      let years_list_data = '';

      for(var z = 1990; z < 2041;z++){

        years_list_data += `<ons-list-item data-value="${z}" class="sel-list-item">
                                  
                                  <div class="left">
                                    <ons-icon icon='fa-circle' size='14px' style='color:#ccc;'></ons-icon>
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${z}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${z}">
                                      
                                  </div>
                              </ons-list-item>`;
        
      };

      years_list_data = `<ons-list>${years_list_data}</ons-list>`;
      

      $('#editcaryear').off().on('click', function(){

        let cur_ride_year = $(this).data('caryear');
        $('#customselectcontent').empty();
        $('#customselectcontent').html(years_list_data);

        customItemSelect(cur_ride_year,__('Vehicle model year'), function(value){
          $('#editcaryear').val(value);
          $('#editcaryear').data('caryear',value);
        });
        

      })

      //generate colors list

      let car_color_arr = [
        {color: "Black",value : "#000000"},
        {color: "Brown",value : "#aa5500"},
        {color: "Red",value : "#ff0000"},
        {color: "Orange",value : "#ffaa00"},
        {color: "Yellow",value : "#ffff00"},
        {color: "Green",value : "#00aa00"},
        {color: "Blue",value : "#0000ff"},
        {color: "Sky-Blue",value : "#00aaff"},
        {color: "Pink",value : "#ff00ff"},
        {color: "Purple",value : "#aa00ff"},
        {color: "Grey",value : "#989898"},
        {color: "White",value : "#ffffff"},
        {color: "Gold",value : "#adad00"},
        {color: "Silver",value : "#e2e2e2"}
    ];

    let colors_list_data = '';

    for(var w = 0; w < car_color_arr.length;w++){
      color_item = car_color_arr[w];
      colors_list_data += `<ons-list-item data-value="${color_item.color}" class="sel-list-item">
                                
                                <div class="left">
                                  <ons-icon icon='fa-square' size='20px' style='color:${color_item.value};'></ons-icon>
                                </div>
                                <div class="center">
                                  <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${__(color_item.color)}</span>
                                </div>
                                <div class="right" id="list-item-sel-${color_item.color}">
                                    
                                </div>
                            </ons-list-item>`;
      
    };

    colors_list_data = `<ons-list>${colors_list_data}</ons-list>`;
    

    $('#editcarcolor').off().on('click', function(){

      let cur_ride_color = $(this).data('carcolor');
      $('#customselectcontent').empty();
      $('#customselectcontent').html(colors_list_data);

      customItemSelect(cur_ride_color,__('Vehicle paint color'), function(value){
        $('#editcarcolor').val(value);
        $('#editcarcolor').data('carcolor',value);
      });
      

    })

      

      
      


  },
  editbank: function(){
    translateElements('editbank');

    //generate bank list items
    let banks_and_codes_html = '';
    let bank_names_and_codes_string = app_settings.default_banks_and_codes;
    let user_bank_in_default = false;
    let default_banks_and_codes_obj = {};
    

    if(bank_names_and_codes_string.trim() != ''){
      let bank_names_and_codes_array = bank_names_and_codes_string.split('|');
    
      if(!!bank_names_and_codes_array){
        bank_names_and_codes_array.forEach(function(val,index){
          let name_and_code_arr = val.split('->');
          default_banks_and_codes_obj[name_and_code_arr[1]] = name_and_code_arr[0];
          if(userprofileinfo.bank_code == name_and_code_arr[1])user_bank_in_default = true;
          //banks_and_codes_html += `<option value='${name_and_code_arr[1]}'>${name_and_code_arr[0]}</option>`;
          banks_and_codes_html += `<ons-list-item data-value="${name_and_code_arr[1]}" class="sel-list-item">
                                
                                        <div class="left">
                                          <ons-icon icon='fa-circle' size='14px' style='color:#ccc;'></ons-icon>
                                        </div>
                                        <div class="center">
                                          <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${name_and_code_arr[0]}</span>
                                        </div>
                                        <div class="right" id="list-item-sel-${name_and_code_arr[1]}">
                                            
                                        </div>
                                    </ons-list-item>`;
        });
        default_banks_and_codes_obj['xxx'] = __('Other bank...');
        banks_and_codes_html += `<ons-list-item data-value="xxx" class="sel-list-item">
                                
                                        <div class="left">
                                          <ons-icon icon='fa-circle' size='14px' style='color:#ccc;'></ons-icon>
                                        </div>
                                        <div class="center">
                                          <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${__('Other bank...')}</span>
                                        </div>
                                        <div class="right" id="list-item-sel-xxx">
                                            
                                        </div>
                                    </ons-list-item>`;
        
        banks_and_codes_html = `<ons-list>${banks_and_codes_html}</ons-list>`;

        if(user_bank_in_default){
          $('#selbankname').val(userprofileinfo.bank_name);
          $('#selbankname').data('bankcode',userprofileinfo.bank_code);
        }else{
          if(!userprofileinfo.bank_name){
            $('#selbankname').val('');
            $('#selbankname').data('bankcode','');
          }else{
            $('#selbankname').val(__('Other bank...'));
            $('#selbankname').data('bankcode','xxx');

            $('#otherbankname').val(userprofileinfo.bank_name);
            $('#otherbankcode').val(userprofileinfo.bank_code);

            $('#otherbankname').show();
            $('#otherbankcode').show();
          }         

        }
      }else{
        $('#selbankname').val(__('Other bank...'));
        $('#selbankname').data('bankcode','xxx');

        $('#otherbankname').val(userprofileinfo.bank_name);
        $('#otherbankcode').val(userprofileinfo.bank_code);

        $('#otherbankname').show();
        $('#otherbankcode').show();
      }
    }else{      
      $('#selbankname').val(__('Other bank...'));
      $('#selbankname').data('bankcode','xxx');

      $('#otherbankname').val(userprofileinfo.bank_name);
      $('#otherbankcode').val(userprofileinfo.bank_code);

      $('#otherbankname').show();
      $('#otherbankcode').show();
    }

    $('#bankaccountname').val(userprofileinfo.bank_acc_holder_name);
    $('#bankaccountnum').val(userprofileinfo.bank_acc_num);


    $('#selbankname').off().on('click', function(){

      let cur_bank_code = $(this).data('bankcode');
      $('#customselectcontent').empty();
      $('#customselectcontent').html(banks_and_codes_html);

      customItemSelect(cur_bank_code,__('Default banks'), function(value){
        $('#selbankname').val(default_banks_and_codes_obj[value]);
        $('#selbankname').data('bankcode',value);

        if(value == 'xxx'){
          $('#otherbankname').show();
          $('#otherbankcode').show();
        }else{
          $('#otherbankname').hide();
          $('#otherbankcode').hide();
        }
      });
      

    })    


  },

  settings: function(page){
    translateElements('settings');

    setInterval(function(){
      cordova.plugins.backgroundMode.isIgnoringBatteryOptimizations(function(isIgnoring){
        //console.log(isIgnoring);

        if(isIgnoring){
            $('#background-mode-status-ind').html("<ons-icon icon='fa-check-circle' size='20px' style='color:green;'></ons-icon>");
            cordova.plugins.backgroundMode.on('activate', function(){
                cordova.plugins.backgroundMode.disableWebViewOptimizations();
            });                                                
        }else{
          $('#background-mode-status-ind').html("<ons-icon icon='fa-times' size='20px' style='color:red;'></ons-icon>");

        }

      });
    },1000);    

    if(userprofileinfo.allow_alt_cars == 1){
      $('#alt-cars-status-ind').html("<ons-icon icon='fa-check-circle' size='20px' style='color:green;'></ons-icon>");
    }else{
      $('#alt-cars-status-ind').html("<ons-icon icon='fa-times' size='20px' style='color:red;'></ons-icon>");
    }
      

  },
  verifyemailcode: function(page){
    translateElements('verifyemail');
    $('#verifyemailpagetitle').html(__('Enter the code sent to you at {---1}',[page.data.email]));
  },

  verifyotpcode: function(page){
    translateElements('verifyotp');
    if(page.data.exists == 1){
      $('#verifyotppagetitle').html(__('Welcome back, {---1}',[page.data.user_firstname]));
      $('#log-in-pwd-btn-container').show();
    }else{
      $('#verifyotppagetitle').html('');
      $('#log-in-pwd-btn-container').hide();
    }

    if(page.data.whatsapp_auth_status == 1){
        $('#send-code-via-whatsapp-btn-container').show();
        $('#send-code-via-whatsapp-btn').data('wtsphonenum', page.data.whatsapp_auth_phonenum);
        $('#send-code-via-whatsapp-btn').data('wtsmsg', page.data.whatsapp_auth_msg);
        $('#send-code-via-whatsapp-btn').data('wtscode', page.data.whatsapp_auth_code);
    }else{
        $('#send-code-via-whatsapp-btn-container').hide();
    }

    
    $('#verifyotppagesubtitle').html(__('Enter the code sent to you at {---1}',[page.data.phone_num]));

    if(page.data.demo_otp == "123456"){
      $('#verifyotppagedemocode').show();
    }else{
      $('#verifyotppagedemocode').hide();
    }

    $('#resend-otp-btn').data('phonenumber',page.data.phone_num);

    $('#log-in-pwd-btn').data('cdc', page.data.country_dial_code);
    $('#log-in-pwd-btn').data('phonenuminp', page.data.phone_num_inp);
    $('#log-in-pwd-btn').data('phonenumnat', page.data.phone_num_nat);

          
    //initiate resend code button activate countdown    
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    $('#resend-otp-btn').text(__('Resend Code') + " " + countdown);
    resend_code_countdown_timer_handle = setInterval(function(){
      countdown--;
      if(countdown < 1){
          countdown = 0;
          resend_code_btn_status = 1;
          $('#resend-otp-btn').text(__('Resend Code'));
          clearInterval(resend_code_countdown_timer_handle);
          return;
      }

      $('#resend-otp-btn').text(__('Resend Code') + " " + countdown);
    
    },1000);
    

    $('#resend-otp-btn').off().on('click', function(){
        if(page.data.service == "firebase"){
          resendOTPCodeFirebase();
        }else{
          resendOTPCode();
        }
    })


  },


  loginpwd: function(page){
    translateElements('loginpwd');
    $('#loginpwdinp').off().on('keyup paste', function(){
      setTimeout(function(){
        $('#loginpwderrormsg').html('');

        if($('#loginpwdinp').val()){
          $('#login-pwd-btn').prop('disabled', false);
        }else{
          $('#login-pwd-btn').prop('disabled', true);
        }
      },50);
    })


    $('#login-pwd-btn').off().on('click', function(){

      let country_call_code = $('#log-in-pwd-btn').data('cdc');
      let phone = $('#log-in-pwd-btn').data('phonenuminp');
      let phone_formatted = $('#log-in-pwd-btn').data('phonenumnat');
      var password = $("#loginpwdinp").val();

      let rem_pwd = 0;

      if($('#login-remember-user-pwd').prop('checked')){
          rem_pwd = 1;        
      } 

      user_login_options = {country_call_code: country_call_code, phone : phone, phone_formatted : phone_formatted, password : password, code : null, fb_user_details : null,remember_pwd: rem_pwd};
      login();

    })

  },

  signuppage1: function(page){
    translateElements('signuppage1');
  },
  signuppage2: function(page){
    translateElements('signuppage2');
    if(user_reg_data.firstname){
      $('#regfirstname').val(user_reg_data.firstname);
    }


    if(user_reg_data.lastname){
      $('#reglastname').val(user_reg_data.lastname);
    }
  },

  signuppage3: function(){

      translateElements('signuppage3');

      let driver_city = 1;
      let city_ids = routetariffs.result.city_id;
      //let city_names = routetariffs.result.city_name;
      let city_list = '';

      if(user_reg_data.operation_city){
        driver_city = user_reg_data.operation_city;
        $('#regcity').val(routetariffs.result[driver_city].cars[0].r_title);
        $('#regcity').data('cityid',driver_city);
      }else{
        driver_city = 1;
        $('#regcity').val('');
        $('#regcity').data('cityid','');
      }


      
      

      //build city list

      city_ids.forEach(function(val,indx){

        let city_name = routetariffs.result[val].cars[0].r_title;

        
        city_list += `<ons-list-item data-value="${val}" data-text="${city_name}" class="sel-list-item">
                                  
                                  <div class="left">
                                    <ons-icon icon='fa-circle' size='14px' style='color:#ccc;'></ons-icon>
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${city_name}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${val}">
                                      
                                  </div>
                              </ons-list-item>`;
        
      });

      city_list = `<ons-list>${city_list}</ons-list>`;


      let driver_city_cars = routetariffs.result[driver_city].cars;
      let driver_car_details;
      let city_vehicle_list = '';

      driver_city_cars.forEach(function(val,indx){
        if(val.ride_id == user_reg_data.car_type){
          driver_car_details = val;
        }
        city_vehicle_list += `<ons-list-item data-value="${indx}" data-text="${val.ride_type}" class="sel-list-item">
                                  
                                  <div class="left">
                                      <img src="${$(`#uniq-car-type-id-${val.ride_id}`).attr('src')}" style="width:60px;" />
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val.ride_type}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${val.ride_id}">
                                      
                                  </div>
                              </ons-list-item>`;
        
      });

      

      city_vehicle_list = `<ons-list>${city_vehicle_list}</ons-list>`;

      

      let cur_date = new Date();
      let c_hours = cur_date.getHours();
      let set_shour = parseInt(routetariffs.result.nighttime.start_hour);
      let set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

      if(driver_car_details){
        $('#regcarimg').attr('src', $(`#uniq-car-type-id-${driver_car_details.ride_id}`).attr('src'));
        $('#regcardesc').html(driver_car_details.ride_desc);

        if(c_hours >= set_shour || c_hours <= set_ehour){
          //Night time range
          $('#reg-vehicle-detail-min-fare').html("" + driver_car_details.symbol + (parseFloat(driver_car_details.npickup_cost) + parseFloat(driver_car_details.ndrop_off_cost)));
          $('#reg-vehicle-detail-cpk').html(driver_car_details.symbol + driver_car_details.ncost_per_km);
          $('#reg-vehicle-detail-cpm').html(driver_car_details.symbol + driver_car_details.ncost_per_minute);

        }else{
          //day time
          $('#reg-vehicle-detail-min-fare').html("" + driver_car_details.symbol + (parseFloat(driver_car_details.pickup_cost) + parseFloat(driver_car_details.drop_off_cost)));
          $('#reg-vehicle-detail-cpk').html(driver_car_details.symbol + driver_car_details.cost_per_km);
          $('#reg-vehicle-detail-cpm').html(driver_car_details.symbol + driver_car_details.cost_per_minute);
        }

        $('#reg-vehicle-detail-num-seats').html(driver_car_details.num_seats);

        $('#regcarcat').val(driver_car_details.ride_type);
        $('#regcarcat').data('carcat',driver_car_details.ride_id); 
      }else{
        $('#regcarimg').attr('src', 'img/ride-sample.png');
        $('#regcardesc').html('');

        $('#reg-vehicle-detail-min-fare').html('xxxx');
        $('#reg-vehicle-detail-cpk').html('xxxx');
        $('#reg-vehicle-detail-cpm').html('xxxx');

        $('#reg-vehicle-detail-num-seats').html('xxxx');

        $('#regcarcat').val('');
        $('#regcarcat').data('carcat',''); 
      }

      if(user_reg_data.car_year){
        $('#regcaryear').val(user_reg_data.car_year);
        $('#regcaryear').data('caryear',user_reg_data.car_year);
      }else{
        $('#regcaryear').val('');
        $('#regcaryear').data('caryear','');
      }

      if(user_reg_data.car_model){
        $('#regcarmodel').val(user_reg_data.car_model);
      }else{
        $('#regcarmodel').val('');
      }

      if(user_reg_data.car_plate_num){
        $('#regcarplatenum').val(user_reg_data.car_plate_num);
      }else{
        $('#regcarplatenum').val('');
      }
      
      if(user_reg_data.car_color){
        $('#regcarcolor').val(__(user_reg_data.car_color));
        $('#regcarcolor').data('carcolor',user_reg_data.car_color);
      }else{
        $('#regcarcolor').val('');
        $('#regcarcolor').data('carcolor','');
      }

      
      $('#regcity').off().on('click', function(){

          let cur_city_id = $(this).data('cityid');
          $('#customselectcontent').empty();
          $('#customselectcontent').html(city_list);

          customItemSelect(cur_city_id,__('Select service city'), function(value){
            
            $('#regcity').val(routetariffs.result[value].cars[0].r_title);
            $('#regcity').data('cityid',value);

            $('#regcarimg').attr('src', 'img/ride-sample.png');
            $('#regcardesc').html('');

            $('#reg-vehicle-detail-min-fare').html('xxxx');
            $('#reg-vehicle-detail-cpk').html('xxxx');
            $('#reg-vehicle-detail-cpm').html('xxxx');

            $('#reg-vehicle-detail-num-seats').html('xxxx');

            $('#regcarcat').val('');
            $('#regcarcat').data('carcat',''); 

            
            driver_city_cars = routetariffs.result[value].cars;
            driver_car_details;
            city_vehicle_list = '';

            driver_city_cars.forEach(function(val,indx){
              
              city_vehicle_list += `<ons-list-item data-value="${indx}" data-text="${val.ride_type}" class="sel-list-item">
                                        
                                        <div class="left">
                                            <img src="${$(`#uniq-car-type-id-${val.ride_id}`).attr('src')}" style="width:60px;" />
                                        </div>
                                        <div class="center">
                                          <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val.ride_type}</span>
                                        </div>
                                        <div class="right" id="list-item-sel-${val.ride_id}">
                                            
                                        </div>
                                    </ons-list-item>`;
              
            });
            

            city_vehicle_list = `<ons-list>${city_vehicle_list}</ons-list>`; 
            

          });


      })



      $('#regcarcat').off().on('click', function(){
          let cur_ride_id = $(this).data('carcat');
          $('#customselectcontent').empty();
          $('#customselectcontent').html(city_vehicle_list);
          
          customItemSelect(cur_ride_id,__('Vehicle category'), function(value){
              $('#regcarcat').val(driver_city_cars[value].ride_type);
              $('#regcarcat').data('carcat',driver_city_cars[value].ride_id);

              $('#regcarimg').attr('src', $(`#uniq-car-type-id-${driver_city_cars[value].ride_id}`).attr('src'));
              $('#regcardesc').html(driver_city_cars[value].ride_desc);

              if(c_hours >= set_shour || c_hours <= set_ehour){
                //Night time range
                $('#reg-vehicle-detail-min-fare').html("" + driver_city_cars[value].symbol + (parseFloat(driver_city_cars[value].npickup_cost) + parseFloat(driver_city_cars[value].ndrop_off_cost)));
                $('#reg-vehicle-detail-cpk').html(driver_city_cars[value].symbol + driver_city_cars[value].ncost_per_km);
                $('#reg-vehicle-detail-cpm').html(driver_city_cars[value].symbol + driver_city_cars[value].ncost_per_minute);
        
              }else{
                //day time
                $('#reg-vehicle-detail-min-fare').html("" + driver_city_cars[value].symbol + (parseFloat(driver_city_cars[value].pickup_cost) + parseFloat(driver_city_cars[value].drop_off_cost)));
                $('#reg-vehicle-detail-cpk').html(driver_city_cars[value].symbol + driver_city_cars[value].cost_per_km);
                $('#reg-vehicle-detail-cpm').html(driver_city_cars[value].symbol + driver_city_cars[value].cost_per_minute);
              } 

              $('#reg-vehicle-detail-num-seats').html(driver_city_cars[value].num_seats);

          });
      })

      //generate years data
      let years_list_data = '';

      for(var z = 1990; z < 2041;z++){

        years_list_data += `<ons-list-item data-value="${z}" class="sel-list-item">
                                  
                                  <div class="left">
                                    <ons-icon icon='fa-circle' size='14px' style='color:#ccc;'></ons-icon>
                                  </div>
                                  <div class="center">
                                    <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${z}</span>
                                  </div>
                                  <div class="right" id="list-item-sel-${z}">
                                      
                                  </div>
                              </ons-list-item>`;
        
      };

      years_list_data = `<ons-list>${years_list_data}</ons-list>`;
      

      $('#regcaryear').off().on('click', function(){

        let cur_ride_year = $(this).data('caryear');
        $('#customselectcontent').empty();
        $('#customselectcontent').html(years_list_data);

        customItemSelect(cur_ride_year,__('Vehicle model year'), function(value){
          $('#regcaryear').val(value);
          $('#regcaryear').data('caryear',value);
        });
        

      })

      //generate colors list

      let car_color_arr = [
        {color: "Black",value : "#000000"},
        {color: "Brown",value : "#aa5500"},
        {color: "Red",value : "#ff0000"},
        {color: "Orange",value : "#ffaa00"},
        {color: "Yellow",value : "#ffff00"},
        {color: "Green",value : "#00aa00"},
        {color: "Blue",value : "#0000ff"},
        {color: "Sky-Blue",value : "#00aaff"},
        {color: "Pink",value : "#ff00ff"},
        {color: "Purple",value : "#aa00ff"},
        {color: "Grey",value : "#989898"},
        {color: "White",value : "#ffffff"},
        {color: "Gold",value : "#adad00"},
        {color: "Silver",value : "#e2e2e2"}
    ];

    let colors_list_data = '';

    for(var w = 0; w < car_color_arr.length;w++){
      color_item = car_color_arr[w];
      colors_list_data += `<ons-list-item data-value="${color_item.color}" class="sel-list-item">
                                
                                <div class="left">
                                  <ons-icon icon='fa-square' size='20px' style='color:${color_item.value};'></ons-icon>
                                </div>
                                <div class="center">
                                  <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${__(color_item.color)}</span>
                                </div>
                                <div class="right" id="list-item-sel-${color_item.color}">
                                    
                                </div>
                            </ons-list-item>`;
      
    };

    colors_list_data = `<ons-list>${colors_list_data}</ons-list>`;
    

    $('#regcarcolor').off().on('click', function(){

      let cur_ride_color = $(this).data('carcolor');
      $('#customselectcontent').empty();
      $('#customselectcontent').html(colors_list_data);

      customItemSelect(cur_ride_color,__('Vehicle paint color'), function(value){
        $('#regcarcolor').val(__(value));
        $('#regcarcolor').data('carcolor',value);
      });
      

    })

  },

  signuppage4: function(){
    translateElements('signuppage4');
    if(user_reg_data.password){
      $('#regpwdnew').val(user_reg_data.password);
      $('#regpwdconfirm').val(user_reg_data.password);
    }

    $('.reg-pwd-user-input').off().on('keyup', function(){
      $('#regpwderrormsg').html('');   
    });

  },

  signuppage5: function(){    
    translateElements('signuppage5');
  },

  ridecomplete: function(page){
    translateElements('ridecomp');  
     
    ride_rating = 5;
    $('.rate-star').css('color','black');
    $('#star-level-1').css('color','yellow');
    $('#star-level-2').css('color','yellow');
    $('#star-level-3').css('color','yellow');
    $('#star-level-4').css('color','yellow');
    $('#star-level-5').css('color','yellow');

    $('.rate-star').off('click').on('click', function(){
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
    
    });

    $('#rate-rider-image-preload').attr('src',page.data.comp_data.rider_image); //load driver image
    $('#rate-rider-name').html(page.data.comp_data.rider_firstname); //load driver firstname
    $('#rate-button').data('bookingid',page.data.comp_data.booking_id); ////load ride rating action button data
    $('#ride-complete-amount').html(city_curency_symbol + page.data.comp_data.paid_amount); ////load amount of the ride

    $('#complete-ride-pickup').html(page.data.comp_data.p_addr);
    $('#complete-ride-dropoff').html(page.data.comp_data.d_addr ? page.data.comp_data.d_addr : __('Destination not specified'));

    if(page.data.comp_data.coupon_code && parseInt(page.data.comp_data.referral_used) != 0){
      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Promo and referral discounts were applied'));

      let discount_msg = '';

      if(page.data.comp_data.coupon_discount_type == 1){
          //fixed
          discount_msg = `- ${city_curency_symbol}${page.data.comp_data.coupon_discount_value}`;
      }else{
        //percentage
        discount_msg = `- ${page.data.comp_data.coupon_discount_value}%`;
      }

      discount_msg += ` | - ${page.data.comp_data.referral_discount}%`;

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else if(page.data.comp_data.coupon_code){

      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Promo discount was applied'));

      let discount_msg = '';

      if(page.data.comp_data.coupon_discount_type == 1){
          //fixed
          discount_msg = `-${city_curency_symbol}${page.data.comp_data.coupon_discount_value}`;
      }else{
        //percentage
        discount_msg = `- ${page.data.comp_data.coupon_discount_value}%`;
      }
      

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else if(parseInt(page.data.comp_data.referral_used) != 0){

      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Referral discount was applied'));

      let discount_msg = '';

      discount_msg += `${page.data.comp_data.referral_discount_value}%`;

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else{
        $('#complete-discount-msg').hide();
        $('#ride-complete-stats-discounts').html('0%');
    }


    
      
    if(page.data.comp_data.payment_type == 1){
      $('#ride-complete-ptype').html(__("Cash Payment")); ////load payment type of the ride
      $('#complete-ride-payment-type-icon').attr('src','img/cash.png');
      
    }else if(page.data.comp_data.payment_type == 2){
      $('#ride-complete-ptype').html(__("Wallet Payment")); ////load payment type of the ride
      $('#complete-ride-payment-type-icon').attr('src','img/wallet.png');
    }else if(page.data.comp_data.payment_type == 3){
      $('#ride-complete-ptype').html(__("Card Payment")); ////load payment type of the ride
      $('#complete-ride-payment-type-icon').attr('src','img/cash.png');
    }else{
      $('#ride-complete-ptype').html("POS Payment"); ////load payment type of the ride
      $('#complete-ride-payment-type-icon').attr('src','img/cash.png');
    }
    
    $('#ride-complete-stats-dist').html(page.data.comp_data.total_ride_distance_formated);
    $('#ride-complete-stats-time').html(page.data.comp_data.total_ride_time_formated);

  },

  bookingpage: function(){
    translateElements('bookingpg');   
    getbookings();
   
  },




  bookingpagecurrent: function(){
    //$('#booking-pend-onride').html(bookings_data['pend_onride']);
  },


  bookingpagecomplete: function(){
    //$('#booking-comp').html(bookings_data['completed']);
  },


  bookingpagecancel: function(){
    //$('#booking-canc').html(bookings_data['cancelled']);
  },


  bookingdetails: function(page){
    //alert(page.data.bookid);
    translateElements('bookingdets');

    let touch_x_start;
    let touch_y_start;
    let touch_x_move;
    let touch_y_move;
    let animating = 0;
    let expanded = true;
    let allow_collapse = false;
    let scroll_block = false;


    let el_initial_top = Math.ceil($('#booking-details-map').outerHeight(true)) + Math.ceil($('#driver-details').outerHeight(true));

    $('#booking-details-data-container').css('top', el_initial_top + "px");
    $('#booking-details-data-container').scrollTop(0);
    $('#booking-details-data-container').css('transform','translateY(0)');
        

    document.getElementById('booking-details-data-container').addEventListener('touchstart', function(e){
        touch_x_start = e.touches[0].clientX;
        touch_y_start = e.touches[0].clientY;
    }, false);


    document.getElementById('booking-details-data-container').addEventListener('touchmove', function(e){

        if(animating)return;
        
        if(!touch_x_start || !touch_y_start)return;

        let container_top_pos = $('#booking-details-data-container').scrollTop();

        touch_x_move = e.touches[0].clientX;
        touch_y_move = e.touches[0].clientY;

        let dy = touch_y_start - touch_y_move;

        let el_pos_change = Math.abs(dy);

        if(dy < 0){
            //Swipe down
            if(container_top_pos < 3){
                expandbdmapview();
            }
             
                       
            
        }else{
            //Swipe up
            if(container_top_pos > 6){
              collapsebdmapview();
            }                    
            
        }

    }, false);

    document.getElementById('booking-details-data-container').addEventListener('touchcancel', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false); 


    document.getElementById('booking-details-data-container').addEventListener('touchend', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false)


    document.getElementById('booking-details-data-container').addEventListener('scroll', function(e){
        
                      
        let scroll_pos = e.target.scrollTop;
        

        if(scroll_pos < 3 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }

        if(scroll_pos > 6 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }
        
        setTimeout(function(){          
          e.target.style.overflowY = "auto";
        },200)

    }, false)


    function collapsebdmapview(){

        if(expanded == false)return;   
        
        expanded = false;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);        
        $('#booking-details-data-container').css('transform',`translateY(-${200}px)`);
        setTimeout(function(){
            animating = 0;
        },100);


    }

    function expandbdmapview(){

        if(expanded == true)return;

        expanded = true;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);
        $('#booking-details-data-container').css('transform',`translateY(-${0}px)`);

        setTimeout(function(){
            animating = 0; 
        },100);

    }

    var booking_details_data = JSON.parse($('#booking-list-item-data-' + page.data.bookid).html());
    //console.log(booking_details_data);
    if(booking_details_data.hasOwnProperty('booking_cost')){
      $('#bookride_cost').html(booking_details_data.booking_cost);
    }

    if(booking_details_data.hasOwnProperty('booking_id')){
      $('#booking-details-title').html(__('Trip') + ': #' + booking_details_data.booking_id);
    }

    if(booking_details_data.hasOwnProperty('car_type')){
      $('#selected-ride').html(booking_details_data.car_type);
    }

    if(booking_details_data.hasOwnProperty('d_location')){
      $('#drop-off-address').html(booking_details_data.d_location);
    }


    if(booking_details_data.hasOwnProperty('p_location')){
      $('#pick-up-address').html(booking_details_data.p_location);
    }

    if(booking_details_data.hasOwnProperty('waypoint1_address') && booking_details_data.waypoint1_address != ""){
      $('#bk-det-waypoint1').show();
      $('#bk-det-waypoint1-address').html(booking_details_data.waypoint1_address);
    }

    if(booking_details_data.hasOwnProperty('waypoint2_address') && booking_details_data.waypoint2_address != ""){
      $('#bk-det-waypoint2').show();
      $('#bk-det-waypoint2-address').html(booking_details_data.waypoint2_address);
    }

    if(booking_details_data.hasOwnProperty('pick_up_time')){
      $('#puc_dt').html(booking_details_data.pick_up_time);
    }


    if(booking_details_data.hasOwnProperty('payment_type')){
      $('#payment-type').html(booking_details_data.payment_type);
    }


    if(booking_details_data.hasOwnProperty('car_image')){
      $('#route-ride-image').attr("src",booking_details_data.car_image);
    }


    if(booking_details_data.hasOwnProperty('car_desc')){
      $('#route-ride-desc').html(booking_details_data.car_desc);
    }

    if(booking_details_data.hasOwnProperty('coupon_code') && booking_details_data.coupon_code !== null){
      $('#coupon-code').html(booking_details_data.coupon_code);
    }

    
    if(booking_details_data.hasOwnProperty('user_firstname')){
            
      if(booking_details_data.user_firstname !== 'N/A'){
          $('.user-details').show();
          $('#user-name').html(booking_details_data.user_firstname);
          
          if(booking_details_data.hasOwnProperty('user_image')){
            $('#user-image-preload').attr("src",booking_details_data.user_image);
          }
          
          if(booking_details_data.hasOwnProperty('user_rating')){
            $('#user-rating').attr("src","img/rating-" + booking_details_data.user_rating + ".png");
          }

      }      
    }

    if(booking_details_data.hasOwnProperty('service_mode')){
      if(booking_details_data.service_mode == 0){
          $('#booking-service-type').html(__('Taxi'));
      }else if(booking_details_data.service_mode == 1){
          $('#booking-service-type').html(__('Quick-Ride'));
      }      
    }

    if(booking_details_data.hasOwnProperty('driver_earning')){
            
      
        $('.earning-details').show();
        $('#earned-amount').html(booking_details_data.driver_earning);
        
        
          
    }

    if(booking_details_data.hasOwnProperty('booking_status')){    

        if(booking_details_data.booking_status == 3){
            $('.trip-completed').show(); 
            if(booking_details_data.hasOwnProperty('distance_travelled')){
              $('#trip-distance').html(booking_details_data.distance_travelled);
            } 

            if(booking_details_data.hasOwnProperty('paid_amount')){
              $('#bookride_cost').html(booking_details_data.paid_amount);
            }
            
            if(booking_details_data.hasOwnProperty('ride_duration')){
              $('#trip-duration').html(booking_details_data.ride_duration);
            }

        }
    }

       

    

  },
  schdbookingdetails: function(page){
    //alert(page.data.bookid);
    translateElements('schdbookingdets');

    let touch_x_start;
    let touch_y_start;
    let touch_x_move;
    let touch_y_move;
    let animating = 0;
    let expanded = true;
    let allow_collapse = false;
    let scroll_block = false;


    let el_initial_top = Math.ceil($('#booking-details-map').outerHeight(true)) + Math.ceil($('#driver-details').outerHeight(true));

    $('#booking-details-data-container').css('top', el_initial_top + "px");
    $('#booking-details-data-container').scrollTop(0);
    $('#booking-details-data-container').css('transform','translateY(0)');
        

    document.getElementById('booking-details-data-container').addEventListener('touchstart', function(e){
        touch_x_start = e.touches[0].clientX;
        touch_y_start = e.touches[0].clientY;
    }, false);


    document.getElementById('booking-details-data-container').addEventListener('touchmove', function(e){

        if(animating)return;
        
        if(!touch_x_start || !touch_y_start)return;

        let container_top_pos = $('#booking-details-data-container').scrollTop();

        touch_x_move = e.touches[0].clientX;
        touch_y_move = e.touches[0].clientY;

        let dy = touch_y_start - touch_y_move;

        let el_pos_change = Math.abs(dy);

        if(dy < 0){
            //Swipe down
            if(container_top_pos < 3){
                expandbdmapview();
            }
             
                       
            
        }else{
            //Swipe up
            if(container_top_pos > 6){
              collapsebdmapview();
            }                    
            
        }

    }, false);

    document.getElementById('booking-details-data-container').addEventListener('touchcancel', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false); 


    document.getElementById('booking-details-data-container').addEventListener('touchend', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false)


    document.getElementById('booking-details-data-container').addEventListener('scroll', function(e){
        
                      
        let scroll_pos = e.target.scrollTop;
        

        if(scroll_pos < 3 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }

        if(scroll_pos > 6 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }
        
        setTimeout(function(){          
          e.target.style.overflowY = "auto";
        },200)

    }, false)


    function collapsebdmapview(){

        if(expanded == false)return;   
        
        expanded = false;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);        
        $('#booking-details-data-container').css('transform',`translateY(-${200}px)`);
        setTimeout(function(){
            animating = 0;
        },100);


    }

    function expandbdmapview(){

        if(expanded == true)return;

        expanded = true;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);
        $('#booking-details-data-container').css('transform',`translateY(-${0}px)`);

        setTimeout(function(){
            animating = 0; 
        },100);

    }

    var booking_details_data = JSON.parse($('#scheduled-booking-item-data-' + page.data.bookid).html());
    //console.log(booking_details_data);
    if(booking_details_data.hasOwnProperty('fare')){
      $('#bookride_cost').html(city_curency_symbol + booking_details_data.fare);
    }

    if(booking_details_data.hasOwnProperty('bk_id_formated')){
      $('#booking-details-title').html(__('Trip') + ': #' + booking_details_data.bk_id_formated);
    }

    let city_vehicles = routetariffs.result[userprofileinfo.city_id].cars;
    let vehicle_category = "";
    city_vehicles.forEach(function(val,indx){
        if(val.id == booking_details_data.ride_id){
            vehicle_category = val.ride_type;
        }
    })

    if(booking_details_data.hasOwnProperty('vehicle_category')){
      $('#selected-ride').html(vehicle_category);
    }

    if(booking_details_data.hasOwnProperty('d_loc')){
      $('#drop-off-address').html(booking_details_data.d_loc);
    }


    if(booking_details_data.hasOwnProperty('p_loc')){
      $('#pick-up-address').html(booking_details_data.p_loc);
    }

    if(booking_details_data.hasOwnProperty('waypoint1') && booking_details_data.waypoint1 != ""){
      $('#bk-det-waypoint1').show();
      $('#bk-det-waypoint1-address').html(booking_details_data.waypoint1);
    }

    if(booking_details_data.hasOwnProperty('waypoint2') && booking_details_data.waypoint2 != ""){
      $('#bk-det-waypoint2').show();
      $('#bk-det-waypoint2-address').html(booking_details_data.waypoint2);
    }

    if(booking_details_data.hasOwnProperty('pickup_time')){
      $('#puc_dt').html(booking_details_data.pickup_time);
    }


    if(booking_details_data.hasOwnProperty('payment_type')){
      let payment_type = __('Cash Payment');
      if(booking_details_data.payment_type == 1){
          payment_type = __('Cash Payment');
      }else if(booking_details_data.payment_type == 2){
          payment_type = __('Wallet Payment');
      }
      $('#payment-type').html(payment_type);
    }


    if(booking_details_data.hasOwnProperty('ride_id')){
      $('#route-ride-image').attr("src",$(`#uniq-car-type-id-${booking_details_data.ride_id}`).attr('src'));
    }


    if(booking_details_data.hasOwnProperty('car_desc')){
      $('#route-ride-desc').html(booking_details_data.car_desc);
    }

    if(booking_details_data.hasOwnProperty('coupon_code') && booking_details_data.coupon_code !== null){
      $('#coupon-code').html(booking_details_data.coupon_code);
    }

    
    if(booking_details_data.hasOwnProperty('firstname')){
            
      if(booking_details_data.firstname !== 'N/A'){
          $('.user-details').show();
          $('#user-name').html(booking_details_data.firstname);
          
          if(booking_details_data.hasOwnProperty('photo')){
            $('#user-image-preload').attr("src",booking_details_data.photo);
          }
          
          if(booking_details_data.hasOwnProperty('user_rating')){
            $('#user-rating').attr("src","img/rating-" + booking_details_data.user_rating + ".png");
          }

      }      
    }

    if(booking_details_data.hasOwnProperty('driver_earning')){
            
      
        $('.earning-details').show();
        $('#earned-amount').html(booking_details_data.driver_earning);
        
        
          
    }

    if(booking_details_data.hasOwnProperty('est_dist')){
      $('#trip-distance').html(booking_details_data.est_dist + "KM");
    }
    
    if(booking_details_data.hasOwnProperty('est_dur')){

      let trip_duration = parseFloat(booking_details_data.est_dur);

      let trip_duration_secs = Math.ceil(trip_duration * 60);
    
      let _hours = Math.floor(trip_duration_secs / 3600);
      let _minutes = Math.floor((trip_duration_secs % 3600) / 60);

      let trip_duration_text = '';

      if(_hours){
          trip_duration_text += _hours + 'Hr ';
      }

      if(_minutes){
          trip_duration_text += _minutes + ' min ';
      }else{
          trip_duration_text += '0' + ' min ';
      }
      
      $('#trip-duration').html(trip_duration_text);

    }

       

    

  },

  verifypage : function(){
    translateElements('verifypg');
  },

  verifyphonepage : function(page){
    translateElements('verifyphone');
  },

  bankdetailspage : function(){
    

    let banks_and_codes_html = '';
    let bank_names_and_codes_string = app_settings.default_banks_and_codes;
    if(bank_names_and_codes_string.trim() != ''){
      let bank_names_and_codes_array = bank_names_and_codes_string.split('|');
    
      if(!!bank_names_and_codes_array){
        bank_names_and_codes_array.forEach(function(val,index){
          let name_and_code_arr = val.split('->');
          banks_and_codes_html += `<option value='${name_and_code_arr[1]}'>${name_and_code_arr[0]}</option>`;
        })
        if(banks_and_codes_html != ''){
          banks_and_codes_html += '<option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>';
          $('#banklist').html(banks_and_codes_html);
        }else{
          $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
        }
      }else{
        $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
      }
    }else{
      $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
    }

    translateElements('bankdetpg');

    if(!!referraldata && referraldata.hasOwnProperty(driver_registration_data.operation_city)){
      let ref_msg = referraldata[driver_registration_data.operation_city].ref_reg_msg;
      $('#ref-code-msg-text').html(ref_msg);
      $('#ref-code-msg').show();
      $('#ref-code-input').show();
    }

  },

  referralspage : function(){
    translateElements('referrals');   
    getreferralsdata();
  },

  promotions: function(){
    translateElements('promotions');   
    promocheck();
    if(userprofileinfo.ref_code){
      $('#driverrefbtn').css('display','flex');
    }else{
      $('#driverrefbtn').css('display','none');
    }
  },

  driverref: function(){
    $('#driverrefmsg').html(userprofileinfo.ref_desc); 
    $('#driverrefcode').html(userprofileinfo.ref_code);    
  },
  
  banner : function(page){
    var banner_details_data = JSON.parse($('#banner-content-' + page.data.banner_id).text());
    $('#banner-page-title').html(banner_details_data.banner_title);
    $('#banner-page-fimg').attr('src',banner_details_data.feature_img);
    var banner_html_content = banner_details_data.banner_body;
    var entities_map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'"
    };
  
    var banner_dec_html = banner_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});

    $('#banner-page-content').html(banner_dec_html);
    $('#banner-page-content').find('a').each(function(){
      var el = $(this);
      el.off('click').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();        
        let a_href = $(this).attr('href');
        //inappbrowser = cordova.InAppBrowser.open(a_href, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=no,toolbar=yes,hidespinner=yes,hardwareback=yes');
        window.open(a_href, '_system', 'location=yes');
      })
    })    
  },

  scheduledtrips: function(){

    translateElements('scheduledtrips');

    getScheduledTrips();

  },

  vehicledetailsregpage : function(){
      translateElements('vdetregpg');
      var option_vals = '';

      var city_ids = routetariffs.result.city_id;
      var city_names = routetariffs.result.city_name;
      
      city_ids.forEach(function(value,index){
          option_vals += "<option value='" + value + "' >" + city_names[index] + "</option>"
      });

      $('#cityroute').html(option_vals);

      if(driver_registration_data.operation_city){
        $('#cityroute').find(`option[value=${driver_registration_data.operation_city}]`).prop('selected', true);
      }

      var default_sel_id = $('#cityroute').find(':selected').val();            

      var city_cars =  routetariffs.result[default_sel_id].cars;

      option_vals = '';

      for(var key in city_cars){
          var car_image = city_cars[key].ride_img;
          car_image = siteurl + car_image.substring(2);
          option_vals += "<option data-id='" + city_cars[key].ride_id + "' data-desc='" + city_cars[key].ride_desc + "' data-image='" + car_image + "'>" + city_cars[key].ride_type + "</option>"; 
      }
              
      $('#vehicle-cat').html(option_vals);

      if(driver_registration_data.car_type){
        $('#vehicle-cat').find(`option[data-id=${driver_registration_data.car_type}]`).prop('selected', true);
      }
      

      var default_sel_image = $('#vehicle-cat').find(':selected').data('image');
      var default_sel_desc = $('#vehicle-cat').find(':selected').data('desc');
      var default_sel_id = $('#vehicle-cat').find(':selected').data('id');
      
      $('#vehicle-image').attr('src',default_sel_image);
      $('#vehicle-desc').html(default_sel_desc);

      $('#vehicle-cat').on('change', function(){
        $('#vehicle-image').attr('src',$(this).find(':selected').data('image'));
        $('#vehicle-desc').html($(this).find(':selected').data('desc'));        
      })


      $('#cityroute').on('change', function(){

        var default_sel_id = $('#cityroute').find(':selected').val(); 

        var city_cars =  routetariffs.result[default_sel_id].cars;

        var option_vals = '';

        for(var key in city_cars){
            var car_image = city_cars[key].ride_img;
            car_image = siteurl + car_image.substring(2);
            option_vals += "<option data-id='" + city_cars[key].ride_id + "' data-desc='" + city_cars[key].ride_desc + "' data-image='" + car_image + "'>" + city_cars[key].ride_type + "</option>";
            
        }
                
        $('#vehicle-cat').html(option_vals);

        var default_sel_image = $('#vehicle-cat').find(':selected').data('image');
        var default_sel_desc = $('#vehicle-cat').find(':selected').data('desc');
        var default_sel_id = $('#vehicle-cat').find(':selected').data('id');
        
        $('#vehicle-image').attr('src',default_sel_image);
        $('#vehicle-desc').html(default_sel_desc);
           
      })
     


  },

  pgateways: function(){
    translateElements('pgateways');

    let payment_gateways = app_settings.default_payment_gateway;
    let pg_list_items = "";

    payment_gateways.forEach(function(val,indx){
      pg_list_items += `<ons-list-item tappable style="cursor: pointer;min-height: 70px;" onclick="Vpay('${val}')">
                          <div class="left">
                            <img src="img/${val}.png" style="width:36px" />
                          </div>
                          <div class="center">
                            <span style="font-size: 16px;font-weight: 500;">${val}</span>
                          </div>
                          <div class="right">
                            <ons-icon icon='fa-chevron-right' size='14px' style='color:black;'></ons-icon> 
                          </div>
                      </ons-list-item>`;
    });
    
    
    
    

    let pg_items_list_html = `<ons-list>${pg_list_items}</ons-list>`;

    $('#pgateways-content').html(pg_items_list_html);
  }


  
 
};







