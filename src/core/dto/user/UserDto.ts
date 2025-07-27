export interface UserDto {
    id?: number;
    name: string;
    email: string;
    password: string;
    settings?: UserSettingsDto;
  }
  
export interface UserSettingsDto {
    id?: number;
    userId: number;
    twitchChannel: string;
    kickChannel: string;
}