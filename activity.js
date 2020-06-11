var searchText = '';
var list = [];

function addHandler() {
    var value = document.getElementById('textInput').value || '';
    value = value.trim();
    if (value && !isNaN(value)) {
        list.push(value);
        resetTextInput();
        renderList(list);
        resetRadioBtn();
        return;
    }
    appendErrorMessage(value);
}

function resetRadioBtn(){
    document.getElementById('none').checked = true;
}

function resetTextInput() {
    document.getElementById('textInput').value = '';
}

function setNoResultsMessage() {
    document.getElementById('list-items').innerHTML = 'No Results Found';
}

function searchHandler() {
    var value = document.getElementById('textInput').value || '';
    value = value.trim();
    if (value && !isNaN(value)) {
        resetRadioBtn();
        var filteredList = list.filter(function (item) {
            return item.indexOf(value) === 0;
        });
        if (filteredList.length) {
            renderList(filteredList);
            return;
        }
        this.setNoResultsMessage();
        return;
    }
    appendErrorMessage(value);
}

function textChangeHandler() {
    document.getElementById('error-message').innerHTML = '';
}

function sortHandler() {
    var sortBy = document.querySelector('input[name=sort]:checked').value || 'none';
    var sortedArr = [];
    textChangeHandler();
    resetTextInput();
    switch (sortBy) {
        case 'asc': {
            sortedArr = list.sort(function (a, b) { return a - b });
            break;
        }
        case 'desc': {
            sortedArr = list.sort(function (a, b) { return b - a });
            break;
        }
        default:
            sortedArr = list;
            break;
    }
    if (sortedArr.length) {
        renderList(sortedArr);
        return;
    }
    this.setNoResultsMessage();
}

function resetHandler() {
    textChangeHandler();
    setNoResultsMessage();
    resetTextInput();
    renderList(list);
    resetRadioBtn();
}

function appendErrorMessage(value) {
    if (!value) {
        document.getElementById('error-message').innerHTML = 'Enter valid input';
        return
    }
    if (isNaN(value)) {
        document.getElementById('error-message').innerHTML = 'Input is a number';
    }
}

function removeHandler(index) {
    list.splice(index, 1);
    renderList(list);
}

function renderList(list) {
    var parent = document.getElementById('list-items');
    parent.innerHTML = '';
    list.forEach(function (item, i) {
        parent.innerHTML += '<li><span class="list">' + item + '</span><button class="remove" onclick="removeHandler(' + i + ')">x</button></li>';
    });
}