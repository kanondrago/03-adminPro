import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme()
  }

  constructor( private settingsService: SettingsService) {
  }
  
  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }

  

}
