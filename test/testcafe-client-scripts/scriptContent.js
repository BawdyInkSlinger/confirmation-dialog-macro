window.addEventListener('load', function () {
  $(document).on(':passageend', function (ev) {  
    console.warn = (e) => { throw Error(e); };
  });
});