require("shelljs/global");

const sizes = [
  { size: 120, dest: "apple-touch-icon-120x120.png" },
  { size: 152, dest: "apple-touch-icon-152x152.png" },
  { size: 180, dest: "apple-touch-icon-180x180.png" },
  { size: 60, dest: "apple-touch-icon-60x60.png" },
  { size: 76, dest: "apple-touch-icon-76x76.png" },
  { size: 180, dest: "apple-touch-icon.png" },
  { size: 16, dest: "favicon-16x16.png" },
  { size: 32, dest: "favicon-32x32.png" },
  { size: 128, dest: "icon-128x128.png" },
  { size: 144, dest: "icon-144x144.png" },
  { size: 152, dest: "icon-152x152.png" },
  { size: 192, dest: "icon-192x192.png" },
  { size: 384, dest: "icon-384x384.png" },
  { size: 512, dest: "icon-512x512.png" },
  { size: 72, dest: "icon-72x72.png" },
  { size: 96, dest: "icon-96x96.png" },
  { size: 144, dest: "msapplication-icon-144x144.png" },
  { size: 150, dest: "mstile-150x150.png" }
];

sizes.forEach(item => {
  exec(
    `convert youtube4kids.png -resize ${item.size} ../public/img/icons/${
      item.dest
    }`
  );
  cp("-f", "./youtube4kids.svg", "../public/img/icons/safari-pinned-tab.svg");
});

// convert youtube4kids.png -resize 640x1136^ -gravity center -crop 640x1136+0+0 +repage Default-568h@2x.png
