const getTodos_query = "SELECT * FROM task order by createdAt";
const addTodo_query = "INSERT INTO task (title, description, dueAt, priority, createdAt) values ($1, $2, $3, $4, $5) returning *";
const removeTodo_query = "DELETE FROM task where id = $1 returning title";
const removeAllTodos_query = "DELETE FROM task";

const getTdoById_query = "SELECT * FROM task where id=$1"

const todosBetweenDueDate_query = "select * from task where dueAt between $1 and $2"
const todosBetweenCreatedDate_query = "select * from task where createdAt between $1 and $2"

const updateTodo_query = "UPDATE task set title=$1, description=$2, dueAt=$3, updatedAt=$4, priority=$5 where id=$6 returning *"

const getSearch_query = "SELECT * FROM task where (dueAt between $1 and $2)  and (title || ' ' || description ilike $3) and (priorities in ($4:list)) order by dueAt"


module.exports = {
    getTodos_query,
    addTodo_query,
    removeTodo_query,
    getTdoById_query,
    removeAllTodos_query,
    todosBetweenDueDate_query,
    todosBetweenCreatedDate_query,
    updateTodo_query,
    getSearch_query
}