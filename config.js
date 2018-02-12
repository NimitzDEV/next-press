module.exports = {
  mongo_addr: 'mongodb://127.0.0.1:27017/NextPress',
  jwt_salt: 'PUT_SOME_RANDOM_STRING',
  api_port: 9001,
  version: '1.0.0',
  https_cert_file: '',
  https_cert_key: '',
  disqus: {
    name: '',
  },
  blog: {
    name: 'blog',
    desc: '',
  },
  jwt: {
    secret: 'D3fau1tT0kEn!',
    exp: 48,
  },
  socialMedia: [
    {
      href: 'https://github.com/NimitzDEV',
      name: 'Github',
      icon: 'github',
      color: 'red',
      size: 'small',
    },
  ],
};
