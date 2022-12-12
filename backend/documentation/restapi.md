<h1>TaskList REST API </h1>

Todos

    Base Api : /api/v1/todos

    Get all Tasks
    GET: /

    Create a task
    POST: /

    Edit a task
    PUT: /todo/:todoId

    remove a task
    DELETE: /todo/:todoId

    remove all tasks
    DELETE: /


## reminder table info
id
table_id - fk - on delete cascade
mail

onclick -> 
remider_req
reminder_suc
reminder_fail

-> /reminder/:task_id
-> set reminder