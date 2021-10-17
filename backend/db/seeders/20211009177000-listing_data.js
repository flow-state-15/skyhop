"use strict";
const faker = require("faker");
const casual = require("casual");
const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

const listing_urls = [
  //special use
  [
    "https://resources.globalair.com/aircraftforsale/images/ads/93521_C208_-_SN_20800421-NWEB.JPG",
    "http://gweduck.com/uploads/3/4/5/3/34537475/1783541_orig.jpg",
    "https://www.pilotmix.com/images/ac_images/elitar-sigma1.jpg",
    "https://i.ytimg.com/vi/Ycx7mFRKkeM/maxresdefault.jpg",
  ],
  //warbirds
  [
    "https://www.globalplanesearch.com/mygps/disp_img.php?id=36477",
    "https://static.wixstatic.com/media/654894_f97c964db3704380b6926e0e8457f122~mv2.jpg/v1/fill/w_640,h_344,al_c,q_80,usm_0.66_1.00_0.01/654894_f97c964db3704380b6926e0e8457f122~mv2.webp",
    "https://warbirdconnection.com/images/sold/invader-Lg.jpg",
    "https://www.aopa.org/-/media/Images/AOPA-Main/News-and-Media/2019/February/mustang/0226_mustang_front.jpg?mw=880&mh=495&as=1&hash=81F49FE4295E30FAF6631F8081463385",
  ],
  //helicopters
  [
    "https://imagez.tmz.com/image/64/4by3/2020/11/08/64268ffa59d54e908a5f003cd7c68687_md.jpg",
    "https://cdn2.aerotrader.com/v1/media/614c1b2717bfc65318656925.jpg?width=512&height=384&quality=60&bestfit=true&upsize=true&blurBackground=true&blurValue=100",
    "https://img.jamesedition.com/listing_images/2020/10/14/08/32/56/52f8b43f-97a9-4330-b027-ff5e32462acf/je/600x354xc.jpg",
    "https://api.army.mil/e2/c/images/2018/05/23/518107/original.jpg",
    "https://nwhelicopters.com/wp-content/uploads/2021/03/IMG_20201030_153928884_HDR.jpg",
    "https://www.helis.com/h3/brown_helicopter.jpg",
  ],
  //jets
  [
    "https://media.sandhills.com/img.axd?id=7006686525&wid=4326165471&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=z0Zc%2FelnjirVLOO9v5PHAt2qOMlAC3T3pngULRPbExo%3D",
    "https://cdn.evojets.com/wp-content/uploads/2019/07/new-ultra-long-range-jet-for-sale.jpg",
    "https://www.avjetglobal.com/wp-content/uploads/2020/10/2007-BOEING-BUSINESS-JET-36090-2-510x290.jpg",
    "https://www.jetlistings.com/wp-content/uploads/2021/01/F2000-sn170-Exterior2-367m-385x258.jpg",
    "https://dsgiipnwy1jd8.cloudfront.net/eyJidWNrZXQiOiJ0YXAtYXNzZXRzMSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NzAwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJhbHBoYSI6MSwiciI6MjU1LCJiIjoyNTUsImciOjI1NX19LCJzbWFydE92ZXJsYXkiOnsiYnVja2V0IjoidGFwLWFzc2V0czEiLCJrZXkiOiJ3YXRlcm1hcmsucG5nIn19LCJrZXkiOiIzMjI1NDkuanBnIn0=",
    "https://resources.globalair.com/aircraftforsale/images/ads/89443_1.jpg?w=550",
    "https://www.jamesedition.com/stories/wp-content/uploads/2018/12/6f7434fb-ebe3-45cd-9965-0cae23c4165b7D-950x368.",
    "https://www.valleyjet.com/wp-content/uploads/2020/07/Phenom-300-For-Sale.jpg",
    "https://miamijet.net/wp-content/uploads/jets2019-1024x538.jpg",
    "https://i2.wp.com/www.middleeastmonitor.com/wp-content/uploads/2019/03/20190301_2_35204588_42162577.jpg?resize=1200%2C800&quality=85&strip=all&zoom=1&ssl=1",
  ],
  //single prop
  [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtglgS8qDwOaMRmvvn4hgeMs3p4kPv-YN48GYMdFUcp3cAuF-6lVTGveo71-2rlwSgnq4&usqp=CAU",
    "https://air.one//wp-content/uploads/2015/12/Piper-Matrix.png",
    "http://yorktonaircraft.com/pub/ojv2.jpg",
    "https://images.proxibid.com/AuctionImages/10870/154635/FullDetail/20181207_141711.jpg",
    "https://cdn1.aerotrader.com/v1/media/614c1bcffe133e63b13e2a45.jpg?width=512&height=384&quality=60&bestfit=true&upsize=true&blurBackground=true&blurValue=100",
    "https://aviataircraft.com/wp-content/uploads/2021/08/N315CF_FQ_CU_Door.jpg",
    "https://media.sandhills.com/img.axd?id=6055624249&wid=4326165471&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=vilGr7%2FDhqataYRZ4lPqAZ1%2BxjICttxpAuKroEsO1go%3D",
    "https://www.stallion51.com/wp-content/uploads/2018/06/sales-5.png",
    "https://www.seaplanesnorth.com/wp-content/uploads/2021/09/IMG_1646-scaled.jpg",
    "https://thumbor.forbes.com/thumbor/479x223/http://b-i.forbesimg.com/businessaviation/files/2013/07/Meridian-2.jpg",
  ],
  //double prop
  [
    "https://6fpjj2z5dn21oo10y3dqu9p1-wpengine.netdna-ssl.com/wp-content/uploads/sites/2/2017/05/CB_Air_B200-1.jpg",
    "https://airplanesusa.com/wp-content/uploads/2016/09/13326.jpg",
    "https://cdn.avbuyer.com/live/uploads/image/362401_362500/aircraft-turboprops-beechcraft-king-air-c90-362423_968d2efd92e400ba_350X200_c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7XexdRnjdKvl9rh_P6NkCJ_dcZ3vXqRol1eTxKxFzabPD2_SRBDJaNBQsKDbaMBWvIV8&usqp=CAU",
    "https://media.sandhills.com/img.axd?id=7077569717&wid=4326165471&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=d2WjXEniygZb%2BdUIgNFYS71Xj4kB5CSCSBxyI56I868%3D",
    "https://robbreport.com/wp-content/uploads/2014/08/p18vvoo1tos88oau5h21r071b9ib.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21zvcFhJlxMAGbk5Atxi-4PoHSsQw2aNaow&usqp=CAU",
    "https://www.aircharteradvisors.com/wp-content/uploads/2020/04/Swearingen-Merlin-SA226-e1587481952327.jpg",
    "https://cdn.avbuyer.com/live/uploads/image/361801_361900/aircraft-turboprops-cessna-conquest-i-361893_abc72f7d8ec8bcf2_350X200_c.jpg",
    "https://www.ainonline.com/sites/ainonline.com/files/styles/ain30_fullwidth_large/public/044cessna_skycourier_cessna-skycourier-advances-through-development_prototype-assembly-underway.jpg?itok=PMfnnaal",
  ],
];

function makeListings(target) {
  const listings = [];
  for (let i = 0; i < listing_urls.length; ++i) {
    for (let j = 0; j < listing_urls[i].length; ++j) {
      const newListing = {
        title: lorem.generateWords(getRandomNum(3, 7)),
        description: lorem.generateSentences(getRandomNum(3, 7)),
        owner_id: i + 1,
        category_id: i + 1,
        location: casual.city,
        img_url: listing_urls[i][j],
      };
      listings.push(newListing);
    }
  }
  return listings;
}

const seedListings = [
  // {
  //   title: "TESTING LISTINGS SEEDER",
  //   description: "testing testing lorem ipsum...",
  //   owner_id: 2,
  //   category_id: 1,
  //   location: "Miami",
  //   img_url:
  //     "https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633825471/shipshape-project/rental-Sail-boat-Caralina-27feet-Sag_Harbor-NY_8fZXWgw_g0kux2.jpg",
  // },
  ...makeListings(30),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Listings", seedListings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Listings", null, {});
  },
};
