module.exports = app => {
  require('modules/user/api')(app)
  require('modules/organization/api')(app)
  require('modules/group/api')(app)
  require('modules/seller/api')(app)
  require('modules/item/api')(app)
  require('modules/upload/api')(app)
}
