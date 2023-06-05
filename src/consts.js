export const isBuild = String(process.env.NODE_ENV).includes('production');

const host_server = 'https://103.56.206.121:7000';
const host_local = 'http://localhost:8080';
export const hostname = isBuild ? host_server : host_local;
export const authorization = isBuild
  ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1ODgwNTUwLCJleHAiOjE2ODY0ODUzNTB9.6mtJvqfwlZmD9FjT19ULvt5aFoezkg3RfLlex1kZtc8' // ip
  : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1OTI2MjIxLCJleHAiOjE2ODY1MzEwMjF9.dg0mQZ6kr_xIYuq2HRadOVNn1FfbapzXOOOadOVBHhM'; // localhost
