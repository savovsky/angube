
// import * as Utils from '../common/utils';


export class ProgressService {
    isRequesting: boolean;

    setProgressing(isRequesting: boolean) {
        this.isRequesting = isRequesting;
        // Utils.consoleLog(`isRequesting: `, 'orange', this.isRequesting);
    }

}
