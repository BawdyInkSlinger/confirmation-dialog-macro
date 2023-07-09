import 'testcafe';

declare global {
    interface CustomActions {
        expectDialogCountToBe: (dialogCount: number) => TestControllerPromise
    }
}