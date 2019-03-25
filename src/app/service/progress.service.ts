
export class ProgressService {

    private progressesNumber: number;

    /**
     * Setting number of the requests(progresses) started in ngOninit.
     * @param progressesNumber Number of the requests.
     */
    startProgresses(progressesNumber: number) {
        this.progressesNumber = progressesNumber;
    }

    /**
     * Decrement with one the number of the requests(progresses).
     */
    stopProgress() {
        this.progressesNumber = --this.progressesNumber;
    }

    isRequesting() {
        return this.progressesNumber !== 0;
    }

}
