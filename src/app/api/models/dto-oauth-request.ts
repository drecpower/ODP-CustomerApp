/* tslint:disable */
export interface DtoOauthRequest {
  authorizationCode?: string;
  authorizationCodeVerifier?: string;
  clientId?: string;
  clientSecret?: string;
  grantType?: string;
  refreshToken?: string;
}
