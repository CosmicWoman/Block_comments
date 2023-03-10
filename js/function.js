let jsonData = JSON.parse(data, function (key, value){
   if (key === 'date') {
       return new Date(value)
   } else if (key === 'data_counter') {
       let num = Number(value);
       let result = (num === 0) ? '' : num;
       return result;
   } else {
       return value;
   }
});

function createComments(){
    for (let review of jsonData.comments){
        createComment(review);
    }
}

function formSubmit(event) {
    console.log('formSubmit');
    event.preventDefault();
    let review = {
        name: document.querySelector('#input_name').value,
        text: document.querySelector('#input_text').value,
        date: document.querySelector('#input_date').value,
        is_like: false,
        data_counter: 0,
    };

    if (!review.date) {
        review.date = new Date();
    } else {
        review.date = new Date(review.date)
    }
    if (validateForm(review)){
        createComment(review);
        deleteForm(review);
    }
}

function createComment(review){
    let parent = document.querySelector('.comments_list')
    let firstChild = parent.firstChild;
    let comment = document.createElement('div');
    comment.classList.add('comment');

    let name = document.createElement('div');
    name.classList.add('comment_name');

    let text = document.createElement('div');
    text.classList.add('comment_text');

    let date = document.createElement('div');
    date.classList.add('comment_date');

    let buttons = document.createElement('div');
    buttons.classList.add('comment_button');

    let like = document.createElement('button');
    like.classList.add('comment_like');
    if(review.is_like){
        like.classList.add('comment_like_true')
    }
    let del = document.createElement('button');
    del.classList.add('comment_delete');

    parent.insertBefore(comment, firstChild);
    comment.appendChild(name);
    comment.appendChild(text);
    comment.appendChild(date);
    comment.appendChild(buttons);
    buttons.appendChild(like);
    buttons.appendChild(del);

    name.innerHTML = review.name;
    text.innerHTML = review.text;
    date.innerHTML = convertDate(review.date);
    like.textContent = review.data_counter || '';
    let num = review.data_counter;
    like.setAttribute('data-counter', num);

    set_event_on_click('.comment_delete', blockDelete);

    set_event_on_click('.comment_like', likeTrue);
}


function convertDate(date){
    let now = new Date();
    let today = now.toLocaleDateString();
    let day = new Date(Date.now() - 86400000);
    let yesterday = day.toLocaleDateString();
    let hours = date.toLocaleTimeString([],{hour:'2-digit', minute: '2-digit'});
    let reductionDate = date.toLocaleDateString();
    if (reductionDate === today) {
        return 'сегодня ' + hours;
    } else if (reductionDate === yesterday) {
        return 'вчера ' + hours;
    } else {
        return reductionDate;
    }
}

function blockDelete(){
    this.closest('.comment').outerHTML = '';
}

function likeTrue(e){
    let count = Number(this.dataset.counter);

    if(this.classList.contains('comment_like_true')){
        this.classList.remove('comment_like_true');
        count -= 1;
    } else {
        count += 1;
        this.classList.add('comment_like_true');
    }
    this.dataset.counter = count;
    this.textContent = count || '';
}

function enter(event){
    if (event.key === 'Enter') {
        formSubmit();
    }
}

function validateName(review) {
    let name = review.name;
    console.log(review.name, typeof(review.name));
    let nameLength = name.length;
    let parent = document.querySelector('.block_leave_comment_name');
    let nameShort = document.querySelector('.name_error_short');
    if (nameLength <= 2 && !nameShort) {
        let nameShort = document.createElement('span');
        nameShort.classList.add('name_error_short');
        parent.appendChild(nameShort);
        nameShort.textContent = '*слишком короткое имя';
        return false
    } else if(nameShort) {
        parent.removeChild(nameShort)
    }
    return true
}

function errorName(){
    console.log('errorName')
    let regex = /^[a-zA-Zа-яА-ЯЁё]+$/g;
    let parent = document.querySelector('.block_leave_comment_name');
    let errorSymbol = document.querySelector('.name_error_symbol');
    let isError = this.value && regex.test(this.value) === false;
    if (isError && !errorSymbol) {
        errorSymbol = document.createElement('span');
        errorSymbol.classList.add('name_error_symbol');
        parent.appendChild(errorSymbol);
        errorSymbol.textContent = '*пожалуйста, используйте только буквы для ввода имени';
        return false
    } else if(errorSymbol) {
        parent.removeChild(errorSymbol)
    }
    return true
}

function validateReview(review) {
    console.log('validateReview');
    let stringLength = review.text.length;
    let parent = document.querySelector('.block_leave_comment_text');
    let textShort = document.querySelector('.text_error_short');
    if (stringLength <= 100 && !textShort) {
        let textShort = document.createElement('span');
        textShort.classList.add('text_error_short');
        parent.appendChild(textShort);
        textShort.textContent = '*Ваш отзыв слишком которкий. Чтобы он был полезен другим покупателям, дополните его';
        return false
    } else if (textShort){
        parent.removeChild(textShort)
    }
    return true
}

function checkDate(review){
    console.log('checkDate');
    let now = new Date();
    let today = now.toLocaleDateString();
    let revD = review.date;
    let date = revD.toLocaleDateString();
    let parent = document.querySelector('.block_leave_comment_date');
    let errorDate = document.querySelector('.date_error');
    if(date > today){
        let errorDate = document.createElement('span');
        errorDate.classList.add('date_error');
        parent.appendChild(errorDate);
        errorDate.textContent = '*Вы из будущего? К сожалению, в нашем времени эта дата ещё не наступила (';
        return false
    } else if(errorDate) {
        parent.removeChild(errorDate);
    }
    return true
}

function validateForm(review){
    console.log('validateForm');
    if (checkDate(review) && validateReview(review) && validateName(review) && errorName()){
        return true;
    }
}

function deleteForm(review) {
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.reset();
    })
}