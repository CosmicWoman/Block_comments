function blockDelete(){
    let block = document.querySelector('.comment_delete');
    block.closest('.comment').outerHTML = '';
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
    this.textContent = count;
}

let jsonData = JSON.parse(data, function (key, value){
   if (key === 'date') {
       return new Date(value)
   } else if (key === 'is_like') {
       let bool = (value === 'true') ? 1 : null;
       return Boolean(bool);
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
        createComment(review)
    }
}

function formSubmit() {
    let review = {
        name: document.querySelector('#input_name').value,
        text: document.querySelector('#input_text').value,
        date: document.querySelector('#input_date').value,
        is_like: false
    };
    createComment(review);
}


// Как добавить пользовательское свойство с числом, а не строкой?
// Если не получится, то изменить работу функции likeTrue
function createComment(review){
    let parent = document.querySelector('.comments_list')
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
    let del = document.createElement('button');
    del.classList.add('comment_delete');

    parent.appendChild(comment);
    comment.appendChild(name);
    comment.appendChild(text);
    comment.appendChild(date);
    comment.appendChild(buttons);
    buttons.appendChild(like);
    buttons.appendChild(del);

    name.innerHTML = review.name;
    text.innerHTML = review.text;
    date.innerHTML = convertDate(review.date);
    like.textContent = review.data_counter;
    // let num = Number('review.data_counter');
    // like.setAttribute('counter');
    // like.counter = num;
}

function convertDate(date){
    let now = new Date();
    let today = now.toLocaleDateString();
    let day = new Date(Date.now() - 86400000);
    let yesterday = day.toLocaleDateString();
    let hours = date.toLocaleTimeString([],{hour:'2-digit', minute: '2-digit'});
    console.log(hours);
    console.log(today);
    console.log(yesterday);
    let reductionDate = date.toLocaleDateString();
    if (reductionDate === today) {
        return 'сегодня ' + hours;
    } else if (reductionDate === yesterday) {
        return 'вчера ' + hours;
    } else {
        return reductionDate;
    }
}