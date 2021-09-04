// 1111111111
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    return new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    .then(() => {
    console.log("内部第一个then");
    })
    .then(() => {
    console.log("内部第二个then");
    });
  })
  .then(() => {
    console.log("外部第二个then");
  });

// 外部promise
// 外部第一个then
// 内部promise
// 内部第一个then
// 内部第二个then
// 外部第二个then


// 22222222
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });

  // 外部promise
  // 外部第一个then
  // 内部promise
  // 内部第一个then
  // 外部第二个then
  // 内部第二个then 

// 333333333333

new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    let p = new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    p.then(() => {
        console.log("内部第一个then");
      })
    p.then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });

  // 外部promise
  // 外部第一个then
  // 内部promise
  // 内部第一个then
  // 内部第二个then
  // 外部第二个then

  // 444444444444

  let p = new Promise((resolve, reject) => {
    console.log("外部promise");
    resolve();
  })
  p.then(() => {
      console.log("外部第一个then");
      new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve();
      })
        .then(() => {
          console.log("内部第一个then");
        })
        .then(() => {
          console.log("内部第二个then");
        });
    })
  p.then(() => {
      console.log("外部第二个then");
    });

    // 外部promise
    // 外部第一个then
    // 内部promise
    // 外部第二个then
    // 内部第一个then
    // 内部第二个then


// 55555555555555

new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
    return new Promise((resolve, reject) => {
      console.log("内部promise2");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then2");
      })
      .then(() => {
        console.log("内部第二个then2");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });

// 外部promise
// 外部第一个then
// 内部promise
// 内部promise2
// 内部第一个then
// 内部第一个then2
// 内部第二个then
// 内部第二个then2
// 外部第二个then



new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
  setTimeout(() => {
    console.log('外部第一个setTimeout')
  }, 0)
})
  .then(() => {
    console.log('外部第一个then');
    setTimeout(() => {
      console.log('外部第一个then-setTimeout')
    }, 0)
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then');
        return Promise.resolve();
      })
      .then(() => {
        console.log('内部第二个then');
      })
      .then(() => {
        console.log('内部第三个then');
      })
  })
  .then(() => {
    console.log('外部第二个then');
  })
  .then(() => {
    console.log('外部第三个then');
  })
  .then(() => {
    console.log('外部第四个then')
  })
  .then(() => {
    console.log('外部第五个then')
  })
  .then(() => {
    console.log('外部第六个then')
  })
  // 外部promise 外部第一个then 内部promise 内部第一个then  外部第二个then 外部第三个then   内部第二个then