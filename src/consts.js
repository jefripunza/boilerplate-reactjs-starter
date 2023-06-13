export const isBuild = String(process.env.NODE_ENV).includes('production');

const host_server = 'https://103.56.206.121:7000';
const host_local = 'http://localhost:8080';
// export const hostname = isBuild ? host_server : host_local;
export const hostname = host_server;
export const user_roles = {
  // developer
  superadmin: 'superadmin',

  // administrator
  admin: 'admin',
  approval: 'approval',

  // user
  basic: 'basic', // register
};
