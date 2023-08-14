import devConfig from './enviroments/development';
import homologationConfig from './enviroments/homologation';
import productionConfig from './enviroments/production';

const currentEnv = process.env.NODE_ENV || 'development';

let configEnviroment;

switch (currentEnv) {
    case 'development':
        configEnviroment = devConfig;
        break;
    case 'homologation':
        configEnviroment = homologationConfig;
        break;
    case 'production':
        configEnviroment = productionConfig;
        break;
    default:
        configEnviroment = devConfig;
}

export default configEnviroment;