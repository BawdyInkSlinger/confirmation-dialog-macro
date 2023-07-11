import 'testcafe';

declare global {
  interface CustomActions {
    expectContainsSubset: (
      set: unknown[] | Promise<unknown[]>,
      subset: unknown[] | Promise<unknown[]>
    ) => TestControllerPromise;
  }
}
