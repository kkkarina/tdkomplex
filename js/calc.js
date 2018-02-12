var prices = {
    'профиль 1': 100,
    'профиль 2': 200,
    'стеклопакет 1': 300,
    'стеклопакет 2': 400,
    'цвет 1': 500,
    'цвет 2': 600
};

/* make a choosen image active */
function makeActive(event) {
    var isClass = $(event.target).hasClass('active-img');
    var eraseImg = document.getElementsByClassName('active-img');
    var erasePar = document.getElementsByClassName('active-window');
    for (i=0; i<eraseImg.length; i++) {
        eraseImg[i].classList.toggle('active-img');
        erasePar[i].classList.toggle('active-window');
    } 
    if (!isClass) {
        var curElem = event.target;
        var parent = curElem.parentElement;
        curElem.classList.toggle('active-img');
        parent.classList.toggle('active-window');
    }        
}

/* create a warning message */
function createWarning(text) {
    var el = document.createElement('p');
    el.innerHTML = text;
    el.classList.add('warning', 'text-center');
    return el;
}

/* delete all warning messages */
function clearWarning() {
    var elems = document.getElementsByClassName('warning');
    for (i=0; i<elems.length; i++) {
        elems[i].parentNode.removeChild(elems[i]);
    }
}

/* clear the second panel */
function clearFields() {
    document.getElementById('curImg').innerHTML = '';
    document.getElementById('inputW').value = '';
    document.getElementById('inputH').value = '';
}

/* create an image element */
function createImg(id) {
    var img = document.createElement('img');
    img.classList.add('img-responsive', 'inline'); 
    switch (id) {
        case 'one': img.src = 'images/windows/one.png'; break;
        case 'two': img.src = 'images/windows/two.png'; break;
        case 'three': img.src = 'images/windows/three.png'; break;
        default: return;
    }
    return img;
}

/* insert an image element into the curtain place */
function insertCurrentImg(id) {
    document.getElementById('curImg').appendChild(createImg(id));
}

/* show the second panel */
function showSecondPanel() {
    clearWarning();
    var elem = document.getElementsByClassName('active-img')[0];
    if (elem != undefined) {
        var id = elem.id;
        insertCurrentImg(id);
        $('#stepFirst').slideUp(1000);
        $('#stepSecond').slideDown(1000);        
    } else {
        document.getElementById('stepFirst').insertBefore(createWarning('Выберите, пожалуйста, тип окна'), document.getElementById('stepFirst').firstElementChild);
    }
}

function hideSecondPanel() {
    if (document.getElementById('pricePlace').style.display != 'none') {
        $('#pricePlace').slideUp(1000, function() {
            document.getElementById('pricePlace').innerHTML = '';    
        });
    }
    $('#stepSecond').slideUp(1000, function() {
        clearFields();    
    });
}

/* hide the second panel and show the first */
function showFirstPanel() {
    hideSecondPanel();
    $('#stepFirst').slideDown(1000);
}

function showPrice(price) {
    if ($('#pricePlace').css('display') != 'none') {
        document.getElementById('pricePlace').innerHTML = '';
        document.getElementById('pricePlace').appendChild(price);
    } else {
        document.getElementById('pricePlace').appendChild(price);
        $('#pricePlace').slideDown(1000);
    }
}

/* calculation */
function calc() {
    clearWarning();
    var width = document.getElementById('inputW').value;
    var height = document.getElementById('inputH').value;
    if (isNaN(width) || isNaN(height) || (width == undefined) || (height == undefined) || (width == '') || (height == '')) {
        document.getElementById('stepSecond').insertBefore(createWarning('Вы ввели некорректные данные, проверьте, пожалуйста, значения ширины и высоты'), document.getElementById('stepSecond').firstElementChild);
    } else {
        var p = document.createElement('p');
        var text = 'Стоимость окна составит приблизительно ';
        var curSel = document.getElementById('selProf');
        var profile = prices[curSel.options[curSel.selectedIndex].text.toLowerCase()];
        curSel = document.getElementById('selSteklopak');
        var stklpak = prices[curSel.options[curSel.selectedIndex].text.toLowerCase()]
        curSel = document.getElementById('selColor');
        var colorpak = prices[curSel.options[curSel.selectedIndex].text.toLowerCase()]
        var price = profile + stklpak + colorpak;
        text += price;
        text += ' рублей';
        p.innerHTML = text;
        showPrice(p);
    }
}