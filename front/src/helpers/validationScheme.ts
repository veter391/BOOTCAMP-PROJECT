const validationScheme = {
  email: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 25,
      message: 'Debe contener un máximo de 25 caracteres.'
    },
    minLength: {
      value: 4,
      message: 'Debe contener un mínimo de 4 caracteres.'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email'
    }
  },
  password: {
    required: '*Campo obligatorio.',
    pattern: {
      value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      message: 'Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.'
    }
  },
  name: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 20,
      message: 'Debe contener un máximo de 20 caracteres.'
    },
    minLength: {
      value: 2,
      message: 'Debe contener un mínimo de 2 caracteres.'
    },
    pattern: {
      value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i, // no se que hace este i
      message: 'Invalid name'
    }

  },
  surname: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 20,
      message: 'Debe contener un máximo de 20 caracteres.'
    },
    minLength: {
      value: 2,
      message: 'Debe contener un mínimo de 2 caracteres.'
    },
    pattern: {
      value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i, // no se que hace este i
      message: 'Invalid surname'
    }
  },
  companyName: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 30,
      message: 'Debe contener un máximo de 30 caracteres.'
    },
    minLength: {
      value: 4,
      message: 'Debe contener un mínimo de 4 caracteres.'
    },
    pattern: {
      value: /[A-Za-z0-9'.\-\s,]$/i,
      message: 'Invalid company name'
    }
  },
  companyAddress: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 45,
      message: 'Debe contener un máximo de 45 caracteres.'
    },
    minLength: {
      value: 10,
      message: 'Debe contener un mínimo de 10 caracteres.'
    },
    pattern: {
      value: /^(?![_.])[A-Za-z0-9'.\-\s,]+(?<![_.])$/i,
      message: 'Invalid company address'
    }
  },
  cif: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 9,
      message: 'Debe contener un máximo de 9 caracteres.'
    },
    minLength: {
      value: 9,
      message: 'Debe contener un mínimo de 9 caracteres.'
    },
    pattern: {
      value: /^(?![_.])[A-z][a-zA-Z0-9._]+[0-9](?<![_.])$/i,
      message: 'El CIF no és válido'
    }
  },
  eventTitle: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 30,
      message: 'Debe contener un máximo de 30 caracteres.'
    },
    minLength: {
      value: 5,
      message: 'Debe contener un mínimo de 5 caracteres.'
    }
    // pattern: {
    //   value: /^(?![_.])[A-z][a-zA-Z0-9._]+[0-9](?<![_.])$/i,
    //   message: 'El CIF no és válido'
    // }
  },
  eventLocation: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 15,
      message: 'Debe contener un máximo de 15 caracteres.'
    },
    minLength: {
      value: 3,
      message: 'Debe contener un mínimo de 3 caracteres.'
    }
    // pattern: {
    //   value: /^(?![_.])[A-z][a-zA-Z0-9._]+[0-9](?<![_.])$/i,
    //   message: 'El CIF no és válido'
    // }
  },
  eventDescr: {
    required: '*Campo obligatorio.',
    maxLength: {
      value: 1000,
      message: 'Debe contener un máximo de 1000 caracteres.'
    },
    minLength: {
      value: 10,
      message: 'Debe contener un mínimo de 10 caracteres.'
    }
    // pattern: {
    //   value: /^(?![_.])[A-z][a-zA-Z0-9._]+[0-9](?<![_.])$/i,
    //   message: 'El CIF no és válido'
    // }
  }
};

export default validationScheme;
