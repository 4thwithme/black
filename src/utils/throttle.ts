export default (func: (...param: any[]) => void, ms: number) => {
  let isCan = true;
  let delayedContext: any;
  let delayedArguments: any;

  return function wrapper(...args: any) {
    const _self: any = wrapper;

    if (!isCan) {
      delayedContext = _self;
      delayedArguments = args;
      return;
    }

    func.apply(_self, args);
    isCan = false;

    setTimeout(() => {
      isCan = true;

      if (delayedArguments) {
        wrapper.apply(delayedContext, delayedArguments);
        delayedArguments = delayedContext = null;
      }
    }, ms);
  };
};