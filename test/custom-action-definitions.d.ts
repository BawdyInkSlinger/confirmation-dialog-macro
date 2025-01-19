import 'testcafe';

declare global {
  interface CustomActions {
    expectSetContainsSubset: (
      set: unknown | unknown[] | Promise<unknown[]>,
      subset: unknown | unknown[] | Promise<unknown[]>,
    ) => TestControllerPromise;
  }
}
