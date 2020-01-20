import { VRXFormValidatorTypes } from 'vrx-form';
import UsernameExistsValidator from '../validators/username-exists';

export default {
  username: [
    {
      type: VRXFormValidatorTypes.PATTERN,
      validation: /^([a-zA-Z0-9_]+)$/,
      message: 'Username can only contain numbers, letters and underscores.'
    },
    {
      type: UsernameExistsValidator
    },
    {
      type: VRXFormValidatorTypes.MIN_LENGTH,
      validation: 3,
      message: 'Username must be at least 3 characters long'
    }
  ],
  password: [
    {
      type: VRXFormValidatorTypes.PATTERN,
      validation: /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]+)$/,
      message: 'Password must contain at least 1 letter and 1 number'
    },
    {
      type: VRXFormValidatorTypes.RANGE_LENGTH,
      validation: [8,16],
      message: 'Must be between 8 and 16 characters long'
    }
  ],
  fullName: [
    {
      type: VRXFormValidatorTypes.REQUIRED,
      validation: false
    },
    {
      type: VRXFormValidatorTypes.RANGE_LENGTH,
      validation: [3,26]
    }
  ],
  bio: [
    {
      type: VRXFormValidatorTypes.RANGE_LENGTH,
      validation: [10,100],
      message: 'The bio should be between 10 and 100 characters long.'
    }
  ],
  agree: [
    {
      type: VRXFormValidatorTypes.REQUIRED,
      validation: true,
      message: 'You must check the box to proceed'
    }
  ],
  hear: [
    {
      type: VRXFormValidatorTypes.REQUIRED,
      validation: true,
      message: 'Please select how you heard about us.'
    }
  ],
  receiveEmail: [
    {
      type: VRXFormValidatorTypes.REQUIRED,
      validation: true
    }
  ]
}
