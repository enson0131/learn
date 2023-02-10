const pug = require("pug");
const fs = require("fs-extra");

// 编译这份代码
const compiledFunction = pug.compileFile("index.pug");

const data = {
  id: "bc28b210-ec82-11ec-ad0b-eb7b105cfa31",
  path: "pivot",
  type: "content",
  sitePath: "en",
  content: [
    {
      code: "p1",
      content: [
        {
          text1: "<%- p1[0].text1%>",
          text2: "<%- p1[0].text2%>",
          text3: "<%- p1[0].text3 %>",
          text4: "<%- p1[0].text4 %>",
          link1: "<%= p1[0].link1 %>",
          img1: JSON.stringify({
            url: "<%= p1[0].img1.url %>",
            size: "138802",
            type: "image/png",
            name: "编组 9@2x.png",
          }),
          icon1: JSON.stringify({
            url: "<%= p1[0].icon1.url %>",
            size: 6371,
            type: "image/png",
            name: "P1-3.png",
          }),
          icon2: JSON.stringify({
            url: "<%= p1[0].icon2.url %>",
            size: 2872,
            type: "image/png",
            name: "P1-4.png",
          }),
        },
      ],
    },
    {
      code: "p2",
      content: [
        {
          text1: "<%- p2[0].text1  %>",
          text2: "<%- p2[0].text2 %>",
          icon1: JSON.stringify({
            url: "<%= p2[0].icon1.url %>",
            size: 93975,
            type: "image/png",
            name: "P2-5.png",
          }),
          icon2: JSON.stringify({
            url: "<%= p2[0].icon2.url %>",
            size: 98446,
            type: "image/png",
            name: "编组 24@2x.png",
          }),
        },
      ],
    },
    {
      code: "p2list",
      content: [
        {
          text1: "LED Video Wall",
          img: JSON.stringify({
            url: "it-front/bda0144cfc534fa7b83c73d2cd04615c",
            size: 1456,
            type: "image/svg+xml",
            name: "ic.svg",
          }),
        },
        {
          text1: "Device Manage",
          img: JSON.stringify({
            url: "it-front/c70627b424474fb29b288df0b6c504b4",
            size: 937,
            type: "image/svg+xml",
            name: "ic_device.svg",
          }),
        },
        {
          text1: "Soundbar",
          img: JSON.stringify({
            url: "it-front/c64dfe2ef4774bff9c1ec3e92bd010e7",
            size: 1493,
            type: "image/svg+xml",
            name: "ic_soundbar.svg",
          }),
        },
        {
          text1: "Windows",
          img: JSON.stringify({
            url: "it-front/ca063b3d92364c6dbdcdec4bbac5125e",
            size: 1204,
            type: "image/svg+xml",
            name: "ic_windows.svg",
          }),
        },
        {
          text1: "Interactive Flat Panel",
          img: JSON.stringify({
            url: "it-front/91da0b25eade4702bd059cf7798872b5",
            size: 1263,
            type: "image/svg+xml",
            name: "ic_IFP.svg",
          }),
        },
        {
          text1: "Android",
          img: JSON.stringify({
            url: "it-front/eea8b3525f4440d8992cda194b097ec7",
            size: 3337,
            type: "image/svg+xml",
            name: "ic_Android.svg",
          }),
        },
      ],
    },
    {
      code: "p3",
      content: [
        {
          text1: "<%- p3[0].text1 %>",
          text2: "<%- p3[0].text2 %>",
          icon1: JSON.stringify({
            url: "<%= p3[0].icon1.url %>",
            size: 31989,
            type: "image/png",
            name: "P3-4 (1).png",
          }),
          icon2: JSON.stringify({
            url: "<%= p3[0].icon2.url %>",
            size: 6375,
            type: "image/png",
            name: "P3-1 (1).png",
          }),
          icon3: JSON.stringify({
            url: "<%= p3[0].icon3.url %>",
            size: 14948,
            type: "image/png",
            name: "P3-2 (1).png",
          }),
          icon4: JSON.stringify({
            url: "<%= p3[0].icon4.url %>",
            size: 3574,
            type: "image/png",
            name: "P3-3 (1).png",
          }),
        },
      ],
    },
    {
      code: "p4",
      content: [
        {
          text1: "<%- p4[0].text1 %>",
          text2: "<%- p4[0].text2 %>",
          icon1: JSON.stringify({
            url: "<%= p4[0].icon1.url %>",
            size: 29372,
            type: "image/png",
            name: "编组 25@2x.png",
          }),
          icon2: JSON.stringify({
            url: "<%= p4[0].icon2.url %>",
            size: 29968,
            type: "image/png",
            name: "P4-2.png",
          }),
          icon3: JSON.stringify({
            url: "<%= p4[0].icon3.url %>",
            size: 192200,
            type: "image/png",
            name: "P4-3.png",
          }),
        },
      ],
    },
    {
      code: "p5",
      content: [
        {
          text1: "<%- p5[0].text1 %>",
          text2: "<%- p5[0].text2 %>",
          icon1: JSON.stringify({
            url: "<%= p5[0].icon1.url %>",
            size: 31516,
            type: "image/png",
            name: "P5-2.png",
          }),
          icon2: JSON.stringify({
            url: "<%= p5[0].icon2.url %>",
            size: 11712,
            type: "image/png",
            name: "P5-1.png",
          }),
          icon3: JSON.stringify({
            url: "<%= p5[0].icon3.url %>",
            size: 4516,
            type: "image/png",
            name: "P5-3.png",
          }),
          icon4: JSON.stringify({
            url: "<%= p5[0].icon4.url %>",
            size: 8643,
            type: "image/png",
            name: "P5-4.png",
          }),
        },
      ],
    },
    {
      code: "p6",
      content: [
        {
          text1: "<%- p6[0].text1 %>",
          text2: "<%- p6[0].text2 %>",
          icon1: JSON.stringify({
            url: "<%= p6[0].icon1.url %>",
            size: 56692,
            type: "image/png",
            name: "P6-2.1.png",
          }),
          icon2: JSON.stringify({
            url: "<%= p6[0].icon2.url %>",
            size: 17902,
            type: "image/png",
            name: "P6-2.png",
          }),
          icon3: JSON.stringify({
            url: "<%= p6[0].icon3.url",
            size: 55766,
            type: "image/png",
            name: "P6-3.png",
          }),
          icon4: JSON.stringify({
            url: "<%= p6[0].icon4.url",
            size: 3514,
            type: "image/png",
            name: "P6-4.png",
          }),
        },
      ],
    },
    {
      code: "p6list",
      content: [
        {
          img: JSON.stringify({
            url: "it-front/8aa98bef2a0849b598b7787286b753f8",
            size: 556,
            type: "image/png",
            name: "DMS-2_010.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/afe919987e35467198d958ba12cca7cd",
            size: 638,
            type: "image/png",
            name: "DMS-2_011.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/4e5842a28d2145e8b59470d2dbd514d7",
            size: 710,
            type: "image/png",
            name: "DMS-2_012.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/877333f7f6744d10a2c7a5f6546a36a4",
            size: 786,
            type: "image/png",
            name: "DMS-2_013.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/3bd6268d6d2541009976fa1beee93186",
            size: 872,
            type: "image/png",
            name: "DMS-2_014.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/79a832314749414d9be691baf0e2839e",
            size: 945,
            type: "image/png",
            name: "DMS-2_015.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/8570113536c647e5b498f7f3a8a9d267",
            size: 959,
            type: "image/png",
            name: "DMS-2_016.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/b7d4f7a12e074a97b82a3135b40af18d",
            size: 1174,
            type: "image/png",
            name: "DMS-2_017.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/aaa723e83312459fbb16115db2fbf069",
            size: 1552,
            type: "image/png",
            name: "DMS-2_018.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/a3566665a2134cb1b3333acc6edfe8cb",
            size: 1816,
            type: "image/png",
            name: "DMS-2_019.png",
          }),
        },
        {
          img: JSON.stringify({
            url: "it-front/efe311476b774c8aa3bb655496d07cf8",
            size: 2065,
            type: "image/png",
            name: "DMS-2_024.png",
          }),
        },
      ],
    },
    {
      code: "p7",
      content: [
        {
          title1: "<%- p7[0].title1 %>",
          title2: "<%- p7[0].title2 %>",
          text1: "<%- p7[0].text1 %>",
          desc: "",
          link: JSON.stringify({
            src: "<%= p7[0].link.src %>",
            size: 25989040,
            name: "BytelloDMSclient_Win_1.8.3.exe",
            type: "application/x-msdownload",
          }),
          img1: JSON.stringify({
            url: "<%= p7[0].img1.url %>",
            size: 1005,
            type: "image/svg+xml",
            name: "P7-icon-1.1(1).svg",
          }),
          icon1: JSON.stringify({
            url: "<%= p7[0].icon1.url %>",
            size: 4516,
            type: "image/png",
            name: "P5-3 (1).png",
          }),
        },
        {
          text1: "<%- p7[1].text1 %>",
          desc: "<%- p7[1].desc %>",
          link: JSON.stringify({
            src: "<%= p7[1].link.src %>",
            size: 12723787,
            name: "BytelloDMSclient_Android_1.8.3.apk",
            type: "application/vnd.android.package-archive",
          }),
          img1: JSON.stringify({
            url: "<%= p7[1].img1.src %>",
            size: 3340,
            type: "image/svg+xml",
            name: "P7-icon-2.1(1).svg",
          }),
        },
        {
          text1: "<%- p7[2].text1 %>",
          desc: "<%- p7[2].desc %>",
          link: JSON.stringify({
            src: "<%= p7[2].link.src %>",
            size: 12723787,
            name: "BytelloDMSclient_Android_1.8.3.apk",
            type: "application/vnd.android.package-archive",
          }),
          img1: JSON.stringify({
            url: "<%= p7[2].img1.url %>",
            size: 3340,
            type: "image/svg+xml",
            name: "P7-icon-2.1(1).svg",
          }),
        },
      ],
    },
    {
      code: "p8",
      content: [
        {
          title: "<%- p8[0].title %>",
          text1: "<%- p8[0].text1 %>",
          text2: "<%- p8[0].text2 %>",
          img: JSON.stringify({
            url: "<%- p8[0].img.url %>",
            size: 750,
            type: "image/png",
            name: "P8-bgimg.png",
          }),
        },
      ],
    },
    {
      code: "p9",
      content: [
        {
          title: "<%- p9[0].title %>",
          text1: "<%- p9[0].text1 %>",
          text2: "<%- p9[0].text2 %>",
          video: JSON.stringify({
            url: "<%- p9[0].video.url %>",
            size: 891,
            type: "video/mp4",
            name: "P9-video.mp4",
          }),
        },
      ],
    },
  ],
};

const reduceDataSource = (sourceDetail) =>
  sourceDetail.reduce(
    (pre, cur) => ({
      ...pre,
      [cur.code]: {
        content: cur.content,
      },
    }),
    {}
  );

const langData = reduceDataSource(data.content);

console.log(`langData==>`, langData);

const content = pug.renderFile("index.pug", { langData });

fs.outputFile("target.html", content);
