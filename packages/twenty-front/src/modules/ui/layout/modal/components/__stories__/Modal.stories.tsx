import { Meta, StoryObj } from '@storybook/react';
import { ComponentDecorator } from 'twenty-ui';

import { Modal } from '../Modal';
import { ModalHotkeyScope } from '../types/ModalHotkeyScope';

const meta: Meta<typeof Modal> = {
  title: 'UI/Layout/Modal/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    size: 'medium',
    padding: 'medium',
    hotkeyScope: ModalHotkeyScope.Default,
    children: (
      <>
        <Modal.Header>Stay in touch</Modal.Header>
        <Modal.Content>
          This is a dummy newsletter form so don't bother trying to test it. Not
          that I expect you to, anyways. :)
        </Modal.Content>
        <Modal.Footer>
          By using Funnelmink, you're opting for the finest CRM experience you'll
          ever encounter.
        </Modal.Footer>
      </>
    ),
  },
  decorators: [ComponentDecorator],
  argTypes: {
    children: { control: false },
  },
};
