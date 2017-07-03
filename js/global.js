function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload !="function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
//在目标元素后面插入一个新元素
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//添加class
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName = newClassName + " " + value;
        element.className = newClassName;

    }
}
//当前页面的导航内容突出显示
function highlightPage(){
    if(!document.getElementsByTagName || !document.getElementById) return false;
    var header = document.getElementsByTagName("header");
    if(header.length == 0) return false;
    var nav = header[0].getElementsByTagName("nav");
    if(nav.length == 0) return false;
    //取得header所有a链接
    var links = nav[0].getElementsByTagName("a");
    //遍历a链接
    for(var i = 0;i < links.length;i++){
        //获取a链接的href
        var linkurl = links[i].getAttribute("href");
        //if(window.location.href === linkurl){
        //    links[i].className = "here";
        //}
        //比较当前页面的url和a链接的rul
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";

            //获取a链接的文本，并转成小写形式
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            //给页面添加对应的id
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);

/*
*home
 */
//移动元素
function moveElement(elementID,final_x,final_y,interval){
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;//元素距目标位置的距离
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0";
    }
    if(!elem.style.top){
        elem.style.top = "0";
    }

    if(xpos == final_x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        dist = Math.ceil((final_x - xpos)/10);
        xpos += dist;
    }
    if(xpos > final_x){
        dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;
    }
    if(ypos < final_y){
        dist = Math.ceil((final_y - ypos)/10);
        ypos += dist;
    }
    if(ypos > final_y){
        dist = Math.ceil((ypos - final_y)/10);
        ypos -= dist;
    }
    //吧xpos和ypos的值付给left和top
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";

    var repeat = "moveElement('"+ elementID +"',"+ final_x +","+ final_y +","+ interval +")";
    elem.movement = setTimeout(repeat,interval);
}
//创建幻灯片元素并放在“intro”元素的后面，并添加动画效果
function prepareSlideshow(){
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    //创建div元素
    var slideshow = document.createElement("div");
    //添加id为slideshow
    slideshow.setAttribute("id","slideshow");
    //创建img元素
    var preview = document.createElement("img");
    //添加id，alt及src属性
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    //吧img元素添加到slideshow后面
    slideshow.appendChild(preview);

    //创建透明div
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    //吧透明div元素添加到slideshow后面
    slideshow.appendChild(frame);

    //吧slideshow添加到intro后面
    insertAfter(slideshow,intro);

    //获取a并遍历
    //var links = intro.getElementsByTagName("a");
    var links = document.getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
        //添加鼠标滑过事件
        links[i].onmouseover = function(){
            //获取其href
            var destination = this.getAttribute("href");
            //判断
            if(destination.indexOf("index.html") != -1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html") != -1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html") != -1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html") != -1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html") != -1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);

/*
 *about
 */
//设置div的display样式属性
function showSection(id){
    var section = document.getElementsByTagName("section");
    for(var i = 0;i < section.length;i++){
        if(section[i].getAttribute("id") != id){
            section[i].style.display = "none";
        }else{
            section[i].style.display = "block";
        }
    }
}
//点击a显示对应的div
function prepareInternalnav(){
    var article = document.getElementsByTagName("article");
    if(article.length == 0) return false;
    var nav = article[0].getElementsByTagName("nav");
    if(nav.length == 0) return false;
    //取得a
    var links = nav[0].getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
        //截取a的hrefli#后面的内容
        var sectionid = links[i].getAttribute("href").split("#")[1];

        //如果没有该id则进行下一次循环
        if(!document.getElementById(sectionid)) continue;
        //给其设置隐藏
        document.getElementById(sectionid).style.display = "none";
        links[i].destination = sectionid;
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

/*
 *photos
 */
//创建显示大图的img和描述文字的p
function preparePlaceholder(){
    if(!document.getElementById || !document.getElementById("imagegallery") || !document.createElement || !document.createTextNode) return false;
    //创建p
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var ptext = document.createTextNode("Choose a img");
    description.appendChild(ptext);

    //创建img
    var img = document.createElement("img");
    img.setAttribute("id","placeholder");
    img.setAttribute("src","images/placeholder.gif");
    img.setAttribute("alt","my image gallery");

    var imagegallery = document.getElementById("imagegallery");
    insertAfter(description,imagegallery);
    insertAfter(img,description);
}
addLoadEvent(preparePlaceholder);
//当点击a的时候，替换下面img的src为a的href，替换下面p的文本为img的alt
function showPic(whichpic){
    var href = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",href);

    var title = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = title;

    return false;
}
//给a点击事件
function prepareGallery(){
    if(!document.getElementById || !document.getElementById("imagegallery") || !document.getElementsByTagName) return false;

    var imagegallery = document.getElementById("imagegallery");
    var links = imagegallery.getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
        links[i].onclick = function(){
            return showPic(this);
        }
    }
}
addLoadEvent(prepareGallery);

/*
 *live
 */
//如果tr为偶数行，则变颜色
function stripeTables(){
    if(!document.getElementsByTagName) return false;

    var table = document.getElementsByTagName("table");
    for(var i = 0;i < table.length;i++){
        var rows = table[i].getElementsByTagName("tr");
        var odd = false;
        for(var j = 0;j < rows.length;j++){
            if(odd == true){
                addClass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }
    }
}
addLoadEvent(stripeTables);
//鼠标滑过改变背景色
function highlightRows(){
    if(!document.getElementById || !document.getElementById("table") || !document.getElementsByTagName) return false;

    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");
    for(var i = 0;i < rows.length;i++){
        //吧原来的className保存成其自定义属性
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function(){
            this.className = this.oldClassName;
        }
    }
}
addLoadEvent(highlightRows);
//显示表格缩略语
function displayAbbreviations(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

    //创建显示缩略语的列表
    var h3 = document.createElement("h3");
    var h3_text = document.createTextNode("Abbreviations");
    h3.appendChild(h3_text);
    var dl = document.createElement("dl");

    var table = document.getElementById("table");
    insertAfter(h3,table);
    insertAfter(dl,h3);

    //定义一个空数组
    var array = [];
    //获取abbr
    var abbr = table.getElementsByTagName("abbr");
    if(abbr.length < 1) return false;
    //遍历abbr
    for(var i = 0;i < abbr.length;i++){
        //获取abbr的title
        var title = abbr[i].getAttribute("title");
        //获取abbr的文本内容
        var key = abbr[i].firstChild.nodeValue;
        array[key] = title;
    }
    for(key in array){
        var title = array[key];
        //创建dt
        var dt = document.createElement("dt");
        var dt_text = document.createTextNode(key);
        dt.appendChild(dt_text);
        //创建dd
        var dd = document.createElement("dd");
        var dd_text = document.createTextNode(title);
        dd.appendChild(dd_text);

        dl.appendChild(dt);
        dl.appendChild(dd);
    }
}
addLoadEvent(displayAbbreviations);

/*
 *contact
 */
//点击label文本，获取对应的id的input焦点
function focusLabels(){
    if(!document.getElementsByTagName) return false;

    var labels = document.getElementsByTagName("labels");
    for(var i = 0;i < labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
            var id = labels[i].getAttribute("for");
            if(!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            elem.focus();
        }
    }
}
addLoadEvent(focusLabels);
//占位符
function resetFiles(whichform){
    //判断浏览器是否支持placeholder，如果不支持则继续
    if(!Modernizr.inout.placeholder) return;
    //遍历form的个数
    for(var i = 0;i < whichform.elements.length;i++){
        //吧表单的元素数组赋给elem
        var elem = whichform.elements[i];
        //如果elem是提交类型，则跳出循环
        if(elem.type == "submit") continue;
        //判断元素是否有placeholder,没有则跳出循环
        if(!elem.getAttribute("placeholder") || !elem.placeholder) continue;
        //给元素添加点击事件
        elem.onfocus = function(){
            var text = this.getAttribute("placeholder") || this.placeholder;
            if(this.value == text){
                this.value = "";
                this.className ="";
            }
        }
        elem.onblur = function(){
            if(this.value == ""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        elem.onblur();
    }
}
//遍历所有form对象，传给resetFiles函数
function prepareFomrs(){
    for(var i = 0;i < document.form.length;i++){
        var thisform = document.form[i];
        resetFiles(thisform);
        thisform.onsubmit = function(){
            return validateForm(this);
        }
    }
}
addLoadEvent(prepareFomrs);

//检查用户是否输入内容
function isFilled(field){
    if(field.value.replace(" ","").length == 0) return false;
    var placeholder = field.getAttribute("placeholder") || field.placeholder;
    if(field.value != placeholder) return true;
}
//验证用户输入的email地址是否正确
function isEmails(field){
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
//验证form是否填写正确
function validateForm(whichform){
    //遍历form的所有elements
    for(var i = 0;i < whichform.elements.length;i++){
        var element = whichform.elements[i];
        //如果elements有required属性，就调用isFilled函数
        if(element.required == "required"){
            //如果isFilled返回false，就显示警告元素，validateForm函数也返回false
            if(!isFilled(element)){
                alert("Please fill in the "+ element.name +"field");
                return false;
            }
        }
        //如果elements的类型是email，就调用isEmails函数
        if(element.type == "email"){
            //如果isEmails返回false，就显示警告元素，validateForm函数也返回false
            if(!isEmails(element)){
                alert("The"+ element.name +"field must be a valid email address");
                return false;
            }
        }
    }
    //否则，返回true
    return true;
}