import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  ThunderboltOutline,
  MoreOutline,
  HomeOutline,
  DatabaseOutline,
  PieChartOutline,
  ShoppingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  FilterOutline,
  LogoutOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  ThunderboltOutline,
  MoreOutline,
  HomeOutline,
  DatabaseOutline,
  PieChartOutline,
  ShoppingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  FilterOutline,
  LogoutOutline
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
