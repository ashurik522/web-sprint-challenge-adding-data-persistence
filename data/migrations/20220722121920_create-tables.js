
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id')
        tbl.varchar('project_name', 40)
            .notNullable()
        tbl.varchar('project_description',200)
        tbl.boolean('project_completed',)
            .defaultTo(0)
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.varchar('resource_name', 40)
            .notNullable()
            .unique()
        tbl.varchar('resource_description', 200)
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.varchar('task_description', 200)
            .notNullable()
        tbl.varchar('task_notes', 200)
        tbl.boolean('task_completed')
            .defaultTo(0)
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
    })
    .createTable('project_resources', tbl => {
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources')
    })  
};


exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
  
};