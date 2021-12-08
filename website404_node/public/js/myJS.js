window.onload = function () {
    var myTab = document.getElementById('myTab');
    var myTabLi = myTab.getElementsByTagName('li');
    var myTabA = document.querySelectorAll('#myTab li a')
    // console.log(myTab);
    // console.log(myTabLi);
    // console.log(myTabA[0]);
    var follow = document.getElementById('follow');
    var recommend = document.getElementById('recommend');
    var hot = document.getElementById('hot');
    var video = document.getElementById('video');
    recommend.style.display = 'none';
    hot.style.display = 'none';
    video.style.display = 'none';

    //可以设置.index=i 就不用这么麻烦了
    myTabA[0].addEventListener('click', function () {
        recommend.style.display = 'none';
        follow.style.display = 'block';
        hot.style.display = 'none';
        video.style.display = 'none';
    })
    myTabA[1].addEventListener('click', function () {
        recommend.style.display = 'block';
        follow.style.display = 'none';
        hot.style.display = 'none';
        video.style.display = 'none';
    })
    myTabA[2].addEventListener('click', function () {
        recommend.style.display = 'none';
        follow.style.display = 'none';
        hot.style.display = 'block';
        video.style.display = 'none';
    })
    myTabA[3].addEventListener('click', function () {
        recommend.style.display = 'none';
        follow.style.display = 'none';
        hot.style.display = 'none';
        video.style.display = 'block';
    })

    //排他思想
    for (let i of myTabA) {
        i.addEventListener('click', function () {
            for (let j of myTabA) {
                j.style.color = 'rgb(87, 83, 83)';
            }
            // console.log(i);
            i.style.color = '#fe8c00';
        })
    }
    var text = document.querySelector('textarea');
    var btn = document.querySelector('.myremark');
    var ul = document.querySelector('.myremarkshow');
    // console.log(ul);
    btn.onclick = function(){
        if(text.value == ''){
            alert('please input content');
            return false;
        }else{
            var li = document.createElement('li');
            li.innerHTML=text.value;
            ul.insertBefore(li,ul.children[0]);
        }
    }
    console.log(ul);
}
$("#back_top").click(function(){ //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部

    $("html,body").animate({scrollTop:"0px"},200);

}); 