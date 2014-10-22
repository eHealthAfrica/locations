use snake case for file names here, since they will be used to create
Javascript variable names

## Data model

Data has the following structure, shown with a short example:

    [{
      level: 0,
      name: 'state',
      items: [{
        id: 23,
        name: 'california'
      }, {
        ...
      }]
    }, {
      level: 1,
      name: 'county',
      plural: 'counties',
      items: [{
        id: 12,
        name: 'mariposa',
        parentId: 23
      }, {
      }]
    }]

When the plural name of a level is missing, it is assumed that it can
be built by appending an `s` to the name.

Identifiers (`id`) should be unique within every level.

Use lowercase strings for names.
