Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # HTTP Verb  Path              Controller#Action  Used for
  # GET        /photos           photos#index       display a list of all photos
  # POST       /photos           photos#create      create a new photo
  # GET        /photos/:id       photos#show        display a specific photo
  # PATCH/PUT  /photos/:id       photos#update      update a specific photo
  # DELETE     /photos/:id       photos#destroy     delete a specific photo

  # composite_sample_type_states
  get  'api/v1/composite_sample_type_states',             to: 'api/v1/composite_sample_type_states#index'
  post 'api/v1/composite_sample_type_states',             to: 'api/v1/composite_sample_type_states#create'
  get  'api/v1/composite_sample_type_states/:id',         to: 'api/v1/composite_sample_type_states#show'
  post 'api/v1/composite_sample_type_states/:id',         to: 'api/v1/composite_sample_type_states#update'
  post 'api/v1/composite_sample_type_states/:id/delete',  to: 'api/v1/composite_sample_type_states#delete'

  # composite_sample_type_recipes
  get  'api/v1/composite_sample_type_recipes',            to: 'api/v1/composite_sample_type_recipes#index'
  post 'api/v1/composite_sample_type_recipes',            to: 'api/v1/composite_sample_type_recipes#create'
  get  'api/v1/composite_sample_type_recipes/:id',        to: 'api/v1/composite_sample_type_recipes#show'
  post 'api/v1/composite_sample_type_recipes/:id',        to: 'api/v1/composite_sample_type_recipes#update'
  post 'api/v1/composite_sample_type_recipes/:id/delete', to: 'api/v1/composite_sample_type_recipes#delete'

  # composite_sample_types
  get  'api/v1/composite_sample_types',                   to: 'api/v1/composite_sample_types#index'
  post 'api/v1/composite_sample_types',                   to: 'api/v1/composite_sample_types#create'
  get  'api/v1/composite_sample_types/:id',               to: 'api/v1/composite_sample_types#show'
  post 'api/v1/composite_sample_types/:id',               to: 'api/v1/composite_sample_types#update'
  post 'api/v1/composite_sample_types/:id/delete',        to: 'api/v1/composite_sample_types#delete'

  # container_types
  get  'api/v1/container_types',                          to: 'api/v1/container_types#index'
  post 'api/v1/container_types',                          to: 'api/v1/container_types#create'
  get  'api/v1/container_types/:id',                      to: 'api/v1/container_types#show'
  post 'api/v1/container_types/:id',                      to: 'api/v1/container_types#update'
  post 'api/v1/container_types/:id/delete',               to: 'api/v1/container_types#delete'

  # containers
  get  'api/v1/containers',                               to: 'api/v1/containers#index'
  post 'api/v1/containers',                               to: 'api/v1/containers#create'
  get  'api/v1/containers/:id',                           to: 'api/v1/containers#show'
  post 'api/v1/containers/:id',                           to: 'api/v1/containers#update'
  post 'api/v1/containers/:id/delete',                    to: 'api/v1/containers#delete'

  # item_states
  get  'api/v1/item_states',                              to: 'api/v1/item_states#index'
  post 'api/v1/item_states',                              to: 'api/v1/item_states#create'
  get  'api/v1/item_states/:id',                          to: 'api/v1/item_states#show'
  post 'api/v1/item_states/:id',                          to: 'api/v1/item_states#update'
  post 'api/v1/item_states/:id/delete',                   to: 'api/v1/item_states#delete'

  # items
  get  'api/v1/items',                                    to: 'api/v1/items#index'
  post 'api/v1/items',                                    to: 'api/v1/items#create'
  get  'api/v1/items/:id',                                to: 'api/v1/items#show'
  post 'api/v1/items/:id',                                to: 'api/v1/items#update'
  post 'api/v1/items/:id/delete',                         to: 'api/v1/items#delete'

  # location_types
  get  'api/v1/locations',                                to: 'api/v1/locations#index'
  post 'api/v1/locations',                                to: 'api/v1/locations#create'
  get  'api/v1/locations/:id',                            to: 'api/v1/locations#show'
  post 'api/v1/locations/:id',                            to: 'api/v1/locations#update'
  post 'api/v1/locations/:id/delete',                     to: 'api/v1/locations#delete'

  # sample_type_categories
  get  'api/v1/sample_type_categories',                   to: 'api/v1/sample_type_categories#index'
  post 'api/v1/sample_type_categories',                   to: 'api/v1/sample_type_categories#create'
  get  'api/v1/sample_type_categories/:id',               to: 'api/v1/sample_type_categories#show'
  post 'api/v1/sample_type_categories/:id',               to: 'api/v1/sample_type_categories#update'
  post 'api/v1/sample_type_categories/:id/delete',        to: 'api/v1/sample_type_categories#delete'

  # sample_type_states
  get  'api/v1/sample_type_states',                       to: 'api/v1/sample_type_states#index'
  post 'api/v1/sample_type_states',                       to: 'api/v1/sample_type_states#create'
  get  'api/v1/sample_type_states/:id',                   to: 'api/v1/sample_type_states#show'
  post 'api/v1/sample_type_states/:id',                   to: 'api/v1/sample_type_states#update'
  post 'api/v1/sample_type_states/:id/delete',            to: 'api/v1/sample_type_states#delete'

  # composite_sample_types
  get  'api/v1/composite_sample_types',                   to: 'api/v1/composite_sample_types#index'
  post 'api/v1/composite_sample_types',                   to: 'api/v1/composite_sample_types#create'
  get  'api/v1/composite_sample_types/:id',               to: 'api/v1/composite_sample_types#show'
  post 'api/v1/composite_sample_types/:id',               to: 'api/v1/composite_sample_types#update'
  post 'api/v1/composite_sample_types/:id/delete',        to: 'api/v1/composite_sample_types#delete'

  # sample_types
  get  'api/v1/sample_types',                             to: 'api/v1/sample_types#index'
  post 'api/v1/sample_types',                             to: 'api/v1/sample_types#create'
  get  'api/v1/sample_types/:id',                         to: 'api/v1/sample_types#show'
  post 'api/v1/sample_types/:id',                         to: 'api/v1/sample_types#update'
  post 'api/v1/sample_types/:id/delete',                  to: 'api/v1/sample_types#delete'

end
