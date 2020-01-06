---
title: Full Example
lang: en-US
---
# Full Example

The following is a full example with the more widely used components

## Example form
<br/>
<FullExample />


## Example code

The example above consists of 3 files that contain a custom validator, validations file, and a vue component to house the form. The hope is that this example will cover most use cases for how to use the vue form package well.

### Custom Validator

This file contains the custom validator that will asynchronously validate a component `validators/username-exists.js`:

<<< @/docs/.vuepress/validators/username-exists.js

### Validations file

This file contains all of the validations of the field `validations/profile-validations.js`:

<<< @/docs/.vuepress/validations/profile-validations.js


### Vue component file

This file brings everything together to show how the vue validator works `components/FullExample.vue`:

<<< @/docs/.vuepress/components/FullExample.vue
