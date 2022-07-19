export interface AppwriteRequest extends Request {
  headers: Headers;
  payload: any; //object with request body data
  env: any; //object with environment variables
}
export interface AppwriteResponse {
  send: (text: string, status?: number) => {}; // function to return text response. Status code defaults to 200
  json: (obj: object, status?: number) => {}; // function to return JSON response. Status code defaults to 200
}
