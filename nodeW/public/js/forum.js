window.onload = function () {
    var myTab = document.getElementById('myTab');
    var myTabLi = myTab.getElementsByTagName('li');
    var myTabA1 = document.getElementById('gz')
    var myTabA2 = document.getElementById('tj')
    var myTabA3 = document.getElementById('fb')
    // console.log(myTab);
    // console.log(myTabLi);
    // console.log(myTabA[0]);
    var follow = document.getElementById('follow');
    console.log(follow)
    var recommend = document.getElementById('recommend');
    var hot = document.getElementById('hot');

    follow.style.display = 'none';
    hot.style.display = 'none';
    
  

    //可以设置.index=i 就不用这么麻烦了
    myTabA1.addEventListener('click', function () {
        recommend.style.display = 'none';
        follow.style.display = 'block';
        hot.style.display = 'none';
        myTabA2.style.color='#000000';
        myTabA3.style.color='#000000';
        this.style.color='#fe8c00';
        
    })
    myTabA2.addEventListener('click', function () {
        recommend.style.display = 'block';
        follow.style.display = 'none';
        hot.style.display = 'none';
        myTabA1.style.color='#000000';
        myTabA3.style.color='#000000';
        this.style.color='#fe8c00';
      
    })
    myTabA3.addEventListener('click', function () {
        recommend.style.display = 'none';
        follow.style.display = 'none';
        hot.style.display = 'block';
        myTabA2.style.color='#000000';
        myTabA1.style.color='#000000';
        this.style.color='#fe8c00';
        
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