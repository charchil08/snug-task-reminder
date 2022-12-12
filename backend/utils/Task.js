class Task {
    constructor(id, title, description, priority, dueAt, createdAt, updatedAt) {
        this.id = id
        this.title = title
        this.description = description
        this.priority = priority
        this.dueAt = dueAt
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

class Tasks {
    constructor() {
        this.tasks = []
    }
}

module.exports = { Task }