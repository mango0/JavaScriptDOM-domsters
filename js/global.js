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
//��Ŀ��Ԫ�غ������һ����Ԫ��
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//���class
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName = newClassName + " " + value;
        element.className = newClassName;

    }
}
//��ǰҳ��ĵ�������ͻ����ʾ
function highlightPage(){
    if(!document.getElementsByTagName || !document.getElementById) return false;
    var header = document.getElementsByTagName("header");
    if(header.length == 0) return false;
    var nav = header[0].getElementsByTagName("nav");
    if(nav.length == 0) return false;
    //ȡ��header����a����
    var links = nav[0].getElementsByTagName("a");
    //����a����
    for(var i = 0;i < links.length;i++){
        //��ȡa���ӵ�href
        var linkurl = links[i].getAttribute("href");
        //if(window.location.href === linkurl){
        //    links[i].className = "here";
        //}
        //�Ƚϵ�ǰҳ���url��a���ӵ�rul
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";

            //��ȡa���ӵ��ı�����ת��Сд��ʽ
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            //��ҳ����Ӷ�Ӧ��id
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);

/*
*home
 */
//�ƶ�Ԫ��
function moveElement(elementID,final_x,final_y,interval){
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;//Ԫ�ؾ�Ŀ��λ�õľ���
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
    //��xpos��ypos��ֵ����left��top
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";

    var repeat = "moveElement('"+ elementID +"',"+ final_x +","+ final_y +","+ interval +")";
    elem.movement = setTimeout(repeat,interval);
}
//�����õ�ƬԪ�ز����ڡ�intro��Ԫ�صĺ��棬����Ӷ���Ч��
function prepareSlideshow(){
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    //����divԪ��
    var slideshow = document.createElement("div");
    //���idΪslideshow
    slideshow.setAttribute("id","slideshow");
    //����imgԪ��
    var preview = document.createElement("img");
    //���id��alt��src����
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    //��imgԪ����ӵ�slideshow����
    slideshow.appendChild(preview);

    //����͸��div
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    //��͸��divԪ����ӵ�slideshow����
    slideshow.appendChild(frame);

    //��slideshow��ӵ�intro����
    insertAfter(slideshow,intro);

    //��ȡa������
    //var links = intro.getElementsByTagName("a");
    var links = document.getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
        //�����껬���¼�
        links[i].onmouseover = function(){
            //��ȡ��href
            var destination = this.getAttribute("href");
            //�ж�
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
//����div��display��ʽ����
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
//���a��ʾ��Ӧ��div
function prepareInternalnav(){
    var article = document.getElementsByTagName("article");
    if(article.length == 0) return false;
    var nav = article[0].getElementsByTagName("nav");
    if(nav.length == 0) return false;
    //ȡ��a
    var links = nav[0].getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
        //��ȡa��hrefli#���������
        var sectionid = links[i].getAttribute("href").split("#")[1];

        //���û�и�id�������һ��ѭ��
        if(!document.getElementById(sectionid)) continue;
        //������������
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
//������ʾ��ͼ��img���������ֵ�p
function preparePlaceholder(){
    if(!document.getElementById || !document.getElementById("imagegallery") || !document.createElement || !document.createTextNode) return false;
    //����p
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var ptext = document.createTextNode("Choose a img");
    description.appendChild(ptext);

    //����img
    var img = document.createElement("img");
    img.setAttribute("id","placeholder");
    img.setAttribute("src","images/placeholder.gif");
    img.setAttribute("alt","my image gallery");

    var imagegallery = document.getElementById("imagegallery");
    insertAfter(description,imagegallery);
    insertAfter(img,description);
}
addLoadEvent(preparePlaceholder);
//�����a��ʱ���滻����img��srcΪa��href���滻����p���ı�Ϊimg��alt
function showPic(whichpic){
    var href = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",href);

    var title = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = title;

    return false;
}
//��a����¼�
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
//���trΪż���У������ɫ
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
//��껬���ı䱳��ɫ
function highlightRows(){
    if(!document.getElementById || !document.getElementById("table") || !document.getElementsByTagName) return false;

    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");
    for(var i = 0;i < rows.length;i++){
        //��ԭ����className��������Զ�������
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
//��ʾ���������
function displayAbbreviations(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

    //������ʾ��������б�
    var h3 = document.createElement("h3");
    var h3_text = document.createTextNode("Abbreviations");
    h3.appendChild(h3_text);
    var dl = document.createElement("dl");

    var table = document.getElementById("table");
    insertAfter(h3,table);
    insertAfter(dl,h3);

    //����һ��������
    var array = [];
    //��ȡabbr
    var abbr = table.getElementsByTagName("abbr");
    if(abbr.length < 1) return false;
    //����abbr
    for(var i = 0;i < abbr.length;i++){
        //��ȡabbr��title
        var title = abbr[i].getAttribute("title");
        //��ȡabbr���ı�����
        var key = abbr[i].firstChild.nodeValue;
        array[key] = title;
    }
    for(key in array){
        var title = array[key];
        //����dt
        var dt = document.createElement("dt");
        var dt_text = document.createTextNode(key);
        dt.appendChild(dt_text);
        //����dd
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
//���label�ı�����ȡ��Ӧ��id��input����
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
//ռλ��
function resetFiles(whichform){
    //�ж�������Ƿ�֧��placeholder�������֧�������
    if(!Modernizr.inout.placeholder) return;
    //����form�ĸ���
    for(var i = 0;i < whichform.elements.length;i++){
        //�ɱ���Ԫ�����鸳��elem
        var elem = whichform.elements[i];
        //���elem���ύ���ͣ�������ѭ��
        if(elem.type == "submit") continue;
        //�ж�Ԫ���Ƿ���placeholder,û��������ѭ��
        if(!elem.getAttribute("placeholder") || !elem.placeholder) continue;
        //��Ԫ����ӵ���¼�
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
//��������form���󣬴���resetFiles����
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

//����û��Ƿ���������
function isFilled(field){
    if(field.value.replace(" ","").length == 0) return false;
    var placeholder = field.getAttribute("placeholder") || field.placeholder;
    if(field.value != placeholder) return true;
}
//��֤�û������email��ַ�Ƿ���ȷ
function isEmails(field){
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
//��֤form�Ƿ���д��ȷ
function validateForm(whichform){
    //����form������elements
    for(var i = 0;i < whichform.elements.length;i++){
        var element = whichform.elements[i];
        //���elements��required���ԣ��͵���isFilled����
        if(element.required == "required"){
            //���isFilled����false������ʾ����Ԫ�أ�validateForm����Ҳ����false
            if(!isFilled(element)){
                alert("Please fill in the "+ element.name +"field");
                return false;
            }
        }
        //���elements��������email���͵���isEmails����
        if(element.type == "email"){
            //���isEmails����false������ʾ����Ԫ�أ�validateForm����Ҳ����false
            if(!isEmails(element)){
                alert("The"+ element.name +"field must be a valid email address");
                return false;
            }
        }
    }
    //���򣬷���true
    return true;
}