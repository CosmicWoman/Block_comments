set_event_on_click('.comment_delete', blockDelete);

set_event_on_click('.comment_like', likeTrue);

set_event_on_submit('form', formSubmit);

createComments();

set_event_on_keydown('.block_leave_comment',  enter);

set_event_on_keyup('#input_name', errorName);

set_event_on_keydown('#input_text',  gf);

set_event_on_change('#input_date',  gf);