import * as React from 'react';
import { RiSettings2Line } from 'react-icons/ri';
import { useColorMode } from 'theme-ui';

import * as DropdownMenu from '@/common/components/system/DropdownMenu';
import { IconButton } from '@/common/components/system/IconButton';

export const SettingsButton = (): JSX.Element => {
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = (event: Event) => {
    event.preventDefault();
    setColorMode((prevMode) => (prevMode === 'dark' ? 'default' : 'dark'));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <RiSettings2Line />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="bottom"
        align="end"
        allowPinchZoom
        loop
      >
        <DropdownMenu.Group>
          <DropdownMenu.CheckboxItem
            onSelect={toggleColorMode}
            checked={colorMode !== 'default'}
          >
            Dark mode
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Item>
            Settings
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
