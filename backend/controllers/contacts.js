// Contacts Controller

const { response } = require('express');
const mongodb = require('../db/mongodb');
const { options } = require('../routes/contacts');
const ObjectId = require('mongodb').ObjectId;

// Get All contacts in contacts collection
const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  });
};
// Get One Cantact from contacts collection
const getOneContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data[0]);
  });
};

// Post or create a contact to collections with variable data
const createContact = async (req, res, next) => {
  const contactData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favourite_color: req.body.favourite_color,
    birthdate: req.body.birthdate
  };
  try {
    result = await mongodb.getDb().db().collection('contacts').insertOne(contactData);
    const contactId = ObjectId(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(response) && `New contact with _id ${contactId} added to collection.`;
    // console.log(response);
  } catch (error) {
    res.status(500).json(response) || 'Contact not created. Try again.';
  }};

// Delete contact with _id
const deleteContact = async (req, res, next) => {
  const userId = ObjectId(req.params.id);
  try {
    await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true);
    // console.log(response);
    res.status(204).send;
  } catch (error) {
     res.status(500).send;
  }};

// Update Contact 
const updateContact = async (req, res) => {
  const userId = ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favourite_color: req.body.favourite_color,
    birthdate: req.body.birthdate
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error && console.log` Contact not updated, try again.` );
  }
};

module.exports = {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact
};
