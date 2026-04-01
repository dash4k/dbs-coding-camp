import React from 'react';
import ContactItem from './ContactItem';
import Joi from 'joi';
import { validateProps } from '../utils/validation';

const contactListPropsSchema = Joi.object({
  contacts: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      tag: Joi.string().required(),
      imageUrl: Joi.string().required(),
    })
  ).required(),
  onDelete: Joi.func().required(),
});

function ContactList(props) {
  const validatedProps = validateProps(contactListPropsSchema, props, 'ContactList');
  const { contacts, onDelete } = validatedProps;
  
  return (
    <div className="contact-list">
      {
        contacts.map((contact) => (
          <ContactItem 
          key={contact.id}
          id={contact.id}
          onDelete={onDelete}
          {...contact} />
        ))
      }
    </div>
  );
}

export default ContactList;