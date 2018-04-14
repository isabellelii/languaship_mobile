const ENV = {
  config(env: string = 'prod') {
    return {
      apiBase: env === 'prod' ? 'https://languaship.herokuapp.com/api/v1' : ''
    };
  }
};

export default ENV;
