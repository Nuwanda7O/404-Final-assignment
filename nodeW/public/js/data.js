
if(code=="000001"){
  var elements = hq_str_sh000001.split(",");
}
else if(code=="000002"){
  var elements = hq_str_sh000002.split(",");
}
else if(code=="000004"){
  var elements = hq_str_sh000004.split(",");
}
else if(code=="000005"){
  var elements = hq_str_sh000005.split(",");
}
else if(code=="000006"){
  var elements = hq_str_sh000006.split(",");
}
else if(code=="000007"){
  var elements = hq_str_sh000007.split(",");
}
else if(code=="000008"){
  var elements = hq_str_sh000008.split(",");
}
else if(code=="000009"){
  var elements = hq_str_sh000009.split(",");
}
else if(code=="000010"){
  var elements = hq_str_sh000010.split(",");
}
else if(code=="000011"){
  var elements = hq_str_sh000011.split(",");
}
/////////////////////////////////////////////
else if(code=="300001"){
  var elements = hq_str_sz300001.split(",");
}
else if(code=="300002"){
  var elements = hq_str_sz300002.split(",");
}
else if(code=="300003"){
  var elements = hq_str_sz300003.split(",");
}
else if(code=="300004"){
  var elements = hq_str_sz300004.split(",");
}
else if(code=="300005"){
  var elements = hq_str_sz300005.split(",");
}
else if(code=="300006"){
  var elements = hq_str_sz300006.split(",");
}
else if(code=="300007"){
  var elements = hq_str_sz300007.split(",");
}
else if(code=="300008"){
  var elements = hq_str_sz300008.split(",");
}
else if(code=="300009"){
  var elements = hq_str_sz300009.split(",");
}
else if(code=="300010"){
  var elements = hq_str_sz300010.split(",");
}
//////////////////////////////////////////////
else if(code=="600000"){
  var elements = hq_str_sh600000.split(",");
}
else if(code=="600004"){
  var elements = hq_str_sh600004.split(",");
}
else if(code=="600006"){
  var elements = hq_str_sh600006.split(",");
}
else if(code=="600007"){
  var elements = hq_str_sh600007.split(",");
}
else if(code=="600008"){
  var elements = hq_str_sh600008.split(",");
}
else if(code=="600009"){
  var elements = hq_str_sh600009.split(",");
}
else if(code=="600010"){
  var elements = hq_str_sh600010.split(",");
}
else if(code=="600011"){
  var elements = hq_str_sh600011.split(",");
}
else if(code=="600012"){
  var elements = hq_str_sh600012.split(",");
}
else if(code=="600015"){
  var elements = hq_str_sh600015.split(",");
}
//////////////////////////////////////////////
else if(code=="688001"){
  var elements = hq_str_sh688001.split(",");
}
else if(code=="688002"){
  var elements = hq_str_sh688002.split(",");
}
else if(code=="688003"){
  var elements = hq_str_sh688003.split(",");
}
else if(code=="688004"){
  var elements = hq_str_sh688004.split(",");
}
else if(code=="688005"){
  var elements = hq_str_sh688005.split(",");
}
else if(code=="688006"){
  var elements = hq_str_sh688006.split(",");
}
else if(code=="688007"){
  var elements = hq_str_sh688007.split(",");
}
else if(code=="688008"){
  var elements = hq_str_sh688008.split(",");
}
else if(code=="688009"){
  var elements = hq_str_sh688009.split(",");
}
else if(code=="688010"){
  var elements = hq_str_sh688010.split(",");
}
//////////////////////////////////////////////////////////////

const app = new Vue({
  el: '#data',
  data: {
    message1: elements[0],
    message2: elements[1],
    message3: elements[2],
    message4: elements[3],
    message5: elements[4],
    message6: elements[5],
    message7: elements[6]
  }
})
