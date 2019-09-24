module.exports = app => {
  require('modules/user/api')(app)
  require('modules/organization/api')(app)
}
