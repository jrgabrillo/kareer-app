// do not delete
console.log('%cDeveloped By: RNR Digital Consultancy (2017)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.kareer = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
    var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
    var directory = '/';
	var $$ = Dom7;
	var view = app.addView('.view-main');

    var system = {
    	ini:function(){
        	// var deviceSize = system.getDeviceSize();
        	// console.log(deviceSize);
        	logIn.ini();
        	signUp.ini();
        	// content.ini();
    	},
        notification:function(title,message,button,timeout,loader,_functionOpen,_functionClose){
            var timeout = (timeout == "")?false:timeout;
            app.addNotification({
                title: title,
                message: message,
                button:button,
                onClose:function(){
                    if(_functionClose != false){
                        _functionClose();
                    }
                }
            });
            if(timeout != false){
                setTimeout(function(){
                    app.closeNotification(".notification-item");
                },timeout);
            }
            if(_functionOpen != false){
                _functionOpen();                
            }
        },
        ajax:function(url,data){
            return $.ajax({
                type: "POST",
                url: url,
                data: {data: data},
                async: !1,
                cache:false,
                crossDomain: true,
                error: function() {
                    console.log("Error occured")
                }
            });        
        },
        html:function(url){
            return $.ajax({
                type: "POST",
                url: url,
                dataType: 'jsonp',
                data: {data: "kareer"},
                async: !1,
                cache:false,
                crossDomain: true,
                error: function() {
                    console.log("Error occured")
                }
            });
        },
		popover:function(title,message){
			var mainView = app.addView('.view-main');			 
		    app.addNotification({
		        title: title,
		        message: message
		    });
		},
		preloader:function(status){
			if(status){
			    var container = $$('body');
			    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
			    app.showProgressbar(container, 'multi');
			}
			else{
		        app.hideProgressbar();				
			}
		},
		block:function(status){
			if(status){
		        app.popup('.loader');
			}
			else{
		        app.closeModal('.loader');
			}
		},
		logoHandler:function(){
			var bg = 'img/img-bg.jpg';
			var logo = 'img/logo.png';
			bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
			logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

			$("img[src='img/logo.png']").attr({'src':logo});
			$(".panel .panel-bg").attr({'style':'background-image:url('+bg+');'});
		},		
		getDeviceSize:function(){
			var device = window;
			return window.innerWidth;
		}
    };

	var content = {
		ini:function(){
			view.router.loadPage("pages/admin/jobs.html");
			
			app.onPageInit('account',function(page){
				content.controller();
				account.ini();
			});			

			app.onPageInit('job',function(page){
				content.controller();
				jobs.show();
			});

			app.onPageInit('search',function(page){
				content.controller();
				var slider = document.getElementById('test-slider');
				noUiSlider.create(slider, {
					start: [20, 80],
					connect: true,
					step: 1,
					orientation: 'horizontal', // 'horizontal' or 'vertical'
					range: {
						'min': 0,
						'max': 100
					},
					format: wNumb({
						decimals: 0
					})
				});
			});
			// app.onPageInit('job', function (page) {
			// 	content.controller();
			// 	jobs.show();
			// })
			// content.pageContent('index.html');
		},
		controller:function(){
			$$("a").on('click',function(){
				var data = $$(this).data('page');
				console.log(data);
				view.router.loadPage("pages/admin/"+data+".html");
				$("a").removeClass('color-teal').addClass('color-gray');
				$(this).removeClass('color-gray').addClass('color-teal')
				// content.pageContent(page+'.html');
			})
		},
		pageContent:function(url){
			var pageContent = system.ajax('pages/admin/'+url,'');
			pageContent.done(function(data){
				$$('body .views .view').html(data);
			})
		}
	}

	var account = {
		ini:function(){
			var applicantData = JSON.parse(localStorage.getItem('applicant'));
			console.log(applicantData);

			$$("#account img.responsive-img").attr({"src":"img/profile/"+applicantData[0][18]});

			var content = "<div class='content-block'>"+
							"    <p class='color-gray'>"+
							"        <h5>"+applicantData[0][6]+" "+applicantData[0][7]+"</h5>"+
							"    </p>"+
							// "    <p>"+
							// "        <span><strong>Chief Technology Officer</strong> Pangasinan</span>"+
							// "    </p>"+
							"</div>"+
							"<div class='content-block'>"+
							"    <div class='row'>"+
							"        <div class='col-33'>"+
							"            <a class='btn-floating btn-large waves-effect waves-light grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>list</i></a>Account"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a class='btn-floating btn-large waves-effect waves-light grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>briefcase</i></a>Career"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a class='btn-floating btn-large waves-effect waves-light grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>folder</i></a>Academic"+
							"        </div>"+
							"    </div>"+
							"</div>";
			$$("#display_account").html(content);
		}
	}

    var logIn = {
    	ini:function(){
	        $("#form_logIn").validate({
	            rules: {
	                field_email: {required: true,email:true,maxlength:100},
	                field_password: {required: true},
	            },
	            errorElement : 'div',
	            errorPlacement: function(error, element) {
	                var placement = $(element).data('error');
	                if(placement){
	                    $(placement).append(error)
	                } 
	                else{
	                    error.insertAfter(element);
	                }
	            },
	            messages: {
	                field_email: {
	                    required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
	                    maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                    email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                    validateEmail: "<i data-error ='Email already in use.' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                },
	                field_password: {
	                    required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                    maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                    checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
	                },
	            },
	            submitHandler: function (form) {
	                var _form = $(form).serializeArray();
	                var data = system.ajax(processor+'do-logIn',_form);
	                data.done(function(data){
	                    if(data != 0){
                        	$$("input").val("");
                            system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
			                	app.closeModal('.popup-login', true);
					        	content.ini();
					        	localStorage.setItem('applicant',data);
                            });
	                    }
	                    else{
	                        system.notification("Kareer","Failed.",false,3000,true,false,false);
	                    }
	                })
	            }
	        }); 
	        $$(".log-error-icon").on('click',function(){
	            var data= $(this).find('i');
	            system.notification("Kareer",data[0].dataset.error,false,3000,true,false,false);
	        });    		
    	},
    	logout:function(){
    		$$("a[data-cmd='account-logout']").on('click',function(){
    			localStorage.removeItem('saved-login','');
    			localStorage.removeItem('user-details','');
    			window.location.reload();
    		})    		
    	}
    }

    var signUp = {
        ini:function(){
            $("#form_signUp").validate({
                rules: {
                    field_firstname: {required: true, maxlength:50},
                    field_lastname: {required: true, maxlength:50},
                    field_email: {required: true, maxlength: 100,email:true,validateEmail:true},
                    field_password: {required: true, maxlength: 50,checkPassword:true},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }
                },
                messages: {
                    field_firstname: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_lastname: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_email: {
                        required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        validateEmail: "<i data-error ='Email already in use.' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_password: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-signUp',_form);
                    data.done(function(data){
                        if(data == 1){
                        	$$("input").val("");
                            system.notification("Kareer","Success. You can now Sign In to your account. ",false,2000,true,false,function(){
			                	app.closeModal('.popup-sign-up', true);
			                	app.popup('popup-login');
                            });
                        }
                        else if(data == 2){
                            system.notification("Kareer","Try other email address.",false,3000,true,function(){},false);
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            });
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){},false);
            });         
        },
        personal:function(){
            $("#form_personal_info").validate({
                rules: {
                    field_last_name: {required: true, maxlength:50},
                    field_given_name: {required: true, maxlength:50},
                    field_middle_name: {required: true, maxlength:50},
                    field_gender: {required: true, maxlength:50},
                    field_date_of_birth: {required: true, maxlength:50},
                    field_place_of_birth: {required: true, maxlength:50},
                    field_permanent_address: {required: true, maxlength:50},
                    field_citizenship: {required: true, maxlength:50},
                    field_height: {required: true, maxlength:50},
                    field_weight: {required: true, maxlength:50},
                    field_mother_name: {required: true, maxlength:50},
                    field_father_name: {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },  //[CED] error messages for filling up the fields
                messages: {
                    field_last_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_given_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_middle_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_gender: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_date_of_birth: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                     field_place_of_birth: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_permanent_address: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_citizenship: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_height: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_weight: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_mother_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_father_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-personal-info',_form);
                    data.done(function(data){
                        if(data == 1){
                            system.notification("Kareer","Success.",false,2000,true,function(){},false);
                        	$$("input").val("");
				        	content.controller();
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            });  //CED pop-up error in info(icon)
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        },
        academic:function(){
            $("#form_academic_info").validate({
                rules: {
                    field_school_attended: {required: true, maxlength:50},
                    field_degree: {required: true, maxlength:50},
                    field_period_attended: {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },
                //[CED] error messages for filling up the fields
                messages: {
                    field_school_attended: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_degree: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_period_attended: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },             
                },

                submitHandler: function (form) {
                    var _form = $('#form_academic_info').serializeArray();
                    var data = system.ajax(processor+'do-academic-info',_form);
                    conosole.log(data.responseText);
                    data.done(function(data){
                        if(data == 1){
                            system.notification("Kareer","Success",false,3000,true,function(){},false);
                        	$$("input").val("");
				        	content.controller();
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            }); 
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        },
        career:function(){
            $("#form_career_info").validate({
                rules: {
                    field_id: {required: true, maxlength:50},
                    field_applicant_id: {required: true, maxlength:50},
                    field_inclusive_dates: {required: true, maxlength:50},
                    field_position_title: {required: true, maxlength:50},
                    field_agency:  {required: true, maxlength:50},
                    field_monthly_salary:  {required: true, maxlength:50},
                    field_appointment_status:  {required: true, maxlength:50},
                    field_govt_service:  {required: true, maxlength:50},
                    field_date:  {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },
                messages: {
                    field_id: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_applicant_id: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_inclusive_dates: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_position_title: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_agency: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_monthly_salary: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_appointment_status: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_govt_service: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_date: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },             
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var career = ajax(processor+'do-career-info',_form);
                    console.log(career.responseText);
                    system.notification("Kareer","Success",false,3000,true,function(){
                    },false);
                }
            }); 
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        }
    }

    var jobs = {
        show:function(){
	        var jobs = system.html(processor+'get-jobs',"");
	        console.log(jobs.responseText);
            var jobs = [
                {
                    "company":"RNR Digital Consultancy",
                    "address":"Lingayen Pangasinan",
                    "job":"App Developer",
                    "description":"We are looking for hard working individuals who would like to be part of our fast growing team!! &nbsp;&nbsp;Immediate hiring!&nbsp;",
                    "detail":"We are looking for hard working individuals who would like to be part of our fast growing team!! &nbsp;&nbsp;Immediate hiring!&nbsp; We are looking for hard working individuals who would like to be part of our fast growing team!! &nbsp;&nbsp;</strong><strong>Immediate hiring!&nbsp;We are looking for hard working individuals who would like to be part of our fast growing team!! &nbsp;&nbsp;</strong><strong>Immediate hiring!&nbsp;"
                },
                {
                    "company":"Business Profiles, Inc",
                    "address":"Ortigas City",
                    "job":"Research Communications Associate",
                    "description":"<ul><li>Research &amp; Analysis&nbsp;</li><li>Writing &amp; Editing</li><li>Project Support and Coordination</li></ul>",
                    "detail":"<ul><li>Candidate must possess at least a Bachelor's/College Degree , Computer Science/Information Technology or equivalent.</li><li>With at least 2 years of experience in the related field is required for this position.</li><li>Knowledgeable in Basic SQL Database / IIS and Apache Administration</li> <li>Must be willing to work in Makati City</li></ul>"
                },
                {
                    "company":"ORIX METRO Leasing and Finance Corporation",
                    "address":"MAkati City",
                    "job":"Server Specialist",
                    "description":"• Work on interesting project• Opportunities for learning and professional growth• Opportunities to travel",
                    "detail":"<div class='col-lg-12 col-md-12 col-sm-12'><h2 class=job-ads-h2><span class=icon-edit-pencil></span> JOB DESCRIPTION</h2><div class='unselectable wrap-text' id=job_description itemprop=description><ul><li>Assists the Systems and Database Administrator in the monitoring and management of the applications and database infrastructure<li>Deploys application and database changes primarily in the Production, Staging and QA environments<li>Provides support to the Programmers, Analysts and QAs in their setup and access requirement in their respective environments<li>Assist third party personnel during the installation and configuration of new systems and database and during troubleshooting and remediation of escalated issues<li>Maintains the inventory of third party licenses such as but not limited to Microsoft Servers, Microsoft Office, Oracle, VMWare and Anti-Virus system<li>Will assist in the migration projects</ul><div> </div><div><strong>Job Requirements</strong></div><div> </div><ul><li>Candidate must possess at least a Bachelor's/College Degree , Computer Science/Information Technology or equivalent.<li>With at least 2 years of experience in the related field is required for this position.<li>Knowledgeable in Basic SQL Database / IIS and Apache Administration<li>Must be willing to work in Makati City</ul><div>______________________________________________</div><div> </div><div>Interested applicants may apply online by clicking the <strong>Apply Now</strong> button or<br>may submit their resume with most recent 2x2 photo and Transcript of Records to:<div> </div><div><strong>THE HUMAN RESOURCES DEPARTMENT</strong><br>ORIX METRO Leasing and Finance Corporation<br>10F GT Tower Int'l Ayala Ave., cor. HV dela Costa St., Makati City</div></div></div></div>"
                },
                {
                    "company":"ORIX METRO Leasing and Finance Corporation",
                    "address":"Manila",
                    "job":"Systems - Business Analyst",
                    "description":"<ul><li>Evaluates computerization requirements of specific users and in accordance with the requirements, designs the computer system, formulates programming specifications, timetable, training of users and implementation of projects.<li>Translates IT software project plans into tangible deliverables.<li>Performs and evaluates risk analysis for all application systems under development.<li>Employs tools and techniques of systems analysis and design which enables adequate documentation of the system at each stage of the development project.<li>Provides an analysis of the computer resources required by new and revised applications and makes the necessary recommendation/s in the adjustments in the database set-up and configuration before the implementation.<li>Recommends process that will enhance the user-friendliness of present applications.<li>Collaborates with the Immediate Superior in estimating the hardware, software and manpower requirements of the project.<li>Coordinates with Server and Database Administrator as well as Data Specialist in the creation of database tables.<li>Incorporates appropriate internal control and security requirements in all new application systems to be developed or modified that will secure accuracy, completeness, timeliness and authorization of inputs and outputs.<li>Provides testing for security routine in the programs/systems before it gets deployed in a production environment.<li>Ensures that recent versions of programs are updated in the source program library.</ul>",
                    "detail":"<ul><li>Candidate must possess at least a Bachelor's/College Degree , Engineering (Computer/Telecommunication), Computer Science/Information Technology or equivalent.<li>At least four (4) years experience in systems or business analysis, design and web programming.<li>Possess familiarity and knowledge in Java, Microsoft .Net,  PHP, SQL programming, UNIX and windows;<li>Familiar with UML, flowcharting, use-case and ERD.<li>Understanding of database management systems, decision support technologies, Enterprise Resource Planning (ERP) and other business process solutions.<li>Preferably with background experience working in a Financial Institution and has familiarity with its front-end and back-end operations.<li>With strong analytical perception; Above average oral and written communication skills<li>Professionally disciplined, proactive and results-oriented; Ability to methodically as well as efficiently perform at work</ul>"
                },
                {
                    "company":"Ranida Games Inc.",
                    "address":"San Pedro Laguna",
                    "job":"Game Designer",
                    "description":"<ul><li>Able to design engaging and fun systems, levels, and gameplay mechanics and features that are in line with client/internal requirements<li>Create, define, and maintain the Game Design Document (GDD)<li>Present and communicate the design to other members of the team<li>Implement and oversee design decisions such as metrics, numbers, formulas, economies, level design, systems, story, scripts, texts, etc.<li>Create clear and concise mock-ups, game flow, and wireframes<li>Participate in all aspects of the development process from conceptualization, implementation, final release, and feedback</ul>",
                    "detail":"<ul><li>Must be a passionate gamer and able to deconstruct and critically analyze games<li>At least over a year of industry experience as a designer<li>Excellent communication skills both in oral and written English<li>Works well with other members of a team through various disciplines both in-house and working remotely<li>Working knowledge of math and trigonometry to be used in game design implementation<li>Efficiently use Word Processing programs, Spreadsheets, and Presentation programs such as Word, Google Docs, PowerPoint, Excel, etc.<li>Can work efficiently with minimal supervision</ul>"
                },
            ];

            var content = "";
            var height = $(window).height();
            console.log(height);
            $.each(jobs,function(i,v){
                content = "<div class='swiper-slide'>"+
                            "   <div class='card demo-card-header-pic'>"+
                            "       <div class='card-header color-white no-border' valign='bottom' style='background-image:url(img/kareer_bg.png); height: 150px;'>"+
                            "           <div class='col s8 m8 l8'>"+
                            "               <h4>"+v.company+"<br/><small>"+v.address+"</small>"+
                            "               </h4>"+
                            "           </div>"+
                            "           <div class='col s4 m4 l4'>"+
                            "               <button class='btn-floating btn-large waves-effect waves-light' style='background: rgb(156,39,176); top: 30px;'>"+
                            "                   <i class='icon f7-icons color-white'>bookmark</i>"+
                            "               </button>"+
                            "           </div>"+
                            "       </div>"+
                            "       <div class='card-content'>"+
                            "           <div class='card-content-inner' style='height:"+(height-300)+"px; overflow:hidden;'>"+
                            "               <p class='color-gray'>is in need of:</p>"+
                            "               <h5 class='color-teal'>"+v.job+"<br/>"+
                            "                   <small class='color-teal'><i class='icon f7-icons color-black' style='font-size: 20px;'>briefcase</i> Full Time</small>"+
                            "               </h5>"+
                            "               <p>"+
                            "                   <div class='description' style='white-space: normal;'>"+
                            "                       "+v.description+""+
                            "                   </div>"+
                            "               </p>"+
                            "           </div>"+
                            "       </div>"+
                            "       <div class='card-footer'>"+
                            "           <a class='waves-effect waves-teal btn-flat' href='#'>Read More</a>"+
                            "           <button class='waves-effect waves-light btn' style='background: rgb(0, 150, 136); margin: 0;'>"+
                            "               <i class='icon f7-icons color-white'>paper_plane_fill</i>"+
                            "           </button>"+
                            "       </div>"+
                            "   </div>"+
                            "</div>";

	            $("#jobs .swiper-wrapper").append(content);
				if($('#jobs .card-content-inner')[i].scrollHeight > $('#jobs .card-content-inner').innerHeight()){
				    console.log("x");
				}
				// else{
				// 	console.log("xx");
				// }
            });

            var swiper = app.swiper(".swiper-container", {
                loop: false,
                speed: 400,
                grabCursor: true,
                effect: 'coverflow',
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                shortSwipes: true,
                mousewheelControl: true
            });

            var documentHeight = $(window).height();
            $("#content .card-content").attr({"style":"height:"+(documentHeight-310)+"px; overflow:hidden; text-overflow: ellipsis;"});
        }
    }

	return {
        hooks: {
            appInit:system.ini
        }
	}
};

var kareer_app = new Framework7({
	kareer:true,
	material:true,
});