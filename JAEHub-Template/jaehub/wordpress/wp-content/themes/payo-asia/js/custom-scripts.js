jQuery(function($){
    new WOW().init();

    $('.payo-works-box').fadeOut();
    $('.payo-works-box-active').fadeIn();
    $('.payo-looks-image').fadeOut();
    $('.payo-looks-graphic-active').fadeIn();
    $('.payo-panel-box').fadeOut();
    $('.questions-active').fadeIn();
    $('.history-panel').fadeOut();
    $('.active-history').fadeIn();
    $('.history-photo-series').fadeOut();
    $('.active-series').fadeIn();
    $('#PayoPartnerships').fadeOut();
    $('#PayoTrackers').fadeOut();
    $('#PayoGeneralQueries').fadeOut();
    $('.payo-inquire-type-selector-wrapper').fadeIn();

    $(document).ready(function(){
        // Add minus icon for collapse element which is open by default
        $(".collapse.show").each(function(){
        	$(this).prev(".question-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
        	$(this).prev(".question-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
        }).on('hide.bs.collapse', function(){
        	$(this).prev(".question-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
        });

        if(window.matchMedia("(max-width: 992px)").matches){
            // The viewport is less than 992 pixels wide
            if($('#payoExitPopup').length){
                var available;
                var percentage_of_page = 0.5;
                var half_screen;
                var height;

                $(window).scroll(function (e) {
                    available = $(document).height();
                    half_screen = available * percentage_of_page;
                    height = $(window).scrollTop();
    
                    if ( height > half_screen ) {
                        var condTrigger = $('#payoExitPopup').data('origin-holder');
                        var cookieCheck = $.cookie('payo-popup-queue'+ condTrigger);
                
                        if(cookieCheck){
                            console.log('exit intent but cookie exists');
                        }else{
                            $("#payoExitPopup").modal('show');
                            $("#payoExitPopup").attr("displayed", "true");
                        }
                    }else{
                        
                    }
                });
            }else{
                console.log('Element/s does not exists on page.');
            }

        }else{
            // The viewport is at least 992 pixels wide
            $('body').mouseleave(function(e) {

                if($('#payoExitPopup').length){
                    var condTrigger = $('#payoExitPopup').data('origin-holder');
                    var cookieCheck = $.cookie('payo-popup-queue'+ condTrigger);
                
                    if(cookieCheck){
                        console.log('exit intent but cookie exists');
                    }else{
                        $("#payoExitPopup").modal('show');
                        $("#payoExitPopup").attr("displayed", "true");
                    }
                }else{
                    console.log('Element/s does not exists on page.');
                }
            });
        }

        function formatSearch(item) {
            var selectionText = item.text.split("|");
            if(selectionText.length > 1){
                var returnString = $('<span><b>' + selectionText[0].substring(0, 21) + '</b></br>' + selectionText[1].substring(0, 21) + '</br>' + selectionText[2].substring(0, 21) +'</span>');
            }else{
                var returnString = $('<span><b>' + selectionText[0].substring(0, 21) + '</b></span>');
            }
            return returnString;
        }
        function formatSelected(item) {
            var selectionText = item.text.split("|");
            var $returnString = $('<span>' + selectionText[0].substring(0, 21) +'</span>');
            return $returnString;
        }
        $('#payoShipPouchSize').select2({
            placeholder: "Select Size",
            templateResult: formatSearch,
            templateSelection: formatSelected
        });

        $('#payoShipPouchSize').change(function(e){
            var pouchopt = $(this).val();

            if(pouchopt === "pouch-custom"){
                $('.payo-calc-grid').removeClass('two-grid');
                $('.payo-calc-grid').addClass('tri-grid');
            }
        });

    });
    

    $('.payo-faqs-tab-link').on('click', function(e){
        if($(this).hasClass('faq-active')){
            return false;
        }else{
            var showPanel = $(this).data('question-panel');
            $('.payo-faqs-tab-link').removeClass('faq-active');
            $('.payo-panel-box').fadeOut();
            $('.payo-panel-box').removeClass('questions-active');
            $('.payo-panel-box[data-panel-number="' + showPanel + '"]').delay(500).fadeIn();
            $(this).addClass('faq-active');
            $('.payo-panel-box[data-panel-number="' + showPanel + '"]').addClass('questions-active');
        }
        e.preventDefault();
    });
    $('.payo-number-list').on('click', function(e){
        if($(this).hasClass('payo-number-active')){
            return false;
        }else{
                var nextStep = $(this).data('step-box');
                $('.payo-number-list').removeClass('payo-number-active');
                $('.payo-works-box').fadeOut();
                $('.payo-works-box').removeClass('payo-works-box-active');
                $('.payo-works-box[data-step-box="' + nextStep + '"]').delay(500).fadeIn();
                $(this).addClass('payo-number-active');
        }
        e.preventDefault();
    });
    $('.payo-history-panel-selector').on('click', function(e){
        if($(this).hasClass('history-selector-active')){
            return false;
        }else{
            var nextHistory = $(this).data('history-box');
            $('.history-panel').fadeOut();
            $('.history-panel').removeClass('active-history');
            $('.history-photo-series').fadeOut();
            $('.history-photo-series').removeClass('active-series');
            $('.payo-history-panel-selector').removeClass('history-selector-active');
            $(this).addClass('history-selector-active');
            $('.history-panel[data-history-box="' + nextHistory + '"]').addClass('active-history');
            $('.history-panel[data-history-box="' + nextHistory + '"]').delay(700).fadeIn();
            $('.history-photo-series[data-history-series="' + nextHistory + '"]').addClass('active-series');
            $('.history-photo-series[data-history-series="' + nextHistory + '"]').delay(400).fadeIn();
        }
        e.preventDefault();
    });
    $('.payo-looks-graphic-list').on('click', function(e){
        if($(this).hasClass('payo-looks-active')){
            return false;
        }else{
            var proceed = $(this).data('graphic-number');
            $('.payo-looks-image').fadeOut();
            $('.payo-looks-image').removeClass('payo-looks-graphic-active');
            $('.payo-looks-graphic-list').removeClass('payo-looks-active');
            $(this).addClass('payo-looks-active');
            $('.payo-looks-image[data-image-step="' + proceed + '"]').addClass('payo-looks-graphic-active');
            $('.payo-looks-image[data-image-step="' + proceed + '"]').delay(500).fadeIn();
        }
        e.preventDefault();
    });
    $('.payo-inquire-type-selector-child').on('click', function(e){
        var type = $(this).data('inquire-type');
        if(type == "Merchant Services" || type == "General"){
            $('.payo-inquire-type-selector-wrapper').fadeOut();
            $('#PayoPartnerships').fadeOut();
            $('#PayoTrackers').fadeOut();
            $('#PayoGeneralQueries').delay(400).fadeIn();
        }else if(type == "Parcel Assistance"){
            $('.payo-inquire-type-selector-wrapper').fadeOut();
            $('#PayoPartnerships').fadeOut();
            $('#PayoGeneralQueries').fadeOut();
            $('#PayoTrackers').delay(400).fadeIn();
        }else if(type == "Partnerships"){
            $('.payo-inquire-type-selector-wrapper').fadeOut();
            $('#PayoTrackers').fadeOut();
            $('#PayoGeneralQueries').fadeOut();
            $('#PayoPartnerships').delay(400).fadeIn();
        }
        e.preventDefault();
    });
    $('#applicationForm').on('show.bs.modal', function (event) {
        var triggerButton = $(event.relatedTarget); // Button that triggered the modal
        var positionValue = triggerButton.data('apply-position');// Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
            $('select[name="application-position"] option[value="'+ positionValue +'"]').attr('selected','selected');
    });
    $('#applicationForm').on('hide.bs.modal', function (event) {
        $('select[name="application-position"] option:selected').removeAttr('selected');
    });
    $('#payoExitPopup').on('show.bs.modal', function(e){
        var origin = $(this).data('origin-holder');
        var fetchCookie = $.cookie('payo-popup-queue'+ origin);

        if(fetchCookie){
            console.log('cookie exists');
        }else{
            $.cookie('payo-popup-queue'+ origin, '1', { expires: 7, path: '/' });
        }
    });
    $('#payoPartnersSlider').owlCarousel({
        loop:true,
        nav:false,
        dots:false,
        margin:20,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:false,
        responsive:{
            701 : {
                items: 5
            },
            0 : {
                items: 3
            }
        }
    });
    $('#whyPartnerWithPayo').owlCarousel({
        margin:25,
        nav:true,
        loop:true,
        autoWidth:true,
        navText: ["<img src='https://payo.asia/wordpress/wp-content/themes/payo-asia/img/icons/prev-arrow.png'>","<img src='https://payo.asia/wordpress/wp-content/themes/payo-asia/img/icons/next-arrow.png'>"],
        responsive:{
        992 : {
            items: 3,
            margin: 15,
            loop: false
        },
        701 : {
            items: 2
        },
        601 : {
            items: 2
        },
        0 :{
            items: 1,
            autoWidth: false,
        }
    }
    })
});