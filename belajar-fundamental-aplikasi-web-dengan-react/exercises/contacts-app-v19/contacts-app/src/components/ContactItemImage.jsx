import React from 'react';
import Joi from 'joi';
import { validateProps } from '../utils/validation';

const contactItemImagePropsSchema = Joi.object({
  imageUrl: Joi.string().required(),
});

function ContactItemImage(props) {
 const validatedProps = validateProps(contactItemImagePropsSchema, props, 'ContactItemImage')
 const { imageUrl } = validatedProps;

 return (
   <div className="contact-item__image">
     <img src={imageUrl} alt="contact avatar"/>
   </div>
 );
}

export default ContactItemImage;