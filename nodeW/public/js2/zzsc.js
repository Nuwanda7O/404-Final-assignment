$(function(){
	// ��ȡ�� #abgne-block-20120527 �����������Ԫ�ء�
	// �����μ���ÿ�ȷݵĿ���
	var _slices = 9,	// �гɾŵȷ�
		_index = 0,		// Ԥ��չʾ�ڼ���
		_zIndex = 999, 
		$block = $('#zzsc').css('position', 'relative'), 
		$slides = $block.find('a').css('z-index', _zIndex).hide(), 
		_width = $block.width(), 
		_height = $block.height(), 
		_sliceWidth = _width / _slices,	// ÿ�ȷݵĿ���
		_lastSliceWidth = _sliceWidth + (_width - _sliceWidth * _slices),	// ʣ��Ŀ���
		_img = $slides.eq(_index).show().find('img').attr('src'), 
		timer, 
		speed = 2000,	// �ֲ��ٶ�
		_animateSpeed = 600,	// �����ٶ�
		_isHover = false,	// �����Ƿ��Ƶ� $block ��
		_isComplete = true;	// �����Ƿ���ȫ��ִ����
		// �� _slices �������������Ӧ�� div ����
		var _sliceDiv = '', _control = '';
		for(var i=0;i<_slices;i++){
			var _w = i == _slices - 1 ? _lastSliceWidth : _sliceWidth, _l = i * _sliceWidth;//?:�������
			_sliceDiv += '<div class="abgne-slice slide-' + i + '" style="left:' + _l + 'px;top:0;width:' + _w + 'px;height:100%;background-image:url(' + _img + ');background-position:-' + _l + 'px 0;position:absolute;background-repeat:no-repeat;"></div>';
		}
		
		// �� $slides ������������ť
		for(var i=0;i<$slides.length;i++){
			_control += '<li class="abgne-control control-' + (i + 1) + '">' + (i + 1) + '</li>';
		}
		
		// �քe�� div ���򼰰�ť���뵽 $block ��
		var $abgneSlides = $block.append(_sliceDiv, '<ul class="abgne-controls">' + _control + '</ul>').find('.abgne-slice'), 
			$abgneControls = $block.find('.abgne-controls').css('z-index', _zIndex + 2).find('li').eq(_index).addClass('current').end();
		
		// ������� .abgne-controls li ʱ
		$abgneControls.click(function(){
			// ������δ���ǰ�����������µ��¼�
			if(!_isComplete) return;
			
			var $this = $(this), 
				$slide = $slides.eq($this.index()), 
				_completeTotal = 0;
			
			// ��������ʾ�ĸ����������ͬһ��ʱ, �Ͳ�����
			if($this.hasClass('current')) return;

			// �������� li ���� .current, ���Ƴ���һ�� .current 
			$this.addClass('current').siblings('.current').removeClass('current');
			_isComplete = false;
			_index = $this.index();
			
			// ȡ�����Ӧ��ͼƬ��·��
			_img = $slide.find('img').attr('src');
			// ����ÿһ������ı���ͼƬΪ�ո�ȡ�õ�ͼƬ
			// �����ж���
			$abgneSlides.each(function(i){
				var $ele = $(this);
				$ele.css({
					top: i % 2 == 0 ? _height : -_height,
					opacity: 0, 
					zIndex: _zIndex + 1, 
					backgroundImage: 'url(' + _img + ')'
				}).stop().animate({
					top: 0, 
					opacity: 1
				}, _animateSpeed, function(){
					$ele.css('zIndex', _zIndex - 1);
					if(i == _slices - 1){
						$block.css('background-image', 'url(' + _img + ')');
						$slide.show().siblings('a:visible').hide();
						_isComplete = true;
						// ����������һ���û���Ƶ� $block ��ʱ, ��������ʱ��
						if(!_isHover)timer = setTimeout(auto, speed);
					}
				});
			});
		});
		
		$block.hover(function(){
			// ���������� $block ʱֹͣ��ʱ��
			_isHover = true;
			clearTimeout(timer);
		}, function(){
			// �������Ƴ� $block ʱ������ʱ��
			_isHover = false;
			timer = setTimeout(auto, speed);
		});
		
		// �Զ��ֲ�ʹ��
		function auto(){
			_index = (_index + 1) % $slides.length;
			$abgneControls.eq(_index).click();
		}
		
		// ������ʱ��
		timer = setTimeout(auto, speed);
	});