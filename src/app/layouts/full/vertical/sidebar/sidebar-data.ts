import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  
  {
    displayName: 'Dashboard',
    iconName: 'chart-pie',
    route: '/dashboards/dashboard',
  },
  
  {
    displayName: 'Manage Unit',
    iconName: 'file-invoice',
    route: 'apps/manageunit',
  },

  {
    displayName: 'Local Admin',
    iconName: 'user-star',
    route: 'apps/localadmin',
  },

  {
    displayName: 'Generate OTP',
    iconName: 'brand-ctemplar',
    route: 'apps/generateotp',
  },
  {
    displayName: 'Manage Client',
    iconName: 'address-book',
    route: 'apps/clientAdministration',
  },
  {
    displayName: 'Manage Policy',
    iconName: 'edit',
    route: 'apps/policyConfiguration',
  },

  // {
  //   displayName: 'Groups',
  //   iconName: 'users-group',
  //   route: 'apps/groups',
  // },
  {
    displayName: 'Log Viewer',
    iconName: 'file',
    route: 'apps/logViewer',
  },
  {
    displayName: 'Hierarchy Chart',
    iconName: 'hierarchy-3',
    route: 'apps/hierarchyChart',
  },

  {
    displayName: 'USB Violation',
    iconName: 'usb',
    route: 'apps/usbviolation',
  },
  
];
