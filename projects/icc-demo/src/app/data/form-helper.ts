export const DCRFormConfig = {
  readonly: true,
  remoteFieldsConfig: true,
  remoteFormData: true,
};

export const DCRFormFields = [
  {
    fieldType: 'text',
    fieldName: 'userName',
    fieldLabel: 'User Remote',
  },
  {
    fieldType: 'text',
    fieldName: 'loginName',
    fieldLabel: 'Login Name',
  },
];

export const DCRFormData = {
  formConfig: {
    readonly: false,
  },
  formData: {
    userName: 'R2 user 77 2222',
    loginName: 'R2 test login88',
  },
};
