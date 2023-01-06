jQuery(function($){ // use jQuery code inside this to avoid "$ is not defined" error
	$('.payo-blog-loader-more').click(function(e){
 
		var button = $(this),
		    data = {
			'action': 'loadmore',
			'query': loading_blog_parameters.posts, // that's how we get params from wp_localize_script() function
			'page' : loading_blog_parameters.current_page,
            'ignoreposts': loading_blog_parameters.offset,
		};
 
		$.ajax({ // you can also use $.post here
			url : loading_blog_parameters.ajaxurl, // AJAX handler
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text('Looking up for more posts...');
                //console.log(loading_blog_parameters.posts);
               // console.log(loading_blog_parameters.current_page); // change the button text, you can also add a preloader image
			},
			success : function( data ){
               // console.log(data);
				if( data ) { 
					button.text( 'Show me more posts' );
                    $('.payo-third-other-articles').append(data); // insert new posts
					loading_blog_parameters.current_page++;
                    loading_blog_parameters.offset = parseFloat(loading_blog_parameters.offset)+3;
                   // console.log(loading_blog_parameters.offset);
 
					if ( loading_blog_parameters.current_page == loading_blog_parameters.max_page ) 
						button.remove(); // if last page, remove the button
 
					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );
				} else {
					button.remove(); // if no data, remove the button as well
				}
			}
		});

        e.preventDefault();
	});
});