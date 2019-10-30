import { environment } from 'src/environments/environment';

export const consoleLog = (msg: string, color?: string, arg?: any) => {
        const evironment = environment.production;
        const msgColor = color ? color : 'black';

        if (!evironment) {
            if (arg) {
                return console.log(`%c${msg}`, `color: ${msgColor}`, arg);
            }
            return console.log(`%c${msg}`, `color: ${msgColor}`);
        }
        return;
};

export const firebaseUrl = () => {
    // Can I use property u: "angube-92c87.firebaseapp.com" from the auth responce?
    return 'https://angube-92c87.firebaseio.com/communities/';
};
