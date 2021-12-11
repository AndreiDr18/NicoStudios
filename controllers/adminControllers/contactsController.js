const contactModel = require('../../models/contact');

function contactsGET(req, res) {
  contactModel.find()
    .then(contacts => {
      res.render('adminViews/contacts', {
        contacts: contacts
      })
    });
}

function contactsVIEW(req, res) {

  contactModel.findById(req.params.id)
    .then(contact => {
      res.render('adminViews/contactView', {
        'contact': contact
      });
    });
}

function contactsDELETE(req, res) {

  contactModel.findByIdAndDelete(req.params.id)
    .then(contact => {
      res.redirect('/admin/contacts');
    });
}

module.exports = {
  contactsGET,
  contactsVIEW,
  contactsDELETE
};