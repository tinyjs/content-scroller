(function($) {
	$.fn.contentscroller = function(params){
    var jQ = jQuery;
		var params = $.extend({}, $.fn.contentscroller.defaults, params);

    return this.each(function(){
			var current_page = 1;
			var container=this;			
			var controller_length = jQ(params['controller']).length;
			var controller_string="";
			var page_count = 0;
			var page_width = jQ(this).width();
			var max_height=0;
			jQ(this).css('overflow', 'hidden');
			controller_string = '<ul id="'+params['controller'].replace('#','')+'"><li class="previous"><a href="#" class="previous_button" rel="previous" name="scroll_item_1">&laquo;</a></li>';
			var previous_h = 0;
						
			jQ(this).find(params['pages']).each(function(){
				jQ(this).css('position', 'relative');
				jQ(this).css('left', ((page_count)*page_width) +'px');
				if(previous_h > 0){
					jQ(this).css('top', '-'+previous_h +'px');
				}
				jQ(this).addClass('scroll_item_'+(page_count+1));
				controller_string += '<li class="page"><a href="#" name="scroll_item_'+(page_count+1)+'" class="page" rel="page">'+(page_count+1)+'</a></li>';
				page_count ++;
				previous_h += jQ(this).outerHeight();
				if(jQ(this).outerHeight() > max_height) {max_height = jQ(this).outerHeight();}
			});
			jQ(this).css('height', (max_height)+'px');
			controller_string += '<li class="next"><a href="#" class="next_button" rel="next" name="scroll_item_2">&raquo;</a></li></ul>';
			if(!jQ(params['controller']).length){ 
				jQ(this).before(controller_string);
			}
			if(page_count == 0){
				jQ(params['controller']).css('display', 'none');
				jQ(params['controller']+' .next').addClass('disabled');
			}else{
				jQ(params['controller']+' .previous').addClass('disabled');
			}		
			
			jQ(params['controller'] + ' a').click(function(e){
				if(params && typeof(params['before']) != "undefined"){ eval(params['before']);}
												
				var new_page = parseInt(jQ(this).attr('name').replace('scroll_item_',''));
				if(new_page > 0){
					for(i=1; i<=page_count; i++){
						if(i<new_page){
							jQ(container).find('.scroll_item_'+i).animate({'left':"-"+((new_page - i)*page_width) +'px'},params['trans_speed']);
						}else if(i == new_page && params['after']){
							jQ(container).find('.scroll_item_'+new_page).animate({'left':'0'},params['trans_speed'],function(e){eval(params['after']);});
						}else if(i == new_page){
							jQ(container).find('.scroll_item_'+new_page).animate({'left':'0'},params['trans_speed']);
						}else{
							jQ(container).find('.scroll_item_'+i).animate({'left':((new_page + i)*page_width) +'px'},params['trans_speed']);
						}
					}				
				}
				jQ(params['controller'] + ' li').removeClass('disabled');
				if(new_page+1 <= page_count){var next_a = new_page+1;}
				else{
					var next_a = page_count;
					jQ(params['controller'] + ' li.next').addClass('disabled');
				}
				if(new_page>1){var prev_a = new_page-1;}
				else{
					var prev_a = 1;
					jQ(params['controller'] + ' li.previous').addClass('disabled');
				}
				jQ(params['controller'] + ' li.previous a').attr('name', prev_a);
				jQ(params['controller'] + ' li.next a').attr('name', next_a);
				current_page = new_page;
				return false;				
			});			
    });
  }
	$.fn.contentscroller.defaults = {pages: '.page', controller: '#controls', trans_speed: 'slow', before:false, after:false};		
})(jQuery);