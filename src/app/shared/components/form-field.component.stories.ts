import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<FormFieldComponent> = {
  title: 'UI/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<FormFieldComponent>;

// Email
export const Email: Story = {
  render: () => ({
    props: {
      label: 'Email',
      type: 'email',
      placeholder: 'oliver@queen.com',
      control: new FormControl('', [Validators.required, Validators.email]),
      error: 'Enter a valid email',
    },
  }),
};

// Email with error
export const EmailError: Story = {
  render: () => {
    const control = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    control.markAsTouched();

    return {
      props: {
        label: 'Email',
        type: 'email',
        placeholder: 'oliver@queen.com',
        control,
        error: 'Invalid email',
      },
    };
  },
};

// Password
export const Password: Story = {
  render: () => ({
    props: {
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      control: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      error: 'Min 8 characters',
    },
  }),
};

// Password with error
export const PasswordError: Story = {
  render: () => {
    const control = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    control.markAsTouched();

    return {
      props: {
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        control,
        error: 'Password too short',
      },
    };
  },
};
