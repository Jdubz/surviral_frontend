// eventually import from global_config in conf webpack folder...

// Settings configured here will be merged into the final config object.


let x = {};

x.apiVersion = '/v1';
x.distServer = 'https://test.com';
x.distCdnServer = 'https://cdn.test.com';

x.apiServer = x.distServer + '/api' + x.apiVersion;

x.defaultPageTitle = 'Test page';
x.headerHeight = 80; // px


export default x;
