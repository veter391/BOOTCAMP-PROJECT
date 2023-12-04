const validationScheme = {
  email: {
    required: '*Email is Required',
    maxLength: {
      value: 25,
      message: 'max 25 letters'
    },
    minLength: {
      value: 4,
      message: 'min 4 letters'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email'
    }
  },
  password: {
    required: '*Password is Required',
    pattern: {
      value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      message: 'Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.'
    }
  },
  name: {
    required: '*Name is Requiered',
    maxLength: {
      value: 20,
      message: 'max 20 characters'
    },
    minLength: {
      value: 2,
      message: 'min 2 characters'
    },
    pattern: {
      value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i, // no se que hace este i
      message: 'Invalid name'
    }

  },
  surname: {
    required: '*Surname is Requiered',
    maxLength: {
      value: 20,
      message: 'max 20 characters'
    },
    minLength: {
      value: 2,
      message: 'min 2 characters'
    },
    pattern: {
      value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i, // no se que hace este i
      message: 'Invalid surname'
    }
  },
  companyName: {
    required: '*Company name is Requiered',
    maxLength: {
      value: 30,
      message: 'max 30 characters'
    },
    minLength: {
      value: 4,
      message: 'min 4 characters'
    },
    pattern: {
      value: /[A-Za-z0-9'.\-\s,]$/i,
      message: 'Invalid company name'
    }
  },
  companyAddress: {
    required: '*Company adress is Requiered',
    maxLength: {
      value: 45,
      message: 'max 45 characters'
    },
    minLength: {
      value: 10,
      message: 'min 10 characters'
    },
    pattern: {
      value: /^(?![_.])[A-Za-z0-9'.\-\s,]+(?<![_.])$/i,
      message: 'Invalid company address'
    }
  }
};

export default validationScheme;